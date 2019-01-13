import React, { Component } from 'react';
import TodoItemList from 'components/TodoItemList';
import TodoInputbox from 'components/TodoInputbox';
import Header from 'components/Header';
import api from '../../api';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      itemModalOpened: false,
      newTodoContent: '',
      todos: [{
        state: 0,
        content: '',
        registerDate: '',
        editedDate: '',
        checked: false,
        loading: false
      }],
      spinner: true,
      authToken: '',
      modalTodo: {
        content: '',
        index: 0
      },
      id: '',
    }
  }


  handleItemAddClick(todos) {
    const newTodo = {
      state: 0,
      content: '',
      registerDate: '',
      editedDate: '',
      checked: false
    };
    newTodo.content = todos;
    this.setState({newTodoContent: todos});

    let currentData = newTodo;
    currentData.authToken = this.state.authToken;

    api.insert(currentData)
    .then((response) => {
      const newTodos = [
        ...this.state.todos
      ];
      newTodo.id = response.data.id;
      newTodos.push(newTodo);
  
      this.setState({
        todos: newTodos,
        newTodoContent: ''
      });

    })
    .catch((error) => {
      console.dir(error)
    })
  }

  handleInputboxContentChanged(content) {
    this.setState({
      newTodoContent: content
    });
  }

  handleItemToggle(todo, index) {
    const newTodos = [
      ...this.state.todos
    ];
    newTodos[index].state = (todo.state === 0) ? 1 : 0;

    this.setState({ 
      todos: newTodos
    });

    let currentData = this.state.todos[index];
    currentData.authToken = this.state.authToken;

    api.changeTodoState(currentData)
  }

  handleItemDeleteClick(index) {
    const newTodos = [
      ...this.state.todos
    ];
    newTodos.splice(index, 1);

    this.setState({
      todos: newTodos
    });

    let currentData = this.state.todos[index];
    currentData.authToken = this.state.authToken;

    api.delete(currentData)
  }

  handleItemEditClick(todos) {
    console.log("==handleItemEditClick==")
    this.openItemModal(todos.contents);
  }

  openItemModal(todoContents) {
    this.setState({
      modalTodo: todoContents,
      itemModalOpened: true
    });
  }

  render() {
    const { todos, newTodoContent } = this.state;
    const onItemAddClickCallback = this.handleItemAddClick.bind(this);
    const onInputboxContentChangedCallback = this.handleInputboxContentChanged.bind(this);
    const onItemToggleCallback = this.handleItemToggle.bind(this);
    const onItemEditClickCallback = this.handleItemEditClick.bind(this);
    const onItemDeleteClickCallback = this.handleItemDeleteClick.bind(this);

    return (
      <div className="Container">
        <Header/>
        <TodoInputbox content={newTodoContent} onItemAddClick={onItemAddClickCallback} onContentChanged={onInputboxContentChangedCallback}/>
        <TodoItemList data={todos} onItemToggle={onItemToggleCallback} onItemEditClick={onItemEditClickCallback} onItemDeleteClick={onItemDeleteClickCallback}/>
      </div>
    );
  }


  init() {
    let authToken = localStorage.getItem('authToken');

    if(authToken === 'undefined' || authToken === null) {
      window.location.href = "/login"
    }
    else {
      api.select(authToken)
      .then((response) => {
        console.log(response)
        this.setState({
          spinner : false,
          authToken : authToken
        });

        let todos = [];
        for(let i = 0; i < response.data.length; i++){
          response.data[i].checked = response.data[i].state === 0 ? false : true
          todos.push(response.data[i])
        }
        this.setState({todos : todos});
      })
      .catch((error) => {
        console.dir(error)
        window.location.href = "/login"
      })
    }
  }

  componentDidMount() {
    this.init();
  }

};

export default Home;