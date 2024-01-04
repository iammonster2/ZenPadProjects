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

let cart_data = loadCartFromLocalStorage();

openBtn.addEventListener("click", openCart);
closeBtn.addEventListener("click", closeCart);
backdrop.addEventListener("click", closeCart);

renderItems();
renderCartItems();

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
  <h6>$${item.price.toFixed(2)}</h6>
  <button>Add to Cart</button>
  `;

    detailsEl.querySelector("button").addEventListener("click", (event) => {
      event.stopPropagation();
      addItem(item.id);
    });

    itemEl.appendChild(detailsEl);
    itemsEl.appendChild(itemEl);
  });
}

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

document.addEventListener("DOMContentLoaded", () => {
  updateCart();
});
