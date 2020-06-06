const actividadInput = document.getElementById('actividades');
const lista = document.getElementById('display');

//Al cargarse la ventana desplegamos las actividades
document.addEventListener('DOMContentLoaded', desplegarActividades());

//añadimos un Evento al submit
actividadInput.addEventListener('submit', e =>{
    e.preventDefault();
    //Checamos que no se envie una actividad vacia
    const input = document.getElementById('actividad').value;
    if(input != ''){
        insertarActividad(input);
    }
    
} );

//Añadimos un evento a todo el formulario
lista.addEventListener('click', e =>{
    //Obtenemos un array de los checbox checados
    const checados = document.querySelectorAll('.checked:checked');
    //Obtenemos los datos del local storage
    const actividadesStorage = obtenerDatosLocalStorage();
    //Checamos que el array no este vacio
    if(checados.length != 0){
        //Despues de un segundo removeremos la actividad seleccionada
        setTimeout(() => {
            //Obtenemos el value del checkbox que es su posicion en el array de localstorage
            //Cambiamos el valor del index del elemento a eliminar por un null
            actividadesStorage[checados[0].value] = null;
            //Removemos
            checados[0].parentElement.remove();
            //Seteamos el local storage
            localStorage.setItem('actividades', JSON.stringify(actividadesStorage));
        }, 1000);
    }
})

//Desplegamos actividades
function desplegarActividades() {
    //Obtenemos los datos del local storage
    const actividades = obtenerDatosLocalStorage();


    //hacemos un foreach para crear el div de cada elemento
    actividades.forEach((element, index)=> {
        //Checamos que el elemtno no se un null
        if(element != null){
                    //Creamos el div
        const div = document.createElement('div');
        //Le pones la clase de item
        div.className = 'item'
        //Le añadimos el template y le pones el value del indice correspondiente al checkbox
        //El valor nos permitira saber la posicion del elemento en el array
        div.innerHTML = `
            <input type="checkbox" class='checked' value='${index}'>
            <p>${element}</p>
        `
        lista.appendChild(div);
        }

    });


}
//Insertamos actividades
function insertarActividad(actividad){
    //Creamos un div y obtenemos la informacion del local storage
    let  actividades;
    const div = document.createElement('div');
    actividades = obtenerDatosLocalStorage();
    //Creamos el template y le ponemos la clase de lista
    div.className = 'item'
    div.innerHTML = `
        <input type="checkbox" class='checked' value='${actividades.length}'>
        <p>${actividad}</p>
    `
    //Lo añadimos a la lista
    lista.appendChild(div);
    //Lo añadimos al array
    actividades.push(actividad);
    //Seteamos el local storage
    localStorage.setItem('actividades',JSON.stringify(actividades));
    //Reseteamos el input
    actividadInput.reset();
}

function obtenerDatosLocalStorage(){
    let actividades;
    //Checamos que actividades no este vacio, en caso de que si enviamos un array vacio
    if(localStorage.getItem('actividades') === null){
        actividades = [];
    } else{
        //Enviamos un array con las actividades
        actividades = JSON.parse(localStorage.getItem('actividades'));
    }
    return actividades;
}
