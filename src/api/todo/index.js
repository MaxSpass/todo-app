//@TODO Should replace on truly API
import todoData from '../../_moch/todo';

export const fetchTodos = (props) => {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({
                todos: todoData.todos,
            });
            return;
        }, 1000)
    })
};