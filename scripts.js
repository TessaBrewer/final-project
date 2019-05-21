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

function printMyBooks(myArray)
{
  myArray.forEach(x => console.log(x));
}

var books = booksID.map(
    x => x.push
    (...$.curl'https://openlibrary.org/api/books?bibkeys=OLID:' + x.olid + '&jscmd=details&format=json'));