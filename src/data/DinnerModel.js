import DinnerAPI from "../api/DinnerAPI.js";

//DinnerModel Object factory function
const DinnerModel = () => {
  // the data structure that will hold number of guest
  // and selected dishes for the dinner menu
  const state = {
    numberOfGuests: 1,
    menu: [],
    observers: []
  };

  const addObserver = observer => {
    state.observers.push(observer);
  };

  const removeObserver = observer => {
    state.observers = state.observers.filter(
      subscribedObserver => subscribedObserver !== observer
    );
  };

  const _notifyObservers = details => {
    state.observers.forEach(observer => observer(details));
  };

  const setNumberOfGuests = num => {
    state.numberOfGuests = num;
    _notifyObservers({ numberOfGuests: state.numberOfGuests });
  };

  const getNumberOfGuests = () => state.numberOfGuests;

  // Returns the dish that is on the menu for the selected type
  const getSelectedDish = type =>
    state.menu.find(dish => dish.dishType === type);

  // Returns all the dishes on the menu.
  const getFullMenu = () => state.menu;

  // Returns all ingredients for all the dishes on the menu (represented by dish)
  const getAllIngredients = () =>
    state.menu.reduce((acc, curr) => acc.concat(curr.ingredients), []);

  const getAllIngredientsForDish = dish => {
    return dish.extendedIngredients.map(({ name, amount: quantity, unit }) => ({
      name,
      unit,
      quantity: quantity * state.numberOfGuests
    }));
  };

  // Return the full price of a given dish (represented by dish)
  const getPriceForDish = dish => dish.pricePerServing;

  // Returns the total price of the menu (all the ingredients multiplied by number of guests).
  const getTotalMenuPrice = () =>
    state.menu.reduce((acc, dish) => {
      acc += state.numberOfGuests * getPriceForDish(dish);
      return acc;
    }, 0);

  // Adds the passed dish to the menu. If the dish of that type already exists on the menu
  // it is removed from the menu and the new one added.
  const addDishToMenu = id => {
    getDish(id).then(selectedDish => {
      const ids = getFullMenu().map(menuItem => menuItem.id);

      if (ids.includes(id)) {
        // prevent duplicates
        return;
      }

      state.menu.push(selectedDish);
      _notifyObservers({ menu: state.menu });
    });
  };

  // Removes dish from menu
  const removeDishFromMenu = id => {
    const newMenu = state.menu.filter(dish => dish.id !== id);
    state.menu = newMenu;
    _notifyObservers({ menu: state.menu });
  };

  // function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
  // you can use the filter argument to filter out the dish by name or ingredient (use for search)
  // if you don't pass any filter all the dishes will be returned
  const getAllDishes = (type, query) => {
    return new DinnerAPI().search(type, query);
  };

  //function that returns a dish of specific ID
  const getDish = id => {
    return new DinnerAPI().get(id);
  };

  return {
    addObserver,
    removeObserver,
    setNumberOfGuests,
    getNumberOfGuests,
    getSelectedDish,
    getFullMenu,
    getAllIngredients,
    getAllIngredientsForDish,
    getPriceForDish,
    getTotalMenuPrice,
    addDishToMenu,
    removeDishFromMenu,
    getAllDishes,
    getDish
  };
};

export const modelInstance = new DinnerModel();
