const featuredProduct = 12;//index of the featured product, change this to change the featured product

var booksID =
[
  {"olid": "OL24326648M"}, //frankenstein
  {"olid": "OL7120857M"}, //Dr.Jekyl and Mr.Hyde
  {"olid": "OL2550667M"}, //It
  {"olid": "OL24207120M"}, //Firestarter
  {"olid": "OL7033786M"}, //Edgar Allan Poe
  {"olid": "OL6552298M"}, //The Raven
  {"olid": "OL9831606M"}, //The Case of Charles Dexter Ward
  {"olid": "OL24372171M"}, // At the Mountains of Madness
  {"olid": "OL24205740M"}, //The Dunwich Horror
  {"olid": "OL26341628M"}, //The World is Blue
  {"olid": "OL26338814M"}, //Russian book? (I hope its pg D-:)
  {"olid": "OL9427026M"}, //Medical Insurance Handbook
  {"olid": "OL17196313M"}, //Lord of the flies
  {"olid": "OL22976416M"}, //More Poe :D
  {"olid": "OL21856932M"}, //Taoist Yoga?
  {"olid": "OL23213727M"}, //War and Peace
  {"olid": "OL7577028M"}, //War of the Worlds
  {"olid": "OL24382006M"}, //1984
  {"olid": "OL17240074M"}, //brave new world
  {"olid": "OL22064758M"}, //Writings of Rosa Luxemburg
  {"olid": "OL25083117M"}, //Communist Manifesto
  {"olid": "OL5541887M"}, //Das Kapital
  {"olid": "OL5478196M"}, //American History
  {"olid": "OL7110112M"}, //weird satan poem

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

document.getElementsByClassName("featuredProductName")[0].innerHTML = books[featuredProduct].details.title;
document.getElementsByClassName("featuredProductDescription")[0].innerHTML = "By " + books[featuredProduct].details.authors[0].name;
document.getElementsByClassName("featuredProductImage")[0].setAttribute("src", books[featuredProduct].thumbnail_url);