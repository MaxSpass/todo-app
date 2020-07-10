import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Chip from '@material-ui/core/Chip';

import {
    TODO_STATUS_OPEN,
    TODO_STATUS_DONE,
} from '../../constants/todo';

const getBadgeColor = (value = '') => {
    const status = value.toLowerCase();

    return status === TODO_STATUS_DONE
        ? "primary"
        : status === TODO_STATUS_OPEN
        ? "secondary"
        : "error";
};

const getStatus = (selected) => {
    return selected
        ? TODO_STATUS_DONE
        : TODO_STATUS_OPEN;
};

function TodoItem(props) {
    const [todo] = React.useState(props.todo);
    const [editable, setEditable] = React.useState(false);
    const [value,setValue] = React.useState(todo.task);
    const [valueTemp,setTempValue] = React.useState(todo.task);
    const [status, setStatus] = React.useState(todo.status);
    const [isDone, setIsDone] = React.useState(status === TODO_STATUS_DONE);

    React.useEffect(()=>{
        if(props.todo.task !== value) {
            props.update(id, value, status);
        }
    }, [value]);


    React.useEffect(()=>{
        setStatus(getStatus(isDone));
        setIsDone(status === TODO_STATUS_DONE);
    }, [props]);

    function changeInputTempValue(e) {
        setTempValue(e.target.value)
    }

    function toggleEditStatus(saveFlag) {
        if(isDone) return;

        return () => {
            setEditable(!editable);
            if(saveFlag) {
                setValue(valueTemp);
            } else {
                setTempValue(value);
            }
        }
    };

    function selectTodo(e) {
        const status = getStatus(e.target.checked);
        setIsDone(e.target.checked);
        setStatus(status);
        props.update(id, value, status);
        props.select(id, e.target.checked);
    }

    const {id} = todo;

    return (
        <ListItem key={id} role="listitem" component="li" button>
            {
                editable
                    ? <React.Fragment>
                        <TextField
                            type="text"
                            value={valueTemp}
                            onChange={changeInputTempValue}
                        />
                        <div className="ml-auto">
                            <CheckIcon className="ml-2" onClick={toggleEditStatus(true)} />
                            <CloseIcon className="ml-2" onClick={toggleEditStatus(false)} />
                        </div>
                    </React.Fragment>
                    : <React.Fragment>
                        <Checkbox
                            onChange={selectTodo}
                            checked={isDone}
                            tabIndex={-1}
                            disableRipple
                            color="primary"
                            inputProps={{ 'aria-labelledby': id }}
                        />
                        <ListItemText
                            onClick={toggleEditStatus(false)}
                            id={id}
                        >{isDone ? <del>{value}</del> : <b>{value}</b>}
                        </ListItemText>
                        <div className="ml-auto">
                            <Chip
                                label={status}
                                color={getBadgeColor(status)}
                                size="small"
                            />
                        </div>
                    </React.Fragment>
            }

        </ListItem>
    )

}

export default TodoItem;