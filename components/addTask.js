import { uniqueDates } from '../services/date.js';
import checkComplete from './checkComplete.js';
import deleteIcon from './deleteIcon.js';
import { displayTasks } from './displayTasks.js';

export const addTask = (evento) => { //Esta funcion addTask, recibe un evento, el cual genera el formulario.
    evento.preventDefault();

    const list = document.querySelector('[data-list]'); //Trae el elemento en el cual iremos haciendo las tareas
    const input = document.querySelector('[data-form-input]'); //Llenado por el usuario, es la tarea a registrar.
    const calendar = document.querySelector('[data-form-date]'); //Muestra el calendario en formulario

    const value = input.value; //El valor ingresado por el usuario "tarea"
    const date = calendar.value; //Valor de fecha en formato sin estandarizar
    const dateFormat = moment(date).format('DD/MM/YYYY'); //Haciendo uso de libreria 'moment', le aplicamos el formato deseado a la fecha ingresada por el usuario. Con dicho formato guardaremos ese dato

    if (value === '' || date === '') {
        return;
    };

    input.value = ''; //Limpia el input despues de agregar una tarea a la lista
    calendar.value = ''; //Limpia calendario despues de agregar una tarea a la lista

    const completed = false; //Inicializacion del estado de una tarea. (false = No realizada aun)

    const taskObj = { //Genera una constante que es un objeto en el que almacenar 2 datos: 'value' y 'dateFormat'
        value,
        dateFormat,
        completed,
        id: uuid.v4()
    };

    list.innerHTML = ''; //Por cada tarea agregada al dar click al boton, se inicializa la estructura como string vacio.

    const taskList = JSON.parse(localStorage.getItem('tasks')) || []; //Para manipular el objeto, usando la key definida como 'task', debemos convertir la string usando el metodo '.parse' ||(alt+124) => se usa para decirle que en caso venga null el valor, que lo inicie como un arreglo '[]'
    taskList.push(taskObj); //Agrega al taskList la ultima tarea creada
    //sessionStorage.setItem("tasks", JSON.stringify(taskObj)); //Al cerrar pestana se pierde la info almacenada
    localStorage.setItem("tasks", JSON.stringify(taskList)); //Igial que sessionStorage, recibe solo 2 parametros, la llave y su valor. Solo almacena el ultimo valor. Se sobreescribe. Metodo '.stringify' convierte el tipo de dato a almacenar en string
    displayTasks();
};

export const createTask = ({ value, dateFormat, completed, id }) => { //Esta constante 'createTask' recibe el objeto 'taskObj' pero en lugar de volver a definirlo, se aplicó reestructuracion de objeto que consiste en poner entre {}, los valores a recibir
    const task = document.createElement('li'); //Genera un elemento de tipo 'li'
    task.classList.add('card'); //Agrega una clase llamada 'card' en el codigo HTML

    const taskContent = document.createElement('div'); //GEnera un elemento tipo 'div'

    const check = checkComplete(id);
    if (completed) {
        check.classList.toggle('fas');
        check.classList.toggle('completeIcon');
        check.classList.toggle('far');
    };
    const titleTask = document.createElement('span'); //Genera elemento tipo 'span'
    titleTask.classList.add('task'); //Agrega la tarea 'task' al elemento 'span' creado previamente
    titleTask.innerText = value; //Le agrega el texto ingresado por el usuario dentro del elemento 'span'
    taskContent.appendChild(check); //agrega el checkbox que define si una tarea esta marcada como concluida o no
    taskContent.appendChild(titleTask); //Titulo de la tarea
    /* `Se usan para agregar el label "fecha" a la par de cada tarea agregada`
    const dateElement = document.createElement('span'); //Crea un elemento 'span'
    dateElement.innerHTML = dateFormat; //Se aplica la fecha con el formato establecio anteriormente
    `Se puede modificar para mostrar la hora en lugar de fecha u otro dato relevante`*/
    task.appendChild(taskContent);//Agrega los elementos hijos al padre
//    task.appendChild(dateElement); //Agrega el elemento hijo en la estructura HTML
    task.appendChild(deleteIcon(id));
    return task; //Retorna la tarea
};