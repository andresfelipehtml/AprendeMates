document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.tarjeta--grupo-botones a');

    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            const isLoginButton = button.getAttribute('href') === './app/login.html';
            if (isLoginButton) {
                // Store the grade in localStorage
                const tarjeta = button.closest('.tarjeta');
                const grade = tarjeta.querySelector('h2').className;
                localStorage.setItem('selectedGrade', grade);
                return; // Let the redirection happen
            }

            event.preventDefault();

            // Remove active class from all buttons in the same card
            const tarjeta = button.closest('.tarjeta');
            const tarjetaButtons = tarjeta.querySelectorAll('.tarjeta--grupo-botones a');
            tarjetaButtons.forEach(btn => btn.classList.remove('active'));

            // Hide all content divs in the same card
            const contenidoDivs = tarjeta.querySelectorAll('.contenido');
            contenidoDivs.forEach(div => div.hidden = true);

            // Add active class to clicked button
            button.classList.add('active');

            // Show the targeted content div
            const targetId = button.getAttribute('data-target');
            const targetDiv = tarjeta.querySelector(`#contenido-${targetId}`);
            targetDiv.hidden = false;
        });
    });
});
