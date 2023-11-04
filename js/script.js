// search

const searchIcon = document.querySelector(".menu__icon");
const searchForm = document.querySelector(".menu__search-widget");

searchIcon.addEventListener('click', () => {
    if (searchForm.classList.contains("menu__search-widget--show")) {
        searchForm.classList.remove("menu__search-widget--show")
    } else {
        searchForm.classList.add("menu__search-widget--show")
    }
})

// burger-menu

const burgerIcon = document.querySelector('.header__burger');
const menu = document.querySelector('.menu');
const links = document.querySelectorAll('.menu__link');

burgerIcon.addEventListener('click', () => {
    burgerIcon.classList.toggle('menu--show');
    if (burgerIcon.classList.contains('menu--show')) {
        menu.classList.add('menu--show')
    } else {
        menu.classList.remove('menu--show')
    }
})

links.forEach(link => {
    link.addEventListener('click', function () {
        burgerIcon.classList.remove('menu--show');
        menu.classList.remove('menu--show');
    })
})

// Плавний перехід по меню

const link = document.querySelectorAll('a[href*="#"]');

link.forEach(linkMenu => {
    linkMenu.addEventListener("click", function (event) {
        event.preventDefault();
        const linkId = linkMenu.getAttribute('href');
        document.querySelector('' + linkId).scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    })
})

// Sliders

const swiper = new Swiper('.swiperBaner', {
    speed: 400,
    loop: true,
    autoplay: {
        delay: 5000,
    },
});

const slider = new Swiper(".mySwiper", {
    autoplay: false,
    pagination: {
        effect: 'flip',
        el: ".swiper-pagination",
        clickable: true,
    },
    effect: "fade",
    fadeEffect: {
        crossFade: true,
    },
});

const sliderProduct = new Swiper(".productSwiper", {
    autoplay: false,
    loop: false,

    pagination: {
        effect: 'flip',
        el: ".swiper-pagination",
        clickable: true,
    },

    slidesPerView: 1,

    breakpoints: {
        // when window width is >= 500px
        500: {
            slidesPerView: 2,
        },

        // when window width is >= 780px
        780: {
            slidesPerView: 3,
        },

        // when window width is >= 940px
        940: {
            slidesPerView: 4,
        }
    }
});

// Отримання карток товару з серверу й розміщення їх на сторінці

let list = document.querySelector(".products__list");

async function getProducts() {
    let obj = await fetch("https://run.mocky.io/v3/a7e3b709-d436-4b9b-b079-ce74684dcbb4");
    let array = await obj.json();
    renderProducts(array);
}

getProducts();

function renderProducts(array) {
    array.forEach(product => {
        let {
            id,
            image,
            ribbon,
            productTitle,
            newPrice,
            oldPrice
        } = product;


        let productItemStart = `
    <div class="swiper-slide">
        <article class="products__item">
    `;

        let productItemEnd = `
    </article>
    </div>
    `;

        let productImage = ``;

        let productImageStart = `
    <div class="products__image">
        <img src="${image}" alt="product">
    `;

        let productImageEnd = `
    <div class="products__block products__block--1">
      <span class="products__icon products__basket">
        <i class="ri-shopping-basket-2-line" onclick="increment(${id})"></i>
      </span>
    </div>

    <div class="products__block products__block--2">
      <span class="products__icon">
        <i class="ri-heart-fill products__like" onclick="likesAdd(${id})"></i>
      </span>
    </div>

    <div class="products__block products__block--3">
    <a href="${image}" data-fancybox="gallery">
       <span class="products__icon">
          <i class="ri-eye-fill"></i>
       </span>
    </a>
    </div>
    </div>
    `
        let productRibbon = ``
        if (product.ribbon) {
            productRibbon = `       
        <div class="products__ribbon">
           <span>${ribbon}</span>
        </div>          
        `
        }

        productImage += productImageStart;
        productImage += productRibbon;
        productImage += productImageEnd;

        let productContent = `
   
    <div class="products__details">
           <h2 class="products__product-title">${productTitle}</h2>
           <div class="products__price">
               <span class="products__new-price">Rs. ${newPrice}</span>
               <del class="products__old-price">Rs. ${oldPrice}</del>
           </div>
    </div>       
    `
        let productBlock = ``;
        productBlock += productItemStart;
        productBlock += productImage;
        productBlock += productContent;
        productBlock += productItemEnd;

        list.innerHTML += productBlock;

    })   
}

// Додавання товару в корзину

let basket = JSON.parse(localStorage.getItem("data")) || [];

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

    calculation()
    localStorage.setItem("data", JSON.stringify(basket));
}

let calculation = () => {
    let productAmount = document.getElementById("productAmount");
    productAmount.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

calculation();

