document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('prueba-form');
    const mensaje = document.getElementById('mensaje');
    const numero1Input = document.getElementById('numero1');
    const numero2Input = document.getElementById('numero2');
    const resultadoInput = document.getElementById('resultado');

    let pruebaActual = 0;
    const totalPruebas = 10;

    const generarNumeros = () => {
        const nivel = pruebaActual + 1;
        const minNum = 100; // Mínimo 3 cifras
        const maxNum = 99999; // Máximo 5 cifras
        let numero1, numero2;
        
        // Generar números asegurando que el primer número es mayor que el segundo
        do {
            numero1 = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
            numero2 = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        } while (numero1 <= numero2);
        
        return { numero1, numero2 };
    };
    

    const mostrarNuevaPrueba = () => {
        if (pruebaActual < totalPruebas) {
            const { numero1, numero2 } = generarNumeros();
            numero1Input.value = numero1;
            numero2Input.value = numero2;
            resultadoInput.value = '';
            mensaje.textContent = `Prueba ${pruebaActual + 1} de ${totalPruebas}`;
        } else {
            mensaje.textContent = '¡Felicidades! Has completado todas las pruebas.';
            form.style.display = 'none';
        }
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const numero1 = parseInt(numero1Input.value, 10);
        const numero2 = parseInt(numero2Input.value, 10);
        const resultado = parseInt(resultadoInput.value, 10);

        if (resultado === numero1 - numero2 && resultado >= 0) { // Only allow positive results
            mensaje.textContent = '¡Correcto! Vamos a la siguiente prueba.';
            pruebaActual++;
            setTimeout(mostrarNuevaPrueba, 1000);
        } else {
            mensaje.textContent = 'Incorrecto. Intenta de nuevo.';
        }
    });

    mostrarNuevaPrueba();
});
