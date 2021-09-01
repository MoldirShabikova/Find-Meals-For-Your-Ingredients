const searchBtn = document.getElementById('search-btn');
const foodList = document.getElementById('food');
const foodDeskContent = document.querySelector('.food-desk-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

searchBtn.addEventListener('click', getFoodList);
foodList.addEventListener('click', getFoodRecipe);

// getting food list 


function getFoodList() {
  let searchInputTxt = document.getElementById
    ('search-input').value.trim();
  // console.log(searchInputTxt)
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
      // console.log(data);
    
               let html = "";
                if (data.meals) {
                data.meals.forEach(food => {
                  html += `
               <div class = "food-item" data-id = "${food.idMeal}" >
                <div class = "food-name">
                    <h3>${food.strMeal}</h3>
                   <div class = "food-img">
                   <img src="${food.strMealThumb}" alt="food">
                </div>
                   <a href = "#" class = "recipe-btn">See Recipe</a>
                   </div>
                      </div>
             `;
                })
                  foodList.classList.remove('error');
                } else {
                  html = "Sorry, we didn't find any recipe!"
                  foodList.classList.add('error')
         }
         foodList.innerHTML = html;
      })  
      }
    
foodList.addEventListener('click', getFoodRecipe);
      
function getFoodRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains('recipe-btn')) {
    let foodItem = e.target.parentElement.parentElement;
    console.log(mealItem);
  }
}