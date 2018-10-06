(function() {
    var burger = document.querySelector('.burger');//Selecciona la variable burger como el burger del documento html
    var menu = document.querySelector('#'+burger.dataset.target);//Genera el menu desplegable por la propiedad dataset
    burger.addEventListener('click', function() {//Escucha el evento, en este caso el click
        burger.classList.toggle('is-active');//Activa el menu desplegable básicamente 
        menu.classList.toggle('is-active');
    });
})();
