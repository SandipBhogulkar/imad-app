console.log('Loaded!');


/*var element=document.getElementById('main-text');

element.innerHTML='Hey Sandy';*/

//move image
var img=document.getElementById('madi');
alert('get'+img);

var marginLeft=0;

function moveRight(){
    marginLeft= marginLeft+5;
    img.style.marginLeft=marginLeft+'px';
}

img.onclick= function(){
    var interval=setInterval(moveRight, 50);
    //img.style.marginLeft='100px';
};

//make counter coading
//var counter=0;
var button=document.getElementById('counter');
button.onclick=function(){
    //creare a request object
    var request=new XMLHttpRequest();
    
    
    
     //Take action
     request.onReadyStateChange=function();
    if(request.readyState==XMLHttpRequest.Done){
       
        if(request.status==200)
        {
            var counter=request.responseText();
            var span =document.getElementById('count');
             span.innerHTML=counter.toString();
        }
    }
    
    
    //capture the response and store in variable
   
    
    
    
    //render the variable in correct span
    //counter=counter+1;
    
}