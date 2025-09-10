// Datos de ejemplo para cuando no hay servidor
const repairExamples = {
    'FT1001': {
        device: 'Samsung Galaxy S21',
        issue: 'Pantalla rota',
        date: '15 Oct 2023',
        technician: 'Roberto Martínez',
        status: 'completed',
        statusText: 'Completado',
        progress: 100
    },
    'FT1002': {
        device: 'iPhone 12',
        issue: 'Batería defectuosa',
        date: '16 Oct 2023',
        technician: 'Ana Rodríguez',
        status: 'in_progress',
        statusText: 'En reparación',
        progress: 60
    },
    'FT1003': {
        device: 'Xiaomi Redmi Note 10',
        issue: 'No enciende',
        date: '17 Oct 2023',
        technician: 'Javier Sánchez',
        status: 'pending',
        statusText: 'En diagnóstico',
        progress: 25
    }
};

// Tiempos estimados de completado por estado
const estimatedTimes = {
    'pending': '2-3 días hábiles',
    'in_progress': '1-2 días hábiles',
    'completed': 'Listo para recoger',
    'delivered': 'Reparación entregada'
};

document.addEventListener('DOMContentLoaded', function() {
    const trackingForm = document.getElementById('tracking-form');
    
    trackingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const trackingNumber = document.getElementById('tracking-number').value.trim().toUpperCase();
        checkRepairStatus(trackingNumber);
    });
});

function checkRepairStatus(trackingNumber) {
    // Primero intentar con el servidor
    checkWithServer(trackingNumber)
        .then(data => {
            if (data.status === 'success') {
                showRepairStatus(data.data);
            } else {
                // Si falla el servidor, usar datos de ejemplo
                checkWithExamples(trackingNumber);
            }
        })
        .catch(error => {
            console.log('Servidor no disponible, usando datos de ejemplo');
            checkWithExamples(trackingNumber);
        });
}

function checkWithServer(trackingNumber) {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('tracking_number', trackingNumber);
        
        fetch('../php/repairs/get_repair_status.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) throw new Error('Error del servidor');
            return response.json();
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
}

function checkWithExamples(trackingNumber) {
    if (repairExamples[trackingNumber]) {
        showRepairStatus(repairExamples[trackingNumber]);
    } else {
        showError('No se encontró ninguna reparación con ese número de seguimiento');
    }
}

function showRepairStatus(repairData) {
    // Ocultar formulario y mostrar resultados
    document.getElementById('tracking-form').classList.add('hidden');
    document.getElementById('error-message').classList.add('hidden');
    document.getElementById('tracking-result').classList.remove('hidden');
    
    // Llenar los detalles
    document.getElementById('tracking-id').textContent = repairData.tracking_number || 'FT1001';
    document.getElementById('device-detail').textContent = repairData.device;
    document.getElementById('issue-detail').textContent = repairData.issue;
    document.getElementById('date-detail').textContent = repairData.date;
    document.getElementById('technician-detail').textContent = repairData.technician;
    
    // Actualizar barra de progreso
    document.getElementById('progress-fill').style.width = `${repairData.progress}%`;
    
    // Actualizar estado actual
    const statusBadge = document.getElementById('status-badge');
    statusBadge.textContent = repairData.statusText;
    statusBadge.className = 'status-badge status-' + repairData.status;
    
    // Actualizar etiquetas de progreso
    const labels = ['label-diagnostico', 'label-reparacion', 'label-completado'];
    labels.forEach(label => {
        document.getElementById(label).classList.remove('active');
    });
    
    if (repairData.status === 'pending') {
        document.getElementById('label-diagnostico').classList.add('active');
    } else if (repairData.status === 'in_progress') {
        document.getElementById('label-diagnostico').classList.add('active');
        document.getElementById('label-reparacion').classList.add('active');
    } else if (repairData.status === 'completed' || repairData.status === 'delivered') {
        document.getElementById('label-diagnostico').classList.add('active');
        document.getElementById('label-reparacion').classList.add('active');
        document.getElementById('label-completado').classList.add('active');
    }
    
    // Mostrar tiempo estimado de completado
    const completionContainer = document.getElementById('completion-container');
    const completionTime = document.getElementById('completion-time');
    
    if (repairData.status === 'completed' || repairData.status === 'delivered') {
        completionContainer.style.display = 'none';
    } else {
        completionContainer.style.display = 'block';
        completionTime.textContent = estimatedTimes[repairData.status];
    }
}

function showError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.querySelector('p').textContent = message || 'No encontramos su reparación. Verifique que el número de seguimiento sea correcto.';
    
    document.getElementById('tracking-form').classList.add('hidden');
    document.getElementById('tracking-result').classList.add('hidden');
    errorMessage.classList.remove('hidden');
}

function checkAnother() {
    document.getElementById('tracking-form').classList.remove('hidden');
    document.getElementById('tracking-result').classList.add('hidden');
    document.getElementById('error-message').classList.add('hidden');
    document.getElementById('tracking-number').value = '';
    document.getElementById('tracking-number').focus();
}