// Картка товару

let shoppingCart = document.getElementById("shopping-cart");
let totalprice = document.querySelector(".wine-store__price");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let productAmount = document.getElementById("productAmount");
    productAmount.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

calculation();

let getProducts = async function () {
    let obj = await fetch("https://run.mocky.io/v3/e0b3531d-b263-47ef-abaf-3aedbcaf598e");
    let array = await obj.json();

    let cartItems = () => {
        if (basket.length !== 0) {

            shoppingCart.innerHTML = basket.map((x) => {

                let {
                    id,
                    item
                } = x;

                let search = array.find((x) => x.id === id) || [];

                let {
                    image,
                    productTitle,
                    newPrice
                } = search;

                return `
                                                 <div class="product-cart__item">
                                                     <img class="product-cart__image" src=${image} alt = "product-image" />
                                                     <div class="product-cart__details">
                                                        <h3 class="product-cart__title">${productTitle}</h3>
                                                        <p class="product-cart__price">Rs. ${newPrice} <span> x ${item}</span> = ${item * newPrice}</p>
                                                        <div class="product-cart__amount">
                                                        <i class="ri-subtract-line product-cart__decrement" onclick = "decrement(${id})"></i>
                                                        <span class="product-cart__quantity">${item}</span>
                                                        <i class="ri-add-line product-cart__increment" onclick = "increment(${id})"></i>
                                                        </div>
                                                        </div>
                                                     <div class="product-cart__close" onclick= "removeItem(${id})"><i class="ri-close-line"></i></div>
                                                </div>
                            `;
            }).join("")

        } else {
            shoppingCart.innerHTML = ``
        }
    }

    cartItems();

    let totalAmount = () => {
        if (basket.length !== 0) {
            let amount = basket.map(x => {
                let {
                    item,
                    id
                } = x;

                let search = array.find(y => y.id == id) || [];

                return item * search.newPrice;
            }).reduce((x, y) => x + y, 0)
            totalprice.innerHTML = `
            <div class = "wine-store__content">
             <h2 class="wine-store__total">Total Bill : Res. ${amount}</h2>
             <a class="wine-store__home" href="index.html" onclick="clearCart()">Clear Cart</a>
             </div>
             `
        } else {
            totalprice.innerHTML = `
            
    <div class = "wine-store__content">
        <h2 class="wine-store__title">Cart is Empty</h2>
        <a class = "wine-store__home" href="index.html">Back to Home</a>
    </div>
   `;
        }
    }

    totalAmount();
}

getProducts();

let removeItem = (id) => {
    basket = basket.filter((x) => x.id !== id);
    getProducts();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}

let increment = (id) => {
    let selectedProduct = id;
    let search = basket.find((x) => x.id === selectedProduct)

    if (search === undefined) {
        basket.push({
            id: selectedProduct,
            item: 1,
        })

    } else {
        search.item += 1;
    }

    getProducts();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}

let decrement = (id) => {
    let selectedProduct = id;
    let search = basket.find((x) => x.id === selectedProduct)

    if (search.item === 0) return;
    else {
        search.item -= 1;
    }

    basket = basket.filter((x) => x.item !== 0);
    getProducts();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}


let clearCart = () => {
    basket = [];
    getProducts();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};
