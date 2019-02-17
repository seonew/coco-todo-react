import React, { Component } from 'react';
import Header from 'components/Header';
import TodoItemList from 'components/TodoItemList';
import TodoInputbox from 'components/TodoInputbox';
import TodoEditModal from 'components/TodoEditModal';
import ConfirmModal from 'components/ConfirmModal';
import Spinner from 'components/Spinner';
import api from '../../api';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editModalOpened: false,
      confirmModalOpened: false,
      confirmMessage: '',
      currentTodoIndex: -1,
      currentTodoContent: '',
      newTodoContent: '',
      todos: [],
      showSpinner: true,
      authToken: '',
      currentTodo: {
        content: '',
        state: 0,
        id: '',
        index: -1
      },
      id: '',
    }
  }

  handleItemAddClick = todos => {
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

  handleInputboxContentChanged = content => {
    this.setState({
      newTodoContent: content
    });
  }

  handleItemToggle = (todo, index) => {
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

  handleItemDeleteClick = () => {
    const index = this.state.currentTodoIndex;
    const newTodos = [
      ...this.state.todos
    ];
    newTodos.splice(index, 1);

    this.setState({
      todos: newTodos,
    });
    
    let currentData = this.state.todos[index];
    currentData.authToken = this.state.authToken;

    api.delete(currentData)
    .then(() => {
      this.setState({
        currentTodoIndex: -1,
        confirmModalOpened: false
      });
    })
  }

  handleModalContentEditClick = content => {
    const currentTodo = this.state.currentTodo
    currentTodo.content = content;

    let currentData = currentTodo;
    currentData.authToken = this.state.authToken;

    api.update(currentData)
    .then(() => {
      this.setState({
        currentTodoContent: '',
        editModalOpened: false
      });
    })
    .catch((error) => {
      console.dir(error)
    })
  }

  handleModalContentChanged = content => {
    this.setState({
      currentTodoContent: content
    });
  }

  handleItemEditClick = data => {
    const todoContents = data.todo.content;
    this.setState({
      currentTodoContent: todoContents,
      currentTodo: data.todo,
      editModalOpened: true
    });
  }

  handleConfirmModalClick = index => {
    const currentTodoContent = this.state.todos[index].content;
    this.setState({
      confirmMessage: 'Are you sure you want to delete?',
      currentTodoIndex: index,
      currentTodoContent: currentTodoContent,
      confirmModalOpened: true
    });
  }

  handleModalClose = () => {
    this.setState({
      editModalOpened: false,
      confirmModalOpened: false
    });
  }

  render() {
    const { todos, newTodoContent, currentTodoContent, editModalOpened, confirmModalOpened, confirmMessage, showSpinner } = this.state;

    return (
      <div>
        <Header/>
        <TodoInputbox content={newTodoContent} 
          onItemAddClick={this.handleItemAddClick} onContentChanged={this.handleInputboxContentChanged}/
        >
        <TodoItemList data={todos} 
          onItemToggle={this.handleItemToggle} onItemEditClick={this.handleItemEditClick} onItemDeleteClick={this.handleConfirmModalClick}
        />
        <TodoEditModal content={currentTodoContent} open={editModalOpened} 
          onContentEditClick={this.handleModalContentEditClick} onContentChanged={this.handleModalContentChanged} onCloseClick={this.handleModalClose} 
        />
        <ConfirmModal open={confirmModalOpened} message={confirmMessage} todoContent={currentTodoContent}
          onConfirmClick={this.handleItemDeleteClick} onCloseClick={this.handleModalClose} 
        />
        <Spinner show={showSpinner}></Spinner>
        <div className={showSpinner ? "dimmer":""}></div>
      </div>
    );
  }

  init() {
    const authToken = localStorage.getItem('authToken');

    if (authToken === 'undefined' || authToken === null) {
      window.location.href = "/login";
    }
    else {
      api.select(authToken)
      .then((response) => {
        console.log(response)
        this.setState({
          showSpinner : false,
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
        this.setState({
          showSpinner : false,
        });
        window.location.href = "/login"
      })
    }
  }

  componentDidMount() {
    this.init();
  }

};

export default Home;