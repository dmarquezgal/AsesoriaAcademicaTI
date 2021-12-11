let db;

let networkConnection = true;
let requestDatabase = indexedDB.open('db-asesorias', 1);
const form = document.getElementById('form');

requestDatabase.onupgradeneeded = (event) => {
    db = event.target.result;
    console.log('DB Updated', db);
    const objectStore = db.createObjectStore('asesorias', { autoIncrement: true });
}

requestDatabase.onsuccess = () => {
    db = requestDatabase.result;
    console.log('DB Connected', db)
}

requestDatabase.onerror = () => {
    console.log('Somenthing wrong...', error);
}

const addAsesorias = (data) => {
    const transaction = db.transaction(['asesorias'], 'readwrite');
    const objectStore = transaction.objectStore('asesorias');
    const request = objectStore.add(data);
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const data = {
        matricula: event.target.matricula.value,
        nombre: event.target.nombre.value,
        apellidos: event.target.apellidos.value,
        plandeEstudios: event.target.plandeEstudios.value,
        cuatrimestre: event.target.cuatrimestre.value,
        grupo: event.target.grupo.value,
        turno: event.target.turno.value,
        email: event.target.email.value,
        tel: event.target.tel.value,
        asignatura: event.target.asignatura.value,
        tema: event.target.tema.value,
        dateAsesoria: event.target.dateAsesoria.value,
        timeAsesoria: event.target.timeAsesoria.value
    }
    console.log(data);
    addAsesorias(data);
});

window.addEventListener("online", () => {
    Swal.fire({
        position: 'bottom-end',
        title: 'Genial!',
        text: 'Se ha restablecido la conexión a internet.',
        icon: 'success',
        showConfirmButton: false,
        timer: '5000',
        toast: true,
        background: '#E6FFD3',
    });
});

window.addEventListener("offline", () => {
    networkConnection = false;
    Swal.fire({
        position: 'bottom-end',
        title: 'Ooops!',
        text: 'Sin conexión a internet.',
        icon: 'error',
        showConfirmButton: false,
        // timer: '5000',
        toast: true,
        background: '#FFDADA'
    });
});
