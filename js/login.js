document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const resetForm = document.getElementById('resetForm');
    const errorMessage = document.getElementById('errorMessage');
    const registerMessage = document.getElementById('registerMessage');
    const resetMessage = document.getElementById('resetMessage');
    const registerLink = document.getElementById('registerLink');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const registerContainer = document.getElementById('registerContainer');
    const resetContainer = document.getElementById('resetContainer');
    const mainContainer = document.querySelector('main .container');

    // Mostrar formulario de registro
    registerLink.addEventListener('click', function(event) {
        event.preventDefault();
        mainContainer.style.display = 'none';
        registerContainer.style.display = 'block';
        resetContainer.style.display = 'none';
    });

    // Mostrar formulario de restablecer contraseña
    forgotPasswordLink.addEventListener('click', function(event) {
        event.preventDefault();
        mainContainer.style.display = 'none';
        resetContainer.style.display = 'block';
        registerContainer.style.display = 'none';
    });

    // Manejo de inicio de sesión
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

    // Manejo de registro de nuevo usuario
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newEmail = document.getElementById('newEmail').value;
        const newPassword = document.getElementById('newPassword').value;

        fetch('../data/users.json')
            .then(response => response.json())
            .then(users => {
                if (users.find(user => user.email === newEmail)) {
                    registerMessage.textContent = 'El correo electrónico ya está registrado';
                } else {
                    users.push({ email: newEmail, password: newPassword });
                    saveUsers(users);
                    registerMessage.textContent = 'Registro exitoso. Ahora puedes iniciar sesión';
                }
            })
            .catch(error => {
                console.error('Error al cargar el archivo JSON:', error);
                registerMessage.textContent = 'Hubo un problema con la solicitud. Inténtelo de nuevo más tarde.';
            });
    });

    // Manejo de restablecimiento de contraseña
    resetForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const resetEmail = document.getElementById('resetEmail').value;

        fetch('../data/users.json')
            .then(response => response.json())
            .then(users => {
                const user = users.find(user => user.email === resetEmail);

                if (user) {
                    const newPassword = prompt('Introduce la nueva contraseña:');
                    if (newPassword) {
                        user.password = newPassword;
                        saveUsers(users);
                        resetMessage.textContent = 'Contraseña restablecida exitosamente. Ahora puedes iniciar sesión';
                    }
                } else {
                    resetMessage.textContent = 'El correo electrónico no está registrado';
                }
            })
            .catch(error => {
                console.error('Error al cargar el archivo JSON:', error);
                resetMessage.textContent = 'Hubo un problema con la solicitud. Inténtelo de nuevo más tarde.';
            });
    });

    // Guardar usuarios en JSON
    function saveUsers(users) {
        // Simulación de guardado en JSON
        const usersJson = JSON.stringify(users);
        console.log('Usuarios actualizados:', usersJson);
        // Aquí puedes implementar una forma de guardar los datos actualizados en un archivo o base de datos
    }
});
