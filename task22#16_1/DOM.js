window.addEventListener('load', () => {
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
            image: 'https://images-na.ssl-images-amazon.com/images/I/616MVaXD29L._AC_SX679_.jpg'
        },
        {
            id: "id-2",
            name: 'Title 2',
            price: '300',
            image: 'https://images-na.ssl-images-amazon.com/images/I/616MVaXD29L._AC_SX679_.jpg'
        },
        {
            id: "id-3",
            name: 'Title 3',
            price: '400',
            image: 'https://images-na.ssl-images-amazon.com/images/I/616MVaXD29L._AC_SX679_.jpg'
        }
    ];
    let totalCost = 0;
    let cart = localStorage.products ? JSON.parse(localStorage.products) : {};
    const clearAllButton = document.querySelector('#clear-all');
    const cartProduct = document.querySelector('.cart-product');
    const currencySelect = document.querySelector("#currency");
    const usd = 0.036;
    const euro = 0.03;
    
    const productsContainer =  document.querySelector('.products');

    productsContainer.innerHTML = `${products.map(item => {
        let name = item.name;
        if(!name) {
            name = 'Default name';
        }
        return `
        <div class="product solid">   
            <div class="product__title ${item.name ? '' : 'grey'}">${name}</div>
            <img class="product__image" src="${item.image}">
            <div class="product__price">
                <button class="product__action" data-product-id="${item.id}">Add</button>
                <span>${item.price}</span>
            </div>  
        </div>
    `;
    }).join('')}`;

    const buttons = productsContainer.querySelectorAll('button.product__action');
    const totalContainer = document.querySelector('#total')

    buttons.forEach(btn => {
        btn.addEventListener('click', onButtonAddClick)
    })

    function renderCart(){
        if(!localStorage.products){
            cartProduct.innerHTML = '';
            totalContainer.innerHTML = currencyAdjustment(totalCost);
            return
        }
        cart = JSON.parse(localStorage.products);
        let arr = [];
        for(product in cart) {
            if(cart[product].counter > 0) {
        arr.push(`<div><span>${product}:</span> <span class="remove add-remove" data-product-id="${cart[product].id}"> - </span> ${cart[product].counter} <span class="add add-remove" data-product-id="${cart[product].id}"> + </span> <span>${cart[product].price}&#8372;</span> <span class="delete" data-product-id="${cart[product].id}"> X</span><div>`);}
        }
        cartProduct.innerHTML = arr.map(item => {return item}).join('');
        eventListenerInCart();
        renderTotal();

        const deletProducts = document.querySelectorAll(".delete");
        deletProducts.forEach(item => item.addEventListener('click', deletProductInCart));
    }

    function deletProductInCart(event){
        const productId = event.target.dataset.productId;
        const currentProduct = products.find(item => item.id == productId);
        cart = JSON.parse(localStorage.products);
        delete cart[currentProduct.name];
        localStorage.products = JSON.stringify(cart);
        renderCart();
    }

    function renderTotal(){
        if(!localStorage.products){
            totalCost = 0;
            totalContainer.innerHTML = currencyAdjustment(totalCost);
            return
        }
        cart = JSON.parse(localStorage.products);
        let arr = [];
        for(product in cart) {
            arr.push(Number(cart[product].price));
        }
        if(Object.keys(cart).length > 0){
            totalCost = arr.reduce((sum, cur) => sum + cur);
            totalContainer.innerHTML = currencyAdjustment(totalCost);
        } else {
            totalCost = 0;
            totalContainer.innerHTML = currencyAdjustment(totalCost);
            localStorage.removeItem('products');
        }
    }

    function addProductInCart(prod = event) {
        const productId = event.target.dataset.productId;
        const currentProduct = products.find(item => item.id == productId);
        if(localStorage.products){
            cart = JSON.parse(localStorage.products);
        }
        if(!(cart[currentProduct.name])) {
            cart[currentProduct.name] = {
                price: currentProduct.price,
                counter: 1,
                id: currentProduct.id}
        } else {
            cart[currentProduct.name].price = Number(cart[currentProduct.name].price) + Number(currentProduct.price);
            cart[currentProduct.name].counter = Number(cart[currentProduct.name].counter)+1;
        }
        localStorage.products = JSON.stringify(cart);
        renderCart();
    }

    function eventListenerInCart(){
        const addInCart = document.querySelectorAll('.add');
        const removeInCart = document.querySelectorAll('.remove');
        addInCart.forEach(add => {
            add.addEventListener('click', addProductInCart)
        });
        removeInCart.forEach(remove => {
            remove.addEventListener('click', removeProductInCart)
        })
    }

    function removeProductInCart(event) {
        const productId = event.target.dataset.productId;
        const currentProduct = products.find(item => item.id == productId);
        if(localStorage.products){
            cart = JSON.parse(localStorage.products);
        }
        cart[currentProduct.name].price = Number(cart[currentProduct.name].price) - Number(currentProduct.price);
        cart[currentProduct.name].counter = Number(cart[currentProduct.name].counter)-1;
        if(cart[currentProduct.name].counter < 1){
            delete cart[currentProduct.name];
        }
        localStorage.products = JSON.stringify(cart);
        renderCart();
        eventListenerInCart()
    }

    function onButtonAddClick(event) {
        const productId = event.target.dataset.productId;
        const currentProduct = products.find(item => item.id == productId);
        addProductInCart(currentProduct);
    }

    clearAllButton.addEventListener('click', function(){
        localStorage.removeItem('products');
        cart = {};
        totalCost = 0;
        renderCart();
    });

    currencySelect.addEventListener('change', event => {
        renderTotal();
    })

    function currencyAdjustment(total){
        if(currencySelect.value == 'usd'){
            return Math.floor(total * usd) + '$';
        } 
        if(currencySelect.value == 'euro'){
            return Math.floor(total * euro) + '&euro;';
        }
        if(currencySelect.value == 'uah'){
            return total + '&#8372;';
        }
    }
    renderCart();
})