var cart = [];
var cartItemCount = 0;

function renderCheckout(){
  var classes = "";
  var title;
  var buildings = [];
  var buildingsClasses = [];
  var legendHtml = "";
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

          if(title.location.search("E2") !== -1){
            buildings.push("E2");
            buildingsClasses.push(title.code);
          }else if(title.location.search("Tier")  !== -1){
            buildings.push("Tier");
            buildingsClasses.push(title.code);
          }else if(title.location.search("Armes")  !== -1){
            buildings.push("Armes");
            buildingsClasses.push(title.code);
          }
        }
    }
    if(classes != ""){
        $("#cartSpace").html(classes);

        if(buildings.includes("E2") && buildings.includes("Tier") && buildings.includes("Armes")){
            $("#mapDiv").html(mapE2ArmesTier);
            $("#scheduleDiv").html(scheduleE2ArmesTier);
        }else if(buildings.includes("E2") && buildings.includes("Tier")){
            $("#mapDiv").html(mapE2Tier);
            $("#scheduleDiv").html(scheduleE2Tier);
        }else if(buildings.includes("E2") && buildings.includes("Armes")){
            $("#mapDiv").html(mapE2Armes);
            $("#scheduleDiv").html(scheduleE2Armes);
        }else if(buildings.includes("Armes") && buildings.includes("Tier")){
            $("#mapDiv").html(mapArmesTier);
            $("#scheduleDiv").html(scheduleArmesTier);
        }else if(buildings.includes("E2")){
            $("#mapDiv").html(mapE2);
            $("#scheduleDiv").html(scheduleE2);
        }else if(buildings.includes("Armes")){
            $("#mapDiv").html(mapArmes);
            $("#scheduleDiv").html(scheduleArmes);
        }else if(buildings.includes("Tier")){
            $("#mapDiv").html(mapTier);
            $("#scheduleDiv").html(scheduleTier);
        }

        if(buildings.includes("E2")){
          legendHtml += "\<h6 style='color:darkred'\>EITC-E2 - ";
          buildings.forEach(function(item, index){
            if(item === "E2"){
              legendHtml += buildingsClasses[index] + "  ";
            }
          })
          legendHtml += "\</h6\>";
        }
        if(buildings.includes("Tier")){
          legendHtml +="\<h6 style='color:darkblue'\>Tier - ";
          buildings.forEach(function(item, index){
            if(item === "Tier"){
              legendHtml += buildingsClasses[index];
            }
          })
          legendHtml += "\</h6\>";
        }
        if(buildings.includes("Armes")){
          legendHtml +="\<h6 style='color:darkgreen'\>Armes - ";
          buildings.forEach(function(item, index){
            if(item === "Armes"){
              legendHtml += buildingsClasses[index];
            }
          })
          legendHtml += "\</h6\>";
        }
        $("#mapLegendDiv").html(legendHtml);
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
