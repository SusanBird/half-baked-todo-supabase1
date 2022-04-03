import { 
    checkAuth, 
    createTodo, 
    // completeTodo,
    // getTodos,
    logout,
    deleteAllTodos, 
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');
const loadingEl = document.querySelector('.loading-spinner');


todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // on submit, create a todo, reset the form, and display the todos
    const data = new FormData(todoForm);

    await createTodo({
        item: data.get('todo'),
    });

    todoForm.reset();

    await displayTodos();

});

async function displayTodos() {
    toggleLoadingSpinner();

    todosEl.textContent = '';

    renderTodo();

    // const todoList = await getTodos();

    // for (let todoItem of todoList) {
    //     const todoItemEl = document.createElement('p');

    //     todoItemEl.classList.add('todo-item');
    //     todoItemEl.textContent = `${todoItem.todo}`;

    //     if (todoItem.complete) {
    //         todoItemEl.classList.add('complete');
    //     } else {
    //         todoItemEl.addEventListener('click', async () => {

    //             await completeTodo(todoItem.id);
    
    //             displayTodos();
    //         });
    //     }
    //     todosEl.append(todoItemEl);
    // } 

    toggleLoadingSpinner();
}

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async () => {
    await deleteAllTodos();

    await displayTodos();
});

function toggleLoadingSpinner() {
    loadingEl.classList.toggle('invisible');
}

window.addEventListener('load', () => {
    displayTodos();
});