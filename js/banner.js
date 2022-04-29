function slide1(){
    document.getElementById('id').src="img/ban1.jpg";
    setTimeout("slide2()", 2000);
    }
    
    function slide2(){
    document.getElementById('id').src="img/ban2.jpg";
    setTimeout("slide3()", 2000);
    }
    
    function slide3(){
    document.getElementById('id').src="img/ban3.jpg";
    setTimeout("slide1()", 2000);
    }