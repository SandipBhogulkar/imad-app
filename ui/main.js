console.log('Loaded!');


var element=document.getElementById('main-text');

element.innerHTML='Hey Sandy';

//move image
var img=document.getElementById('madi');
alert('get'+img);
img.onClick= function(){
    alert('onclick '+img);
    img.style.marginLeft='100px';
};