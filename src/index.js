let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })
  fetchingToys();
  addNewToy();
});

function fetchingToys(){
fetch('http://localhost:3000/toys')
.then(resp => resp.json())
.then(json => renderToys(json))
}

function renderToys(toys){
  toys.forEach(toy => addingToysToTheDOM(toy))
}

function addNewToy(){
  const createToy = document.getElementsByClassName('add-toy-form');
  const imageInput = document.getElementsByClassName('input-text').image;
  const nameInput = document.getElementsByClassName('input-text').name;
  
  createToy[0].addEventListener('submit', (e)=>{
    e.preventDefault();
    postToy();
  })
  function postToy(){
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers:
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
  
      body: JSON.stringify({
        "name": nameInput.value,
        "image": imageInput.value,
        "likes": 0
      })
    })
    .then(response => response.json())
    .then(data => addingToysToTheDOM(data))
}}

function addingToysToTheDOM(toy){
  let toyCollection = document.getElementById('toy-collection');
  const toyName = document.createElement('h2');
  toyName.innerHTML =  toy.name;

  const toyImgUrl = toy.image;
  const toyImage = document.createElement('img');
  toyImage.src = toyImgUrl;
  toyImage.setAttribute('class', 'toy-avatar');

  const toyLikes = document.createElement('p');
  toyLikes.setAttribute('id', 'toyLikes');
  toyLikes.innerHTML = (toy.likes + ' likes');

  const likeButton = document.createElement('button');
  const toyId = toy.id
  likeButton.setAttribute('class', 'like-btn');
  likeButton.setAttribute('id', toyId);
  likeButton.innerHTML = 'Like <3';
  likeButton.addEventListener('click', (e)=>{
    e.preventDefault();
    toyLikes.innerHTML = ((++toy.likes) + ' likes');
    updateLikes(toy);
  })

  const card = document.createElement('div');
  card.setAttribute('class', 'card');
  card.appendChild(toyName);
  card.appendChild(toyImage);
  card.appendChild(toyLikes);
  card.appendChild(likeButton);
  toyCollection.appendChild(card);
}

function updateLikes(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers:
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toy)
  })
  .then(response => response.json())
}