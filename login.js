// Datos de usuarios (en un sistema real esto estaría en la base de datos)
const users = [
    { username: "admin", password: "admin123", name: "Administrador" },
    { username: "tecnico1", password: "tec123", name: "Roberto Martínez" },
    { username: "tecnico2", password: "tec123", name: "Ana Rodríguez" }
];

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si ya está logueado
    if (localStorage.getItem('fixtech_loggedin') === 'true') {
        window.location.href = 'dashboard.html';
    }
    
    const loginForm = document.getElementById('login-form');
    const errorDiv = document.getElementById('login-error');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Verificar credenciales
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            // Login exitoso
            localStorage.setItem('fixtech_loggedin', 'true');
            localStorage.setItem('fixtech_username', user.name);
            localStorage.setItem('fixtech_user', user.username);
            
            window.location.href = 'dashboard.html';
        } else {
            // Login fallido
            errorDiv.classList.remove('hidden');
            setTimeout(() => {
                errorDiv.classList.add('hidden');
            }, 3000);
        }
    });
});