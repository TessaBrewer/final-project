window.addEventListener('error', function(event) 
{
  console.log(event);
});

const featuredProduct = 12;//index of the featured product, change this to change the featured product

var fileName = location.href.split("/").slice(-1); //stores an array with 1 entry, the name of the current HTML document

var currentProduct = sessionStorage.getItem("passedProductValue"); //should store the key # for the currently selected product (for use on the single product page)

var myCurrentPage = sessionStorage.getItem("passedCurrentPage");

if(myCurrentPage < 0 || myCurrentPage > 2)
{
  myCurrentPage = 0;
  sessionStorage.setItem("passedCurrentPage", 0);
}

var booksID =
[
  {"olid": "OL24326648M", price: "6.00"}, //frankenstein
  {"olid": "OL7120857M", price: "16.60"}, //Dr.Jekyl and Mr.Hyde
  {"olid": "OL2550667M", price: "59.21"}, //It
  {"olid": "OL24207120M", price: "16.00"}, //Firestarter
  {"olid": "OL7033786M", price: "14.41"}, //Edgar Allan Poe
  {"olid": "OL6552298M", price: "5.30"}, //The Raven
  {"olid": "OL9831606M", price: "16.00"}, //The Case of Charles Dexter Ward
  {"olid": "OL24372171M", price: "14.36"}, // At the Mountains of Madness
  {"olid": "OL24205740M", price: "12.99"}, //The Dunwich Horror
  {"olid": "OL26341628M", price: "147.99"}, //The World is Blue
  {"olid": "OL26338814M", price: "1.23"}, //Russian book? (I hope its pg D-:)
  {"olid": "OL24156531M", price: "21.00"}, //Therese Raquin
  {"olid": "OL17196313M", price: "14.50"}, //Lord of the flies
  {"olid": "OL22976416M", price: "13.00"}, //More Poe :D
  {"olid": "OL21856932M", price: "5.00"}, //Taoist Yoga?
  {"olid": "OL7941346M", price: "6.00"}, //Mother
  {"olid": "OL7577028M", price: "9.99"}, //War of the Worlds
  {"olid": "OL24382006M", price: "4.25"}, //1984
  {"olid": "OL17240074M", price: "3.21"}, //brave new world
  {"olid": "OL22064758M", price: "20.02"}, //Writings of Rosa Luxemburg
  {"olid": "OL25083117M", price: "89.25"}, //Communist Manifesto
  {"olid": "OL5541887M", price: "6.25"}, //Das Kapital
  {"olid": "OL7056801M", price: "8.25"}, //Before Adam
  {"olid": "OL7110112M", price: "3.36"}, //weird satan poem
]

var books = []; //asynchronicity >:(              @TODO: kill async
var bookKeys = []; //holds the keys for the session memory

function getData()
{
console.log("I had to visit the API :(");
booksID.forEach(function(x)
{
  {
    var urlToBeCalled = 'https://openlibrary.org/api/books?bibkeys=OLID:' + x.olid + '&jscmd=details&format=json';
    $.ajax(
    {
      url: urlToBeCalled,
      success: function(result)
      {
        books.push(result["OLID:" + x.olid]);
        bookKeys.push(x.olid);

        if(!result["OLID:" + x.olid].details.hasOwnProperty("title"))
        {
          sessionStorage.setItem(x.olid + "title", "missing");
          console.log("Missing Title of " + x.olid);
        }else
        {
          sessionStorage.setItem(x.olid + "title", result["OLID:" + x.olid].details.title);
        }

        if(!result["OLID:" + x.olid].details.hasOwnProperty("authors"))
        {
          sessionStorage.setItem(x.olid + "authors", "missing");
          console.log("Missing Name of Author of " + x.olid);
        }else
        {
          sessionStorage.setItem(x.olid + "authors", result["OLID:" + x.olid].details.authors[0].name);
          console.log("I HAVE AN AUTHOR: " + x.olid);
        }

        if(!result["OLID:" + x.olid].details.hasOwnProperty("publish_date"))
        {
          sessionStorage.setItem(x.olid + "date", "missing");
          console.log("Missing Publish Date of " + x.olid);
        }else
        {
          sessionStorage.setItem(x.olid + "date", result["OLID:" + x.olid].details.publish_date);
        }

        if(!result["OLID:" + x.olid].details.hasOwnProperty("number_of_pages"))
        {
          if(!result["OLID:" + x.olid].details.hasOwnProperty("pagination"))
          {
            sessionStorage.setItem(x.olid + "pages", "missing");
            console.log("Missing Number of Pages of " + x.olid);
          }else
          {
            sessionStorage.setItem(x.olid + "pages", parseInt(result["OLID:" + x.olid].details.pagination));
          }
        }else
        {
          sessionStorage.setItem(x.olid + "pages", result["OLID:" + x.olid].details.number_of_pages);
        }

        //console.log(result); //for debugging
        //console.log(x); //for debugging
      },
      error: function(jqXHR, textStatus, errorThrow)
      {
        console.log(x.olid + " request failed");
        console.log(jqXHR, textStatus, errorThrow, urlToBeCalled);
      },
      async: false
    })
  }
}
); //this could've been done better, but it works so ¯\_(ツ)_/¯
}

