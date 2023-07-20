// Обьект магазина

let shop = {
  basket: [],
  products: [
    {
      id: 1,
      name: "Филадельфия хит ролл",
      img: "/img/roll/philadelphia.jpg",
      amount: 6,
      count: 1,
      weight: 180,
      price: 300,
    },
    {
      id: 2,
      name: "Калифорния темпура",
      img: "/img/roll/california-tempura.jpg",
      amount: 6,
      count: 1,
      weight: 205,
      price: 250,
    },
    {
      id: 3,
      name: "Запеченый ролл «Калифорния»",
      img: "/img/roll/zapech-california.jpg",
      amount: 6,
      count: 1,
      weight: 182,
      price: 230,
    },
    {
      id: 4,
      name: "Филадельфия",
      img: "/img/roll/philadelphia.jpg",
      amount: 6,
      count: 1,
      weight: 230,
      price: 320,
    },
  ],
};


//Динамическое добавление товаров

const rows = document.querySelectorAll('.row');
const cardWrapper = rows[rows.length - 1];

shop.products.forEach((product) => {

  //Генерация блоков

  const cardPlace = document.createElement('div');
  const card = document.createElement('div');
  const cardImg = document.createElement('img');

  const cardBody = document.createElement('div');
  const cardName = document.createElement('h4');
  const cardAmountBlock = document.createElement('p');
  const cardAmount = document.createElement('small');

  const cardDetails = document.createElement('div');
  const cardCounter = document.createElement('div');
  const cardCounterMinus = document.createElement('div');
  const cardCounterNumber = document.createElement('div');
  const cardCounterPlus = document.createElement('div');

  const cardPrice = document.createElement('div');
  const cardWeight = document.createElement('div');
  const cardPriceСurrency = document.createElement('div');

  const cardButton = document.createElement('button');

  //Стили для блоков

  cardPlace.classList.add('col-md-6')
  card.classList.add('card','mb-4')
  cardImg.classList.add('product-img')
  cardBody.classList.add('card-body', 'text-center')
  cardName.classList.add('item-title')
  cardAmount.classList.add('text-muted')
  cardDetails.classList.add('details-wrapper')
  cardCounter.classList.add('items', 'counter-wrapper')
  cardCounterMinus.classList.add('items__control')
  cardCounterNumber.classList.add('items__control')
  cardCounterPlus.classList.add('items__control')
  cardPrice.classList.add('price')
  cardWeight.classList.add('price__weight')
  cardPriceСurrency.classList.add('price__currency')
  cardButton.classList.add('btn','btn-outline-warning','btn-block')

//Наполнение блоков

cardImg.src = product.img;
cardImg.alt = product.name;
cardName.textContent = product.name;
cardAmount.textContent = `${product.amount} шт.`;
cardCounterMinus.textContent = '-';
cardCounterNumber.textContent = product.count;
cardCounterPlus.textContent = '+';
cardWeight.textContent = `${product.weight} гр.`;
cardPriceСurrency.textContent = `${product.price} ₽`;
cardButton.textContent = '+ в корзину';

cardCounterMinus.addEventListener("click", () => {
  if (product.count > 0) {
    product.count -= 1;
    cardCounterNumber.textContent = product.count;
  }
});

cardCounterPlus.addEventListener("click", () => {
  product.count += 1;
  cardCounterNumber.textContent = product.count;
});
//Добавление элементов товара на страницу

  card.appendChild(cardImg)
  cardBody.appendChild(cardName)
  cardAmountBlock.appendChild(cardAmount)
  cardBody.appendChild(cardAmountBlock)
  cardCounter.appendChild(cardCounterMinus)
  cardCounter.appendChild(cardCounterNumber)
  cardCounter.appendChild(cardCounterPlus)
  cardDetails.appendChild(cardCounter)
  cardBody.appendChild(cardDetails)
  cardPrice.appendChild(cardWeight)
  cardPrice.appendChild(cardPriceСurrency)
  cardBody.appendChild(cardPrice)
  cardBody.appendChild(cardButton)
  card.appendChild(cardBody)
  cardPlace.appendChild(card)
  cardWrapper.appendChild(cardPlace)

});