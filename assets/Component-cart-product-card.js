/**
 * Custom HTMLButtonElement that handles incrementing and decrementing quantity values.
 * 
 * This custom element extends HTMLButtonElement to provide specialized functionality
 * for updating the quantity of a related input element. The specific action (increment or decrement)
 * is determined by a data attribute, and the associated input element is identified by its ID,
 * which is also stored in a data attribute.
 * 
 * @class
 * @extends {HTMLButtonElement}
 * 
 * @example
 * <button is="cart-handle-quantity-button" data-action="increment" data-quantity-id="updates_1">+</button>
 * <button is="cart-handle-quantity-button" data-action="decrement" data-quantity-id="updates_1">-</button>
 * <input type="number" id="updates_1" class="quantity__input">
 */
class CartHandleQuantityButton extends HTMLButtonElement {
    static #increment = 'increment';
    static #decrement = 'decrement';
    static #validActions = [this.#increment, this.#decrement];

    /**
     * Constructor for CartHandleQuantityButton.
     * 
     * Initializes the button and sets up the event listener for click events.
     * Also sets the datasetAction and datasetId attributes.
     */
    constructor() {
        super();
        /**
         * The action to perform (increment or decrement).
         * @type {string}
         */
        this.datasetAction = this.getAttribute('data-action');

        /**
         * The ID of the associated quantity input element.
         * 
         * This attribute is essential for the CartHandleQuantityButton to function correctly. It stores the ID of the associated
         * quantity input element. When the button is clicked, the handleQuantity method uses this ID to locate the corresponding
         * input element in the DOM. This allows the button to update the correct quantity input, ensuring that each button instance
         * interacts with its associated input element, even if there are multiple buttons and inputs on the page.
         * 
         * By using datasetId, we ensure that the button has a reference to the specific input element it needs to modify,
         * maintaining a clear and direct relationship between the button and its target input. This approach also makes the code
         * more modular and easier to manage, as each button-instance operates independently based on its data attributes.
         * 
         * @type {string}
         */
        this.datasetId = this.getAttribute('data-quantity-id');
        this.addEventListener('click', this.handleQuantity);
    }

    /**
     * Updates the quantity based on the provided operation.
     * 
     * @param {Function} operation - The operation to perform (increment or decrement).
     * @returns {Function} - A function that takes a string value, converts it to an integer, 
     *                       applies the operation, and returns the result as a string.
     */
    updateQuantity = (operation) => (stringValue) => {
        const valueAsInt = parseInt(stringValue);
        return operation(valueAsInt).toString();
    }

    /**
     * Determines the appropriate calculation function based on the data attribute.
     * 
     * @param {string} dataAttr - The data attribute indicating the action (increment or decrement).
     * @returns {Function} - The function to perform the appropriate calculation.
     */
    handleCalculation = (dataAttr) => {
        const incrementByOne = (num) => ++num;
        const decrementByOne = (num) => --num;
        switch (dataAttr) {
            case CartHandleQuantityButton.#increment:
                return incrementByOne;
            case CartHandleQuantityButton.#decrement:
                return decrementByOne;
        }
    }

    /**
     * Handles the quantity update when the button is clicked.
     * 
     * Validates the action, retrieves the associated input element by its ID, and updates its value.
     * 
     * @param {Event} e - The click event.
     */
    handleQuantity = (e) => {
        if (!this.#isValidAction(this.datasetAction)) {
            console.error("Only 'increment' | 'decrement' are valid actions");
            return;
        }

        const quantityElement = document.getElementById(this.datasetId);

        let newQuantity;
        const operation = this.handleCalculation(this.datasetAction);
        newQuantity = this.updateQuantity(operation)(quantityElement.value);
        quantityElement.value = newQuantity;
    }

    /**
     * Validates if the provided action is valid.
     * 
     * @param {string} action - The action to validate.
     * @returns {boolean} - True if the action is valid, false otherwise.
     */
    #isValidAction = (action) => {
        return CartHandleQuantityButton.#validActions.includes(action);
    }
}

// Define the custom element
customElements.define('cart-handle-quantity-button', CartHandleQuantityButton, { extends: 'button' });