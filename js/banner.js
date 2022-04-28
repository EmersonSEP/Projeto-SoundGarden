function slide1(){
    document.getElementById('id').src="img/banner1.jpg";
    setTimeout("slide2()", 2000);
    }
    
    function slide2(){
    document.getElementById('id').src="img/banner2.jpg";
    setTimeout("slide3()", 2000);
    }
    
    function slide3(){
    document.getElementById('id').src="img/banner3.jpg";
    setTimeout("slide1()", 2000);
    }