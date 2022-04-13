// ALL DOM selector
let form = document.querySelector("form");
let searchField = document.querySelector("#searchField");
let allCard = document.querySelector(".allCard");
let notFoundedMsg = document.querySelector(".text-danger");
let spiner = document.querySelector("#spiner");
const loadAllFood = () => {
  spiner.style.display = "block";
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchField.value}`
  )
    .then((res) => res.json())
    .then((data) => displayFood(data.meals))
    .catch((err) => {
      notFoundedMsg.style.display = "block";
    });
};
const displayFood = (food) => {
  spiner.style.display = "none";
  allCard.style.opacity = "1";
  allCard.style.pointerEvents = "visible";
  notFoundedMsg.style.display = "none";
  //   console.log(food);
  allCard.textContent = "";
  food.forEach((food) => {
    console.log(food);
    let div = document.createElement("div");
    // console.log(div);
    div.innerHTML = `
         <div class="card" style="width: 18rem;">
          <img src="${food.strMealThumb}" class="card-img-top" alt="food image">
           <div class="card-body">
          <h5 class="card-title">${food.strMeal}</h5>
          <p class="card-text">
          ${food.strInstructions.slice(0, 50)}
          </p>
     <a href="#" class="btn btn-primary">Details</a>
        </div>
   </div>
    `;
    allCard.appendChild(div);
  });
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  allCard.style.opacity = "0";
  allCard.style.pointerEvents = "none";
  loadAllFood();
  searchField.value = "";
});
