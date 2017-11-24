var subjects = ["Agriculture", "Biology", "ComputerScience", "English",
"Film", "Mathematics", "Sociology"];

var courses = {Agriculture: [{code:"AGRI1000", name: "Introduction to Agriculture", description: "An introduction to agriculture.", hours:"1:30PM-2:30PM", days:"MWF", instructor:"Dr. White", location:"EITC E2 165", credits:"3.00"}, {code:"AGRI2000", name: "Agriculture Part 2", description: "Agriculture cont'd.", hours:"11:30PM-12:30PM", days:"MWF", instructor:"Col. Mustard", location:"Armes 212", credits:"3.00"}, {code:"AGRI3000", name: "Farm Stuff", description: "An introduction to what you do on a farm.", hours:"1:30PM-2:30PM", days:"MWF", instructor:"Dr. McCree", location:"EITC E2 222", credits:"3.00"}],
Biology:[{code:"BIOL1000", name: "Introduction to Biology", description: "An introduction to biology.", hours:"1:30PM-2:30PM", days:"MWF", instructor:"Dr. Who", location:"EITC E2 182", credits:"3.00"}],
ComputerScience:[{code:"COMP1020", name: "Introduction to Comp Sci", description: "A second introduction to computer science.", hours:"11:30PM-1:00PM", days:"TR", instructor:"Dr. Phil", location:"Tier 101", credits:"3.00"}],
English: [{code:"ENGL100", name: "Introduction to English", description: "An introduction to English.", hours:"11:30PM-12:30PM", days:"MWF", instructor:"Prof. Peacock", location:"Armes 134", credits:"3.00"}],
Film:[{code:"FILM4000", name: "Film Finales", description: "A study of finales in film.", hours:"11:30PM-1:00PM", days:"TR", instructor:"Mr. Reyes", location:"Tier 121", credits:"3.00"}],
Mathematics:[{code:"MATH1500", name: "Introduction to Failure", description: "Oops meant Calculus.", hours:"1:30PM-2:30PM", days:"MWF", instructor:"Ms. Oxton", location:"EITC E2 432", credits:"3.00"}],
Sociology:[{code:"SOCI2000", name: "Education", description: "???", hours:"11:30PM-1:00PM", days:"TR", instructor:"Sir Winston", location:"Tier 420", credits:"3.00"}]};

var codeSubjectMap = {AGRI:"Agriculture", BIOL:"Biology", COMP:"ComputerScience", ENGL:"English", FILM: "Film",
MATH: "Mathematics", SOCI:"Sociology"}

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
    course = '\<div class="card card-added"\>\<div class="card-header"\>\<h5\>'+ item.code + ' - ' + item.name +'\</h5\>\</div\>' //header
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
