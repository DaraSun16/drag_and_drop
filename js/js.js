const draggables = document.querySelectorAll('.task'),
      droppables = document.querySelectorAll('.swim-lane');

draggables.forEach((task) => {
  task.addEventListener('dragstart', () => {
    task.classList.add('is-dragging');
  });

  task.addEventListener("dragend", () => {
    task.classList.remove('is-dragging');
  });
})

// Déplacer les task dans une autre colonne.
droppables.forEach((zone) => {
  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    const bottomTask = insertAboveTask(zone, e.clientY);
    const curlTask = document.querySelector('.is-dragging');
    if (!curlTask) return;

    if(!bottomTask){
      zone.appendChild(curlTask);
    } else {
      zone.insertBefore(curlTask, bottomTask);
    }
  })
})


//Creation de la fonction insertAboveTask pour le placement de la tâche dans la colonne
const insertAboveTask = (zone, mouseY) => {
  const els = zone.querySelectorAll('.task:not(.is-dragging)');

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();
    const offset = mouseY - top;

    if(offset < 0 && offset > closestOffset){
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
}