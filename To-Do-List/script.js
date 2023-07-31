const container = document.querySelector(".container");
const input = document.getElementById('task_input');
const boton = document.querySelector(".boton");
const listContainer = document.querySelector(".listContainer");
const borrar = document.querySelector(".borrar");

boton.addEventListener("click",(e)=>{
    e.preventDefault();
    if (input.value == "") {
        alert("No ha escrito una tarea")
    } else {

        const tareaNueva = document.createElement('li')
        const checkBoton = document.createElement('input')
        checkBoton.type = 'checkbox';
        tareaNueva.appendChild(checkBoton);
        tareaNueva.appendChild(document.createTextNode(input.value.charAt().toUpperCase()+input.value.slice(1)))
        tareaNueva.appendChild(document.innerHTML= tiempo())
        listContainer.appendChild(tareaNueva)
        
        checkBoton.addEventListener('click',()=>{
            if (checkBoton.checked) {
                tareaNueva.style.textDecoration = 'line-through'
            } else {
                tareaNueva.style.textDecoration = 'none'
            }
        });
        input.value=''
    }
    guardarTareasEnLocalStorage();
    
})

const tiempo = () =>{
    const fecha = new Date()
    const hora = fecha.getHours()
    const minutos = fecha.getMinutes()

    const horaFormateada = hora.toString().padStart(2, '0')
    const minutosFormateados = minutos.toString().padStart(2, '0')

    const infoHora = document.createElement("p")
    infoHora.classList.add("infoHora")
    infoHora.textContent = `${horaFormateada}:${minutosFormateados}`;
    return infoHora
}

borrar.addEventListener('click',()=>{
    const tareasHechas = document.querySelectorAll('li input:checked')
    tareasHechas.forEach((tarea) => {
        const liPadre = tarea.parentNode
        listContainer.removeChild(liPadre)
    });
    guardarTareasEnLocalStorage();
})

borrar.addEventListener('dblclick',(e)=>{
    e.preventDefault()
    const confirmar = confirm("Deseas eliminar todas las tareas?")
    while (confirmar && listContainer.firstChild){
        listContainer.removeChild(listContainer.firstChild)
    }
    guardarTareasEnLocalStorage();
})

// Función para guardar la lista de tareas en el localStorage.
const guardarTareasEnLocalStorage = () => {
    const tareas = document.querySelectorAll(".listContainer li");
    const listaTareas = [];
    tareas.forEach((tarea) => {
        listaTareas.push(tarea.innerHTML);
    });
    localStorage.setItem("tareas", JSON.stringify(listaTareas));
};

const obtenerTareasDesdeLocalStorage = () => {
    const tareasGuardadas = localStorage.getItem("tareas");
    if (tareasGuardadas) {
        return JSON.parse(tareasGuardadas);
    }
    return [];
};
  
// Cargar las tareas almacenadas en el localStorage al cargar la página.
document.addEventListener("DOMContentLoaded", () => {
    const tareasGuardadas = obtenerTareasDesdeLocalStorage();
    tareasGuardadas.forEach((tarea) => {
    const tareaNueva = document.createElement("li");
    tareaNueva.innerHTML = tarea;
    listContainer.appendChild(tareaNueva);
    });
});