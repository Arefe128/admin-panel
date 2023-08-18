let loader = document.querySelector("#loader");
let container = document.querySelector('.container');
let errorText = document.querySelector('.errorText');

fetch("https://jsonplaceholder.typicode.com/users")
    .then(function (response) {
        return response.json();
    })
    .then(function (users) {
        loader.style = "display:none";
        errorText.style = "display:none"
        container.style = "display:block";
        let rows = document.querySelector('#rows');
        // users:
        for (let i = 0; i < users.length; i++) {
            rows.innerHTML += `<tr>
                <th scope="row">${users[i].username}</th>
                <td>${users[i].name}</td>
                <td>${users[i].email}</td>
                <td>
                    <div class="btn-group dropstart">
                        <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Details
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item userinfo" href="#${users[i].id}">User info</a></li>
                            <li><a class="dropdown-item posts" href="posts.html?userId=${users[i].id}">Posts</a></li>
                            <li><a class="dropdown-item albums" href="albums.html?userId=${users[i].id}">Albums</a></li>
                            <li><a class="dropdown-item toDos" href="toDos.html?userId=${users[i].id}">To Dos</a></li>
                        </ul>
                    </div>
                </td>
            </tr>`;


            let userinfo = rows.querySelectorAll('.userinfo');
            let modal = document.querySelector('.modal');
            // user-info:
            for (let a = 0; a < userinfo.length; a++) {
                userinfo[a].addEventListener('click', function showinfo() {
                    modal.innerHTML = '';
                    modal.style.display = "block";

                    modal.innerHTML += `<div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">${users[a].name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <p>address:
                    ${users[a].address.street}/
                    ${users[a].address.suite}/
                    ${users[a].address.city}</p>
                    <p>Phone:${users[a].phone}</p>
                    <p>WebSite:${users[a].website}</p>
                    <p>Company:name:(${users[a].company.name})/
                    ${users[a].company.catchPhrase}</p>
                  </div>
                  
                </div>
              </div>`;

                    // btn-close:
                    let btn = modal.querySelectorAll('.btn-close');
                    for (let b = 0; b < btn.length; b++) {
                        btn[b].addEventListener('click', function () {
                            modal.style.display = "none";
                        })

                    }
                })
            }
        }






    }).catch(function (error) {
        loader.style = "display:none";
        errorText.innerHTML = `${error}`;
    })


