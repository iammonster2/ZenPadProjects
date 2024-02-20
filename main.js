const ITEMS = [
  {
    id: 1,
    name: "SKYLAR CITRON & SEA SALT",
    price: 50,
    image: "img/products/RubinaBall.png",
    qty: 1,
  },
  {
    id: 2,
    name: "SKYLAR CITRON & SEA SALT",
    price: 50,
    image: "img/products/Rubinasoft.png",
    qty: 1,
  },
  {
    id: 3,
    name: "SKYLAR CITRON & SEA SALT3",
    price: 50,
    image: "img/products/Rubinagold.png",
    qty: 1,
  },
  {
    id: 4,
    name: "SKYLAR CITRON & SEA SALT4",
    price: 50,
    image: "img/products/Rubinacognac.png",
    qty: 1,
  },
];

const openBtn = document.getElementById("open_cart_btn");
const cart = document.getElementById("sidecart");
const closeBtn = document.getElementById("close_btn");
const backdrop = document.querySelector(".backdrop");
const itemsEl = document.querySelector(".items");
const cartItems = document.querySelector(".cart_items");
const itemsNum = document.getElementById("items_num");
const subtotalPrice = document.getElementById("subtotal_price");

let cart_data = loadCartFromLocalStorage();

openBtn.addEventListener("click", openCart);
closeBtn.addEventListener("click", closeCart);
backdrop.addEventListener("click", closeCart);

document.addEventListener("DOMContentLoaded", function () {
  // Render items
  renderItems();

  // Add event listener to dynamically generated images
  document.querySelectorAll(".items img").forEach((img) => {
    img.addEventListener("click", function () {
      // Extract product ID from the image's ID or any other attribute
      const productId = parseInt(this.getAttribute("data-product-id"));

      // Construct URL with query parameter
      const url = `product_page.html?id=${productId}`;

      // Redirect to the product page
      window.location.href = url;
    });
  });

  // Update cart on DOMContentLoaded event
  updateCart();

  // Load product details dynamically based on product ID
  const productId = getUrlParameter("id"); // Get product ID from URL query parameter
  if (productId === "1") {
    renderProductDetails(productId);
  }
});

// Function to render product details based on product ID
function renderProductDetails(productId) {
  // Assuming you have a container with class "product-details" to display the product details
  const productDetailsContainer = document.querySelector(".product-details");

  // Product description for product ID 1
  const productDescription = `
      <h2>Ruby Rose Candle</h2>
      <p>
          Indulge in the enchanting allure of "Ruby Rose" — a captivating candle that harmoniously blends the timeless elegance of rose petals with the soothing aroma to fill your space, creating a warm and inviting ambiance. Elevate your senses with this exquisite combination of floral and citrus fragrances.
      </p>
  `;

  // Add the product description to the product details container
  productDetailsContainer.innerHTML = productDescription;
}

// Function to extract query parameters from the URL
function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const openCartBtn = document.getElementById("open_cart_btn");

if (openCartBtn) {
  openCartBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default button behavior
    openCart();
  });
}

function openCart() {
  cart.classList.add("open");
  backdrop.style.display = "block";

  setTimeout(() => {
    backdrop.classList.add("show");
  }, 0);
}

function closeCart() {
  cart.classList.remove("open");
  backdrop.classList.remove("show");

  setTimeout(() => {
    backdrop.style.display = "none";
  }, 500);
}

function addItem(itemId) {
  const idx = ITEMS.findIndex((item) => item.id === itemId);

  if (idx !== -1) {
    const foundedItem = cart_data.find((item) => item.id === itemId);
    if (foundedItem) {
      increaseQty(itemId);
    } else {
      cart_data.push({ ...ITEMS[idx], qty: 1 });
    }
    updateCart();
    openCart();
  }

  saveCartToLocalStorage();
}

// Find the "Add to Cart" button
const addToCartBtn = document.getElementById("addToCartBtn");

// Add a click event listener
if (addToCartBtn) {
  addToCartBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default link behavior
    addItem(1);
  });
}

function removeCartItem(itemId) {
  cart_data = cart_data.filter((item) => item.id !== itemId);
  updateCart();
}

function increaseQty(itemId) {
  cart_data = cart_data.map((item) =>
    item.id === itemId ? { ...item, qty: item.qty + 1 } : item
  );
  updateCart();
}

function decreaseQty(itemId) {
  cart_data = cart_data.map((item) =>
    item.id === itemId
      ? { ...item, qty: item.qty > 1 ? item.qty - 1 : item.qty }
      : item
  );
  updateCart();
}

function calcItemsNum() {
  let itemsCount = 0;
  cart_data.forEach((item) => (itemsCount += item.qty));
  itemsNum.innerText = itemsCount;
}

function calcSubtotalPrice() {
  let subtotal = 0;
  cart_data.forEach((item) => (subtotal += item.price * item.qty));
  return subtotal.toFixed(2);
}

// Your other functions and variables...

// Render items function
function renderItems() {
  ITEMS.forEach((item) => {
    const itemEl = document.createElement("div");
    itemEl.classList.add("item");

    // Create image element
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;
    img.setAttribute("data-product-id", item.id); // Set product ID as data attribute
    itemEl.appendChild(img);

    const detailsEl = document.createElement("div");
    detailsEl.classList.add("item_details");
    detailsEl.innerHTML = `
      <p>${item.name}</p>
      <h6>$${item.price.toFixed(2)}</h6>
      <button id="addToCartBtn">Add to Cart</button>
    `;

    detailsEl.querySelector("button").addEventListener("click", (event) => {
      event.stopPropagation();
      addItem(item.id);
    });

    itemEl.appendChild(detailsEl);
    itemsEl.appendChild(itemEl);
  });
}

// Call the renderItems function
renderItems();

// Your other event listeners and code...

function renderCartItems() {
  cartItems.innerHTML = "";
  cart_data.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart_item");
    cartItem.innerHTML = `
  <div class="remove_item" onclick="removeCartItem(${item.id})">
  <span>Remove</span>
  </div>
  <div class="item_img">
  <img src="${item.image}" alt="" />
  </div>
  <div class="cart-item-details">
  <p>${item.name}</p>
  <h6>$${item.price.toFixed(2)}</h6>
  <div class="qty">
  <button class="quantity-button minus" onclick="decreaseQty(${
    item.id
  })">-</button>
  <strong>${item.qty}</strong>
  <button class="quantity-button add" onclick="increaseQty(${
    item.id
  })">+</button>
  </div>
  </div>
  `;
    cartItems.appendChild(cartItem);
  });
}

function updateCart() {
  renderCartItems();
  calcItemsNum();
  calcSubtotalPrice();
  updateCheckoutButton();
}

function updateCheckoutButton() {
  const checkoutButton = document.getElementById("checkoutButton");
  if (cart_data.length > 0) {
    checkoutButton.innerText = `Checkout - $ ${calcSubtotalPrice()}`;
  } else {
    checkoutButton.innerText = "Checkout";
  }
}

function saveCartToLocalStorage() {
  localStorage.setItem("cart_data", JSON.stringify(cart_data));
}

function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem("cart_data");
  return storedCart ? JSON.parse(storedCart) : [];
}
