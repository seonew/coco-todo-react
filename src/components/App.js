import React, { Component } from 'react';
import Header from './Header';
import TodoItemList from './TodoItemList';
import api from '../api';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      itemModalOpened: false,
      // newTodoContent: '',
      todos: [{
        state: 0,
        content: '',
        registerDate: '',
        editedDate: '',
        loading: false
      }],
      // filterType: 'all',
      spinner: true,
      authToken: '',
      modalTodo: {
        content: '',
        index: 0
      }
    }

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
    const { todos } = this.state;
    const onItemToggleCallback = this.handleItemToggle.bind(this);
    const onItemEditClickCallback = this.handleItemEditClick.bind(this);
    const onItemDeleteClickCallback = this.handleItemDeleteClick.bind(this);

    return (
      <div className="App">
        <div className="Layout">
          <Header/>
          <TodoItemList data={todos} onItemToggle={onItemToggleCallback} onItemEditClick={onItemEditClickCallback} onItemDeleteClick={onItemDeleteClickCallback}/>
        </div>
      </div>
    );
  }

  init() {
    let authToken = localStorage.getItem('authToken');
    authToken = '0ab6c52050326aa45d36d0b4580397db05979aee4c047ab1ca7f578d7c5ff8a4'
    localStorage.setItem('authToken', authToken);
    this.setState({authToken : authToken});

    if(authToken === 'undefined' || authToken === null) {
      // window.location.href = "/login"
    }
    else {
      api.select(authToken)
      .then((response) => {
        console.log(response)
        this.setState({spinner : false});

        let todos = [];
        for(let i = 0; i < response.data.length; i++){
          response.data[i].checked = response.data[i].state === 0 ? false : true
          todos.push(response.data[i])
        }
        this.setState({todos : todos});
      })
      .catch((error) => {
        console.dir(error)
        // window.location.href = "/login"
      })
    }
  }

  componentDidMount() {
    this.init();
  }
}

export default App;
