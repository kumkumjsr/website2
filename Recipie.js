let searchBox=document.querySelector(".SearchBox");
let searchBtn=document.querySelector(".SearchBtn");
let RecipieContainer=document.querySelector(".recipe-container");
let recipeDeatilsContent=document.querySelector(".recipe-details-content");
let recipeCloseBtn=document.querySelector(".recipe-close-btn");

//function to get recipie
 async function fetchRecipie(querys){
RecipieContainer.innerHTML="<h2>Fetching Recipies.....</h2>";

let data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${querys}`);
let responce=await data.json();
//console.log(responce);
//console.log(responce.meals[0])

RecipieContainer.innerHTML=" ";

responce.meals.forEach(meal => {
  //  console.log(meal);


  let recipeDiv=document.createElement("div");
  recipeDiv.classList.add("recipie");
  recipeDiv.innerHTML=`
  <img src="${meal.strMealThumb}">
<h3>${meal.strMeal}</h3>
<p><span>${meal.strArea}</span> Dish</p>
<p>Belongs to <span>${meal.strCategory}</span> Category</p>
  `;

  let button=document.createElement('button');
button.textContent="View Recipie";
recipeDiv.appendChild(button);
//Adding Eventlistner to recipie button
button.addEventListener("click",()=>{
    openRecipiePopup(meal);
})

  RecipieContainer.appendChild(recipeDiv);
});
}

let openRecipiePopup=(meal)=>{
recipeDeatilsContent.innerHTML=`
<h2 class="recipeName">${meal.strMeal}</h2>
<h3 >Ingridents:</h3>
<ul class="ingredientList">${fetchIngridents(meal)}</ul>
<div class="recipeInstructions">
<h3>Instructions: </h3>
<p class="recipeInstructions">${meal.strInstructions}</p>
</div>
`;

recipeCloseBtn.addEventListener("click",()=>{
    recipeDeatilsContent.parentElement.style.display="none";
})





recipeDeatilsContent.parentElement.style.display="block";
}

//Function to fetch ingridents and measurements

let fetchIngridents=(meal)=>{
    console.log(meal)
let ingridentsList=" ";
for(let i=1;i<=20;i++){
    let ingridents=meal[`strIngredient${i}`];
   if(ingridents){
       let measure=meal[`strMeasure${i}`];
ingridentsList+=`<li>${measure} ${ingridents}</li>`;
    }

    else{
break;
    }

}
return ingridentsList;
}


searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let searchInput=searchBox.value.trim();
     if(!searchInput){
    RecipieContainer.innerHTML=`<h2>Type the meal in the search box......</h2>`;
   return;
  }
  fetchRecipie(searchInput);
})

