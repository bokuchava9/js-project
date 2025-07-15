
let allProducts=[];


async function fetchCategories(){
    try{
        const response= await fetch("https://restaurant.stepprojects.ge/api/Categories/GetAll");
        const Categories=await response.json();
        displayCategories(Categories);
    }catch(error){
        document.getElementById("allcategories").innerHTML=`<p>error</p>`
    }
}

function displayCategories(Categories){
    const CategoriesContainer=document.getElementById("allcategories");
    const allCategory = {
        id: 0,
        name: "all"
    };
    const updatedCategories = [allCategory, ...Categories];
    const CategoriesHTML=updatedCategories.map(
        (categori)=>
            `
        <li class="categories">
         <a data-id="${categori.id}" href="#">${categori["name"]}</a>
        </li>
        `

    ).join("");
    CategoriesContainer.innerHTML=CategoriesHTML;
    const foods=CategoriesContainer.querySelectorAll("a");
    foods.forEach(food => {
    food.addEventListener("click", e => {
        e.preventDefault();
        const choosedCategoryId = Number(food.dataset.id);
        if (choosedCategoryId === 0) {
            displayProducts(allProducts); 
        } else {
            const filtered = allProducts.filter(Product => Product.categoryId === choosedCategoryId);
            displayProducts(filtered);
        }
    });
});
targetCaregori()
}
window.addEventListener("load", fetchCategories);

/////kategoriebis feris shecvla
function targetCaregori(){
    const categories= document.getElementById("allcategories");
     const target= categories.querySelectorAll("li");
    target.forEach(li=>{
        li.addEventListener("click",()=>{
            target.forEach(el=>{
                el.classList.remove("target-categori");
                
            })
            li.classList.add("target-categori")
        })
    })} 

 targetCaregori()

async function fetchProducts(){
   try{ const response= await fetch("https://restaurant.stepprojects.ge/api/Products/GetAll");
    const Products= await response.json();
    displayProducts(Products);
    allProducts=Products;
    }

    catch(error){
        document.getElementById("allproducts").innerHTML=`<p>error</p>`
    }


}

function displayProducts(Products){
    const ProductsContainer=document.getElementById("allproducts");
    const ProductsHTML =Products.map(
        (Product)=>`
        <div data-id="${Product.id}" class="cards">
      <img style="width:200px" src="${Product.image}" alt="${Product.name}" />
      <h2>${Product["name"]}</h2>
      <p class="spiciP">spiciness: ${Product["spiciness"]}<span class="pepper">🌶️</span></p>
      <p class="nuts">${Product["nuts"] ? "nuts ✅" : "no nuts ❌"}</p>
      <p class="vegeterian">${Product["vegeterian"] ? "vegeterian ✅" : "vegeterian ❌"}</p>
      <div class="addcart">
    <p>$ ${Product["price"]}</p>
        <button class="addbtn">Add Cart</button>
        </div>
        </div>
        `
    ).join("");
    ProductsContainer.innerHTML=ProductsHTML;
    const addCartBtns = document.querySelectorAll(".addbtn");

addCartBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    //
    const product = Products[index];
    const alreadyInCart = cart.find(item => item.id === Products[index].id);
    if(!currentUser){
        Swal.fire({
  icon: "error",
  title: "პროდუქტის კალათაში დასამატებლად გთხოვთ გაიაროთ ავტორიზაცია!",
  footer: '<a href="login.html">ავტორიზაცია</a>'
});
    }
    else if (!alreadyInCart) {
    cart.push({...Products[index], quantity: 1})
 
  localStorage.setItem("cart", JSON.stringify(cart));
  Swal.fire({
    position: "center",
    icon: "success",
    title: "პროდუქტი დაემატა კალათაში",
    showConfirmButton: false,
    timer: 1500
  });
  updateCartUI()
  
} 
else {
  alreadyInCart.quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  Swal.fire({
    position: "center",
    icon: "success",
    title: "პროდუქტის რაოდენობა გაიზარდა",
    showConfirmButton: false,
    timer: 1500
  });
  updateCartUI();
}    
   
  });
});
;
}

