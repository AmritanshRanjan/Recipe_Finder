//accessing ingredients checkboxes 
let ingredientCheckboxes = document.querySelectorAll(".ingredients input[type='checkbox']");

//accessing the button for search
let findBtn = document.getElementById("finder");

//accessing a empty div to store the specification about that dish
let recipesName = document.querySelector(".recipiesName");

//creates a add to favourites btn to add the recipe in favourite list
let saveFav=document.getElementById("saveFav");

//accessing the favourite menu
let Favourite=document.querySelector(".Favourite")

//Accessing an empty list
let savedList=document.querySelector(".savedList")

//checking my favourite saved list
let checkFav=document.querySelector("#checkFav")

// Defining recipe giving its name , checking the clicked ingredients/selected ingredients,showing the user that how it will look and its procedure
const recipes = [
    {
        name: "Jeera Rice",
        available: ["Rice", "Jeera", "Butter", "Garlic"],
        image: "https://www.allrecipes.com/thmb/ooMDQvaT_gs72g0-mGNVEdorhA4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/FranceCevallos_JeeraRice_Alternate-a0ef3c42b8e94ac38867d3e762262ab4.JPG",
        procedure: "1. Heat butter in pan\n 2. Add jeera and sauté until they crackle\n 3. Add chopped garlic and sauté for a minute.\n 4. Add washed rice and saute for another minute.\n 5. Add water and salt, bring to a boil.\n 6. Cover and cook on low heat until rice is done.",
        cuisine: "Indian",
        prepTime: "30 Minutes",
        dietaryRestrictions: ["Vegetarian"]
    },
    {
        name:"Paneer Butter Masala",
        available:["Paneer","Tomato","Garlic","Onion","Butter"],
        image:"https://images.unsplash.com/photo-1701579231378-3726490a407b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFuZWVyJTIwYnV0dGVyJTIwbWFzYWxhfGVufDB8fDB8fHww",
        procedure:"1.Heat butter in pan \n 2.Add finely chopped onions and saute until golden brown \n 3.Add chopped garlic and sauté for a minute. \n 4.Add pureed tomatoes, salt, and cook until the oil separates. \n 5. Add paneer cubes and cook for a few minutes.\n `6.Garnish with cream or cheese if desired." ,
        cuisine: "Indian",
        prepTime: "45 Minutes",
        dietaryRestrictions: ["Vegetarian", "Gluten-Free"] 
    },
    {
        name:"Tomato Rice",
        available:["Rice", "Tomato", "Garlic", "Onion", "Pepper"],
        image:"https://www.simplyrecipes.com/thmb/ePgWKFbjeYWbuOCXEu9yLFpVdR8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Tomato-Rice-LEAD-05-cda9d3f49fe04091a71ea21cc4041238.jpg",
        procedure:"1.Heat oil in a pan. \n2. Add chopped onions and sauté until translucent. \n3.Add chopped garlic and sauté for a minute. \n4.Add chopped tomatoes and cook until soft. \n5.Add salt, pepper, and washed rice. \n6.Add water and cook until rice is done. ",
        cuisine: "Indian",
        prepTime: "40 Minutes",
        dietaryRestrictions: ["Vegetarian", "Vegan", "Gluten-Free"]
    },
    {
        name:"Garlic Butter Paneer",
        available:["Paneer", "Garlic", "Butter", "Pepper","Onion","Tomato"],
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMCTzcPT4gUKESvcRtLuSLkNaz3ASP15sH7A&s",
        procedure:"1.Melt butter in a pan. \n 2.Add minced garlic and sauté until fragrant. \n3Add paneer cubes and sauté until golden brown. \n 4.Season with salt and pepper. \n5.Onion and tomato  \n 6.Serve hot with a sprinkle of fresh herbs.",
        cuisine: "Indian",
        prepTime: "25 Minutes",
        dietaryRestrictions: ["Vegetarian", "Gluten-Free"]      
    },
    {
        name:" Jeera Paneer",
        available:[ "Paneer", "Jeera", "Onion", "Garlic", "Butter"],
        image:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0enr7aB9xuiuS2uVC__RLLBU5QDq-5Zy-U-iQpgzSfjJbDDnB-ow-jC8G0-sAkhBoFroM4tK8W11l3dJZxb1dtBtS6g7ok-A3dldqx1GsvmnA5lctfVUPzlaZAm-CfxCeWRuqAZZUmxuK/s400/Roasted+Jeera+Paneer+with+Onion+Rings.JPG",
        procedure:"1.Heat butter in a pan.\n2.Add jeera and let it crackle.\n 3. Add finely chopped onions and garlic, sauté until golden. \n 4.Add paneer cubes and cook for a few minutes. \n 5.Season with salt and pepper.",
        cuisine: "Indian",
        prepTime:"35 Minutes",
        dietaryRestrictions: ["Vegetarian", "Gluten-Free"]
    },
    {
        name:"Cheesy Garlic Bread",
        available:["WheatBread", "Garlic", "Cheese", "Butter"],
        image:"https://www.thereciperebel.com/wp-content/uploads/2022/12/cheesy-garlic-bread-TRR-1200-17-of-28.jpg",
        procedure:"1.Mix minced garlic with butter.\n2. Spread the mixture on slices of wheat bread.\n 3.Sprinkle grated cheese on top. \n4. Bake until the cheese is melted and bread is crispy.",
        cuisine: "American",
        prepTime: "20 Minutes",
        dietaryRestrictions: ["Vegetarian"]
    }
];

