const campoTarea = document.querySelector('#nombreTarea');
const btnAgregar = document.querySelector('#btnAgregar');
const tareasContainer = document.querySelector('.tareas');
const fecha = document.querySelector('#fecha');

let tareas = [];
setFecha();

btnAgregar.addEventListener('click',(e)=>{
    e.preventDefault();
    crearTarea( campoTarea.value );
    actualizarTareas();
});

tareasContainer.addEventListener('click', e =>{

    if( e.target.classList[0] === 'btn' ){
        if( e.target.name === 'borrar'){
            borrarTarea( e.target.id );
        }else{
            toggleTarea( e.target.id );
        }

        actualizarTareas();
    }
});

const crearTarea = ( descripcion ) =>{
    tareas.push({
        id: new Date().getTime(),
        descripcion,
        done: false
    })
}

const borrarTarea = tareaID => {
    tareas = tareas.filter( tarea => tarea.id != tareaID);
}

const toggleTarea = tareaID => {
    tareas.forEach( tarea => tarea.id == tareaID ? tarea.done = !tarea.done : tarea );
    celebrate();
}


const actualizarTareas = () =>{
    let html = '';
    tareas.map( (tarea) =>{
        html += `<div class="tarea ${ tarea.done && 'done'}">
            <div class="desc ">
                <p>${ tarea.descripcion }</p>
            </div>
            <div class="options">
                <button id="${tarea.id}" name="toggle" class="btn">✔</button> 
                <button id="${tarea.id}" name="borrar" class="btn">X</button> 
            </div>
        </div>`
    });
    tareasContainer.innerHTML = html;
        
}

function setFecha(){
    const hoy = new Date();
    const dias = ['lunes','martes','miercoles','jueves','viernes','sabado','domingo'];
    const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

    fecha.innerText = `${dias[hoy.getDay()+1]} ${meses[hoy.getMonth()]} del ${hoy.getFullYear()}`
}

function celebrate(){
    const toast = document.createElement('div');
    toast.classList.add('hype');
    document.body.appendChild(toast);

    setInterval(()=>{
        document.body.removeChild(toast);
    }, 3000)
}