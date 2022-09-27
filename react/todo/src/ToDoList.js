import React from "react";

export default class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
    }

    handleDelete(e) {
        this.props.onDelete(e.target.id);
    }

    handleComplete(e) {
        this.props.onComplete(e.target.id);
    }

    render() {
        var todoList = this.props.todos.map((todo) => {
            var style = {textDecorationLine: "none"};
            var text = "Complete";
            if(todo.complete == 1) {
                style = {textDecorationLine: "line-through"};
                text = "Un-complete";
            }
            return <li 
                        key={todo.id}
                        style={style}
                        // onClick={this.handleComplete}
                    >
                        {todo.text}
                        <button 
                            id={todo.id} 
                            onClick={this.handleComplete}
                            className="list-button"
                        > 
                            {text}
                        </button>
                        <button 
                            id={todo.id} 
                            onClick={this.handleDelete}
                            className="list-button"
                        > 
                            Delete
                        </button>
                    </li>
        });

        return(
            <div className="center">
                <ul className="">
                    {todoList}
                </ul>
            </div> 
        );
    }
}