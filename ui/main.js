console.log('Loaded!');


var element=document.getElementById('main-text');

element.innerHTML='Hey Sandy';

//move image
var img=document.getElementById('madi');
alert(img);
img.onClick= function(){
    img.style.marginLeft='100px';
};