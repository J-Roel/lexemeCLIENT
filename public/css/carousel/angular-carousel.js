window.onload = function(){


carousel = (function(){
  var box = document.querySelector('.carouselbox');
  var next = box.querySelector('.next');
  var prev = box.querySelector('.prev');
  var items = box.querySelectorAll('.content li');
  var counter = 0;
  var amount = items.length;
  var current = items[0];
  var timeout;

  box.classList.add('active');
  
  function navigate(direction) {
    
    current.classList.remove('current');
    
    counter = counter + direction;
    

    if (direction === -1 && counter < 0) { 
      counter = amount - 1; 
    }
    if (direction === 1 && !items[counter]) { 
      counter = 0;
    }

    current = items[counter];
    
    window.setTimeout( function(){ 
    	current.classList.add('current');
    }, 100 );
 
  }
  

  //Function for our buttons
  next.addEventListener('click', function(ev) {
  	console.log('NEXT')
    navigate(1);
  });
  prev.addEventListener('click', function(ev) {
  	console.log('PREV')
    navigate(-1);
  });
  navigate(0);



})();






}; //End of Window on load








/* END OF FILE */