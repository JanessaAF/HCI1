var subjects = ["Agriculture", "Biology", "Computer Science", "English",
"Film Studies", "Mathematics", "Physics", "Sociology", "Women's Studies"];

var courses = {Agriculture: [{code:"AGRI1000", name: "Introduction to Agriculture", description: "An introduction to agriculture.", hours:"1:30PM-2:30PM", days:"MWF", instructor:"Dr. White", location:"EITC E2 105", credits:"3.00"}]}

var codeSubjectMap = {AGRI:"Agriculture", BIOL:"Biology", COMP:"Computer Science", ENGL:"English", FILM: "Film Studies",
MATH: "Mathematics", PHYS:"Physics", SOCI:"Sociology", WOMN:"Women's Studies"}

//show subjects tab
function showSubjects(term){
  var subjectsHtml = "";
  $('#subjectColumn').show();
  //handle which term is highlighted
  $('#termColumn ul li a.active').removeClass("active");
  $('#'+ term).addClass("active")
  //build subjects list html
  subjects.forEach(function(item){
    itemNoSpace = item.indexOf("/\s/")!=-1 ? item.replace(/\s/g, "+") : item;
    subjectsHtml += '\<li class="nav-item"\>\<a id="'+ itemNoSpace +'" class="nav-link" href="#'+ itemNoSpace +'" onclick="showCourses(\''+item+'\');"\>'+ item +'\</a\>\</li\>';
  });
  $("#subjects").html(subjectsHtml);
  return subjectsHtml;
}

//show courses
function showCourses(subject){
  var course;
  var coursesHtml = "\<h3\>Courses:\</h3\>";
  console.log(subject);
  $('#courseColumn').show();
  //handle which subject is highlighted
  $('#subjectColumn ul li a.active').removeClass("active");
  $('#'+ subject).addClass("active")
  //build course list html
  courses[subject].forEach(function(item){
    course = '\<div class="card"\>\<div class="card-header"\>\<h5\>'+ item.code + ' - ' + item.name +'\</h5\>\</div\>' //header
    course += '\<div class="card-body"\> \<div class="row"\>\<div class="col-sm-8"\> \<div class="courseDesc"\>'+ item.description +'\</div\>';//body code
    course += '\<div class="courseTime"\> Time: '+ item.days + " " + item.hours +'\</div\>\</div\>';
    course += '\<div class="col-sm-4"\> \<div class="courseProf"\> Instructor: '+ item.instructor +'\</div\>';
    course += '\<div class="courseLocation"\> Location: '+ item.location +'\</div\>';
    course += '\<div class="courseCredits"\> Credits: '+ item.credits +'CR \</div\>\</div\>\</div\>\</div\>'
    course += '\<div class="card-footer"\>\<button type="button" class="btn btn-info" onclick=addToCart("'+ item.code +'");\>\<i class="fa fa-cart-plus" aria-hidden="true"\>\</i\> Add to Cart\</button\>\</div\>\</div\>';
    coursesHtml += course;
  });
  $("#coursesColumn").html(coursesHtml);
  return coursesHtml;
}

function addToCart(course){
  console.log(course);
  popoverText = $("#cart").attr("data-content");
  if( popoverText === "No classes in cart."){
    $("#cart").attr("data-content", course + "<br>");
  }else{
    $("#cart").attr("data-content", popoverText + course + "<br>");
  }
  cart.push(course);
  $("#cart").popover('show');
}

function goToCart(){
  console.log(cart);
  localStorage.setItem('cart', cart);
  location.href = "cart.html";
}