if(sessionStorage.getItem(booksID[0].olid + "title") == null)
{
  getData();
}else
{ 
  booksID.forEach(x => 
    {
      books.push(
        {"details": 
        {"title": sessionStorage.getItem(x.olid + "title"),
        "authors": [{"name": sessionStorage.getItem(x.olid + "authors")}],
        "publish_date": sessionStorage.getItem(x.olid + "date"),
        "number_of_pages": sessionStorage.getItem(x.olid + "pages")}
      });
    });
}

function getImage(olid, size) //Open library doesn't always have the images I need, so I want to use a placeholder image
{
  var myUrl = "http://covers.openlibrary.org/b/olid/" + olid + "-" + size + ".jpg"; //add ?default=false after the fix so that it returns a 404 when the image is missing
/*
  $.ajax({
    type: "GET",
    url: myUrl,
    datatype: "xml",
    error: function(jqXHR, textStatus, errorThrown) {
        if (jqXHR.status == 404) {
          switch(size)
          {
            default:
            case "S":
              return "https://via.placeholder.com/40x60";
            case "M":
              return "https://via.placeholer.com/180x281";
            case "L":
              return "https://via.placeholder.com/320x500";
          }
        }
    },
    success: function()
    {
      return myUrl;
    }
  });
  */ //TODO FIX THIS SO THAT IT RETURNS A PLACEHOLDER IMAGE IN THE EVENT THAT THE ORIGINAL IMAGE IS MISSING

  return myUrl; //REMOVE THIS AFTER THE FIX 
}

function goToSingleProduct() //always store the "passedProductValue" in sessionStorage before calling this
{
  window.location.href = "../singleProductPage/singleProductPage.html";
}

function goToHomePage()
{
  window.location.href = "../mainPage/mainPage.html";
}

function goToAllProducts()
{
  window.location.href = "../productPage/productPage.html";
}

document.getElementById("homeButton").addEventListener("click", function() //listener for the home button
{
  goToHomePage();
});

document.getElementById("productsButton").addEventListener("click", function() //listener for the product button
{
  goToAllProducts();
});

document.getElementById("shoppingCartButton").addEventListener("click", function() //listener for the shopping cart button
{
  if(currentProduct != null) //takes you to the last viewed product if there is one, if not then this goes to the all product page
  {
    goToSingleProduct();
  }else
  {
    goToAllProducts();
  }
});

function fillExampleProduct(x, y) //@params x: class name, y: product number //for use of the main page
{
  document.getElementsByClassName(x)[0].innerHTML = 
  "<img src=" + getImage(booksID[y].olid, "M") + ">"
  + "<h2 class=\"clearText\">" + books[y].details.title + "</h2>"
  + "<h2 class=\"clearText\"> $" + booksID[y].price + "</h2>";
  document.getElementsByClassName(x)[0].addEventListener("click", function()
  {
    sessionStorage.setItem("passedProductValue", y);
    //debugger; //useful spot to check that data is being passed correctly
    goToSingleProduct();
  });
}

function fillSelectProductExtraProducts(x)
{
  var randomProductNumber = Math.floor(Math.random() * books.length);
  document.getElementsByClassName(x)[0].innerHTML = 
  "<img class=\"extraSelectProductImage\" src=" + getImage(booksID[randomProductNumber].olid, "M") + ">" +
  "<h3 class=\"extraSelectProductName\">" + books[randomProductNumber].details.title + "</h3>" +
  "<p class=\"extraSelectProductPrice\">$" + booksID[randomProductNumber].price + "</p>";
  document.getElementsByClassName(x)[0].addEventListener("click", function()
  {
    sessionStorage.setItem("passedProductValue", randomProductNumber);
    goToSingleProduct();
  });
}

function allProductPopulation(className, bookNumber)
{
  document.getElementsByClassName(className)[0].innerHTML = 
  "<img class=\"allProductImage\" src=" + getImage(booksID[bookNumber].olid, "M") + ">" +
  "<h3 class=\"allProductName\">" + books[bookNumber].details.title + "</h3>" +
  "<p class=\"allProductPrice\">$" + booksID[bookNumber].price + "</p>";

  document.getElementsByClassName(className)[0].addEventListener("click", function()
  {
    sessionStorage.setItem("passedProductValue", bookNumber);
    goToSingleProduct();
  });
}

