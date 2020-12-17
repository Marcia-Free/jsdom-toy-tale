const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const collection = document.querySelector('#toy-collection')
const toyURL = 'http://localhost:3000/toys'
let addToy = false;


document.addEventListener("DOMContentLoaded", () => {

  addBtn.addEventListener("click", () => {
    

    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";

      toyFormContainer.addEventListener('submit', (event) => {
        event.preventDefault()
        postToy(event.target)
      })

    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetchToys()
});
//FETCH----------------------------------------------------------------
function fetchToys() {
  fetch(toyURL)
  .then(response => response.json())
  .then(toy => {
    toy.forEach(toy => addToys(toy))
  })
}
//POST----------------------------------------------------------------
function postToy(toyData) {
  fetch(toyURL, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: toyData.name.value,
      image: toyData.image.value,
      likes: 0
    })
  })
  .then(response => response.json())
  .then(toy => {
    let newToy = addToys(toy)
  })
}
//ADD DATA------------------------------------------------------------
function addToys(toyData) {

  card = document.createElement('div')
  card.setAttribute('class', 'card')

  h2 = document.createElement('h2')
  h2.textContent = toyData.name

  img = document.createElement('img')
  img.setAttribute('class', 'toy-avatar')
  img.setAttribute('src', toyData.image)

  p = document.createElement('p')
  p.textContent = `${toyData.likes} Likes`

  //Like BUTTON--------------------------
  btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toyData.id)
  btn.textContent = 'Like <3'

  btn.addEventListener('click', (event) => {
    let toyId = event.target.id
    let toyLikes = event.target.previousElementSibling.textContent
    let updatedLike = parseInt(toyLikes)
    updatedLike++

    fetch(`${toyURL}/${toyId}`, {
      method: 'PATCH',
      headers:  { "Content-Type": "application/json" },
      body: JSON.stringify({
        likes: updatedLike
      })
    })
     toyLikes = `${updatedLike} Likes`
  })
//--------------------------------------
  collection.append(card)
  card.append(h2,img,p,btn)
}