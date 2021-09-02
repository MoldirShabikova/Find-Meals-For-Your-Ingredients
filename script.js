
const searchBtn = document.getElementById('search-btn');
const foodList = document.getElementById('food');
let html = "";
searchBtn.addEventListener('click', () => {
  console.log(searchBtn)
  html = "";
  foodList.innerHTML = html;
  getFoodList()
}) 

// my API 

const apiNames = 'https://www.themealdb.com/api/json/v1/1/filter.php?i='
// const apiRecipe = 'http://www.themealdb.com/api/json/v1/1/lookup.php?i='

// getting food list 

async function getFoodList() {
  document.querySelector(".food-wrap").style.background = "none";
  let searchInputTxt = document.getElementById('search-input').value;
let res = await axios.get(`${apiNames+searchInputTxt}`)
  let data = res.data
      if (data.meals) {
        data.meals.forEach(food => {
          html += `
               <div class = "food-item" data-id = "${food.idMeal}" >
                <div class = "food-name">
                    <h3>${food.strMeal}</h3>
                   <div class = "food-img">
                   <img src="${food.strMealThumb}" alt="food">
                </div>
             <button data-id="${food.idMeal}" class="recipe-btn">See Recipe</button>
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
  const foodRecipe = document.querySelectorAll('.recipe-btn');
  console.log(foodRecipe)
  foodRecipe.forEach(recipe => {
    recipe.addEventListener('click', function() {
   getRecipe(recipe)
 })
  })
}

// working with See Recipe btn


async function getRecipe(mealItem) {
  console.log(mealItem)
  html = "";
  foodList.innerHTML = html;
  const api_url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`;
  const response = await axios.get(api_url);
  let meal = response.data.meals[0]
  console.log(response.data.meals[0]);
  html = `
   <div class = "food-desk-content">
  <h2 class = "recipe-title">${meal.strMeal}</h2>
  <p class = "recipe-category">Category Name</p>
  <div class = "recipe-instruct">
    <h3>Instructions:</h3>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore placeat architecto iure sit sunt cumque. Tempora aliquid quam illum error nisi delectus vel provident, ipsa nostrum sequi labore, aliquam debitis.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti labore obcaecati vel in beatae rem, ipsa cum rerum qui tenetur autem sequi assumenda, recusandae praesentium quae soluta. Doloribus, ipsum adipisci!</p>
  </div>
  <div class = "recipe-food-img"></div>
  <img src="photo.jpeg" alt="">
</div>
</div> `
  foodList.innerHTML = html;

}



