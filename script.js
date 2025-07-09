
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
}
window.addEventListener("load", fetchCategories)



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
    const alreadyInCart = cart.find(item => item.id === Products[index].id);
    if (!alreadyInCart) {
  cart.push(Products[index]);
  localStorage.setItem("cart", JSON.stringify(cart));
  Swal.fire({
    position: "center",
    icon: "success",
    title: "პროდუქტი დაემატა კალათაში",
    showConfirmButton: false,
    timer: 1500
  });
} else {
  Swal.fire({
    position: "center",
    icon: "warning",
    title: "ეს პროდუქტი უკვე კალათაშია",
    showConfirmButton: false,
    timer: 1500
  });
}
   
  });
});
}

window.addEventListener("load", fetchProducts);






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


function spiciFilter(){
    
    filterBtn.addEventListener("click",()=>{
        const boxes=document.querySelectorAll(".cards")
    boxes.forEach(box=>{
        const spiciP= box.querySelector(".spiciP");
        const spiciPLine= spiciP.textContent.trim();
        const spiciNumber=spiciPLine.replace("spiciness:","").replace("🌶️", "")
        const spiciLevel= Number(spiciNumber)
        if(Number(filterRange.value)===spiciLevel){
            box.style.display="flex"
        }else{
            box.style.display="none"
        }
    })
    })
}



  
function vegetarianAndNuts(){
    const vegBtn=document.getElementById("vegeterian");
    const nutsBtn=document.getElementById("nuts")
    const boxes=document.querySelectorAll(".cards");
    boxes.forEach(box=>{
        let display=true
        const vegetarian=box.querySelector(".vegeterian");
        const nuts=box.querySelector(".nuts");
        const vegetarianText=vegetarian.textContent.trim();
        const nustText=nuts.textContent.trim();
        if(nutsBtn.checked && !nustText.includes("no nuts")){
            display=false
        }
        if(vegBtn.checked && !vegetarianText.includes("vegeterian ✅")){
            display=false
        }
        if(display===true){
            box.style.display="flex";
        }else{
            box.style.display="none"
        }
    })
}

function vegetarianAndNutsDisplay(){
    const vegBtn=document.getElementById("vegeterian");
    const nutsBtn=document.getElementById("nuts");

    vegBtn.addEventListener("change", vegetarianAndNuts);

    nutsBtn.addEventListener("change",vegetarianAndNuts);
    vegetarianAndNuts()
}

window.addEventListener("load", vegetarianAndNutsDisplay)


//////

spiciFilter();

function resetFilter(){
    recetBtn.addEventListener("click",()=>{
    const boxes= document.querySelectorAll(".cards");
        boxes.forEach(box=>{
            box.style.display="flex"
        })
    })  
}

resetFilter()



const cartProducts=[];

const cartContainer= document.getElementById("cartcontainer");

const addCartBtn= document.querySelectorAll(".addbtn")



function cartDisplay(){
    const boxes= document.querySelectorAll(".cards");
    boxes.forEach(box=>{
    
        const addCartBtn=document.querySelectorAll(".addbtn")
        filterBtn.addEventListener("click",()=>{
            box.push(cartProducts)
        })
    })
    console.log(cartProducts)
}

cartDisplay()


/// კატეგორიების რესპონსივი




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