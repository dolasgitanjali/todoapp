document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    // Load saved todos from localStorage
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach(todo => {
        addTodoToDOM(todo.text, todo.completed);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTodoText = input.value.trim();
        if (newTodoText !== '') {
            addTodoToDOM(newTodoText, false);
            saveTodos();
            input.value = '';
        }
    });

    list.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            e.target.parentElement.remove();
            saveTodos();
        } else if (e.target.tagName === 'LI') {
            e.target.classList.toggle('completed');
            saveTodos();
        }
    });

    function addTodoToDOM(text, completed) {
        const li = document.createElement('li');
        li.textContent = text;
        if (completed) {
            li.classList.add('completed');
        }
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        li.appendChild(deleteButton);
        list.appendChild(li);
    }

    function saveTodos() {
        const todos = [];
        list.querySelectorAll('li').forEach(todo => {
            todos.push({
                text: todo.firstChild.textContent,
                completed: todo.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});


