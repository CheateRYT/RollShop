// Обьект магазина

let shop = {
  page: 1,
  cart: [],
  products: [
    {
      id: 1,
      name: "Филадельфия хит ролл",
      img: "img/roll/philadelphia.jpg",
      amount: 6,
      count: 1,
      weight: 180,
      price: 300,
    },
    {
      id: 2,
      name: "Калифорния темпура",
      img: "img/roll/california-tempura.jpg",
      amount: 6,
      count: 1,
      weight: 205,
      price: 250,
    },
    {
      id: 3,
      name: "Запеченый ролл «Калифорния»",
      img: "img/roll/zapech-california.jpg",
      amount: 6,
      count: 1,
      weight: 182,
      price: 230,
    },
    {
      id: 4,
      name: "Филадельфия",
      img: "img/roll/philadelphia.jpg",
      amount: 6,
      count: 1,
      weight: 230,
      price: 320,
    },
    {
      id: 5,
      name: "Филадельфия хит ролл",
      img: "img/roll/philadelphia.jpg",
      amount: 6,
      count: 1,
      weight: 180,
      price: 555,
    },
    {
      id: 6,
      name: "Калифорния темпура",
      img: "img/roll/california-tempura.jpg",
      amount: 6,
      count: 1,
      weight: 2221,
      price: 424,
    },
    {
      id: 7,
      name: "Запеченый ролл «Калифорния»",
      img: "img/roll/zapech-california.jpg",
      amount: 6,
      count: 1,
      weight: 50,
      price: 111,
    },
    {
      id: 8,
      name: "Филадельфия",
      img: "img/roll/philadelphia.jpg",
      amount: 6,
      count: 1,
      weight: 790,
      price: 890,
    },
    {
      id: 9,
      name: "Филадельфия хит ролл",
      img: "img/roll/philadelphia.jpg",
      amount: 6,
      count: 1,
      weight: 180,
      price: 126,
    },
    {
      id: 10,
      name: "Калифорния темпура",
      img: "img/roll/california-tempura.jpg",
      amount: 6,
      count: 1,
      weight: 212,
      price: 378,
    },
    {
      id: 11,
      name: "Запеченый ролл «Калифорния»",
      img: "img/roll/zapech-california.jpg",
      amount: 6,
      count: 1,
      weight: 100,
      price: 292,
    },
    {
      id: 12,
      name: "Филадельфия",
      img: "img/roll/philadelphia.jpg",
      amount: 6,
      count: 1,
      weight: 230,
      price: 430,
    },
  ],
};

//Меню выбора фильтра
const filterButton = document.querySelector('.filter-button');
const priceSort = document.getElementById('price-sort');
const weightSort = document.getElementById('weight-sort');

filterButton.addEventListener('click', () => {
  const selectedPriceSort = priceSort.value;
   filterProducts('price', selectedPriceSort);
  // Обновляем все страницы после применения фильтра
  showProducts(shop.page,4)
    
});


//Функция для фильтра массива с продуктами 
// Глобальная переменная для хранения текущего состояния отсортированного массива
let sortedProducts = [...shop.products];
 // Функция для фильтра массива с продуктами 
 function filterProducts(filterType, sortOrder) {
  // Используем sortedProducts вместо shop.products
  sortedProducts = [...shop.products];
  if (sortOrder === 'without') { // добавляем условие для опции "Без сортировки"
    return; // просто выходим из функции без сортировки
  }
  if (filterType === 'price' || filterType === 'weight') {
    sortedProducts.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[filterType] - b[filterType];
      } else if (sortOrder === 'desc') {
        return b[filterType] - a[filterType];
      }
    });
    // Обновляем количество страниц после сортировки
    let pagesCount = Math.ceil(sortedProducts.length / 4);
    for(let i = 1; i <= pagesCount; i++) {
      showProducts(i, 4);
    }
    shopCurrentProducts = extractCurrentProducts(1, 4); // добавьте эту строку
  }
}
 // Вырезать первые 4 товара для главной страницы


console.log(shop.products)
//Функция для расчета количества страниц
const pageCountBlock = document.querySelector(".page-strip");

