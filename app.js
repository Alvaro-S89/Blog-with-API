//Variables
let mainContainer = document.querySelector("main")
let imgArray = ["https://i.picsum.photos/id/134/200/200.jpg?grayscale&hmac=06cZ73xS2DcfYmmDSjmbVvSGMC6_oLSnbTzLS4xR_1U","https://i.picsum.photos/id/300/200/200.jpg?grayscale&hmac=XCSFoDItER-rbAfbBlr7c53bbIVIVo6yXW4D3dv7U0g", "https://i.picsum.photos/id/71/200/200.jpg?grayscale&hmac=QhwCD9q0EbjS5yrZaMEo1zwBuUi1wT812zfaL5tjdfw", "https://i.picsum.photos/id/839/200/200.jpg?grayscale&hmac=7FQWdryAiUvsWgurgy4q6fV8iy1-HKJ__zbRknDR6wo", "https://i.picsum.photos/id/622/200/200.jpg?grayscale&hmac=TmLiSYWQWsyUTDC4cvFwbArv_ztS2bDYCX3jxLFDEMU", "https://i.picsum.photos/id/614/200/200.jpg?grayscale&hmac=XfA48uYoXsZ4Y4dxYObar_KcErzHP8nqiuaJ8m4VMPo"]

//listener
window.addEventListener("load", showPosts)

//Funciones
function showPosts() {
    fetch("http://localhost:3000/posts")
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {
                let card = document.createElement("div");
                card.className = "card text-white bg-dark m-3 p-3 d-flex flex-column justify-content-start align-items-center"
                let cardTitle = document.createElement("h6")
                cardTitle.className = "card-title"
                cardTitle.innerText = post.title;
                let randomImg = document.createElement("img")
                randomImg.src = imgArray[Math.floor(Math.random()*6)]
                card.appendChild(randomImg)
                card.appendChild(cardTitle)
                mainContainer.appendChild(card);
            })
        })
} 


