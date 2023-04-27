const searchInput = document.querySelector('.form_input');
const searchButton = document.querySelector('.btn-search');
const randomButton = document.querySelector('.btn-random');
const categorieButton = document.querySelector('select');
const main = document.querySelector('main');

function notFound(){
    const mealNotFound = document.createElement('div');
    mealNotFound.setAttribute('class', 'main_not_found');
    mealNotFound.innerHTML = `
        <h2>oops no meal found...</h2>
        <p>try something like Beef, Egg, Lamb, Pork,...</p>
    `
    main.appendChild(mealNotFound);
};

function searchMeal(){
    searchButton.addEventListener('click', e => {

        e.preventDefault();
        categorieButton.value = 'Categories';
        let searchMeal = searchInput.value;

        if(searchMeal !== ""){
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`)
                .then(res => {
                    if(res.ok){
                        res.json().then(data => {
                            while (main.firstChild) main.removeChild(main.firstChild);
                            data.meals === null ? notFound() : displayMeal(data);
                        })
                    };
                }) 
            .catch(error => {
                console.log("error :" + error.message);
            })
        }
        searchInput.value = "";
    })
}
searchMeal();

function displayMeal(meal){
    meal.meals.forEach(meal => {

        const mealEl = document.createElement('div');
        mealEl.setAttribute('class', "meal");
        mealEl.innerHTML= `
            <h3>${meal.strMeal}</h3>
            <div class="meal_img">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </div>
            <a class="btn_meal" href="./pages/meal.html?id=${meal.idMeal}">See the recipe</a>
        `
        main.appendChild(mealEl);
    });
};

function getRandomMeal(){
    randomButton.addEventListener('click', e => {

        e.preventDefault();
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(res => {
                if(res.ok){
                    res.json().then(data => {
                        while (main.firstChild) main.removeChild(main.firstChild);
                        data.meals === null ? notFound() : displayMeal(data);
                    });
                };
            })
            .catch(error => {
                console.log("error :" + error.message);
            })
        categorieButton.value = "Categories"
    })
};
getRandomMeal();

function getMealByCategorie(){

    categorieButton.addEventListener('change', e => {
        e.preventDefault();
        let categorie = e.target.value;
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`)
            .then(res => {
                if(res.ok){
                    res.json().then(data => {
                        while (main.firstChild) main.removeChild(main.firstChild);
                        data.meals === null ? notFound() : displayMeal(data);
                    });
                }
            })
            .catch(error => {
                console.log("error :" + error.message);
            })
    })

};
getMealByCategorie();
