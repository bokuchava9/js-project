
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer=document.getElementById("cartcontainer")

let cartDisplay='';

// კალათის პროდუქტების გამატანა
cart.forEach(product => {
 
  cartDisplay +=`
  <div class="cartlist">
  <button class="removebtn">x</button>
  <img style="width:100px" src="${product.image}" alt="${product.name}" />
  <span>${product.name}</span>
  <p class="pricep">${product.price}$</p>
  <div class="buttonsdiv">
  <button class="minus">-</button>
  <button class="quantity">1</button>
  <button class="plus">+</button>
  </div>
  <span class="totalprice">${product.price}</span>
  </div>
  `
});

cartContainer.innerHTML=cartDisplay


// რაოდენობის ღილაკები

let count=0;

const minus=document.querySelectorAll(".minus");

const quantity=document.querySelectorAll(".quantity");

function counting(){
    const cartList= document.querySelectorAll(".cartlist")
    const totalPriceProduct=document.querySelectorAll(".totalprice");
    cartList.forEach(cart=>{

        let count=1
        const plus= cart.querySelector(".plus");
        const quantity=cart.querySelector(".quantity")
        plus.addEventListener("click",()=>{
            count++
            quantity.innerText=count;
            
        })
        const minus=cart.querySelector(".minus");
        minus.addEventListener("click",()=>{
            count--;
            quantity.innerText=count;
            if(count<=0){
                localStorage.removeItem("cart");
                cart.innerHTML="";
            }
        })
       
    })
           

}

counting()

////// პროდუქტის საერთო ფასი რაოდენობის მიხედვით
function totalPriseOfProduct(){
    
    const cartList=document.querySelectorAll(".cartlist");
    cartList.forEach(cart=>{
        let total= 0;
        const priceP=cart.querySelector(".totalprice");
        const price= priceP.textContent;
        const clearPrice=price.trim();
        const priceNum=clearPrice.replace("$","");
        const plus=cart.querySelector(".plus");
        const minus=cart.querySelector(".minus")
        let count=1;
          plus.addEventListener("click",()=>{
            count++
           total=Number(priceNum)*count
            priceP.textContent=total
        })
        minus.addEventListener("click",()=>{
            count--
            total=Number(priceNum)*count;
            priceP.textContent=total
        })
    })
}

totalPriseOfProduct();
///
// jami

function sum() {
const cartList= document.querySelectorAll(".cartlist");
const sumContainer= document.getElementById("total");
let count=1;

function update(){
let total=0;
cartList.forEach(cart=>{
 const price=cart.querySelector(".totalprice");
  const totalNum=price.textContent.trim().replace("$","");
  total+=Number(totalNum);

})
sumContainer.innerText="total:"+total+ "$"
}
cartList.forEach(cart=>{
   let count=1;
   const plus=cart.querySelector(".plus"); 
   const quantity=cart.querySelector(".quantity");
   const price=cart.querySelector(".totalprice");
   const realPrice=Number(price.textContent.trim().replace("$",""))
   plus.addEventListener("click",()=>{
    count++;
    quantity.innerText=count;
    price.textContent=realPrice*count;
    update()
   })    
    })

}

sum()
   
// წაშლის ღილაკი
function removeProduct(){
    const cartList= document.querySelectorAll(".cartlist");
    
    cartList.forEach(cart=>{
      const removeBtn=cart.querySelector(".removebtn");
        removeBtn.addEventListener("click",()=>{
            localStorage.removeItem("cart");
            cart.innerHTML=""
        })
    })

}

removeProduct();





