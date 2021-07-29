var search="";
$(document).ready(()=>{
   $(".searchbutton").click(()=>{EventHandler();});
   $(document).on("keyup",(event)=>{
       if(event.key=="Enter")EventHandler();
   });
  
});
function EventHandler(){
   var id=null;
   var urllink="https://www.googleapis.com/books/v1/volumes?q=";
   var data=$(".searchbartool").val();
   if(data!=""){
   id=setInterval(()=>{
      
      $(".heading").css("visibility","hidden");
      $(".searchheading").css("visibility","visible");
       $(".searchbar").css("margin-top","-10%");
       $(".searchheading").css("margin-top","1%");
       $(".searchheading").css("color","orange");
       $(".closebutton").css("visibility","visible");
       $("#bookList").css("visibility","visible");
       $("body").css("overflow","visible");
   });
   if(search!=data){
       $(".searchheading").text("Search Results");
       search=data;
       $("#bookList").empty();
       $.ajax({
           url: urllink+data, 
           dataType:"json",
       success: function(result){
           console.log(result);
           BookListJsonHandler(result);
          
   
           }
         });
   }
  
    }
}
function BookListJsonHandler(res){
   bookList=document.getElementById("bookList");
   try{
   for(var book=0;book<res.items.length;book+=2){
       var title=res.items[book].volumeInfo.title;
       var author=(res.items[book].volumeInfo.authors[0]!=undefined)?res.items[book].volumeInfo.authors[0]:"Not Availiable";
       var bookimage=res.items[book].volumeInfo.imageLinks.thumbnail;
       var publishdate=(res.items[book].volumeInfo.publishedDate!=undefined)?res.items[book].volumeInfo.publishedDate:"Not Avaliable";
       var publisher=(res.items[book].volumeInfo.publisher!=undefined)?res.items[book].volumeInfo.publisher:"Not Avaliable";
       var book1isbn=("bookview.html?isbn="+res.items[book].volumeInfo.industryIdentifiers[0].identifier!=undefined)?"bookview.html?isbn="+res.items[book].volumeInfo.industryIdentifiers[0].identifier:"Not Availiable";
       var title2=res.items[book+1].volumeInfo.title;
       var author2=(res.items[book+1].volumeInfo.authors[0]!=undefined)?res.items[book+1].volumeInfo.authors[0]:"Not Availiable";
       var bookimage2=res.items[book+1].volumeInfo.imageLinks.thumbnail;
       var publishdate2=(res.items[book+1].volumeInfo.publishedDate!=undefined)?res.items[book+1].volumeInfo.publishedDate:"Not Avaliable";
       var publisher2=(res.items[book+1].volumeInfo.publisher!=undefined)?res.items[book+1].volumeInfo.publisher:"Not Avaliable";
       var book2isbn=("bookview.html?isbn="+res.items[book+1].volumeInfo.industryIdentifiers[0].identifier!=undefined)?"bookview.html?isbn="+res.items[book+1].volumeInfo.industryIdentifiers[0].identifier:"Not Availiable";
       var rowbook1='<div class="books"><h1 class="titleheading">'+title+'</h1><div class="bookdetails"><img src='+bookimage+'><div class="textdetails"><h2>Author :'+author+'</h2><h2>publisher :'+publisher+'</h2><h2>Publish date :'+publishdate+'</h2><a  target="_blank"  href='+book1isbn+'><button class="readbutton">READ</button></a></div></div></div>';
       var rowbook2='<div class="books"><h1 class="titleheading">'+title2+'</h1><div class="bookdetails"><img src='+bookimage2+'><div><h2>Author :'+author2+'<h2>publisher :'+publisher2+'</h2><h2>Publish date :'+publishdate2+'</h2><a target="_blank"  href='+book2isbn+'><button class="readbutton">READ</button></a></div></div></div>';
       $("#bookList").html($("#bookList").html()+bookHtmlcontent(rowbook1,rowbook2));
   }
}
catch(err){
   if($("#bookList").html()=="")
   $(".searchheading").html("Search Results : 0");
}
  
}
function bookHtmlcontent(book1,book2){
   var HtmlELement="<div class='rows'>"+book1+book2+"</div>";
   return HtmlELement;
}
function footer(){
foot=document.getElementById("foot").style;
foot.bottom="10%";
}