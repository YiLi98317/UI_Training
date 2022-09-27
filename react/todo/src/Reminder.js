import { useEffect } from "react";

export default function Reminder(props) {
    function handleAlert(todo) {
        var time = (Date.now() - todo.date) / 1000 % todo.interval;
        if(time <= 1.5) return <p>
                                    {todo.text} needs to be done!
                                </p>;
        else return null;
    }
    

    var reminderList = props.todos
    .filter((todo) => todo.complete != 1)
    .map((todo) => {        
        return handleAlert(todo);
    });

    return(
        <div>
            {reminderList}
        </div>
        
    );
}