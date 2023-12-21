const ITEMS = [
  {
    id: 1,
    name: "SKYLAR CITRON & SEA SALT",
    price: 50,
    image: "img/products/harlem.jpeg",
    qty: 1,
  },
  {
    id: 2,
    name: "SKYLAR CITRON & SEA SALT",
    price: 50,
    image: "img/products/harlem.jpeg",
    qty: 1,
  },
  {
    id: 3,
    name: "SKYLAR CITRON & SEA SALT",
    price: 50,
    image: "img/products/harlem.jpeg",
    qty: 1,
  },
  {
    id: 4,
    name: "SKYLAR CITRON & SEA SALT",
    price: 50,
    image: "img/products/harlem.jpeg",
    qty: 1,
  },
  {
    id: 1,
    name: "SKYLAR CITRON & SEA SALT",
    price: 50,
    image: "img/products/harlem.jpeg",
    qty: 1,
  },
  {
    id: 2,
    name: "SKYLAR CITRON & SEA SALT",
    price: 50,
    image: "img/products/harlem.jpeg",
    qty: 1,
  },
  {
    id: 3,
    name: "SKYLAR CITRON & SEA SALT",
    price: 50,
    image: "img/products/harlem.jpeg",
    qty: 1,
  },
  {
    id: 4,
    name: "SKYLAR CITRON & SEA SALT",
    price: 50,
    image: "img/products/harlem.jpeg",
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

let cart_data = [];

openBtn.addEventListener("click", openCart);
closeBtn.addEventListener("click", closeCart);
backdrop.addEventListener("click", closeCart);

renderItems();
renderCartItems();

// Open Cart
function openCart() {
  cart.classList.add("open");
  backdrop.style.display = "block";

  setTimeout(() => {
    backdrop.classList.add("show");
  }, 0);
}

// Close Cart
function closeCart() {
  cart.classList.remove("open");
  backdrop.classList.remove("show");

  setTimeout(() => {
    backdrop.style.display = "none";
  }, 500);
}

// Add Items to Cart
function addItem(itemId) {
  // find the index of the item
  const idx = ITEMS.findIndex((item) => item.id === itemId);

  if (idx !== -1) {
    const foundedItem = cart_data.find((item) => item.id === itemId);
    if (foundedItem) {
      increaseQty(itemId);
    } else {
      cart_data.push(ITEMS[idx]);
    }
    updateCart();
    openCart();
  }
}

// Remove Cart Items
function removeCartItem(itemId) {
  cart_data = cart_data.filter((item) => item.id != itemId);
  updateCart();
}

// Increase Qty
function increaseQty(itemId) {
  cart_data = cart_data.map((item) =>
    item.id === itemId ? { ...item, qty: item.qty + 1 } : item
  );
  updateCart();
}

// Decrease Qty
function decreaseQty(itemId) {
  cart_data = cart_data.map((item) =>
    item.id === itemId
      ? { ...item, qty: item.qty > 1 ? item.qty - 1 : item.qty }
      : item
  );
  updateCart();
}

// Calculate Items Number
function calcItemsNum() {
  let itemsCount = 0;

  cart_data.forEach((item) => (itemsCount += item.qty));

  itemsNum.innerText = itemsCount;
}

// Calculate Subtotal Price
function calcSubtotalPrice() {
  let subtotal = 0;

  cart_data.forEach((item) => (subtotal += item.price * item.qty));

  subtotalPrice.innerText = subtotal;
}

// Render Items
function renderItems() {
  ITEMS.forEach((item) => {
    const itemEl = document.createElement("div");
    itemEl.classList.add("item");

    const link = document.createElement("a");
    link.href = "product_page.html";
    link.appendChild(document.createElement("img"));
    link.querySelector("img").src = item.image;
    itemEl.appendChild(link);

    const detailsEl = document.createElement("div");
    detailsEl.classList.add("item_details");
    detailsEl.innerHTML = `
      <p>${item.name}</p>
      <strong>$${item.price}</strong>
      <button>Add to Cart</button>
    `;

    // Add click event to the "Add to Cart" button
    detailsEl.querySelector("button").addEventListener("click", (event) => {
      event.stopPropagation(); // Stop the event from propagating to the parent (item) element
      addItem(item.id);
    });

    itemEl.appendChild(detailsEl);
    itemsEl.appendChild(itemEl);
  });
}

// Display / Render Cart Items
function renderCartItems() {
  // remove everything from cart
  cartItems.innerHTML = "";
  // add new data
  cart_data.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart_item");
    cartItem.innerHTML = `
      <div class="remove_item" onclick="removeCartItem(${item.id})">
        <span>&times;</span>
      </div>
      <div class="item_img">
        <img src="${item.image}" alt="" />
      </div>
      <div class="item_details">
        <p>${item.name}</p>
        <strong>$${item.price}</strong>
        <div class="qty">
          <span onclick="decreaseQty(${item.id})">-</span>
          <strong>${item.qty}</strong>
          <span onclick="increaseQty(${item.id})">+</span>
        </div>
      </div> 
    `;
    cartItems.appendChild(cartItem);
  });
}

function updateCart() {
  // rerender cart items with updated data
  renderCartItems();
  // Update Items Number in Cart
  calcItemsNum();
  // Update Subtotal Price
  calcSubtotalPrice();
}
