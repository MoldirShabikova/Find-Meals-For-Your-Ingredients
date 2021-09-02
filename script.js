const searchBtn = document.getElementById('search-btn');
const foodList = document.getElementById('food');
let html = "";
searchBtn.addEventListener('click', getFoodList);

// my API 

const apiNames = 'https://www.themealdb.com/api/json/v1/1/filter.php?i='
// const apiRecipe = 'http://www.themealdb.com/api/json/v1/1/lookup.php?i='

// getting food list 

function getFoodList() {
  document.querySelector(".food-wrap").style.background = "none";
  let searchInputTxt = document.getElementById('search-input').value;
  fetch(`${apiNames+searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
      // console.log(data);
    
      if (data.meals) {
        data.meals.forEach(food => {
          html += `
               <div class = "food-item" data-id = "${food.idMeal}" >
                <div class = "food-name">
                    <h3>${food.strMeal}</h3>
                   <div class = "food-img">
                   <img src="${food.strMealThumb}" alt="food">
                </div>
             <a data-id = "${food.idMeal}"href = "#" class = "recipe-btn">See Recipe</a>
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

// working with See Recipe btn

const foodRecipe = document.getElementsByClassName('.recipe - btn');

const api_url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}";
async function getapi(url) {
  const response = await fetch(url);
  var data = await response.json();
  console.log(data);
}



