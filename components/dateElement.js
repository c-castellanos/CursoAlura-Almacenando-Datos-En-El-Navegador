
//Crea la estructura HTML para agregarla al DOM
export default (date) => {
    const dateElement = document.createElement('li');
    dateElement.classList.add('date');
    dateElement.innerHTML=date;
    return dateElement;
};