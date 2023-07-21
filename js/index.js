// Обьект магазина

let shop = {
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
      weight: 205,
      price: 424,
    },
    {
      id: 7,
      name: "Запеченый ролл «Калифорния»",
      img: "img/roll/zapech-california.jpg",
      amount: 6,
      count: 1,
      weight: 182,
      price: 111,
    },
    {
      id: 8,
      name: "Филадельфия",
      img: "img/roll/philadelphia.jpg",
      amount: 6,
      count: 1,
      weight: 230,
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
      weight: 205,
      price: 378,
    },
    {
      id: 11,
      name: "Запеченый ролл «Калифорния»",
      img: "img/roll/zapech-california.jpg",
      amount: 6,
      count: 1,
      weight: 182,
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


//Вырезать первые 4 товара для главной страницы 
function extractCurrentProducts(pageNumber, elementCount) {
  const startIndex = (pageNumber - 1) * elementCount;
  const endIndex = startIndex + elementCount;
  const shopCurrentProducts = shop.products.slice(startIndex, endIndex);
  return shopCurrentProducts;
}
extractCurrentProducts(1 , 4);
console.log(extractCurrentProducts(1 , 4))
let shopCurrentProducts = extractCurrentProducts(1 , 4);

const rows = document.querySelectorAll(".row");
const cardWrapper = rows[rows.length - 1];

 //Функция отрисовки товаров
function showProducts(pageNumber,elementCount) { 
  cardWrapper.innerHTML = '';
  extractCurrentProducts(pageNumber , elementCount).forEach((product) => {
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


//Изменение товаров при нажатии на страницы
const pageChangersItems = document.querySelectorAll('.pagination__item')
pageChangersItems.forEach(pageChangersItem => {
  pageChangersItem.addEventListener('click', () => {
    let page = pageChangersItem.textContent;
    pageChangersItems.forEach(item => {
      if (item != pageChangersItem) { //Изменение цвета нажатой кнопки
        item.classList.remove('pagination__item--active')
      } else {
        item.classList.add('pagination__item--active')
      }
      showProducts(page, 4);
    })
  })
})



 // обработчики событий для кнопок уменьшения и увеличения количества товара
 // обработчики событий для кнопок уменьшения и увеличения количества товара
const minusButtons = document.querySelectorAll('.items__control[data-action="minus"]');
const plusButtons = document.querySelectorAll('.items__control[data-action="plus"]');
minusButtons.forEach(function (minusButton) {
  minusButton.addEventListener("click", function () {
    const productCard = this.closest(".card");
    const countElement = productCard.querySelector(".items__current");
    if (productCard && parseInt(countElement.textContent) > 1) {
      countElement.textContent = parseInt(countElement.textContent) - 1;
      const product = extractCurrentProducts(pageNumber , elementCount).find(product => product.id === parseInt(productCard.dataset.id));
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
      const product = extractCurrentProducts(pageNumber , elementCount).find(product => product.id === parseInt(productCard.dataset.id));
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
    const existingProduct = shop.cart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.count += product.count;
      const cartItem = document.querySelector(`.cart-item[data-id="${product.id}"]`); //Получаем карточку корзины
      const counterElement = cartItem.querySelector('[data-counter]');
      counterElement.textContent = existingProduct.count; // 
      checkCart()
    } else {
      shop.cart.push({ id: product.id, count: product.count, price: product.price });
      toCart(product);
      checkCart()
    }
    product.count = 1; // обновляем значение счетчика вне корзины
    const productCard = document.querySelector(`.card[data-id="${product.id}"]`);
    const countElement = productCard.querySelector(".items__current");
    countElement.textContent = product.count; // обновляем отображение счетчика вне корзины
    cartButton.textContent = "Добавлено"
    checkCart();
    setTimeout(function () {
      cartButton.textContent = "+ в корзину";
    }, 5000);
  });
});


const cart = document.querySelector(".cart-wrapper");
function toCart(product) {
  const existingProduct = document.querySelector(`.cart-item[data-id="${product.id}"]`);
  
  if (existingProduct) {
    const counterElement = existingProduct.querySelector('[data-counter]');
    counterElement.textContent = parseInt(counterElement.textContent) + product.count;
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

//Проверка на пустоту корзины и итоговую


//Добавление и удаление товаров из корзины
document.querySelector('.cart-wrapper').addEventListener('click', function(event) {
  if (event.target.dataset.action === 'minus' || event.target.dataset.action === 'plus') {
    const cartItem = event.target.closest('.cart-item');
    checkCart()
    const product = shop.cart.find(item => item.id === parseInt(cartItem.dataset.id));
    const counterElement = cartItem.querySelector('[data-counter]');
    if (event.target.dataset.action === 'minus') {
      checkCart()
      if (product.count > 1) {
        console.log(shop)
        product.count -= 1;
        counterElement.textContent = product.count;
        checkCart()
      } else {
        // удаляем товар из корзины, если его количество равно 0
       
        shop.cart = shop.cart.filter(item => item.id !== product.id);
        cartItem.remove();  
        checkCart() 
      }
    } else {
      product.count += 1;
      counterElement.textContent = product.count;
      checkCart()
    }
  }
});


}
function checkCart() {
  let cartAlert = document.getElementById('alert')
  const totalPrice = document.querySelector('.total-price')
  if (shop.cart.length > 0) {
    cartAlert.style.display = 'none';
   let totalPriceCounter = 0;
    shop.cart.forEach(item => {
    totalPriceCounter += item.price * item.count;
    console.log(totalPriceCounter);
    totalPrice.textContent = totalPriceCounter;
    })
  } else {
    cartAlert.style.display = 'block';
    totalPrice.textContent = '0';
  }
}
 showProducts(1, 4);


checkCart();
console.log(shop)
console.log('console.log(shop)')