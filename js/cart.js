var cart = [];
var cartItemCount = 0;

function renderCheckout(){
  var classes = "";
  var title;
  var cart = localStorage.getItem('cart');
  console.log(cart);
  cart = cart.split(",");
  if(cart != ""){
    for(item in cart){
      console.log(cart[item]);
        if(cart[item] !== null){
          if(item > 0){
            classes +=  "\<hr class='my-3 removable'\>"
          }
          //adds name to listing view.js
          title = codeSubjectMap[cart[item].substring(0, 4)];
          console.log("title1: "+ title);
          title = courses[title].find(c => c.code === cart[item]);
          console.log("title2: "+ title.code);

          classes += "\<div id='"+cart[item]+ item + "'\>\<h5\>"+ cart[item] + " - " + title.name +"\</h5\>" //format, allow deletion
          classes += "\<h6\>"+ title.days + " - " + title.hours +"\</h6\>"
          classes += "\<button class='btn btn-sm btn-danger' onclick=removeCourse('"+ cart[item]+item  +"')\>Remove from Cart\</button\>\</div\>"
          cartItemCount++;
        }
    }
    if(classes != ""){
        $("#cartSpace").html(classes);
    }
  }
}

function emptyCart(){
  $("#cartSpace").html("\<h6\>No classes in cart.\</h6\>");
    localStorage.setItem('cart', undefined);
}

function route(homeSchedule){
  if(homeSchedule === "home"){
    location.href = "home.html";
  } else if(homeSchedule === "schedule"){
    location.href = "schedule.html";
  }
}

function removeCourse(cartItemID){
  $("#" + cartItemID).remove();
  cartItemCount--;
  if(cartItemCount <= 1){
      $(".my-3.removable").remove();
  }
}
