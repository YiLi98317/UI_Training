import Header from './Header';
import AddToDo from './AddToDo';
import ToDoList from './ToDoList';
import Reminder from './Reminder';
import { useEffect } from 'react';
import React from 'react';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
      ],
      tick: true
    }
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.handleCompleteTodo = this.handleCompleteTodo.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

  handleDeleteTodo(id) {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id != id)
    })
  }

  handleCompleteTodo(id) {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if(todo.id == id) {
          todo.complete = todo.complete == 1 ? 0: 1;
        }
        return todo;
      })
    })
  }

  handleAddTodo(todo) {
    const id = this.state.todos.length - 1 === -1 ? 0 : this.state.todos[this.state.todos.length - 1].id + 1;
    this.setState({
      todos: this.state.todos.concat({
        id: id,
        text: todo.text,
        complete: 0,
        date: Date.now(),
        interval: todo.interval //*1000*60*60
      })
    });

  }

  componentDidMount() {
    var data = JSON.parse(localStorage.getItem("data"));
    if(data !== null) {
      this.setState({todos: data});
    }

    setInterval(() => {
      this.setState({tick: !this.state.tick});
      // console.log("rerender");
    }, 1000);
  }

  componentDidUpdate() {
    localStorage.setItem("data", JSON.stringify(this.state.todos));
  }

  render() {
    return (
      <div>
        <Header />
  
        <AddToDo 
          onAdd={this.handleAddTodo}
        />

        <Reminder todos={this.state.todos} />
  
        <ToDoList 
          todos={this.state.todos} 
          onComplete={this.handleCompleteTodo}
          onDelete={this.handleDeleteTodo} 
        />
      </div>
    );
  }

}

export default App;
