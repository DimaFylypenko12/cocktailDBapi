document.addEventListener('DOMContentLoaded', function () {
  fetchMultiplePages([1, 2, 3, 4, 5, 6]); 
});

function fetchMultiplePages(pages) {
  const fetchPromises = pages.map(page => 
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=&page=${page}`)
      .then(response => response.json())
  );

  Promise.all(fetchPromises)
    .then(results => {
      const allCocktails = results.flatMap(result => result.drinks);
      displayCocktails(allCocktails); 
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function displayCocktails(cocktails) {
  const container = document.getElementById('cocktail-container');

  if (!cocktails) {
    container.innerHTML = '<p class="text-red-500">No cocktails found</p>';
    return;
  }

  container.innerHTML = ''; 

  cocktails.forEach(cocktail => {
    const cocktailSection = document.createElement('section');
    cocktailSection.className = 'flex-col items-start border p-4 bg-white shadow-md rounded-md';

    const cocktailImg = document.createElement('img');
    cocktailImg.src = cocktail.strDrinkThumb;
    cocktailImg.alt = cocktail.strDrink;
    cocktailImg.className = 'w-24 h-24 rounded mr-4';

    const cocktailDetails = document.createElement('div');
    cocktailDetails.className = 'ml-4 max-w-lg';

    const cocktailName = document.createElement('h2');
    cocktailName.className = 'text-xl font-bold mb-2';
    cocktailName.textContent = cocktail.strDrink;

    const cocktailCategory = document.createElement('p');
    cocktailCategory.innerHTML = `<strong>Category:</strong> ${cocktail.strCategory}`;
    cocktailCategory.className = 'mb-1';

    const cocktailAlcoholic = document.createElement('p');
    cocktailAlcoholic.innerHTML = `<strong>Type:</strong> ${cocktail.strAlcoholic}`;
    cocktailAlcoholic.className = 'mb-1';

    const cocktailGlass = document.createElement('p');
    cocktailGlass.innerHTML = `<strong>Glass:</strong> ${cocktail.strGlass}`;
    cocktailGlass.className = 'mb-1';

    const cocktailInstructions = document.createElement('p');
    cocktailInstructions.innerHTML = `<strong>Instructions:</strong> ${cocktail.strInstructions}`;
    cocktailInstructions.className = 'mb-1';

    const ingredientsList = document.createElement('ul');
    ingredientsList.innerHTML = '<strong>Ingredients:</strong>';
    ingredientsList.className = 'list-disc list-inside ml-4';

    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      const measure = cocktail[`strMeasure${i}`];
      if (ingredient) {
        const ingredientItem = document.createElement('li');
        ingredientItem.textContent = `${ingredient} - ${measure ? measure : ''}`;
        ingredientsList.appendChild(ingredientItem);
      }
    }

    cocktailDetails.appendChild(cocktailName);
    cocktailDetails.appendChild(cocktailCategory);
    cocktailDetails.appendChild(cocktailAlcoholic);
    cocktailDetails.appendChild(cocktailGlass);
    cocktailDetails.appendChild(cocktailInstructions);
    cocktailDetails.appendChild(ingredientsList);

    cocktailSection.appendChild(cocktailImg);
    cocktailSection.appendChild(cocktailDetails);

    container.appendChild(cocktailSection);
  });
}

