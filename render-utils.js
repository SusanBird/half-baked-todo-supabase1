import {
    completeTodo,
    getTodos,
} from '/fetch-utils.js';


import {
    displayTodos
} from './todos';

export async function renderTodo() {
    

//     // create a div and a p tag
//     // depending on whether the todo is complete, give the div the appropriate css class ('complete' or 'incomplete')

//     // add the 'todo' css class no matter what

//     // put the todo's text into the p tag

//     // append stuff

//     // return the div

    const todoList = await getTodos();
    const todosEl = document.querySelector('.todos');


    for (let todoItem of todoList) {
        const todoItemEl = document.createElement('p');

        todoItemEl.classList.add('todo');
        todoItemEl.textContent = `${todoItem.todo}`;

        if (todoItem.complete) {
            todoItemEl.classList.add('complete');
        } else {
            todoItemEl.addEventListener('click', async () => {

                await completeTodo(todoItem.id);

                displayTodos();
            });
        }
        todosEl.append(todoItemEl);
        return todosEl;
    } 
}