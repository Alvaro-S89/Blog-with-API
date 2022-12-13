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
const modalBody = document.querySelector(".modal-body");
//listener
window.addEventListener("load", showPosts);

//Funciones
function showPosts() {
  fetch("http://localhost:3000/posts")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((post) => {
        let card = document.createElement("div");
        card.className =
          "card text-white bg-dark m-3 p-3 d-flex flex-column justify-content-between align-items-center";
        let cardTitle = document.createElement("h6");
        cardTitle.className = "card-title mt-3 text-center";
        cardTitle.innerText = post.title;
        let randomImg = document.createElement("img");
        randomImg.src = imgArray[Math.floor(Math.random() * 6)];
        let btn = document.createElement("button");
        btn.className = "btn btn-dark";
        btn.setAttribute("type", "button");
        btn.setAttribute("data-bs-toggle", "modal");
        btn.setAttribute("data-bs-target", "#exampleModal");
        btn.name = post.id;
        btn.addEventListener("click", changeModalInfo);

        card.appendChild(randomImg);
        card.appendChild(cardTitle);
        card.appendChild(btn);
        mainContainer.appendChild(card);
      });
    });
}

function changeModalInfo(e) {
  fetch(`http://localhost:3000/posts/${e.target.name}`)
    .then((res) => res.json())
    .then((data) => {
      modalTitle.textContent = data.title;
      modalBody.textContent = data.body;
    });
}
