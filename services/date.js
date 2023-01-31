export const uniqueDates = (tasks) => {
    const unique = [];
    tasks.forEach(task => {
        console.log(task.dateFormat);
        if(!unique.includes(task.dateFormat)) unique.push(task.dateFormat)
    });
    return unique;
};