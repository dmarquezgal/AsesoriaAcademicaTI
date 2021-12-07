let db;

let networkConnection = true;
let requestDatabase = indexedDB.open('db-asesorias', 1);
const form = document.getElementById('form');
const alert_content_offline = document.querySelector("#alert-content-offline");
const alert_content_online = document.querySelector("#alert-content-online");

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
    alert_content_online.classList.remove("d-none");
    alert_content_offline.classList.add("d-none");
});

window.addEventListener("offline", () => {
    alert_content_offline.classList.remove("d-none");
    alert_content_online.classList.add("d-none");
    networkConnection = false;
});
