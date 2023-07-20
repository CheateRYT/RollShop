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
  ],
};

// Динамическое добавление товаров
const rows = document.querySelectorAll(".row");
const cardWrapper = rows[rows.length - 1];
 shop.products.forEach((product) => {
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
 // обработчики событий для кнопок уменьшения и увеличения количества товара
const minusButtons = document.querySelectorAll('.items__control[data-action="minus"]');
const plusButtons = document.querySelectorAll('.items__control[data-action="plus"]');
minusButtons.forEach(function (minusButton) {
  minusButton.addEventListener("click", function () {
    const productCard = this.closest(".card");
    const countElement = productCard.querySelector(".items__current");
    if (productCard && parseInt(countElement.textContent) > 1) {
      countElement.textContent = parseInt(countElement.textContent) - 1;
      const product = shop.products.find(product => product.id === parseInt(productCard.dataset.id));
      if (product) {
        product.count = parseInt(countElement.textContent);
      }
      const cartItem = document.querySelector(`.cart-item[data-id="${product.id}"]`);
      if (cartItem) {
        const counterElement = cartItem.querySelector('[data-counter]');
        counterElement.textContent = product.count;
        if (product.count < 1) {
          cartItem.remove();
        }
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
      const product = shop.products.find(product => product.id === parseInt(productCard.dataset.id));
      if (product) {
        product.count = parseInt(countElement.textContent);
      }
      const cartItem = document.querySelector(`.cart-item[data-id="${product.id}"]`);
      if (cartItem) {
        const counterElement = cartItem.querySelector('[data-counter]');
        counterElement.textContent = product.count;
      }
    }
  });
});

//Кнопка добавления в корзину
const cartButtons = document.querySelectorAll("[data-cart]");
cartButtons.forEach(function (cartButton, index) {
  cartButton.addEventListener("click", function () {
    checkCart() 
    const product = shop.products[index];
    const existingProduct = shop.cart.find(item => item.id === product.id);
    if (existingProduct) {
      checkCart() 
      existingProduct.count += product.count;
      const cartItem = document.querySelector(`.cart-item[data-id="${product.id}"]`);
      const counterElement = cartItem.querySelector('[data-counter]');
      counterElement.textContent = existingProduct.count;
    } else {
      checkCart() 
      shop.cart.push({ id: product.id, count: product.count, price: product.price });
      toCart(product);
    }
    cartButton.textContent = "Добавлено";
    checkCart() 
    setTimeout(function () {
      cartButton.textContent = "+ в корзину";
    }, 5000);
  });
});


  //Способ через createElement

  //Генерация блоков

  //   const cardPlace = document.createElement('div');
  //   const card = document.createElement('div');
  //   const cardImg = document.createElement('img');

  //   const cardBody = document.createElement('div');
  //   const cardName = document.createElement('h4');
  //   const cardAmountBlock = document.createElement('p');
  //   const cardAmount = document.createElement('small');

  //   const cardDetails = document.createElement('div');
  //   const cardCounter = document.createElement('div');
  //   const cardCounterMinus = document.createElement('div');
  //   const cardCounterNumber = document.createElement('div');
  //   const cardCounterPlus = document.createElement('div');

  //   const cardPrice = document.createElement('div');
  //   const cardWeight = document.createElement('div');
  //   const cardPriceСurrency = document.createElement('div');

  //   const cardButton = document.createElement('button');

  //   //Стили для блоков

  //   cardPlace.classList.add('col-md-6')
  //   card.classList.add('card','mb-4')
  //   cardImg.classList.add('product-img')
  //   cardBody.classList.add('card-body', 'text-center')
  //   cardName.classList.add('item-title')
  //   cardAmount.classList.add('text-muted')
  //   cardDetails.classList.add('details-wrapper')
  //   cardCounter.classList.add('items', 'counter-wrapper')
  //   cardCounterMinus.classList.add('items__control')
  //   cardCounterNumber.classList.add('items__control')
  //   cardCounterPlus.classList.add('items__control')
  //   cardPrice.classList.add('price')
  //   cardWeight.classList.add('price__weight')
  //   cardPriceСurrency.classList.add('price__currency')
  //   cardButton.classList.add('btn','btn-outline-warning','btn-block')

  // //Наполнение блоков

  // cardImg.src = product.img;
  // cardImg.alt = product.name;
  // cardName.textContent = product.name;
  // cardAmount.textContent = `${product.amount} шт.`;
  // cardCounterMinus.textContent = '-';
  // cardCounterNumber.textContent = product.count;
  // cardCounterPlus.textContent = '+';
  // cardWeight.textContent = `${product.weight} гр.`;
  // cardPriceСurrency.textContent = `${product.price} ₽`;
  // cardButton.textContent = '+ в корзину';

  // cardCounterMinus.addEventListener("click", () => {
  //   if (product.count > 1) {
  //     product.count -= 1;
  //     cardCounterNumber.textContent = product.count;
  //   }
  // });

  // cardCounterPlus.addEventListener("click", () => {
  //   product.count += 1;
  //   cardCounterNumber.textContent = product.count;
  // });
  // //Добавление элементов товара на страницу

  //   card.appendChild(cardImg)
  //   cardBody.appendChild(cardName)
  //   cardAmountBlock.appendChild(cardAmount)
  //   cardBody.appendChild(cardAmountBlock)
  //   cardCounter.appendChild(cardCounterMinus)
  //   cardCounter.appendChild(cardCounterNumber)
  //   cardCounter.appendChild(cardCounterPlus)
  //   cardDetails.appendChild(cardCounter)
  //   cardBody.appendChild(cardDetails)
  //   cardPrice.appendChild(cardWeight)
  //   cardPrice.appendChild(cardPriceСurrency)
  //   cardBody.appendChild(cardPrice)
  //   cardBody.appendChild(cardButton)
  //   card.appendChild(cardBody)
  //   cardPlace.appendChild(card)
  //   cardWrapper.appendChild(cardPlace)


// Корзина

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


checkCart();
console.log(shop)
console.log('console.log(shop)')