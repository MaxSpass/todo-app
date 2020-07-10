//prefix
const TODO_PREFIX = "todo_";

//reducer action types
const TODO_FETCH_START = "TODO_FETCH_START";
const TODO_FETCH_SUCCESS = "TODO_FETCH_SUCCESS";
const TODO_FETCH_ERROR = "TODO_FETCH_ERROR";
const TODO_ADD = "TODO_ADD";
const TODO_REMOVE = "TODO_REMOVE";
const TODO_UPDATE = "TODO_UPDATE";

//statuses
const TODO_STATUS_OPEN = "open";
const TODO_STATUS_DONE = "done";

//private action types
const TODO_ACTION_SELECT = "select";
const TODO_ACTION_SORT = "sort";
const TODO_ACTION_DELETE = "delete";

export {
    TODO_PREFIX,

    TODO_FETCH_START,
    TODO_FETCH_SUCCESS,
    TODO_FETCH_ERROR,
    TODO_ADD,
    TODO_REMOVE,
    TODO_UPDATE,

    TODO_STATUS_DONE,
    TODO_STATUS_OPEN,

    TODO_ACTION_SELECT,
    TODO_ACTION_SORT,
    TODO_ACTION_DELETE,
}