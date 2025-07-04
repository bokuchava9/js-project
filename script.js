
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
    const CategoriesContainer=document.getElementById("allcategories")
    const CategoriesHTML=Categories.map(
        (categori)=>
            `
        <li class="categories">
         <a data-id="${categori.id}" href="#">${categori["name"]}</a>
        </li>
        `

    ).join("");
    CategoriesContainer.innerHTML=CategoriesHTML;
    const foods=CategoriesContainer.querySelectorAll("a");
    foods.forEach(food=>{
        food.addEventListener("click",e=>{
            e.preventDefault();
            const choosedCategoryId= Number(food.dataset.id)
            const filtered=allProducts.filter(Product=>{
                return Product.categoryId===choosedCategoryId
            })
            displayProducts(filtered);
            
        })
    })
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
      <p>${Product["nuts"]}</p>
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
    cart.push(Products[index]);
    localStorage.setItem("cart", JSON.stringify(cart));
    Swal.fire({
  position: "center",
  icon: "success",
  title: "პროდუქტი დაემატა კალათაში",
  showConfirmButton: false,
  timer: 1500
});
    
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
            box.style.display="block"
        }else{
            box.style.display="none"
        }
    })
    })
}

spiciFilter();

function resetFilter(){
    recetBtn.addEventListener("click",()=>{
    const boxes= document.querySelectorAll(".cards");
        boxes.forEach(box=>{
            box.style.display="block"
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


