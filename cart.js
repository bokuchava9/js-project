
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cartcontainer");
let cartDisplay = "";

cart.forEach(product => {
  if (!product.quantity) {
    product.quantity = 1;
  }

  cartDisplay += `
    <div class="cartlist" data-id="${product.id}">
      <button class="removebtn">x</button>
      <img style="width:100px" src="${product.image}" alt="${product.name}" />
      <span>${product.name}</span>
      <p class="pricep">${product.price}$</p>
      <div class="buttonsdiv">
        <button class="minus">-</button>
        <button class="quantity">${product.quantity}</button>
        <button class="plus">+</button>
      </div>
      <span class="totalprice">${product.price * product.quantity}$</span>
    </div>
  `;
});

cartContainer.innerHTML = cartDisplay;



function updateSum() {
  const sumContainer = document.getElementById("total");
  const cartList = document.querySelectorAll(".cartlist");
  let total = 0;

  cartList.forEach(box => {
    const priceEl = box.querySelector(".totalprice");
    const price = Number(priceEl.textContent.replace("$", ""));
    total += price;
  });

  sumContainer.innerText = "total: " + total + "$";
}


function allButtons() {
  const cartList = document.querySelectorAll(".cartlist");

  cartList.forEach(cartBox => {
    const removeBtn = cartBox.querySelector(".removebtn");
    const plus = cartBox.querySelector(".plus");
    const minus = cartBox.querySelector(".minus");
    const quantityEl = cartBox.querySelector(".quantity");
    const priceEl = cartBox.querySelector(".pricep");
    const totalPriceEl = cartBox.querySelector(".totalprice");
    const productId = Number(cartBox.getAttribute("data-id"));


    const product = cart.find(food => food.id === productId);

  
    plus.addEventListener("click", () => {
      product.quantity++;
      quantityEl.innerText = product.quantity;
      totalPriceEl.textContent = product.price * product.quantity + "$";
      localStorage.setItem("cart", JSON.stringify(cart));
      updateSum();
    });


    minus.addEventListener("click", () => {
      if (product.quantity > 1) {
        product.quantity--;
        quantityEl.innerText = product.quantity;
        totalPriceEl.textContent = product.price * product.quantity + "$";
        localStorage.setItem("cart", JSON.stringify(cart));
        updateSum();
      } else {
        cartBox.remove();
        const newCart = cart.filter(p => p.id !== productId);
        localStorage.setItem("cart", JSON.stringify(newCart));
        updateSum();
      }
    });

   
    removeBtn.addEventListener("click", () => {
      cartBox.remove();
      const newCart = cart.filter(p => p.id !== productId);
      localStorage.setItem("cart", JSON.stringify(newCart));
      updateSum();
    });
  });
}

updateSum();
allButtons();

window.addEventListener("storage", () => {
  location.reload();
});