function checkPageCount() {
  let productsCount = shop.products.length;
  let elementsOnPageCount = 4;
  let pagesCount = Math.ceil(productsCount / elementsOnPageCount);
  console.log(pagesCount);
  for (let i = 0; i < pagesCount; i++) {
    let activeClass = i === 0 ? "pagination__item--active" : "";
    pageCountBlock.innerHTML += `<div href="" class="pagination__item ${activeClass}">${
      i + 1
    }</div>`;
  }
}
//Вырезать первые 4 товара для главной страницы
function extractCurrentProducts(pageNumber, elementCount) {
  const startIndex = (pageNumber - 1) * elementCount;
  const endIndex = startIndex + elementCount;
  // Используем sortedProducts вместо shop.products
  const shopCurrentProducts = sortedProducts.slice(startIndex, endIndex);
  return shopCurrentProducts;
}
extractCurrentProducts(shop.page, 4);
console.log(extractCurrentProducts(1, 4));
let shopCurrentProducts = extractCurrentProducts(shop.page, 4);

const rows = document.querySelectorAll(".row");
const cardWrapper = rows[rows.length - 1];

//Функция отрисовки товаров
function showProducts(pageNumber, elementCount) {
  cardWrapper.innerHTML = "";
  extractCurrentProducts(pageNumber, elementCount).forEach((product) => {
    cardWrapper.innerHTML += `
  <div class="col-md-6">
  <div class="card mb-4" data-id="${product.id}">
    <img class="product-img" src="${product.img}" alt="">
    <div class="card-body text-center">
      <h4 class="item-title">${product.name}</h4>
      <p><small data-items-in-box class="text-muted">${product.amount}шт.</small></p>
       <div class="details-wrapper">
        <div class="items counter-wrapper">
          <div class="items__control" data-action="minus">-</div>
          <div class="items__current" data-counter>${product.count}</div>
          <div class="items__control" data-action="plus">+</div>
        </div>
         <div class="price">
          <div class="price__weight">${product.weight}г.</div>
          <div class="price__currency">${product.price} ₽</div>
        </div>
      </div>
       <button data-cart  type="button" class="btn btn-block btn-outline-warning">+ в корзину</button>
     </div>
  </div>
  </div>`;
  });
  const minusButtons = document.querySelectorAll(
    '.items__control[data-action="minus"]'
  );
  const plusButtons = document.querySelectorAll(
    '.items__control[data-action="plus"]'
  );
  minusButtons.forEach(function (minusButton) {
    minusButton.addEventListener("click", function () {
      const productCard = this.closest(".card");
      const countElement = productCard.querySelector(".items__current");
      if (productCard && parseInt(countElement.textContent) > 1) {
        countElement.textContent = parseInt(countElement.textContent) - 1;
        const product = extractCurrentProducts(pageNumber, elementCount).find(
          (product) => product.id === parseInt(productCard.dataset.id)
        );
        if (product) {
          product.count = parseInt(countElement.textContent);
        }
      }
    });
  });
  plusButtons.forEach(function (plusButton) {
    plusButton.addEventListener("click", function () {
      const productCard = this.closest(".card");
      if (productCard) {
        const countElement = productCard.querySelector(".items__current");
        countElement.textContent = parseInt(countElement.textContent) + 1;
        const product = extractCurrentProducts(pageNumber, elementCount).find(
          (product) => product.id === parseInt(productCard.dataset.id)
        );
        if (product) {
          product.count = parseInt(countElement.textContent);
        }
      }
    });
  });

  //Кнопка добавления в корзину
  const cartButtons = document.querySelectorAll("[data-cart]");
  cartButtons.forEach(function (cartButton, index) {
    cartButton.addEventListener("click", function () {
      const product = shopCurrentProducts[index];
      const existingProduct = shop.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.count += product.count;
        const cartItem = document.querySelector(
          `.cart-item[data-id="${product.id}"] `
        ); // Get cart item
        const counterElement = cartItem.querySelector("[data-counter]");
        counterElement.textContent = existingProduct.count;
        checkCart();
      } else {
        shop.cart.push({
          id: product.id,
          count: product.count,
          price: product.price,
        });
        toCart(product);
        checkCart();
      }
      product.count = 1;
      const productCard = document.querySelector(
        ` .card[data-id="${product.id}"]`
      );
      const countElement = productCard.querySelector(".items__current");
      countElement.textContent = product.count;
      cartButton.textContent = "Добавлено";
      checkCart();
      setTimeout(function () {
        cartButton.textContent = "+ в корзину";
      }, 5000);
    });
  });
}
//Изменение товаров при нажатии на страницы
//const pageChangersItems = document.querySelectorAll('.pagination__item');
//document.querySelector('.page-strip').addEventListener('click', (event) => {
// if (event.target && event.target.classList.contains('pagination__item')) {
//   let pageChangersItem = event.target;
//   let page = pageChangersItem.textContent;
//   pageChangersItem.classList.toggle('pagination__item--active');
//   showProducts(page, 4);
// }
//});

