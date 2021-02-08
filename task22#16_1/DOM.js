/*
    1. Quantity by product
    2. Добавить кнопку Clear all
    3. Вы можете уменьшить\увеличить количество элементов по типу в "корзине". 
    4. Создать select(выпадающий список) конвертации валют. Список имеет 3 валюты - UAH, EUR, USD.
        * Курс валют захардкодить в код
        * Курс применяется только к total
*/

const products = [
    {
        id: "id-1",
        name: 'Title 1',
        price: '100',
        image: 'https://images-na.ssl-images-amazon.com/images/I/616MVaXD29L._AC_SX679_.jpg',
        counter: 0
    },
    {
        id: "id-2",
        name: 'Title 2',
        price: '300',
        image: 'https://images-na.ssl-images-amazon.com/images/I/616MVaXD29L._AC_SX679_.jpg',
        counter: 0
    }
];

class Cart {
    constructor(products){
        this.products = products;
        this.cartProduct = document.querySelector('.cart-product');
        this.buttons = document.querySelectorAll('button.product__action');
        this.totalContainer = document.querySelector('#total');
        this.clearAllButton = document.querySelector('#clear-all');
        this.currencySelect = document.querySelector("#currency");
        this.usd = 0.036;
        this.euro = 0.03;
        this.usdBool = false;
        this.uahBool = true;
        this.euroBool = false;
        this.total = 0;
        this.#set();
    }
    #set(){
        this.products.map(item => item.counter = localStorage.getItem(item.name));
        let that = this;
        this.buttons.forEach(btn => {
        btn.addEventListener('click', this.onButtonAddClick)
        });
        this.clearAllButton.addEventListener('click', this.clearAll);
        this.currencySelect.addEventListener('change', function () {
        this.value == 'usd' ? that.usdBool = true : that.usdBool = false;
        this.value == 'euro' ? that.euroBool = true : that.euroBool = false;
        this.value == 'uah' ? that.uahBool = true : that.uahBool = false;
        that.totalContainer.innerHTML = that.currencyAdjustment(localStorage.getItem('total'));
        });
        
        this.products.map(function(item){
            if(localStorage[item.id]) {
                let newDiv = document.createElement('div');
                newDiv.classList.add("product-in-cart");
                newDiv.setAttribute("data-product-id", item.id);
                newDiv.innerHTML = JSON.parse(localStorage.getItem(item.id));
                that.cartProduct.appendChild(newDiv);
            }
        })
        localStorage.getItem('total') ? this.totalContainer.innerHTML = this.currencyAdjustment(localStorage.getItem('total')) : 0;
        this.loadEvent();
    }
    onButtonAddClick = event => {
        const productId = event.target.dataset.productId;
        const currentProduct = this.products.find(item => item.id == productId);
        currentProduct.counter++;
        localStorage.setItem(currentProduct.name,currentProduct.counter)
        this.addToCart(productId,currentProduct);
        }
    addToCart(productID, product){
        let productCart = this.cartProduct.querySelector(`[data-product-id="${productID}"]`);
        if (productCart){    
            this.createHTML(productCart, product);                 
        } else {
            let newDiv = document.createElement('div');
            newDiv.classList.add("product-in-cart");
            newDiv.setAttribute("data-product-id", productID);
            this.createHTML(newDiv, product);
            this.cartProduct.appendChild(newDiv);
        }
        this.totalPrice (this.products)
        this.loadEvent();
    }
    createHTML(parent, product){
        localStorage.setItem(product.id, JSON.stringify(`<span>${product.name}:</span> <span class="remove add-remove" data-product-id="${product.id}"> - </span> ${product.counter} <span class="add add-remove" data-product-id="${product.id}"> + </span> <span>${this.priceOfItem(product)}&#8372;</span> <span class="delete" data-product-id="${product.id}"> X</span>`));
        parent.innerHTML = JSON.parse(localStorage.getItem(product.id));
    }
    add = event => {
        const productId = event.target.dataset.productId;
        const currentProduct = this.products.find(item => item.id == productId);
        currentProduct.counter++;
        localStorage.setItem(currentProduct.name,currentProduct.counter)
        this.addToCart(productId,currentProduct);
    }
    remove = event => {
        const product = event.target.parentElement;
        const productId = event.target.dataset.productId;
        const currentProduct = products.find(item => item.id == productId);
        currentProduct.counter--;
        localStorage.setItem(currentProduct.name,currentProduct.counter)
        this.addToCart(productId,currentProduct);
        this.removeFromBasket(currentProduct, product);
    }
    loadEvent = () => {
        const addInCart = this.cartProduct.querySelectorAll('.add');
        addInCart.forEach(addProd => {
        addProd.addEventListener('click', this.add)});

        const removeInCart = this.cartProduct.querySelectorAll('.remove');
        removeInCart.forEach(removeProd => {
        removeProd.addEventListener('click', this.remove)});

        const removeProduct = this.cartProduct.querySelectorAll('.delete');
        removeProduct.forEach(removeProd => {
        removeProd.addEventListener('click', this.deleteProduct)});
    }
    removeFromBasket(currentProduct, product){
        if(currentProduct.counter == 0) {
            localStorage.removeItem(currentProduct.id);
            localStorage.removeItem(currentProduct.name);
            product.remove();
        }
    }
    deleteProduct = event => {
    const product = event.target.parentElement;
    const productId = event.target.dataset.productId;
    const currentProduct = products.find(item => item.id == productId);
    currentProduct.counter = 0;
    this.addToCart(productId,currentProduct);
    this.removeFromBasket(currentProduct, product);
}
    priceOfItem(item){
        return item.counter * item.price;
    }
    totalPrice (arr) {
        this.total = arr.map(item => this.priceOfItem(item));
        this.total = this.total.reduce((accumulator, currentValue) => accumulator + currentValue);
        localStorage.setItem('total', this.total);
        this.totalContainer.innerHTML = this.currencyAdjustment(localStorage.getItem('total'));
        if(!(this.total > 0)) {
            localStorage.removeItem('total');
        }
    }
    currencyAdjustment(total){
        if(this.usdBool){
            return Math.floor(total * this.usd) + '$';
        } 
        if(this.euroBool){
            return Math.floor(total * this.euro) + '&euro;';
        }
        if(this.uahBool){
            return total + '&#8372;';
        }
    }
    clearAll = () =>{
        this.totalContainer.innerHTML = '0';
        this.cartProduct.innerHTML = '';
        this.products.map(item => item.counter = 0);
        localStorage.clear();
    }
}

window.addEventListener('load', () => {

    const productsContainer =  document.querySelector('.products');

    productsContainer.innerHTML = `${products.map(item => `
        <div class="product solid">   
            <div class="product__title">${item.name}</div>
            <img class="product__image" src="${item.image}">
            <div class="product__price">
                <button class="product__action" data-product-id="${item.id}">Add</button>
                <span>${item.price}</span>
            </div>  
        </div>
    `).join('')}`;

    const myBasket = new Cart(products);
})