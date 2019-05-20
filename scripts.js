var booksID =
[
  {"id": "OL24326648M"}, //frankenstein
  {"id": "OL7120857M"}, //Dr.Jekyl and Mr.Hyde
  {"id": "OL2550667M"}, //It
  {"id": "OL24207120M"}, //Firestarter
  {"id": "OL7033786M"}, //Edgar Allan Poe
  {"id": "OL6552298M"}, //The Raven
  {"id": "OL9831606M"}, //The Case of Charles Dexter Ward
  {"id": "OL24372171M"}, // At the Mountains of Madness
  {"id": "OL24205740M"} //The Dunwich Horror
]

function printMyBooks(myArray)
{
  myArray.forEach(x => console.log(x));
}

booksID.forEach(
  book => book.smallPhoto = "http://covers.openlibrary.org/b/olid/" + book[id] + "-S.jpg";
);
