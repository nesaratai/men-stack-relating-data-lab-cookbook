document.addEventListener("DOMContentLoaded", function () {
    window.addIngredient = function () {
      const container = document.getElementById("ingredients-container");
  
      if (!container) {
        console.error("ingredients-container not found");
        return;
      }
  
      // Create a new input element for the ingredient
      const newInput = document.createElement("input");
      newInput.type = "text";
      newInput.name = "Ingredients[]";
      newInput.classList.add("ingredient-input");
  
      // Append the new input to the container
      container.appendChild(newInput);
    };
  });