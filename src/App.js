import React from 'react';
import {connect} from "react-redux";
import MainLayout from "./layouts/main.layout";
import TodoList from "./components/todo/TodoList";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {
    fetchTodosThunk,
    todoUpdateThunk,
    todoAddThunk,
    todoRemoveThunk,
} from "./store/reducers/todo/todo.reducer";
import {
    TODO_STATUS_OPEN,
    TODO_STATUS_DONE,
    TODO_ACTION_SORT,
} from './constants/todo';
import {
    get,
    groupBy,
} from 'lodash';

function sortByCreated(obj = {}, status) {
    return get(obj, status, []).sort((a,b)=>a.created > b.created ? -1 : 1)
}

function App(props) {
    const [task, setTask] = React.useState('');
    const [canAdd, setCanAdd] = React.useState(false);
    const [canRemove, setCanRemove] = React.useState(false);
    const [sortedTodos, setSortedTodos] = React.useState([]);
    const [sortedBy, setSortedBy] = React.useState("status");
    const [selected] = React.useState(new Map());
    const [anchorEl, setAnchorEl] = React.useState(null);

    const onChangeTask = e => {
        setTask(e.target.value);
    };

    const onAdd = () => {
        const message = task.trim();
        if(message) {
            props.addTodo(message);
            setTask('');
        }
    };

    const onClear = () => {
        setTask('');
    };

    const onKeyUp = e => {
        if (e.key === 'Enter') {
            onAdd();
        } else if (e.key === 'Escape') {
            onClear();
        }
    };

    const onSelect = (id, isChecked) => {
        if(isChecked) {
            const selectedTodo = props.todos.find(el=>el.id===id);
            selected.set(id, selectedTodo);
        } else if(selected.has(id)) {
            selected.delete(id);
        }
        setCanRemove(Boolean(selected.size));
        console.log(selected);
    };

    const onUpdate = (id, value, status) => {
        props.updateTodo({
            id,
            value,
            status,
        });
    };

    const onRemove = () => {
        const selectedIds = Array.from(selected.keys());
        props.removeTodo(selectedIds);
        setCanRemove(false);
    };

    const clickPopover = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closePopover = () => {
        setAnchorEl(null);
    };

    const setSortedGroup = (isReverse = false)=> {
        const groupedObject = groupBy(props.todos, sortedBy);
        const sortedTodos = [
            ...sortByCreated(groupedObject, isReverse ? TODO_STATUS_DONE : TODO_STATUS_OPEN),
            ...sortByCreated(groupedObject, isReverse ? TODO_STATUS_OPEN : TODO_STATUS_DONE),
        ];

        setSortedTodos(sortedTodos);
    };

    const fireAction = (type, isReverse) => (e) => {
        closePopover();
        switch(type) {
            case TODO_ACTION_SORT:
                setSortedGroup(isReverse);
                break;
            default:
                break;
        }
    };

    React.useEffect(()=>{
        props.fetchTodos();
        setCanAdd(Boolean(task));
        setCanRemove(Boolean(selected.size));
    }, []);

    React.useEffect(()=>{
        setCanAdd(!Boolean(task.trim()))
    }, [task]);

    React.useEffect(()=>{
        props.todos.forEach(el=>{
           if(el.status === TODO_STATUS_DONE) {
               if(!selected.has(el.id)) {
                    selected.set(el.id, el)
               }
           }
        });
        setCanRemove(Boolean(selected.size));
    }, [props.todos]);

    React.useEffect(()=>{
        setSortedGroup();
    }, [props.todos, sortedBy]);


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
            <MainLayout>
                <Typography variant="h4" component="h1" className="text-center">
                    TODO LIST
                </Typography>

                <Card className="d-flex justify-content-between p-2 mb-2">
                    <TextField
                        className="d-flex flex-grow-1"
                        label="Type your TODO"
                        variant="outlined"
                        type="text"
                        value={task}
                        onChange={onChangeTask}
                        onKeyUp={onKeyUp}
                        InputProps={{
                            endAdornment: (!canAdd ? <CloseIcon onClick={onClear} className="cursor-pointer" /> : '')
                        }}
                    />
                </Card>

                <Card className="p-2 mb-2">
                    <div className="d-flex justify-content-between align-content-center">

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={clickPopover}>
                            Actions
                        </Button>

                        <Button
                            className="mx-2 flex-grow-1"
                            variant="outlined"
                            color="primary"
                            size="small"
                            disabled={canAdd}
                            onClick={onAdd}
                        >Add
                        </Button>

                        <Button
                            className="mx-2 flex-grow-1"
                            variant="outlined"
                            color="secondary"
                            size="small"
                            disabled={!canRemove}
                            onClick={onRemove}
                        >Delete
                        </Button>
                    </div>
                </Card>

                <Card>
                    <TodoList
                        todos={sortedTodos}
                        select={onSelect}
                        update={onUpdate}
                    />
                </Card>

                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={closePopover}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Box className="p-0">
                        <List disabled={0}>

                            <ListItem
                                onClick={fireAction(TODO_ACTION_SORT, false)}
                                dense
                                divider
                                button
                                component="li"
                                className="cursor-pointer"
                            >
                                <p className="mb-0">Sort by OPEN</p>
                            </ListItem>

                            <ListItem
                                onClick={fireAction(TODO_ACTION_SORT, true)}
                                dense
                                divider
                                button
                                component="li"
                                className="cursor-pointer"
                            >
                                <p className="mb-0">Sort by DONE</p>
                            </ListItem>
                        </List>
                    </Box>
                </Popover>
            </MainLayout>
    )
}

const mapStateToProps = state => {
    return {
        todos: state.todo.todos,
    }
};

const mapDispatchToProps = (dispatch) => ({
    fetchTodos: ()=>dispatch(fetchTodosThunk()),
    updateTodo: (props)=>dispatch(todoUpdateThunk(props)),
    addTodo: (task)=>dispatch(todoAddThunk(task)),
    removeTodo: (ids)=>dispatch(todoRemoveThunk(ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
