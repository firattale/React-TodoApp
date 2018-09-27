import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import TodoList from './TodoList';
import axios from 'axios';
import Spinner from './../components/Spinner';

class App extends Component {
  state = {
    isUpdateButtonClicked: false,
    isAddButton_Update: false,
    indexOfUpdated: null,
    newTodo: '',
    alertType: '',
    showAlert: false,
    todos: [],
    loading: false
  };

  changeOnInput = event => {
    this.setState({ newTodo: event.target.value });
  };

  addOrUpdateTodo = async () => {
    // Update Mode
    if (this.state.isAddButton_Update) {
      const todos = [...this.state.todos];
      const updatedTodo = todos[this.state.indexOfUpdated];
      updatedTodo.name = this.state.newTodo;
      await axios.put(
        `https://5bac02f5ecc1a70014306b87.mockapi.io/todos/${updatedTodo.id}`,
        updatedTodo
      );
      this.setState({
        todos,
        newTodo: '',
        isUpdateButtonClicked: false,
        isAddButton_Update: false,
        showAlert: true,
        alertType: 'updated'
      });
      this.selectCursorOnInput();
      this.removeAlert();
    } else {
      // Add Mode
      let givenId = 1;
      if (this.state.todos.length !== 0) {
        givenId = this.state.todos[this.state.todos.length - 1].id + 1;
      }
      const newTodo = {
        name: this.state.newTodo,
        id: givenId
      };
      axios.post('https://5bac02f5ecc1a70014306b87.mockapi.io/todos', newTodo);
      const todos = [...this.state.todos];
      todos.push(newTodo);
      this.setState({
        todos,
        newTodo: '',
        showAlert: true,
        alertType: 'added'
      });
      this.removeAlert();
    }
  };

  deleteTodo = i => {
    const todos = [...this.state.todos];
    const deleteTodo = todos[i];
    axios.delete(
      `https://5bac02f5ecc1a70014306b87.mockapi.io/todos/${deleteTodo.id}`
    );
    todos.splice(i, 1);
    this.setState({
      todos,
      showAlert: true,
      alertType: 'deleted'
    });
    this.removeAlert();
  };

  removeAlert = () => {
    setTimeout(() => this.setState({ showAlert: false }), 1000);
  };

  ChangeToUpdateMode = i => {
    this.setState({ isUpdateButtonClicked: true, isAddButton_Update: true });
    this.selectCursorOnInput();
    const todos = [...this.state.todos];
    this.setState({ newTodo: todos[i].name });
  };

  selectCursorOnInput = () => {
    document.getElementById('input').select();
  };

  updateButtonClicked = i => {
    this.ChangeToUpdateMode(i);
    this.setState({ indexOfUpdated: i });
  };

  async componentDidMount() {
    this.setState({ loading: true });
    this.selectCursorOnInput();
    const response = (await axios.get(
      'https://5bac02f5ecc1a70014306b87.mockapi.io/todos'
    )).data;
    this.setState({ todos: response, loading: false });
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'> CRUD REACT </h1>
        </header>
        {this.state.loading ? (
          <Spinner/>
        ) : (
          <TodoList
            showAlert={this.state.showAlert}
            alertType={this.state.alertType}
            newTodo={this.state.newTodo}
            isUpdateButtonClicked={this.state.isUpdateButtonClicked}
            todos={this.state.todos}
            changeOnInput={this.changeOnInput}
            props={this.addOrUpdateTodo}
            deleteTodo={this.deleteTodo}
            updateButtonClicked={this.updateButtonClicked}
            addOrUpdateTodo={this.addOrUpdateTodo}/>
        )}
      </div>
    );
  }
}
export default App;
