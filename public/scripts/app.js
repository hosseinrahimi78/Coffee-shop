//  مشکل بعد از تغییر تو بخش حذف آخرین حصول باگش هنوز هست 



{// ──────────────── Theme light & dark ──────────────── //
const toggleThemeBtn = document.querySelector("#toggle-theme");
/*
const userTheme = localStorage.theme;
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (userTheme === "dark" || (!userTheme && systemDark)) {
  document.documentElement.classList.add("dark");
}
*/
toggleTheme(toggleThemeBtn)
// ──────────────── Toggle Theme Function() 
function toggleTheme(targetTheme){
  targetTheme.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    localStorage.theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
  });
}

}
{// ──────────────── Product Basket ──────────────── //
// ───── Select essential DOM 
const CartIcon = document.getElementById("CartIcon");
const CartBox = document.getElementById("CartBox");
const noProductCartBox = document.getElementById("noProduct-CartBox");
const btnNoProduct = document.getElementById("btn-noProduct");
const mainCartBox = document.getElementById("main-cart-box");
const numItemCartBox = document.getElementById("numItemCartBox");
const TotalPrice = document.getElementById("total-price");
let Products = document.querySelectorAll(".Product");
// ───── Open Cart  
CartIcon.addEventListener("click", () => {
  CartBox.classList.remove("opacity-0", "invisible");
  CartBox.classList.add("opacity-100", "visible");
  numberItemInCartBox();
});
// ───── Close Cart when clicking outside 
document.addEventListener("click", (e) => {
  if (
    !CartBox.contains(e.target) &&
    !CartIcon.contains(e.target) &&
    !e.target.classList.contains("minusProductInCart") &&
    !e.target.classList.contains("plusProductInCart")
  ) {
    CartBox.classList.remove("opacity-100", "visible");
    CartBox.classList.add("opacity-0", "invisible");
  }
});
// ───── Count number of products currently in the cart 
function numberItemInCartBox() {
  Products = document.querySelectorAll(".Product");
  const numberProduct = Products.length;
  numItemCartBox.textContent = numberProduct;
  mainCartBox.classList.toggle("scrollbar-rtl-fix", numberProduct > 2);
  statusCartBox(numberProduct);
}
// ───── Initialize default product quantity = 1 
document.querySelectorAll(".numTargetItem").forEach(n => n.textContent = 1);//تغییر میدمش
// ───── Quantity buttons (+ / -) 
document.querySelectorAll(".plusProductInCart").forEach(btn =>
  btn.addEventListener("click", (e) => changeQuantity(e, 1))
);
document.querySelectorAll(".minusProductInCart").forEach(btn =>
  btn.addEventListener("click", (e) => changeQuantity(e, -1))
);
// ───── Handle quantity change 
function changeQuantity(e, delta) {
  const parentId = e.target.closest("[data-parent-id]").dataset.parentId;
  const targetNum = document.querySelector(`[data-parent-id="${parentId}"] .numTargetItem`);
  if (!targetNum) return;
  let count = Number(targetNum.textContent) + delta;
  count = Math.max(0, Math.min(10, count));
  targetNum.textContent = count;
  const productEl = targetNum.closest(".Product");
  if (count === 0) {
    const remaining = document.querySelectorAll(".Product").length;
    if (remaining === 1) {
      statusCartBox(0); 
      setTimeout(() => {
        productEl?.remove(); 
        updateCart();
      }, 300); 
      return; 
    }
    productEl?.remove();
  }
  updateCart();
}
// ───── Calculate total price 
function totalPrice() {
  let total = 0;
  document.querySelectorAll(".price-product").forEach((priceEl, i) => {
    const price = Number(priceEl.textContent.replace(/,/g, ""));
    const count = Number(document.querySelectorAll(".numTargetItem")[i].textContent);
    total += price * count;
  });
  TotalPrice.textContent = total.toLocaleString("en-US");
}
// ───── Update visible state depending on cart emptiness 
function statusCartBox(x) {
  if (x < 1) {
    CartBox.classList.remove("opacity-100", "visible");
    CartBox.classList.add("opacity-0", "invisible");
    noProductCartBox.classList.remove("opacity-0", "invisible");
    noProductCartBox.classList.add("opacity-100", "visible");
  } else {
    CartBox.classList.remove("opacity-0", "invisible");
    CartBox.classList.add("opacity-100", "visible");
    noProductCartBox.classList.remove("opacity-100", "visible");
    noProductCartBox.classList.add("opacity-0", "invisible");
  }
}
// ───── Hide empty box when button clicked 
btnNoProduct.addEventListener("click", () => {
  noProductCartBox.classList.remove("opacity-100", "visible");
  noProductCartBox.classList.add("opacity-0", "invisible");
});
// ───── Update both count and total price 
function updateCart() {
  numberItemInCartBox();
  totalPrice();
}
// ───── Force hidden state on initial load 
window.addEventListener("load", () => {
  CartBox.classList.remove("opacity-100", "visible");
  CartBox.classList.add("opacity-0", "invisible");
  noProductCartBox.classList.remove("opacity-100", "visible");
  noProductCartBox.classList.add("opacity-0", "invisible");
  totalPrice(); 
  numItemCartBox.textContent = document.querySelectorAll(".Product").length;
});
}
{// ──────────────── Login User ──────────────── //
// ───── Select essential DOM 
const signUp = document.getElementById("signup")
const login = document.getElementById("login")
const loginBox = document.getElementById("login__box")
const logout = document.getElementById("logout")
// ───── Functions
function signInSignOut(){
  signUp.classList.toggle("flex")
  signUp.classList.toggle("hidden")
  login.classList.toggle("hidden")
  login.classList.toggle("flex")
}
function LoginBox() {
  loginBox.classList.toggle("hidden")
  loginBox.classList.toggle("flex")
}
function  CloseLoginnBoxOutsid(){
  document.addEventListener("click",(elemnt)=>{
    if(!loginBox.contains(elemnt.target) && !login.contains(elemnt.target)){
    loginBox.classList.add("hidden")
    loginBox.classList.remove("flex")
  }})
}
// ───── Sign Up
signUp.addEventListener("click", signInSignOut)
// ───── Login
login.addEventListener("click",()=>{
  LoginBox()
  CloseLoginnBoxOutsid()
})
// ───── Logout
logout.addEventListener("click",()=>{
  LoginBox()
  signInSignOut()

})




}
{// ──────────────── Menu and subMenu & Product Basket Mobile ──────────────── //
// ──────────────── Menu and subMenu Mobile ──────────────── //
// ───── Select essential DOM 
  const barsBtn = document.getElementById("bars__btn")

  const menuMobile = document.getElementById("menu-mobile")

  const subMenuMobile = document.getElementById("subMenu-Mobile")
  const ClassesSubMenuMobile = ["pt-1","pb-[15px]","overflow-visible" ,"visible", "h-50"]
  const pageShope = document.getElementById("page-shope")
  const btnSubMenuMobile = document.getElementById("btn__subMenu-Mobile")

  const subMenuMobileItem = document.querySelectorAll(".subMenu-Mobile__item")

  const itemMenuMobile = document.querySelectorAll('.item__menuMobile')

  const XbtnMenuMobile = document.getElementById('X-btn--menuMobile')
  const backFilter = document.getElementById('back-filter')


  const themeMobile = document.querySelectorAll(".theme-mobile")
// ──────────────── show and hidden Function() 
function showOrHidden(MC){
  MC.classList.toggle("w-67")
  MC.classList.toggle("w-0")
  MC.classList.toggle("opacity-0")
  MC.classList.toggle("opacity-100")
  MC.classList.toggle("invisible")
  backFilter.classList.toggle("hidden")
}
// ──────────────── Back filter
function BackFilter(MC){

}
// ──────────────── bars btn
barsBtn.addEventListener("click",()=>{
  showOrHidden(menuMobile)
})
// ──────────────── X btn
XbtnMenuMobile.addEventListener("click",()=>{
  showOrHidden(menuMobile)
})
// ──────────────── target page
function resetTargetPage(){
  itemMenuMobile.forEach(y =>{  
    y.classList.remove('target__page--mobile')
  })
}
itemMenuMobile.forEach(x =>{  
  x.addEventListener('click', e=>{
    if(!e.target.querySelector('use')){
      resetTargetPage()
      resetTargetItemSubMenu()
      e.currentTarget.classList.add('target__page--mobile')
      pageShope.classList.remove('text-orange-300')
      btnSubMenuMobile.classList.remove("-rotate-90")
      ClassesSubMenuMobile.forEach(x=> subMenuMobile.classList.remove(x))

    } 

  })  
})
// ──────────────── show and hidden subMenu mobile
btnSubMenuMobile.addEventListener("click",e=>{
  pageShope.classList.toggle('text-orange-300')
  e.currentTarget.classList.toggle("-rotate-90")
  ClassesSubMenuMobile.forEach(x=> subMenuMobile.classList.toggle(x))
})
// ──────────────── target item subMenu 
function resetTargetItemSubMenu(){
  subMenuMobileItem.forEach(t =>{
      t.classList.remove("target-item__subMenu")
    })
}
subMenuMobileItem.forEach(t =>{
  t.addEventListener("click", (e) => {
    resetTargetItemSubMenu()
    e.target.classList.add("target-item__subMenu")
    resetTargetPage()
    e.target.parentElement.previousElementSibling.classList.add('target__page--mobile')
  })
})
// ──────────────── theme Mobile 
const toggleThemeMobile = document.getElementById("toggle-theme_Mobile")
toggleTheme(toggleThemeMobile)
// ──────────────── Product Basket Mobile ──────────────── //
// ───── Select essential DOM 
const cartIconMobile = document.getElementById('cart-icon_mobile')
const CartBoxMobile = document.getElementById('Cart-box__Mobile')
const XbtnCartBoxMobile = document.getElementById('X-btn--CartBoxMobile')

// ──────────────── show and hidden Cart Box Mobile 
let flagtoggleProductBasketMobile = false
cartIconMobile.addEventListener("click",()=>{
  showOrHidden(CartBoxMobile)
  flagtoggleProductBasketMobile = true
})
XbtnCartBoxMobile.addEventListener("click",()=>{
  showOrHidden(CartBoxMobile)
  flagtoggleProductBasketMobile = false
})
// ──────────────── Back Filter - close box
backFilter.addEventListener("click",()=>{
  if(flagtoggleProductBasketMobile === true){
    showOrHidden(CartBoxMobile)
    flagtoggleProductBasketMobile = false
  }else{
    showOrHidden(menuMobile)
  }
})








}
{// ──────────────── Swiper ──────────────── //  
const swiper = new Swiper('.mySwiper', {
   breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 14,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 17,
    },
    1720: {
      slidesPerView: 4,
      spaceBetween: 20,
    }
  },
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  speed: 600,
});
// ───── manual controls
document.getElementById("prevBtn").addEventListener("click", () => {
  swiper.slidePrev(); 
});

