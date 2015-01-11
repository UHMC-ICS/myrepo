var theVideo = "http://www.youtube.com/embed/VIrBecB746c?rel=0";
var bkgColor = "khaki";
var titleColor = "black";
var theShadow = "2";
var theFont = "serif";

function changeVideo(v)
{
   theVideo = v;
// alert(theVideo);
   document.getElementById("myVideo").setAttribute("src", theVideo ); 
}

function changeFont(f)
{
   theFont = f;
   changeStyle();
}

function changeBkgColor(b)
{
   bkgColor = b;
   changeStyle();
}

function changeTitleColor(b)
{
   titleColor = b;
   changeStyle();
}

function changeShadow(b)
{
   theShadow = b;
   changeStyle();
}

function changeStyle()
{
   var theStyle="background-color: " + bkgColor + "; ";
   
// alert(theStyle);
   document.getElementById("myBody").setAttribute("style", theStyle ); 

   theStyle="color: " + titleColor + 
   "; font-family: " + theFont + 
   "; text-shadow: " + theShadow + "px " + theShadow + "px 10px dimgray;";
//   alert(theStyle);
   
   var title_list = document.getElementsByName("title"); 
//   alert(title_list.length);

   for (var i=0; i<title_list.length; i++) {
       title_list[i].setAttribute("style", theStyle ); 
   }
}

window.addEventListener( "load", changeStyle, false );