function fullyPopulateFullProductPage()
{
  var tempArray = document.getElementsByClassName("allProduct");

  for(var i = 0; i < tempArray.length; i++)
  {
    tempArray[i].innerHTML = null;
  }

  document.getElementsByClassName("pageNumber")[0].innerHTML = 
  (parseInt(myCurrentPage, 10) + 1) + "/3";
  
  if(sessionStorage.getItem("passedCurrentPage") == null)
  {
    sessionStorage.setItem("passedCurrentPage", 0);
    myCurrentPage = 0;
  }

  if(myCurrentPage > 0)
  {
    document.getElementsByClassName("backButton")[0].innerHTML = 
    "<button><h3><i class=\"fas fa-arrow-left\"></i> Back</h3></button>";
  }else
  {
    document.getElementsByClassName("backButton")[0].innerHTML = null;
  }
  
  if(myCurrentPage < 2)
  {
    document.getElementsByClassName("nextButton")[0].innerHTML = 
    "<button><h3>Next <i class=\"fas fa-arrow-right\"></i></h3></button>";
  }else
  {
    document.getElementsByClassName("nextButton")[0].innerHTML = null;
  }
  
  allProductPopulation("firstAllProduct", (myCurrentPage * 8));
  allProductPopulation("secondAllProduct", ((myCurrentPage * 8) + 1));
  allProductPopulation("thirdAllProduct", ((myCurrentPage * 8) + 2));
  allProductPopulation("fourthAllProduct", ((myCurrentPage * 8) + 3));
  allProductPopulation("fifthAllProduct", ((myCurrentPage * 8) + 4));
  allProductPopulation("sixthAllProduct", ((myCurrentPage * 8) + 5));
  allProductPopulation("seventhAllProduct", ((myCurrentPage * 8) + 6));
  allProductPopulation("eighthAllProduct", ((myCurrentPage * 8) + 7));
}

if(fileName[0] == "mainPage.html") //put mainpage only code here (mostly stuff that populates the page)
{
  console.log("This should only run on the main page");

  document.getElementsByClassName("featuredProductName")[0].innerHTML = books[featuredProduct].details.title;
  document.getElementsByClassName("featuredProductDescription")[0].innerHTML = "By " + books[featuredProduct].details.authors[0].name;
  document.getElementsByClassName("featuredProductImage")[0].setAttribute("src", getImage(booksID[featuredProduct].olid, "M"));

  document.getElementsByClassName("featuredProductImage")[0].addEventListener("click", function()
  {
    sessionStorage.setItem("passedProductValue", featuredProduct);
    goToSingleProduct();
  });

  document.getElementsByClassName("learnMoreFeaturedProduct")[0].addEventListener("click", function()
  {
    sessionStorage.setItem("passedProductValue", featuredProduct);
    goToSingleProduct();
  });

  fillExampleProduct("firstExampleProduct", 3);
  fillExampleProduct("secondExampleProduct", 7);
  fillExampleProduct("thirdExampleProduct", 9);

  sessionStorage.setItem("passedCurrentPage", 0);
}

if(fileName[0] == "singleProductPage.html") //put singleProduct only code here (stuff that populates the single product page)
{
  console.log("This should only run on the single product page");

  document.getElementById("selectProductImage").setAttribute("src", getImage(booksID[currentProduct].olid, "L"));
  document.getElementsByClassName("selectProductName")[0].innerHTML = "<h1>" + books[currentProduct].details.title + "</h1>";
  document.getElementsByClassName("selectProductDescription")[0].innerHTML = 
  books[currentProduct].details.authors[0].name + 
  "<br>Published " + books[currentProduct].details.publish_date +
  "<br>" + books[currentProduct].details.number_of_pages + " p.";
  document.getElementsByClassName("selectProductPrice")[0].innerHTML = "$" + booksID[currentProduct].price;

  fillSelectProductExtraProducts("firstSelectProduct");
  fillSelectProductExtraProducts("secondSelectProduct");
  fillSelectProductExtraProducts("thirdSelectProduct");
}

if(fileName[0] == "productPage.html") //put allProduct code here (stuff that populates the all products page)
{
  console.log("This should only run on the all products page");
  
document.getElementsByClassName("backButton")[0].addEventListener("click", function()
{
  if(myCurrentPage > 0)
  {
    myCurrentPage--;
    sessionStorage.setItem("passedCurrentPage", myCurrentPage);
    fullyPopulateFullProductPage();
  }
});

document.getElementsByClassName("nextButton")[0].addEventListener("click", function()
{
  if(myCurrentPage < 2)
  {
    myCurrentPage++;
    sessionStorage.setItem("passedCurrentPage", myCurrentPage);
    fullyPopulateFullProductPage();
  }
});

fullyPopulateFullProductPage();
}