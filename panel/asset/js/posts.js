let cards = document.querySelector('.cards');
let loader = document.querySelector("#loader");
let container = document.querySelector('.container');
let errorText = document.querySelector('.errorText');

// post connection:
let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get('userId');
fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(function (response) {
        return response.json()
    })
    .then(function (posts) {
        loader.style = "display:none";
        errorText.style = "display:none"
        container.style = "display:block";
        // posts:
        cards.innerHTML = '';
        for (let j = 0; j < posts.length; j++) {
            cards.innerHTML += `<div class="card post">
                            <div class="card-header post-h">
                                ${posts[j].userId}
                            </div>
                            <div class="card-body post-b">
                                <h5 class="card-title post-t">${posts[j].title}</h5>
                                <p class="card-text">${posts[j].body}</p>
                                <a class="btn btn-primary" userId=${posts[j].id}>Comments</a>
                            </div>
                        </div>`;
        }


        let btn = document.querySelectorAll('.btn');
        let modal = document.querySelector('.modal');
        let modalbody = document.querySelector('.modal-body');

        // comment connection:
        btn.forEach(item => {
            item.addEventListener('click', function () {
                
                let postId = item.getAttribute('userId');

                fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
                    .then(function (res) {
                        return res.json()
                    })
                    .then(function (comments) {
                        // comments:
                       for(let a=0; a<comments.length; a++){
                        modal.style.display = "block";
                        
                        modalbody.innerHTML += `  <div class="card text-center comment">
                        <div class="card-header">
                         ${comments[a].id}/ ${comments[a].name}
                        </div>
                        <div class="card-body">
                          <h5 class="card-text">${comments[a].body}</h5>
                        </div>
                        <div class="card-footer text-body-secondary">
                          ${comments[a].email}
                        </div>`;



                        // btn-close
                        let btnclose = modal.querySelectorAll('.btn-close');
                        for (let b = 0; b < btnclose.length; b++) {
                            btnclose[b].addEventListener('click', function () {
                                modal.style.display = "none";
                                modalbody.innerHTML="";
                            })
    
                        }
                       }
                        
                    })
            })
        })
    }).catch(function (error) {
        loader.style = "display:none";
        errorText.innerHTML = `${error}`;
    });