const cardWrapper2 = rows[rows.length - 2];
document.body.addEventListener("click", (event) => {
  if (event.target && event.target.classList.contains("pagination__item")) {
    let pageChangersItem = event.target;
    let page = pageChangersItem.textContent;
    let allPageChangersItems = document.querySelectorAll(".pagination__item");
    allPageChangersItems.forEach((item) => {
      item.classList.remove("pagination__item--active");
    });
    pageChangersItem.classList.add("pagination__item--active");
    shopCurrentProducts = extractCurrentProducts(page, 4); // обновляем продукты для текущей страницы
    showProducts(page, 4); // передаем номер страницы вместо shop.page
  }
  // остальной код

  if (
    event.target.dataset.action === "minus" ||
    event.target.dataset.action === "plus"
  ) {
    console.log(event.target.dataset.action);
    const cartItem = event.target.closest(".cart-item");
    if (cartItem) {
      console.log(event.target.closest);
      console.log(cartItem);
      checkCart();
      const product = shop.cart.find(
        (item) => item.id === parseInt(cartItem.dataset.id)
      );
      console.log(cartItem);
      const counterElement = cartItem.querySelector("[data-counter]");
      if (event.target.dataset.action === "minus") {
        checkCart();
        if (product.count > 1) {
          console.log(shop);
          product.count -= 1;
          counterElement.textContent = product.count;
          checkCart();
        } else {
          // удаляем товар из корзины, если его количество равно 0

          shop.cart = shop.cart.filter((item) => item.id !== product.id);
          cartItem.remove();
          checkCart();
        }
      } else {
        product.count += 1;
        counterElement.textContent = product.count;
        checkCart();
      }
    }
  }

  console.log(event);
});

// обработчики событий для кнопок уменьшения и увеличения количества товара
const cart = document.querySelector(".cart-wrapper");
function toCart(product) {
  const existingProduct = document.querySelector(
    `.cart-item[data-id="${product.id}"]`
  );

  if (existingProduct) {
    const counterElement = existingProduct.querySelector("[data-counter]");
    counterElement.textContent =
      parseInt(counterElement.textContent) + product.count;
  } else {
    cart.innerHTML += `<div class="cart-item" data-id="${product.id}">
  <div class="cart-item__top">
    <div class="cart-item__img">
      <img src="${product.img}" alt="">
    </div>
    <div class="cart-item__desc">
      <div class="cart-item__title">${product.name}</div>
      <div class="cart-item__weight">${product.amount} шт.</div>
       <div class="cart-item__details">
         <div class="items items--small counter-wrapper">
          <div class="items__control" data-action="minus">-</div>
          <div class="items__current" data-counter="">${product.count}</div>
          <div class="items__control" data-action="plus">+</div>
        </div>
         <div class="price">
          <div class="price__currency">${product.price} ₽</div>
        </div>
       </div>
     </div>
  </div>
</div>`;
  }
}

//Проверка на пустоту корзины

function checkCart() {
  let cartAlert = document.getElementById("alert");
  const totalPrice = document.querySelector(".total-price");
  if (shop.cart.length > 0) {
    cartAlert.style.display = "none";
    let totalPriceCounter = 0;
    shop.cart.forEach((item) => {
      totalPriceCounter += item.price * item.count;
      console.log(totalPriceCounter);
      totalPrice.textContent = totalPriceCounter;
    });
  } else {
    cartAlert.style.display = "block";
    totalPrice.textContent = "0";
  }
}


extractCurrentProducts(shop.page, 4);
checkPageCount();
showProducts(1, 4);
checkCart();
console.log(shop);
console.log("console.log(shop)");
