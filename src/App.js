import React from 'react';
import MainLayout from "./layouts/main.layout";
import TodoList from "./components/todo/TodoList";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import {
    fetchTodosThunk,
    todoSelectThunk,
    todoUpdateThunk,
    todoAddThunk,
    todoRemoveThunk,
} from "./store/reducers/todo/todo.reducer";
import {
    get,
} from 'lodash';

function App(props) {
    //@TODO ???
    const [todos, setTodos] = React.useState([]);
    const [task, setTask] = React.useState('');

    React.useEffect(()=>{
        props.fetchTodos();
    }, []);

    React.useEffect(()=>{
        setTodos(props.todos)
    }, [props.todos]);

    const onChangeTask = e => {
        setTask(e.target.value);
    };

    const onAdd = () => {
        const message = task.trim();
        if(message) {
            props.addTodo(task);
            setTask('');
        }
    };

    const onClear = () => {
        setTask('');
    };

    const onSelect = (id) => (event) => {
        console.log('selected', id);
        props.selectTodo({
            id,
            value: event.target.checked,
        });
    };

    const onUpdate = (id, value) => {
        props.updateTodo({
            id,
            value,
        });
    };

    const onRemove = () => {
        //@TODO
        props.removeTodo();
    };

    return (
        <MainLayout>
            <TextField
                id="time"
                type="text"
                value={task}
                onChange={onChangeTask}
            />
            <Button variant="contained" color="primary" onClick={onAdd}>
                Add
            </Button>
            <Button variant="contained" color="secondary" onClick={onClear}>
                Clear
            </Button>
            <Button variant="contained" disabled={!props.hasSelected} onClick={onRemove}>
                Remove
            </Button>
            <TodoList
                todos={todos}
                select={onSelect}
                update={onUpdate}
            />
        </MainLayout>
    )
}

const mapStateToProps = state => {
    return {
        todos: state.todo.todos,
        hasSelected: get(state, 'todo.selected.size', false),
    }
};

const mapDispatchToProps = (dispatch) => ({
    fetchTodos: ()=>dispatch(fetchTodosThunk()),
    selectTodo: (props)=>dispatch(todoSelectThunk(props)),
    updateTodo: (props)=>dispatch(todoUpdateThunk(props)),
    addTodo: (task)=>dispatch(todoAddThunk(task)),
    removeTodo: ()=>dispatch(todoRemoveThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