window.addEventListener("load", fetchProducts);

/// კალათის განახლება 

function updateCartUI() {
  const cartContainer = document.getElementById("cartcontainer");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartHTML = cart.map(product => `
    <div class="cart-item" data-id="${product.id}">
      <p>${product.name} - $${product.price}</p>
    </div>
  `).join("");

  cartContainer.innerHTML = cartHTML;
}

const filterRange= document.getElementById("filterRange")

const spiciValue=document.getElementById("spiciValue");

const filterBtn= document.getElementById("apply")

const recetBtn=document.getElementById("reset")
function spicinessFilter(){
filterRange.addEventListener("input",()=>{
    spiciValue.textContent=filterRange.value
})
}
spicinessFilter();


function showCategories(){
    const categoriesBtn= document.getElementById("responsivebtn")
const categories=document.getElementById("allcategories");
    categoriesBtn.addEventListener("click",()=>{
        categories.classList.toggle("active")
    })
}

showCategories();


function showFilter(){
    const filterResBtn=document.getElementById("responsivefilter");
    const filterMenu=document.getElementById("aside");

    filterResBtn.addEventListener("click",()=>{
        filterMenu.classList.toggle("showfilter")
    })
}

showFilter ();




function darkMode(){
    const nightModeBtn=document.getElementById("night-check")
nightModeBtn.addEventListener("change",()=>{
    if(nightModeBtn.checked){
    document.body.classList.add("dark-mode")
    }else{
        document.body.classList.remove("dark-mode");
    }
})}

darkMode()

//ყველას ფილტრი

function applyAllFilters() {
    let filteredProducts = [...allProducts];

    const activeCategory = document.querySelector("#allcategories li.target-categori a");
    if (activeCategory) {
        const categoryId = Number(activeCategory.dataset.id);
        if (categoryId !== 0) {
            filteredProducts = filteredProducts.filter(product => product.categoryId === categoryId);
        }
    }

    const vegBtn = document.getElementById("vegeterian");
    if (vegBtn.checked) {
        filteredProducts = filteredProducts.filter(product => product.vegeterian);
    }

    const nutsBtn = document.getElementById("nuts");
    if (nutsBtn.checked) {
        filteredProducts = filteredProducts.filter(product => !product.nuts);
    }

    const spicinessLevel = Number(filterRange.value);
    if (!isNaN(spicinessLevel) ) {
        filteredProducts = filteredProducts.filter(product => product.spiciness === spicinessLevel);
    }

    displayProducts(filteredProducts);
}

function setupCategoryFilter() {
    const CategoriesContainer = document.getElementById("allcategories");
    const foods = CategoriesContainer.querySelectorAll("a");
    foods.forEach(food => {
        food.addEventListener("click", e => {
            e.preventDefault();
            const allLi = CategoriesContainer.querySelectorAll("li");
            allLi.forEach(li => li.classList.remove("target-categori"));
            food.parentElement.classList.add("target-categori");
            applyAllFilters();
        });
    });
}

function setupCheckboxFilters() {
    const vegBtn = document.getElementById("vegeterian");
    const nutsBtn = document.getElementById("nuts");

    vegBtn.addEventListener("change", applyAllFilters);
    nutsBtn.addEventListener("change", applyAllFilters);
}

function setupSpicinessFilter() {
    filterRange.addEventListener("input", () => {
        spiciValue.textContent = filterRange.value;
    });

    filterBtn.addEventListener("click", applyAllFilters);
}

function setupResetFilter() {
    recetBtn.addEventListener("click", () => {
        document.getElementById("vegeterian").checked = false;
        document.getElementById("nuts").checked = false;
        filterRange.value = 0;
        spiciValue.textContent = 0;

        const allLi = document.querySelectorAll("#allcategories li");
        allLi.forEach(li => li.classList.remove("target-categori"));
        allLi[0].classList.add("target-categori");

        displayProducts(allProducts);
    });
}

window.addEventListener("load", () => {
    fetchCategories();
    fetchProducts();

    setupCategoryFilter();
    setupCheckboxFilters();
    setupSpicinessFilter();
    setupResetFilter();
    updateCartUI()
});

