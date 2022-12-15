//Variables
const mainContainer = document.querySelector("main");
const imgArray = [
  "https://i.picsum.photos/id/134/200/200.jpg?grayscale&hmac=06cZ73xS2DcfYmmDSjmbVvSGMC6_oLSnbTzLS4xR_1U",
  "https://i.picsum.photos/id/300/200/200.jpg?grayscale&hmac=XCSFoDItER-rbAfbBlr7c53bbIVIVo6yXW4D3dv7U0g",
  "https://i.picsum.photos/id/71/200/200.jpg?grayscale&hmac=QhwCD9q0EbjS5yrZaMEo1zwBuUi1wT812zfaL5tjdfw",
  "https://i.picsum.photos/id/839/200/200.jpg?grayscale&hmac=7FQWdryAiUvsWgurgy4q6fV8iy1-HKJ__zbRknDR6wo",
  "https://i.picsum.photos/id/622/200/200.jpg?grayscale&hmac=TmLiSYWQWsyUTDC4cvFwbArv_ztS2bDYCX3jxLFDEMU",
  "https://i.picsum.photos/id/614/200/200.jpg?grayscale&hmac=XfA48uYoXsZ4Y4dxYObar_KcErzHP8nqiuaJ8m4VMPo",
];
const modalTitle = document.querySelector(".modal-title");
const modalBody = document.querySelector(".post-body");
const userEmail = document.querySelector(".user-email");
const editBtn = document.querySelector(".editBtn");
const titleModalInput = document.getElementById("titleModalInput");
const saveChangesBtn = document.querySelector(".saveChangesBtn");
const btnClose = document.querySelector(".btn-close");
const modal = document.getElementById("postModal");
const deleteBtn = document.querySelector(".deleteBtn");
const confirmDeletePost = document.querySelector(".confirmDeletePost");
let openedPost = {};
let openedPostId;
let card;

//listener
window.addEventListener("load", showPosts);
editBtn.addEventListener("click", editPost);
saveChangesBtn.addEventListener("click", saveChangesPost);
modal.addEventListener("hidden.bs.modal", closeModal);
confirmDeletePost.addEventListener("click", deletePost);

//Funciones
function showPosts() {
  fetch("http://localhost:3000/posts")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((post) => {
        card = document.createElement("div");
        card.className =
          "card text-white bg-dark m-3 p-3 d-flex flex-column justify-content-between align-items-center";
        card.setAttribute("name", post.id);
        let cardTitle = document.createElement("h6");
        cardTitle.className = "card-title mt-3 text-center";
        cardTitle.innerText = post.title;
        cardTitle.setAttribute("name", post.id);
        let randomImg = document.createElement("img");
        randomImg.src = imgArray[Math.floor(Math.random() * 6)];
        let btn = document.createElement("button");
        btn.className = "btn btn-outline-warning btn-card py-0 px-2 mt-2";
        btn.setAttribute("type", "button");
        btn.setAttribute("data-bs-toggle", "modal");
        btn.setAttribute("data-bs-target", "#postModal");
        btn.innerText = "+ info";
        btn.name = post.id;
        btn.addEventListener("click", changeModalInfo);
        card.appendChild(randomImg);
        card.appendChild(cardTitle);
        card.appendChild(btn);
        mainContainer.appendChild(card);
      });
    })
    .catch((error) => console.error(error));
}

function changeModalInfo(e) {
  fetch(`http://localhost:3000/posts/${e.target.name}`)
    .then((res) => res.json())
    .then((data) => {
      modalTitle.value = data.title;
      modalBody.textContent = data.body;
      openedPostId = data.id;
      openedPost = {
        userId: data.userId,
        id: data.id,
        title: data.title,
        body: data.body,
      };
      titleModalInput.value = data.title;
      fetch(`http://localhost:3000/users/${data.userId}`)
        .then((res) => res.json())
        .then((data) => {
          userEmail.innerHTML = `<h5>${data.username}</h5><h6>${data.email}</h6>`;
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
}

function editPost() {
  titleModalInput.disabled = false;
  saveChangesBtn.className = "btn btn-warning saveChangesBtn visible";
  editBtn.className = "btn btn-ligth editBtn disabled";
  deleteBtn.className = "btn btn-ligth editBtn disabled";
}

function saveChangesPost() {
  let newTitle = titleModalInput.value;
  fetch(`http://localhost:3000/posts/${openedPostId}`, {
    method: "PUT",
    body: JSON.stringify({
      ...openedPost,
      title: newTitle,
    }),
    headers: {
      "content-type": "application/json",
    },
  }).catch((error) => console.error(error));
  let titleToChange = document.querySelector(`h6[name="${openedPostId}"]`);
  titleToChange.innerText = newTitle;
  titleModalInput.disabled = true;
  saveChangesBtn.className = "btn btn-warning saveChangesBtn invisible";
  editBtn.className = "btn btn-outline-warning editBtn";
  deleteBtn.className = "btn btn-outline-warning deleteBtn";
}

function closeModal() {
  titleModalInput.disabled = true;
  saveChangesBtn.className = "btn btn-secondary saveChangesBtn invisible";
  editBtn.className = "btn btn-outline-warning editBtn";
  deleteBtn.className = "btn btn-outline-warning deleteBtn";
}

function deletePost() {
  let cardToDelete = document.querySelector(`div[name="${openedPostId}"]`);

  fetch(`http://localhost:3000/posts/${openedPostId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        mainContainer.removeChild(cardToDelete);
      }
    })
    .catch((error) => console.error(error));
}
