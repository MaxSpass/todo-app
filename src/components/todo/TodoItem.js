import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

function TodoItem(props) {
    const [todo, setTodo] = React.useState(props.todo);
    const [editable, setEditable] = React.useState(false);
    const [value,setValue] = React.useState(props.todo.task);
    const [valueTemp,setTempValue] = React.useState(props.todo.task);

    React.useEffect(()=>{
        if(props.todo.task !== value) {
            props.update(id, value);
        }
    }, [value]);

    function changeInputTempValue(e) {
        setTempValue(e.target.value)
    }

    function toggleEditStatus(saveFlag) {
        return function() {
            setEditable(!editable);
            if(saveFlag) {
                setValue(valueTemp);
            } else {
                setTempValue(value);
            }
        }
    };

    function selectTodo(e) {
        props.select(id)(e);
    }

    const {id, selected} = todo;

    return (
        <ListItem key={id} role="listitem" button>
            {
                editable
                    ? <ListItem>
                        <TextField
                            id="time"
                            type="text"
                            value={valueTemp}
                            onChange={changeInputTempValue}
                        />
                        <CheckIcon onClick={toggleEditStatus(true)} />
                        <CloseIcon onClick={toggleEditStatus(false)} />
                    </ListItem>
                    : <ListItem>
                            <Checkbox
                                onChange={selectTodo}
                                checked={selected}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': id }}
                            />
                            <ListItemText
                                onClick={toggleEditStatus(false)}
                                id={id}
                                primary={value}
                            />
                    </ListItem>

            }
        </ListItem>
    )

}

export default TodoItem;