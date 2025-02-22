import { uniqueDates, orderDates } from "../services/date.js";
import { createTask } from "./addTask.js";
import dateElement from "./dateElement.js";


export const displayTasks = () => {
    const list = document.querySelector('[data-list]');
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    const dates = uniqueDates(taskList);
    orderDates(dates);//Este 'dates' es el que ya habiamos creado
    dates.forEach((date) => {
        const dateMoment = moment(date, 'DD/MM/YYYY');
        list.appendChild(dateElement(date));
        taskList.forEach((task) => {
            const taskDate = moment(task.dateFormat, "DD/MM/YYYY");
            const diff = dateMoment.diff(taskDate);
            if (diff === 0) {
                list.appendChild(createTask(task));
            };
        });
    });
};