document.getElementById("nextBtn").addEventListener("click", () => {
  swiper.slideNext(); 
});

}
{//──────────────── Blogs ────────────────//
const breakpoint = window.matchMedia("(max-width: 639px)");

function changeTag(element, newTag) {

    const newElement = document.createElement(newTag);

    // انتقال attribute ها
    for (const attr of element.attributes) {
        newElement.setAttribute(attr.name, attr.value);
    }

    // انتقال محتویات
    while (element.firstChild) {
        newElement.appendChild(element.firstChild);
    }

    // جایگزینی
    element.replaceWith(newElement);

    return newElement;
}


function responsiveBlog() {

    const blogs = document.querySelectorAll(".Blog");

    blogs.forEach(blog => {

        // =========================
        // موبایل: زیر 640px
        // =========================

        if (breakpoint.matches) {

            // Blog : a → div
            let currentBlog = blog;

            if (currentBlog.tagName === "A") {
                currentBlog = changeTag(currentBlog, "div");
            }

            // Study : div → a
            const study = currentBlog.querySelector(".Study");

            if (study && study.tagName === "DIV") {

                const newStudy = changeTag(study, "a");

                newStudy.setAttribute("href", "#");
            }

        }

        // =========================
        // دسکتاپ: 640px به بالا
        // =========================

        else {

            // Study : a → div
            let study = blog.querySelector(".Study");

            if (study && study.tagName === "A") {
                study = changeTag(study, "div");
            }

            // Blog : div → a
            if (blog.tagName === "DIV") {
                changeTag(blog, "a");
            }

        }

    });
}


// بار اول که صفحه باز می‌شود
responsiveBlog();


// فقط هنگام عبور از 640px اجرا می‌شود
breakpoint.addEventListener("change", responsiveBlog);
}




