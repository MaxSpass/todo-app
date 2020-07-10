import {
    TODO_PREFIX,
} from "../constants/todo";

import {uniqueId} from "lodash";

const TODO_MOCH = [
    {
        id: uniqueId(TODO_PREFIX),
        status: 'done', // done | open
        task: 'Complete the task 4',
        created: Date.now() + 4,
    },
    {
        id: uniqueId(TODO_PREFIX),
        status: 'open', // done | open
        task: 'Complete the task 1',
        created: Date.now() + 1,
    },
    {
        id: uniqueId(TODO_PREFIX),
        status: 'open', // done | open
        task: 'Complete the task 2',
        created: Date.now() + 2,
    },
    {
        id: uniqueId(TODO_PREFIX),
        status: 'open', // done | open
        task: 'Complete the task 3',
        created: Date.now() + 3,
    },
];

export default {
    todos: TODO_MOCH,
};