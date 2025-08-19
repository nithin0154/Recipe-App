const serachBtn = document.querySelector(".searchbtn");
const searchInp = document.querySelector("#search");
const recipeContainer = document.querySelector(".whole-container");
const details = document.querySelector(".recipe-details");
const closeBtn = document.querySelector(".recipe-close-btn");
const recipeContents = document.querySelector(".recipe-details-content");
const footer = document.querySelector(".foot");

serachBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const val = searchInp.value.trim();
  console.log(val);
  if(val){
    fetchRecipies(val);
  }else{
    recipeContainer.innerHTML = `<h3>Please type a valid search</h3>`;
  }
});

const fetchRecipies = async (val) => {
  recipeContainer.classList.remove("whole-container");
  recipeContainer.classList.add("recipe-container");
  recipeContainer.innerHTML = `<h3>Fetching the Recipes....</h3>`;
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`
  );
  try {
    recipeContainer.innerHTML = ``;
    const mealsdata = await data.json();
    console.log(mealsdata);
    for (const meal of mealsdata.meals) {
      let recipe = document.createElement("div");
      recipe.classList.add("recipe");
      let name = meal.strMeal.split("(")[0].trim();
      recipe.innerHTML = `<img src="${meal.strMealThumb}" alt="">
                        <h3>${name}</h3>`;
      recipeContainer.appendChild(recipe);

      const button = document.createElement("button");
      button.innerHTML = `View Recipe`;
      button.classList.add("view-recipe-btn");
      recipe.appendChild(button);
      button.addEventListener("click", () => {
        openRecipePopUp(meal);
      });
    }
  } catch (e) {
    recipeContainer.innerHTML = `<h3>Error in fetching..! , No such recipies found!</h3>`;
  }
};

const openRecipePopUp = async (meal) => {
  recipeContents.innerHTML = `<h2>${meal.strMeal}</h2>
                           <h3>Ingridients:</h3>
                           <ul>${await fetchIngridents(meal)}</ul>
                        <br>
                           <h3>Instructions:</h3>
                          <p>${meal.strInstructions}</p>`;
  recipeContents.parentElement.style.display = "block";
  document.body.classList.add("noscroll"); // stop background scroll
  footer.style.display="visible";
};

closeBtn.addEventListener("click", () => {
  details.style.display = "none";
  document.body.classList.remove("noscroll");
});


function fetchIngridents(meal){
  let ingridientList= "";
  for(let i = 1;i<20;i++){
    const ingridient = meal[`strIngredient${i}`];
    if(ingridient){
      const measure = meal[`strMeasure${i}`];
      ingridientList += `<li>${measure} - ${ingridient} </li>`;
    }else{
      break;
    }
  }
  return ingridientList;
}



