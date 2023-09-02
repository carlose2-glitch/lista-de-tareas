const hamburguer = document.querySelector('.fa-bars');
const hamburguerText = document.getElementById('links_hamburguer-position');
const buttomPri = document.querySelector('.btn_page-principal');





//funcion para desplegar las opciones del icono
hamburguer.addEventListener('click', e =>{

    console.log(hamburguerText.style.display === '');

    if (hamburguerText.style.display === ''){
        hamburguerText.style.display = 'flex';
    }else if(hamburguerText.style.display === 'none'){
        hamburguerText.style.display = 'flex';
    }else{
        hamburguerText.style.display = 'none';
    }
    
})

//funcion para llevar a la lista de tareas

buttomPri.addEventListener('click', e =>{
    location.href = './app/lista.html';
})