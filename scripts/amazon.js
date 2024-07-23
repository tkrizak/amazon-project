import { cart, addToCart, renderCartQuantity } from '../data/cart.js';
import {
  products,
  loadProducts,
  filterProducts,
  searchProducts,
} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

loadProducts(renderProductsGrid);
renderCartQuantity();

// generate html for products in array

function renderProductsGrid() {
  let productsHTML = '';

  renderCartQuantity();

  const url = new URL(window.location.href);
  let search = url.searchParams.get('search');

  let filteredProducts = products;

  if (search) {
    filteredProducts = filterProducts(products, search);
  }

  searchProducts();

  filteredProducts.forEach((product) => {
    productsHTML += `
  <div class="product-container">
    <div class="product-image-container">
      <img
        class="product-image"
        src="${product.image}"
      />
    </div>

    <div class="product-name limit-text-to-2-lines">
    ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars" src="${product.getStarsUrl()}" />
      <div class="product-rating-${product.rating.count} link-primary">87</div>
    </div>

    <div class="product-price">${product.getPrice()}</div>

    <div class="product-quantity-container">
      <select>
        <option selected value="1">
          1
        </option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    ${product.extraInfoHTML()}

    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png" />
      Added
    </div>

    <button class="add-to-cart-button js-add-to-cart button-primary" data-product-id="${
      product.id
    }">Add to Cart</button>
  </div>`;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  // update number of items in cart

  function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }

  // button add to cart made interactive

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;

      addToCart(productId);
      updateCartQuantity();

      console.log(cart);
    });
  });
}

const searchButton = document.querySelector('.js-search-button');

searchButton.addEventListener('click', () => {
  const searchInputValue = document.querySelector('.js-search-bar').value;
  window.location.href = `index.html?search=${searchInputValue}`;
});
