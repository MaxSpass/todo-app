import {
    TODO_FETCH_START,
    TODO_FETCH_SUCCESS,
    TODO_FETCH_ERROR,
    TODO_ADD,
    TODO_REMOVE,
    TODO_TOGGLE,
    TODO_UPDATE,
    TODO_PREFIX,
} from '../../../constants/todo/index';
import {
    fetchTodos,
} from '../../../api/todo/index';
import {
    uniqueId,
    cloneDeep,
} from 'lodash';

const INITIAL_STATE = ()=>({
    todos: [],
    selected: new Map(),
    isLoading: false,
    error: null,
});

const initialState = INITIAL_STATE();

const todoFetchStartAC = payload => ({
    type: TODO_FETCH_START,
    payload,
});

const todoFetchSuccessAC = payload => ({
    type: TODO_FETCH_SUCCESS,
    payload,
});

const todoFetchErrorAC = payload => ({
    type: TODO_FETCH_ERROR,
    payload,
});

const todoSelectAC = payload => ({
    type: TODO_TOGGLE,
    payload,
});

const todoUpdateAC = payload => ({
    type: TODO_UPDATE,
    payload,
});

const todoAddAC = payload => ({
   type: TODO_ADD,
   payload,
});

const todoRemoveAC = payload => ({
   type: TODO_REMOVE,
   payload,
});

export const fetchTodosThunk = () => dispatch => {
    dispatch(todoFetchStartAC(true));
    return fetchTodos()
        .then(({todos})=>{
            dispatch(todoFetchSuccessAC(todos));
        })
        .catch(err => {
            dispatch(todoFetchErrorAC(err));
        })
        .finally(()=>{
            dispatch(todoFetchStartAC(false));
        })
};

export const todoSelectThunk = payload => dispatch => {
    dispatch(todoSelectAC(payload))
};

export const todoUpdateThunk = payload => dispatch => {
    dispatch(todoUpdateAC(payload))
};

export const todoAddThunk = payload => dispatch => {
    dispatch(todoAddAC(payload))
};

export const todoRemoveThunk = payload => dispatch => {
    dispatch(todoRemoveAC(payload))
};

export default (state = initialState, {type, payload}) => {
    switch(type) {
        case TODO_FETCH_START:
            state = {
                ...state,
                isLoading: payload,
            };
            break;
        case TODO_FETCH_SUCCESS:
            state = {
                ...state,
                todos: payload.map(el=>{
                    el.select = false;
                    return el;
                }),
            };
            break;
        case TODO_FETCH_ERROR:
            state = {
                ...state,
                error: payload.text,
            };
            break;
        case TODO_ADD:
            state = {
              ...state,
              todos: state.todos.concat([{
                      id: uniqueId(TODO_PREFIX),
                      status: 'open',
                      task: payload,
                      selected: false,
                  }])
            };
            break;
        case TODO_REMOVE:
            const ids = Array.from(state.selected.keys());
            const newTodoArray = state.todos.filter(el=>{
                return ids.some(id=>id!==el.id);
            });

            state = {
                ...state,
                todos: newTodoArray,
                selected: new Map(),
            };

            break;
        case TODO_TOGGLE:
            console.log('TODO_TOGGLE', payload);
            const {id: taskId, value: checked} = payload;
            // payload: object<id, value>,

            if(checked) {
                const selectedTodo = cloneDeep(state.todos.find(el=>el.id===taskId));
                if(state.selected) {
                    state.selected.set(taskId, selectedTodo);
                }
            } else if(state.selected.has(taskId)) {
                state.selected.delete(taskId);
            }

            state = {
                ...cloneDeep(state),
            };
            break;
        case TODO_UPDATE:
            console.log('TODO_UPDATE', payload);
            const {id, value} = payload;
            const updatedTodos = state.todos.map(el=>{
                if(el=>el.id === id) {
                    el.task = value;
                }
                return el;
            });

            state = {
                ...state,
                todos: [
                    ...updatedTodos,
                ]
            };
            break;
        default:
            break;
    }
    // console.log(state.selected);
    return state;
};