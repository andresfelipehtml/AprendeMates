document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch('../data/users.json')
            .then(response => response.json())
            .then(users => {
                const user = users.find(user => user.email === email && user.password === password);

                if (user) {
                    const selectedGrade = localStorage.getItem('selectedGrade');
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userEmail', email);
                    if (selectedGrade) {
                        window.location.href = `../app/niveles/${selectedGrade.toLowerCase()}.html`; // Redirige a la página del grado
                    } else {
                        window.location.href = '../index.html'; // Redirige a la página principal
                    }
                } else {
                    errorMessage.textContent = 'Correo electrónico o contraseña incorrectos';
                }
            })
            .catch(error => {
                console.error('Error al cargar el archivo JSON:', error);
                errorMessage.textContent = 'Hubo un problema con la solicitud. Inténtelo de nuevo más tarde.';
            });
    });
});
