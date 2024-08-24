document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('prueba-form');
    const mensaje = document.getElementById('mensaje');
    const fraccion1Input = document.getElementById('fraccion1');
    const fraccion2Input = document.getElementById('fraccion2');
    const resultadoNumeradorInput = document.getElementById('resultadoNumerador');
    const resultadoDenominadorInput = document.getElementById('resultadoDenominador');

    let pruebaActual = 0;
    const totalPruebas = 5;

    const generarFracciones = () => {
        const nivel = pruebaActual + 1;
        const minNum = 1; // Mínimo valor para las fracciones
        const maxNum = 10;
        const numerador1 = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        const denominador1 = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        const numerador2 = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        const denominador2 = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        return { numerador1, denominador1, numerador2, denominador2 };
    };

    const mostrarNuevaPrueba = () => {
        if (pruebaActual < totalPruebas) {
            const { numerador1, denominador1, numerador2, denominador2 } = generarFracciones();
            fraccion1Input.value = `${numerador1}/${denominador1}`;
            fraccion2Input.value = `${numerador2}/${denominador2}`;
            resultadoNumeradorInput.value = '';
            resultadoDenominadorInput.value = '';
            mensaje.textContent = `Prueba ${pruebaActual + 1} de ${totalPruebas}`;
        } else {
            mensaje.textContent = '¡Felicidades! Has completado todas las pruebas.';
            form.style.display = 'none';
        }
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const [numerador1, denominador1] = fraccion1Input.value.split('/').map(Number);
        const [numerador2, denominador2] = fraccion2Input.value.split('/').map(Number);
        const resultadoNumerador = parseInt(resultadoNumeradorInput.value, 10);
        const resultadoDenominador = parseInt(resultadoDenominadorInput.value, 10);

        const expectedNumerador = (numerador1 * denominador2) + (numerador2 * denominador1);
        const expectedDenominador = denominador1 * denominador2;

        if (resultadoNumerador === expectedNumerador && resultadoDenominador === expectedDenominador) {
            mensaje.textContent = '¡Correcto! Vamos a la siguiente prueba.';
            pruebaActual++;
            setTimeout(mostrarNuevaPrueba, 1000);
        } else {
            mensaje.textContent = 'Incorrecto. Intenta de nuevo.';
        }
    });

    mostrarNuevaPrueba();
});
