const hamburguer = document.querySelector('.fa-bars');//icono de la hamburguesa
const hamburguerText = document.getElementById('links_hamburguer-position');//texto de las opciones de app home

const btnForm = document.querySelector('.btn');//boton del formulario
const chartList = document.querySelector('.chart-list');//cuadro de la lista de tareas

const inputText = document.getElementById('input-text');//input del ingreso de la tarea

const formulario = document.getElementById('form');//formulario

//para editar los totales, los pendientes y las tareas realizadas
const total = document.querySelector('.total');
const realizadas = document.querySelector('.Realiz');
const pendientes = document.querySelector('.pend');


//contadores de las tareas
let t = 0;
let r = 0;
let p = 0;
//funcion para desplegar las opciones del icono
hamburguer.addEventListener('click', e =>{

    //console.log(hamburguerText.style.display === '');

    

    if (hamburguerText.style.display === ''){
        hamburguerText.style.display = 'flex';
    }else if(hamburguerText.style.display === 'none'){
        hamburguerText.style.display = 'flex';
    }else{
        hamburguerText.style.display = 'none';
    }
    
});

//funcion del boton del formulario

btnForm.addEventListener('click', e=>{
    e.preventDefault();

    if(inputText.value.trim()){
        let texto = inputText.value;

        const crearContacto = document.createElement('div');
        crearContacto.setAttribute('class', 'tarea'); 
        
        crearContacto.innerHTML = `<button class="btn-list btn-trash">
        <i class="fa-solid fa-trash"></i>
    </button>
    
    <p>${texto}</p>
    
    <button class="btn-list btn-check">
        <i class="fa-solid fa-check verde"></i>
    </button>`;


        chartList.appendChild(crearContacto);
        formulario.reset();
        t++;
        p++;
        total.innerHTML = t;
        pendientes.innerHTML = p;
        realizadas.innerHTML = r;
        localStorage.setItem('tasks', chartList.innerHTML);
        localStorage.removeItem('tasktotal');
        localStorage.removeItem('taskpendientes');
        localStorage.setItem('tasktotal', t);
        localStorage.setItem('taskpendientes', p);
    }
       formulario.reset();
})


//funcionamiento de los botones de check y basura
chartList.addEventListener('click', e=>{
    eliminar(e.target);
    tachar(e.target);
})


// eliminar la tarea
function eliminar(basura){

     if(basura.className === 'fa-solid fa-trash'){
        let borrar = basura.parentElement.parentElement;
        borrar.remove();
        t--;
        if(basura.parentElement.parentElement.children[1].style.textDecoration === 'line-through'){
            r--;
            realizadas.innerHTML = r;
            localStorage.removeItem('taskrealizadas');
            localStorage.setItem('taskrealizadas', r);
        }
        if(basura.parentElement.parentElement.children[1].style.textDecoration !== 'line-through'){
            p--;
            pendientes.innerHTML = p;
            localStorage.removeItem('taskpendientes');
            localStorage.setItem('taskpendientes', p);
        }
        localStorage.removeItem('tasks');
        localStorage.setItem('tasks', chartList.innerHTML);
        localStorage.removeItem('tasktotal');
        localStorage.setItem('tasktotal', t);
        total.innerHTML = t;
    }

}
//tachar la tarea
function tachar(marcar){
    if (marcar.className === 'fa-solid fa-check verde' || marcar.className === 'fa-solid fa-check gris'){
     //funcion para cuando el check este en verde   
        if(marcar.className === 'fa-solid fa-check verde'){
            
            marcar.classList.toggle('verde');
            marcar.classList.toggle('gris');
            marcar.parentElement.parentElement.children[1].style.textDecoration = 'line-through';
            marcar.parentElement.parentElement.children[1].style.color = '#e5e7eb';
            r++;
            p--;
            realizadas.innerHTML = r;
            pendientes.innerHTML = p;
            
            localStorage.removeItem('taskrealizadas')
            localStorage.removeItem('taskpendientes');
            localStorage.setItem('taskrealizadas', r);
            localStorage.removeItem('tasks');
            localStorage.setItem('taskpendientes', p)
            localStorage.setItem('tasks', chartList.innerHTML);


     //funcion para cuando el check este en gris
        }else if(marcar.className === 'fa-solid fa-check gris'){
            marcar.classList.toggle('gris');
            marcar.classList.toggle('verde');
            marcar.parentElement.parentElement.children[1].style.textDecoration = 'none';
            marcar.parentElement.parentElement.children[1].style.color = 'white';
            r--;
            p++;
            realizadas.innerHTML = r;
            pendientes.innerHTML = p;

            localStorage.removeItem('taskrealizadas')
            localStorage.removeItem('taskpendientes');
            localStorage.removeItem('tasks');
            localStorage.setItem('taskrealizadas', r);
            localStorage.setItem('taskpendientes', p);
            localStorage.setItem('tasks', chartList.innerHTML);
        }         
    }
}

chartList.innerHTML = localStorage.getItem('tasks');
t = Number(localStorage.getItem('tasktotal'));
r = Number(localStorage.getItem('taskrealizadas'));
p = Number(localStorage.getItem('taskpendientes'));
realizadas.innerHTML = r;
total.innerHTML = t;
pendientes.innerHTML = p;
