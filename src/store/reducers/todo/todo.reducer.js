import {
    TODO_FETCH_START,
    TODO_FETCH_SUCCESS,
    TODO_FETCH_ERROR,
    TODO_ADD,
    TODO_REMOVE,
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
    console.log(`ACTION: ${type}`, payload);
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
                todos: payload,
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
                created: Date.now()
              }])
            };
            break;
        case TODO_REMOVE:
            console.log(payload)
            const newTodoArray = state.todos.filter(el=>{
                return payload.indexOf(el.id) === -1;
            });

            state = {
                ...state,
                todos: newTodoArray,
            };

            break;
        case TODO_UPDATE:
            {
                const {id, value, status} = payload;
                const updatedIndex = state.todos.findIndex(el=>el.id===id);
                const findedTodo = cloneDeep(state.todos[updatedIndex]);
                if(findedTodo) {
                    findedTodo.task = value;
                    findedTodo.status = status;
                    state.todos[updatedIndex] = findedTodo;
                }
                state = {
                    ...state,
                    todos: [
                        ...state.todos,
                    ]
                };
            }
            break;
        default:
            break;
    }
    // console.log(state.selected);
    return state;
};