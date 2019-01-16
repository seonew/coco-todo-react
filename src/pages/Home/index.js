import React, { Component } from 'react';
import Header from 'components/Header';
import TodoItemList from 'components/TodoItemList';
import TodoInputbox from 'components/TodoInputbox';
import TodoEditModal from 'components/TodoEditModal';
import api from '../../api';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      itemModalOpened: false,
      newTodoContent: '',
      currentTodoContent: '',
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
      currentTodo: {
        content: '',
        state: 0,
        id: ''
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

  handleModalContentEditClick(content){
    const currentTodo = this.state.currentTodo
    currentTodo.content = content;

    let currentData = currentTodo;
    currentData.authToken = this.state.authToken;

    api.update(currentData)
    .then(() => {
      this.setState({
        currentTodoContent: '',
        itemModalOpened: false
      });
    })
    .catch((error) => {
      console.dir(error)
    })
  }

  handleModalContentChanged(content) {
    this.setState({
      currentTodoContent: content
    });
  }

  handleItemEditClick(data) {
    const todoContents = data.todo.content;
    this.setState({
      currentTodoContent: todoContents,
      currentTodo: data.todo,
      itemModalOpened: true
    });
  }

  handleModalClose() {
    this.setState({
      itemModalOpened: false
    });
  }

  render() {
    const { todos, newTodoContent, currentTodoContent, itemModalOpened } = this.state;
    const onItemAddClickCallback        = this.handleItemAddClick.bind(this);
    const onInputboxItemChangedCallback = this.handleInputboxContentChanged.bind(this);
    const onItemToggleCallback          = this.handleItemToggle.bind(this);
    const onItemDeleteClickCallback     = this.handleItemDeleteClick.bind(this);
    const onItemEditClickCallback       = this.handleItemEditClick.bind(this);

    const onModalItemChangedCallback    = this.handleModalContentChanged.bind(this);
    const onModalItemEditClickCallback  = this.handleModalContentEditClick.bind(this);
    const onModalCloseClickCallback     = this.handleModalClose.bind(this);

    return (
      <div className="Container">
        <Header/>
        <TodoInputbox content={newTodoContent} 
          onItemAddClick={onItemAddClickCallback} onContentChanged={onInputboxItemChangedCallback}/
        >
        <TodoItemList data={todos} 
          onItemToggle={onItemToggleCallback} onItemEditClick={onItemEditClickCallback} onItemDeleteClick={onItemDeleteClickCallback}
        />
        <TodoEditModal content={currentTodoContent} open={itemModalOpened} 
          onContentEditClick={onModalItemEditClickCallback} onContentChanged={onModalItemChangedCallback} onCloseClick={onModalCloseClickCallback} 
        />
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