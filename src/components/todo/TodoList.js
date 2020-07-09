import React from "react";
import TodoItem from "./TodoItem";
import List from '@material-ui/core/List';

function TodoList(props) {
    return(
        <List dense component="ul" role="list">
            {
                props.todos.length &&
                props.todos.map(el=><TodoItem
                    key={el.id}
                    todo={el}
                    select={props.select}
                    update={props.update}
                />)
            }
        </List>
    )
}

export default TodoList;
