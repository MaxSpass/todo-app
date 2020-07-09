import {uniqueId} from 'lodash';

const TODO_FETCH_START = "TODO_FETCH_START";
const TODO_FETCH_COMPLETED = "TODO_FETCH_COMPLETED";
const TODO_FETCH_ERROR = "TODO_FETCH_ERROR";
const TODO_ADD = "TODO_ADD";
const TODO_REMOVE = "TODO_REMOVE";
const TODO_UPDATE = "TODO_UPDATE";

const TODO_PREFIX = "todo_";

const INITIAL_STATE = ()=>({
    todos: [
        {
            id: uniqueId(TODO_PREFIX),
            status: 'active', // active | completed | done
            task: 'Complete the task',
            // isChecked: false, //@TODO ???
        }
    ],
    isLoading: false,
    error: null,
});

const initialState = INITIAL_STATE();

export default (state = initialState, {type, payload}) => {
    switch(type) {
        case TODO_FETCH_START:
            state = {
                ...state,
                isLoading: true,
            };
            break;
        case TODO_FETCH_COMPLETED:
            state = {
                ...state,
                isLoading: false,
                todos: [...state.todos, ...payload.todos], //@TODO Should implement
            };
            break;
        case TODO_FETCH_ERROR:
            state = {
                ...state,
                isLoading: false,
                error: payload.text, //@TODO Should implement
            };
            break;
        case TODO_ADD:
            state = {
              ...state,
              todos: [...state.todos, payload]  //@TODO Should implement
            };
            break;
        case TODO_REMOVE:
            //@TODO Should implement
            break;
        case TODO_UPDATE:
            //@TODO Should implement
            break;
        default:
            break;
    }
    return state;
};