function fetchShopData() {
  return new Promise((resolve, reject) => {
    fetch('db.json')
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

fetchShopData()
  .then(data => {
    const shop = data;
    console.log(shop);
    const filterButton = document.querySelector('.filter-button');
    const priceSort = document.getElementById('price-sort');
    const weightSort = document.getElementById('weight-sort');

    filterButton.addEventListener('click', () => {
      const selectedPriceSort = priceSort.value;
      filterProducts('price', selectedPriceSort);
      showProducts(1, 4);
      let allPageChangersItems = document.querySelectorAll(".pagination__item");
      allPageChangersItems.forEach((item) => {
        item.classList.remove("pagination__item--active");
      });
      allPageChangersItems[0].classList.add("pagination__item--active");
    });

    let sortedProducts = [...shop.products];

    function filterProducts(filterType, sortOrder) {
      sortedProducts = [...shop.products];
      if (sortOrder === 'without') {
        return;
      }
      if (filterType === 'price' || filterType === 'weight') {
        sortedProducts.sort((a, b) => {
          if (a[filterType] === b[filterType]) {
            return b['weight'] - a['weight'];
          }
          if (sortOrder === 'asc') {
            return a[filterType] - b[filterType];
          } else if (sortOrder === 'desc') {
            return b[filterType] - a[filterType];
          }
        });
        let pagesCount = Math.ceil(sortedProducts.length / 4);
        for (let i = 1; i <= pagesCount; i++) {
          showProducts(i, 4);
        }
        shopCurrentProducts = extractCurrentProducts(1, 4);
      }
    }

    console.log(shop.products)

    const pageCountBlock = document.querySelector(".page-strip");

    function checkPageCount() {
      let productsCount = shop.products.length;
      let elementsOnPageCount = 4;
      let pagesCount = Math.ceil(productsCount / elementsOnPageCount);
      console.log(pagesCount);
      for (let i = 0; i < pagesCount; i++) {
        let activeClass = i === 0 ? "pagination__item--active" : "";
        pageCountBlock.innerHTML +=  `<div href="" class="pagination__item ${activeClass}">${
          i + 1
        }</div>` ;
      }
    }

    function extractCurrentProducts(pageNumber, elementCount) {
      const startIndex = (pageNumber - 1) * elementCount;
      const endIndex = startIndex + elementCount;
      const shopCurrentProducts = sortedProducts.slice(startIndex, endIndex);
      return shopCurrentProducts;
    }

    extractCurrentProducts(shop.page, 4);
    console.log(extractCurrentProducts(1, 4));
    let shopCurrentProducts = extractCurrentProducts(shop.page, 4);

    const rows = document.querySelectorAll(".row");
    const cardWrapper = rows[rows.length - 1];

    function showProducts(pageNumber, elementCount) {
      cardWrapper.innerHTML = "";
      extractCurrentProducts(pageNumber, elementCount).forEach((product) => {
        cardWrapper.innerHTML +=  `
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
                <button data-cart type="button" class="btn btn-block btn-outline-warning">+ в корзину</button>
              </div>
            </div>
          </div>` ;
      });
      const minusButtons = document.querySelectorAll('.items__control[data-action="minus"]');
      const plusButtons = document.querySelectorAll('.items__control[data-action="plus"]');
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

      const cartButtons = document.querySelectorAll("[data-cart]");
      cartButtons.forEach(function (cartButton, index) {
        cartButton.addEventListener("click", function () {
          const product = shopCurrentProducts[index];
          const existingProduct = shop.cart.find((item) => item.id === product.id);
          if (existingProduct) {
            existingProduct.count += product.count;
            const cartItem = document.querySelector(
               `.cart-item[data-id="${product.id}"] ` 
            );
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
        shopCurrentProducts = extractCurrentProducts(page, 4);
        showProducts(page, 4);
      }

      if (
        event.target.dataset.action === "minus" ||
        event.target.dataset.action === "plus"
      ) {
        const cartItem = event.target.closest(".cart-item");
        if (cartItem) {
          checkCart();
          const product = shop.cart.find(
            (item) => item.id === parseInt(cartItem.dataset.id)
          );
          const counterElement = cartItem.querySelector("[data-counter]");
          if (event.target.dataset.action === "minus") {
            checkCart();
            if (product.count > 1) {
              product.count -= 1;
              counterElement.textContent = product.count;
              checkCart();
            } else {
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
    });

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
        cart.innerHTML +=  `<div class="cart-item" data-id="${product.id}">
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
        </div>` ;
      }
    }

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
  })
  .catch(error => {
    console.log(error);
  });