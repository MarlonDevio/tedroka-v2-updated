class CartRemoveButton extends HTMLElement {
    /**
     * Constructor for the class.
     * Initializes the component and sets up event listeners.
     */
    constructor() {
        super();

        if (!this) {
            console.error("Error: 'this' is null or undefined.");
            return;
        }

        /**
         * Adds a click event listener to the current element.
         * When the element is clicked, the default action is prevented,
         * and the quantity of the item in the cart is updated to 0.
         */
        this.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("I got clicked!")
            const cartItems = this.closest('cart-items') || this.closest('cart-drawer-items');
            cartItems.updateQuantity(this.dataset.index, 0);
        });
    }
}

customElements.define('cart-remove-button', CartRemoveButton);

