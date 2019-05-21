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
]

function printMyBooks(myArray) //nice for debugging
{
  myArray.forEach(x => console.log(x));
}

var books = []; //asynchronicity >:(

booksID.forEach(x =>
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
      }
    })
  }
); //this could've been done better, but it works so ¯\_(ツ)_/¯