// Save the recipes to local storage to a web browser
localStorage.setItem("recipes", JSON.stringify(recipes));

//giving the finder button conditions so that it can choose the recipie from the local storage
findBtn.addEventListener("click", () => {
    // Get the current state of checked boxes
    let checkedBoxes = document.querySelectorAll(".ingredients input:checked");
    //putting all the checked ingredients in an array
    let clickedIngredients = Array.from(checkedBoxes).map(input => input.value);

    // Access the local storage
    const storedRecipes = JSON.parse(localStorage.getItem("recipes"));

    // Filter to extract recipes with the given condition
    const matchedRecipes = storedRecipes.filter(recipe =>
        recipe.available.every(ingredient => clickedIngredients.includes(ingredient))
    );
    //using showrecipe function
    showRecipes(matchedRecipes);
});

//showing the matched recipe according to the condition
function showRecipes(matchedRecipes) {
    recipesName.innerHTML = ""; // Clear previous results

    if (matchedRecipes.length === 0) {
        recipesName.innerHTML = "<p><i>The Ingredients You Have Chosen Are Not Sufficient..<i></p>";
        return;
    }
    //creating a new div,img,list and paragraph for procedure.....
    matchedRecipes.forEach(recipe => {
        const recipeDiv = document.createElement("div");
        recipeDiv.className = "recipe";

        const recipeImage = document.createElement("img");
        recipeImage.src = recipe.image;
        //using alt in case picture is not available
        recipeImage.alt = recipe.name;

        const recipeName = document.createElement("h3");
        recipeName.textContent = recipe.name;

        const recipeIngredients = document.createElement("ul");
        recipe.available.forEach(ingredient => {
            const ingredientItem = document.createElement("li");
            ingredientItem.textContent = ingredient;
            recipeIngredients.append(ingredientItem);
        });

        const recipeProcedure = document.createElement("p");
        //i actually used /n instead of<br> 
        recipeProcedure.innerHTML = recipe.procedure.replace(/\n/g, "<br>");
        
        const recipeCuisines=document.createElement("h5")
        recipeCuisines.textContent = "Cuisine:"+recipe.cuisine;

        const recipePreparationTime=document.createElement("h5")
        recipePreparationTime.textContent = "Prepartion Time:"+recipe.prepTime;

        const recipeDietary=document.createElement("h5")
        recipeDietary.textContent = "Dietary Restrictions:"+recipe.dietaryRestrictions;

        const saveButton = document.createElement("button");
        saveButton.textContent = "Save to Favorites";
        saveButton.addEventListener("click", () => saveToFavorites(recipe));

        

        //appending all of the variable into the empty div that is already created in html
        recipeDiv.append(recipeImage);
        recipeDiv.append(recipeName);
        recipeDiv.append(recipeIngredients);
        recipeDiv.append(recipeProcedure);
        recipeDiv.append(recipeCuisines);
        recipeDiv.append(recipeDietary);
        recipeDiv.append(recipePreparationTime);
        recipeDiv.append(saveButton);
        // recipesName.append(Resetbtn);
        recipesName.append(recipeDiv);

        //so the last thing is that whenever we click the finder button it should automatically scroll 
        recipesName.scrollIntoView({ behavior: "smooth" });
    });
}

//creating a function to save the favourites
function saveToFavorites(recipe) {
    let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    if (!savedRecipes.some(savedRecipe => savedRecipe.name === recipe.name)) {
        savedRecipes.push(recipe);
        localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
        alert("Recipe saved to favorites!");
        

    } else {
        alert("Recipe already in favorites!");
    }
}

//to check the saved favourited
checkFav.addEventListener("click", () => {
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    savedList.innerHTML = "";

    if (savedRecipes.length > 0) {
        savedRecipes.forEach(recipe => {
            const savedItem = document.createElement("li");
            savedItem.textContent = recipe.name;
            savedItem.addEventListener("click", () => showRecipes([recipe]));
            savedList.append(savedItem);
        });
    } else {
        savedList.innerHTML = "<p>No saved recipes</p>";
        //In case if no recipe is there
    }
});

//for clearing the webpage.... initially it was for reset the favourites but after i used it for clearing the webpage
function ResetTheFav(){
    alert("Everything is cleared");
    localStorage.clear();
    alert("Please refresh")
}

document.getElementById("buttons").addEventListener("click", () => ResetTheFav());
// btndiv.appendChild(Resetbtn)
// // localStorage.clear()

document.getElementById("addRecipeForm").addEventListener("submit", function(event) {
    //taking event as a parameter
    event.preventDefault();
    //using preventDefault to not send the data to server instead we are using this for our local storage

    const newRecipe = {
        name: document.getElementById("recipeName").value,
        available: document.getElementById("recipeIngredients").value.split(",").map(item => item.trim()),
        //mapping helps to make an array of the ingredients and same thing for dietaryRestrictions
        image: document.getElementById("recipeImage").value,
        procedure: document.getElementById("recipeProcedure").value,
        cuisine: document.getElementById("recipeCuisine").value,
        prepTime: document.getElementById("recipePrepTime").value,
        dietaryRestrictions: document.getElementById("recipeDietaryRestrictions").value.split(",").map(item => item.trim())
    };

    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    storedRecipes.push(newRecipe);
    //adding it to the locla storage
    localStorage.setItem("recipes", JSON.stringify(storedRecipes));
    //giving an alert to the user
    alert("Recipe added successfully!");
    document.getElementById("addRecipeForm").reset();
});
