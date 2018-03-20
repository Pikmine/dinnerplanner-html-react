import { apiConfig } from "../apiConfig.js";

class DinnerAPI {
  constructor() {
    this.baseUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com";
    this.options = {
      headers: {
        "X-Mashape-Key": apiConfig.apiKey
      }
    };
  }

  types() {
    return {
      all: "All",
      appetizer: "Appetizer",
      "main course": "Main Course",
      "side dish": "Side Dish",
      dessert: "Dessert",
      salad: "Salad",
      bread: "Bread",
      breakfast: "Breakfast",
      soup: "Soup",
      beverage: "Beverage",
      sauce: "Sauce",
      drink: "Drink"
    };
  }

  get(id) {
    return this._sendGetRecipeInformationRequest(id, "includeNutrition=true");
  }

  _sendGetRecipeInformationRequest(id, queryParams) {
    return fetch(
      `${this.baseUrl}/recipes/${id}/information?${queryParams}`,
      this.options
    )
      .then(res => res.json())
      .then(result => {
        let defaultDishType = "main course";
        let allDishTypes = Object.keys(this.types());

        result.getDishType = () => {
          return (
            this.dishTypes.find(type => {
              return allDishTypes.includes(type);
            }) || defaultDishType
          );
        };

        return result;
      });
  }

  search(type, query) {
    let isValidString = query => typeof query === "string" && query.length > 0;
    let isValidType = type =>
      typeof type === "string" &&
      Object.keys(this.types()).includes(type) &&
      type !== "all";

    let params = [
      "instructionsRequired=true",
      isValidString(query) ? `query=${encodeURIComponent(query)}` : "",
      isValidType(type) ? `type=${encodeURIComponent(type)}` : ""
    ];

    return this._sendSearchRequest(params.join("&"));
  }

  _sendSearchRequest(queryParams) {
    return fetch(`${this.baseUrl}/recipes/search?${queryParams}`, this.options)
      .then(res => res.json())
      .then(res => res.results);
  }
}

export default DinnerAPI;
