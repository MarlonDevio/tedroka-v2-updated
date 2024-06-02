class CartNotificationButton extends HTMLElement {
    constructor() {
        super();
        this.amountInCart;

    }

    async connectedCallback() {
        await this.getAmount()
        this.displayAmount();
    }

    async getAmount() {
        try {
            const response = await fetch(window.Shopify.routes.root + 'cart.js');
            const data = await response.json();
            this.amountInCart = await data.item_count;
        }
        catch (error) {
            console.error(e.message)
        }
    }

    displayAmount() {
        this.textContent = this.amountInCart;
        this.className = 'font-bold absolute bg-white rounded-full text-[13px] left-[70%] top-[-20%] px-[5px] pt-[1px] text-secondary'
    }


}

customElements.define('cart-notification-button', CartNotificationButton);