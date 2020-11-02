const addBook=document.querySelector('#addBook');
const author=document.querySelector('#author');
const title=document.querySelector('#title');
const pages= document.querySelector('#pages');
const displayAddedBook=document.querySelector('.displayAddedBook');


let radio=document.querySelectorAll('input[type=radio');
let read;

radio.forEach((value)=>{
  value.addEventListener('click',(e)=>{
    read=e.target.value;
  })
})


function Book(title,author,pages,read){
  this.title=title;
  this.author=author;
  this.pages=pages;
  this.read=read;
}

let myLibrary;

if(localStorage.getItem('myLibrary')){
  myLibrary=JSON.parse(localStorage.getItem('myLibrary'));
}else{
  myLibrary=[];
}

addBook.addEventListener('click',function(e){
  e.preventDefault();
  
  if(read==undefined){
    read='Yes';
  }

  let book = new Book(title.value, author.value, pages.value,read);
  myLibrary.push(book);
  localStorage.setItem('myLibrary',JSON.stringify(myLibrary));

  formatBook(title.value,author.value, pages.value, read);

  title.value='';
  author.value='';
  pages.value='';
  read.value='';

});

let crossMarkEvent;
let card;

function formatBook(title, author, pages, read){
  card=document.createElement('div');
  card.className='card';

  let crossMark=document.createElement('span');
  crossMark.className='crossMark';
  crossMark.innerHTML='&#10060';
  card.appendChild(crossMark);
 
  let h3=document.createElement('h3');
  h3.textContent='Title:'+title;
  card.appendChild(h3);

  let p1=document.createElement('p');
  p1.textContent='Author: '+author;
  card.appendChild(p1);

  let p2=document.createElement('p');
  p2.textContent='Pages: '+pages;
  card.appendChild(p2);

  let divRead=document.createElement('div');
  divRead.classList.add('divRead');
  card.appendChild(divRead);
  let spanRead=document.createElement('span');
  spanRead.textContent='Read: ';
  divRead.appendChild(spanRead);
  let togglebutton=document.createElement('span');
  togglebutton.classList.add('toggleButton');
  togglebutton.innerHTML=read;
  divRead.appendChild(togglebutton);

  displayAddedBook.appendChild(card);
}


const data=JSON.parse(localStorage.getItem('myLibrary'));

try{
  data.forEach((value)=>{
    formatBook(value.title,value.author,value.pages,value.read);
  })
}catch(err){
  console.log(err.message);

}

for(let k=0; k<myLibrary.length; k++){
  document.querySelectorAll('.crossMark')[k].addEventListener('click',function(e){

    let parent=e.target.parentNode
    displayAddedBook.removeChild(parent);

    myLibrary.splice(k,1);
    localStorage.setItem('myLibrary',JSON.stringify(myLibrary));
  })
}

let toggle=document.querySelectorAll('.toggleButton');
toggle.forEach((value)=>{
  value.addEventListener('click',(e)=>{
    let text=e.target.textContent;
    if(text=='Yes'){
      e.target.textContent='No';
    }else{
      e.target.textContent='Yes';
    }
  })
})