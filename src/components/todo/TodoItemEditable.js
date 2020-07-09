//@TODO In progress
import React from "react";
import TextField from "@material-ui/core/ListItemIcon";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

function TodoItem({id, isChecked, task, toggle}) {
    return (
        <TextField
            id="standard-basic"
            label="task"
            change={}
        />
    )

}

export default TodoItem;