import {
    TODO_PREFIX,
} from "../constants/todo";

import {uniqueId} from "lodash";

const TODO_MOCH = [
    {
        id: uniqueId(TODO_PREFIX),
        status: 'active', // active | completed | done
        task: 'Complete the task 1',
    },
    {
        id: uniqueId(TODO_PREFIX),
        status: 'active', // active | completed | done
        task: 'Complete the task 2',
    },
    {
        id: uniqueId(TODO_PREFIX),
        status: 'active', // active | completed | done
        task: 'Complete the task 3',
    },
];

export default {
    todos: TODO_MOCH,
};