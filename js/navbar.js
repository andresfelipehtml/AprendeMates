// Obtener los botones por su clase
const botones = document.getElementsByClassName('dropbtn');

// Agregar un evento de clic a cada botón
Array.from(botones).forEach(boton => {
    boton.addEventListener('click', function() {
        // Obtener el grado del botón clicado
        const grado = this.getAttribute('data-grado');
        
        // Redireccionar a la página deseada
        window.location.href = `grado_${grado}.html`;
    });
});