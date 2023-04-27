const main = document.querySelector('main');
const header = document.querySelector('header');
const aside = document.querySelector('aside');
const section = document.querySelector('section');

let params = (new URL(document.location)).searchParams;
let id = params.get('id');

fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => {
        if(res.ok){
            res.json().then(data => {
                displayMeal(data)
            });
        };
    })
    .catch(error => {
        console.log("error :" + error.message);
    });
  
function displayMeal(meal){

    const title = document.querySelector('title');
    title.innerHTML = `${meal.meals[0].strMeal} - Cook's Delight`

    header.innerHTML = `
        <img src="${meal.meals[0].strMealThumb}" alt="${meal.meals[0].strMeal}">
        <div class="header_description">
            <div class="header_title">
                <h1 title="${meal.meals[0].strMeal}">
                    ${meal.meals[0].strMeal}
                </h1>
            </div>
            <div class="header_subtitle">
                <span class="main_instruction_category">
                    ${meal.meals[0].strCategory}
                </span>
                <a href="./../index.html" title="Go back homepage">
                    <i class="fa-solid fa-house"></i>
                </a>
                <span class="main_instruction_area">
                    ${meal.meals[0].strArea}
                </span>
            </div>
        </div>
    `
    main.innerHTML = `
        <p>${meal.meals[0].strInstructions}</p>
        <a href="${meal.meals[0].strSource}" target="_blank" title="Go to the source">Source</a>
    `

    let ingredientsList = "<h2>Ingredients :</h2><ul>";
    for(let i = 1; i <= 20; i++){
        const ingredient = meal.meals[0][`strIngredient${i}`];
        const measure = meal.meals[0][`strMeasure${i}`];
        if(ingredient) ingredientsList += `<li>${ingredient} : ${measure}</li>`
        else break;
    };
    ingredientsList += "</ul>";
    aside.innerHTML = ingredientsList;

    section.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${meal.meals[0].strYoutube.slice(-11)}" frameborder="0" allowfullscreen></iframe>
    `
}
