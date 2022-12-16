const mainContainer = document.querySelector("main");
const imgArray = [
  "https://i.picsum.photos/id/134/200/200.jpg?grayscale&hmac=06cZ73xS2DcfYmmDSjmbVvSGMC6_oLSnbTzLS4xR_1U",
  "https://i.picsum.photos/id/300/200/200.jpg?grayscale&hmac=XCSFoDItER-rbAfbBlr7c53bbIVIVo6yXW4D3dv7U0g",
  "https://i.picsum.photos/id/71/200/200.jpg?grayscale&hmac=QhwCD9q0EbjS5yrZaMEo1zwBuUi1wT812zfaL5tjdfw",
  "https://i.picsum.photos/id/839/200/200.jpg?grayscale&hmac=7FQWdryAiUvsWgurgy4q6fV8iy1-HKJ__zbRknDR6wo",
  "https://i.picsum.photos/id/622/200/200.jpg?grayscale&hmac=TmLiSYWQWsyUTDC4cvFwbArv_ztS2bDYCX3jxLFDEMU",
  "https://i.picsum.photos/id/614/200/200.jpg?grayscale&hmac=XfA48uYoXsZ4Y4dxYObar_KcErzHP8nqiuaJ8m4VMPo",
  "https://i.picsum.photos/id/733/200/200.jpg?grayscale&hmac=er-gJ5Di46YLT2VImQX_jykku5H8DkiR4qv6n_qqn04",
  "https://i.picsum.photos/id/527/200/200.jpg?grayscale&hmac=VvBplTSOf9mAoEqOtqBiPUqdMAINXwCXjxUnvwJzI1c",
  "https://i.picsum.photos/id/661/200/200.jpg?grayscale&hmac=vENJQzR8C1nzC-K_wzN6ja25zk3rAhMxDkVw-rl1j1Q",
  "https://i.picsum.photos/id/722/200/200.jpg?grayscale&hmac=UW52JwWLiUdY8KK5DzLavBcpdwHfFndEwdIckBBHTh4",
  "https://i.picsum.photos/id/476/200/200.jpg?grayscale&hmac=S3yeLwj-M8QC_5OjUCxs1WrMlTB9W-U8qd-SaxAosd0",
  "https://i.picsum.photos/id/466/200/200.jpg?grayscale&hmac=oz_ngvTVl5sxphXi_JPaiRGraGy_YjUknacJqnvrHi8",
];

const userEmail = document.querySelector(".user-email");
const editBtn = document.querySelector(".editBtn");
const titleModalInput = document.getElementById("titleModalInput");
const bodyModalInput = document.getElementById("bodyModalInput");
const saveChangesBtn = document.querySelector(".saveChangesBtn");
const btnClose = document.querySelector(".btn-close");
const modal = document.getElementById("postModal");
const deleteBtn = document.querySelector(".deleteBtn");
const confirmDeletePost = document.querySelector(".confirmDeletePost");
const commentSection = document.querySelector(".accordion-body");
const collapseTwo = document.getElementById("collapseTwo");
const accordionButton = document.querySelector(".accordion-button");

let openedPost = {};
let openedPostId;
let card;

//listeners
window.addEventListener("load", showPosts);
editBtn.addEventListener("click", editPost);
saveChangesBtn.addEventListener("click", saveChangesPost);
modal.addEventListener("hidden.bs.modal", closeModal);
confirmDeletePost.addEventListener("click", deletePost);
btnClose.addEventListener("click", removeComments);
deleteBtn.addEventListener("click", closeComments);

//Functions
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
        randomImg.src = imgArray[Math.floor(Math.random() * 12)];
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
      openedPostId = data.id;
      openedPost = {
        userId: data.userId,
        id: data.id,
        title: data.title,
        body: data.body,
      };
      titleModalInput.value = data.title;
      bodyModalInput.value = data.body;
      fetch(`http://localhost:3000/users/${data.userId}`)
        .then((res) => res.json())
        .then((data) => {
          userEmail.innerHTML = `<h5>${data.username}</h5><h6>${data.email}</h6>`;
        });
      fetch("http://localhost:3000/comments")
        .then((res) => res.json())
        .then((data) => {
          let filteredComments = data.filter((comment) => {
            return comment.postId === openedPostId;
          });
          for (let i = 0; i < filteredComments.length; i++) {
            let containerPost = document.createElement("div");
            let name = document.createElement("h6");
            let body = document.createElement("p");
            let email = document.createElement("p");
            let br = document.createElement("br");
            name.textContent = filteredComments[i].name;
            containerPost.appendChild(name);
            body.textContent = filteredComments[i].body;
            containerPost.appendChild(body);
            email.textContent = filteredComments[i].email;
            containerPost.appendChild(email);
            commentSection.appendChild(containerPost);
            commentSection.appendChild(br);
          }
        });
    })
    .catch((error) => console.error(error));
}

function editPost() {
  titleModalInput.disabled = false;
  bodyModalInput.disabled = false;
  saveChangesBtn.className = "btn btn-warning saveChangesBtn visible";
  editBtn.className = "btn btn-ligth editBtn disabled";
  deleteBtn.className = "btn btn-ligth editBtn disabled";
}

function saveChangesPost() {
  let newTitle = titleModalInput.value;
  let newBody = bodyModalInput.value;
  fetch(`http://localhost:3000/posts/${openedPostId}`, {
    method: "PUT",
    body: JSON.stringify({
      ...openedPost,
      title: newTitle,
      body: newBody,
    }),
    headers: {
      "content-type": "application/json",
    },
  }).catch((error) => console.error(error));
  let titleToChange = document.querySelector(`h6[name="${openedPostId}"]`);
  titleToChange.innerText = newTitle;
  titleModalInput.disabled = true;
  bodyModalInput.disabled = true;
  saveChangesBtn.className = "btn btn-warning saveChangesBtn invisible";
  editBtn.className = "btn btn-outline-warning editBtn";
  deleteBtn.className = "btn btn-outline-warning deleteBtn";
}

function closeModal(e) {
  titleModalInput.disabled = true;
  bodyModalInput.disabled = true;
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
        commentSection.innerHTML = "";
      }
    })
    .catch((error) => console.error(error));
}

//nuevo

function removeComments() {
  commentSection.innerHTML = "";
  closeComments();
}
function closeComments() {
  collapseTwo.classList.remove("show");
  accordionButton.classList.add("collapsed");
}
