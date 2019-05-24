const featuredProduct = 12;//index of the featured product, change this to change the featured product

var booksID =
[
  {"olid": "OL24326648M", price: 6}, //frankenstein
  {"olid": "OL7120857M", price: 16}, //Dr.Jekyl and Mr.Hyde
  {"olid": "OL2550667M", price: 59}, //It
  {"olid": "OL24207120M", price: 16}, //Firestarter
  {"olid": "OL7033786M", price: 14}, //Edgar Allan Poe
  {"olid": "OL6552298M", price: 5}, //The Raven
  {"olid": "OL9831606M", price: 16}, //The Case of Charles Dexter Ward
  {"olid": "OL24372171M", price: 14}, // At the Mountains of Madness
  {"olid": "OL24205740M", price: 12}, //The Dunwich Horror
  {"olid": "OL26341628M", price: 147}, //The World is Blue
  {"olid": "OL26338814M", price: 1}, //Russian book? (I hope its pg D-:)
  {"olid": "OL9427026M", price: 21}, //Medical Insurance Handbook
  {"olid": "OL17196313M", price: 14}, //Lord of the flies
  {"olid": "OL22976416M", price: 13}, //More Poe :D
  {"olid": "OL21856932M", price: 5}, //Taoist Yoga?
  {"olid": "OL23213727M", price: 6}, //War and Peace
  {"olid": "OL7577028M", price: 9}, //War of the Worlds
  {"olid": "OL24382006M", price: 4}, //1984
  {"olid": "OL17240074M", price: 3}, //brave new world
  {"olid": "OL22064758M", price: 20}, //Writings of Rosa Luxemburg
  {"olid": "OL25083117M", price: 89}, //Communist Manifesto
  {"olid": "OL5541887M", price: 6}, //Das Kapital
  {"olid": "OL5478196M", price: 8}, //American History
  {"olid": "OL7110112M", price: 3}, //weird satan poem

]

function printMyBooks(myArray) //nice for debugging
{
  myArray.forEach(x => console.log(x));
}

var books = []; //asynchronicity >:(              @TODO: kill async

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

function fillExampleProduct(x, y) //@params x: class name, y: product number
{
  document.getElementsByClassName(x)[0].innerHTML = 
  "<img src=" + "http://covers.openlibrary.org/b/olid/" + booksID[y].olid + "-M.jpg" + ">"
  + "<h2>" + books[y].details.title + "</h2>"
  + "<h2> $" + booksID[y].price + "</h2>";
}

document.getElementsByClassName("featuredProductName")[0].innerHTML = books[featuredProduct].details.title;
document.getElementsByClassName("featuredProductDescription")[0].innerHTML = "By " + books[featuredProduct].details.authors[0].name;
document.getElementsByClassName("featuredProductImage")[0].setAttribute("src", "http://covers.openlibrary.org/b/olid/" + booksID[featuredProduct].olid + "-M.jpg");

fillExampleProduct("firstExampleProduct", 3);
fillExampleProduct("secondExampleProduct", 7);
fillExampleProduct("thirdExampleProduct", 9);
