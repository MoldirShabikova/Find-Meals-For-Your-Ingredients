const apiNames = 'https://www.themealdb.com/api/json/v1/1/filter.php?i='
const apiRecipe = 'http://www.themealdb.com/api/json/v1/1/lookup.php?i='
const searchBtn = document.getElementById('search-btn');
const foodList = document.getElementById('food');
const recipeShow = document.getElementById('recipe')
let html = "";
searchBtn.addEventListener('click', () => {
  console.log(searchBtn)
  html = "";
  foodList.innerHTML = html;
  getFoodList()
}) 
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
  console.log(meal)
  let ingredients = [];
  for (ing in meal) {
    if (ing.includes("strIngredient")&& meal[ing].length>1) {
      ingredients.push(meal[ing])
    }
      
  }
  console.log(ingredients)
  console.log(response.data.meals[0]);
  html = `
  <div class='food-inst'>
  <h2 class = "name-title">${meal.strMeal}</h2>
  <img src=${meal.strMealThumb} alt="">
  <p class = "recipe-category">Category: ${meal.strCategory}</p>
  <h3>Ingredients</h3>
  ${displayIngredients(ingredients)}
  <h3>Instructions:</h3>
  <p>${meal.strInstructions}</p>
  </div>
   `
  foodList.innerHTML = html;
}

function displayIngredients(ingredients) {
  let html = "";
  ingredients.forEach((ingredient,index) => {
    html +=`<p>${ingredient}</p>`
  })
  return html;
}

