import { 
    checkAuth, 
    createTodo, 
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos, 
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // on submit, create a todo, reset the form, and display the todos
    const data = new FormData(todoForm);

    await createTodo({
        item: data.get('item'),
    });

    todoForm.reset();

    await displayTodos();

});

async function displayTodos() {
    toggleLoadingSpinner();

    todosEl.textContent = '';

    const todoList = await getTodos();

    // fetch the todos
    // display the list of todos
    // be sure to give each todo an event listener
    // on click, complete that todo
    for (let todoItem of todoList) {
        const todoItemEl = document.createElement('p');

        todoItemEl.classList.add('todo-item');
        todoItemEl.textContent = `${todoItem.todo}`;

        if (todoItem.complete) {
            todoItemEl.classList.add('complete');
        } else {
            todoItemEl.addEventListener('click', async () => {

                await completeTodo(todoItem.id);
    
                displayTodos();
            });
        }
    } 
}

// add an on load listener that fetches and displays todos on load

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async () => {
    // delete all todos
    await deleteAllTodos();

    // then refetch and display the updated list of todos
    await displayTodos();
});
