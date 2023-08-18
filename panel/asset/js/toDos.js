let wrapper = document.querySelector('.container');
let toDoslink = document.querySelector('.toDos');
let loader = document.querySelector("#loader");
let container = document.querySelector('.container');
let errorText = document.querySelector('.errorText');

// connection:
let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get('userId');

fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
    .then(function (response) {
        return response.json()
    })
    .then(function (todos) {
        loader.style = "display:none";
        errorText.style = "display:none"
        container.style = "display:flex";
        // cards:
        wrapper.innerHTML = '';
        for (let z = 0; z < todos.length; z++) {
            wrapper.innerHTML += `<div class="card text-center col-lg-2 col-md-3">
            <div class="card-header">
                ${todos[z].userId}
            </div>
            <div class="card-body">
                <h5 class="card-text">${todos[z].title}</h5>
            </div>
            <div class="card-footer text-body-secondary">
            ${todos[z].completed}
            </div>
        </div>`;
        }
    }).catch(function (error) {
        loader.style = "display:none";
        errorText.innerHTML = `${error}`;
    });