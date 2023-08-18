let albumlink = document.querySelector('.albums');
let wrapper = document.querySelector('.wrapper');
let loader = document.querySelector("#loader");
let container = document.querySelector('.container');
let errorText = document.querySelector('.errorText');

//album connection:
let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get('userId');

fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
    .then(function (response) {
        return response.json()
    })
    .then(function (albums) {
        loader.style = "display:none";
        errorText.style = "display:none"
        container.style = "display:block";
        // albums:
        for (let k = 0; k < albums.length; k++) {
            wrapper.innerHTML += `<div class="card card1">
                                        <div class="card-body">
                                            <h5 class="card-title">${albums[k].userId}</h5>
                                            <p class="card-text">${albums[k].title}</p>
                                            <a class="btn btn-primary" userId=${albums[k].id}>Photos</a>
                                        </div>
                                    </div> `;
        }


        let showPhoto = wrapper.querySelectorAll('.btn');
        let modal = document.querySelector('.modal');
        let modalbody = document.querySelector('.modal-body');

        // photo connection:
        showPhoto.forEach(item => {
            item.addEventListener('click', function () {
                let albumId = item.getAttribute('userId'); 

                fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
                    .then(function (res) {
                        return res.json()
                    })
                    .then(function (photos) {
                        // photos:
                        for(let a=0; a<photos.length; a++){
                            modal.style.display= "block";

                            modalbody.innerHTML += `  <div class="card2 text-center">
                            <div class="card-header">
                            <h5 class="card-text">${a+1}</h5>
                            </div>
                            <div class="card-body photos">
                            <img src="${photos[a].url}" alt="">
                            </div>
                            <div class="card-footer text-body-secondary">
                            <h5 class="card-text">${photos[a].title}</h5>
                            </div>
                            </div>`;
    
    
    
    
    
                            // btn-close:
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
        });

    }).catch(function (error) {
        loader.style = "display:none";
        errorText.innerHTML = `${error}`;
    });


