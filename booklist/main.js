////book class:represent a  book
class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

///ui class:Handle ui tasks
class UI{
    static displayBooks(){
        const books = store.getBooks();
    //   const StoredBooks=[
    //     {
    //      title:'book one',
    //     author:'pandey',
    //     isbn:'343434'
    //     },
    //     {          
    //         title:'book one',
    //         author:'pandey',
    //         isbn:'434343'
    //     }
    //   ];
    // const books=StoredBooks;  
    books.forEach((book)=>UI.addBookToList(book));
    }
    static addBookToList(book){
        const list=document.querySelector('#book-list');
        const row =document.createElement('tr');

        row.innerHTML=
        `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td> <a href="# "class="btn btn-danger btn-sm delete" </a>x</td>`;
         
       list.appendChild(row);
    }
     static deleteBook(el){        
        // console.log(el.classList);
 
           if( el.classList.contains('delete')){
           // alert('hey there');
          el.parentElement.parentElement.remove();
          UI.showAlert('Book Removed','success');
       }
     }
    
     static showAlert(message,className){         
         const div=document.createElement('div');         
         div.className=`alert alert-${className}`;         
         div.appendChild(document.createTextNode(`${message}`));         
         const container = document.querySelector('.container');         
         const form = document.querySelector('#book-form');
         container.insertBefore(div,form);
         //remove alert after 3 second 
         setTimeout(() =>document.querySelector('.alert').remove(),2000);  
     }
    static clearFields(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
    }
}
/////store class:handle storage
class store{
     static getBooks(book){
     let books;     
     if(localStorage.getItem('books') === null){
         books=[];
        // alert('hey there');
       } 
     else{
        //alert('hey there');
         books=JSON.parse(localStorage.getItem('books'));
         
     }
     return books;
    }

    static addBook(book){       
     const books = store.getBooks();
     books.push(book);
     localStorage.setItem('books',JSON.stringify(books));
     
    }

    // static removeBook(isbn){

    //  const books=store.getBooks();
    //  books.forEach( (book,index) =>{
    //      if(books.isbn === isbn ){
    //          books.splice(index,1);
    //      }
    //  });

    //  localStorage.setItem('books',JSON.stringify(books));
    // }
}

///event:display book
   document.addEventListener('DOMContentLoaded',UI.displayBooks);
// ///event :add a book
 document.querySelector('#book-form').addEventListener('submit',(e) =>{                                                                    
         ////prevent actual submit
       e.preventDefault();
       //get form values
     const title=document.querySelector('#title').value;
     const author=document.querySelector('#author').value;
     const isbn=document.querySelector('#isbn').value;

     ///validate
     if(title==='' || author==='' || isbn==='' ){
         UI.showAlert('please fill all field','danger');
     }
     else{    
     //instant book
     const book = new Book(title,author,isbn);
      //  console.log(book);   
      ///add book to ui 
      UI.addBookToList( book);
      
       //// add book to store
       store.addBook(book);
      // alert('hey there');
      UI.showAlert('Book Added','success');

      ////clear field
      UI.clearFields();
    }
 });
   //event:remove a book
document.querySelector('#book-list').addEventListener('click',(e) =>{
      ///remove book from ui
      UI.deleteBook(e.target);

      //// remove from localstorage
      // store.removeBook(e.target.parentElement.previousElementSibling.textContent);

      
}) ;
