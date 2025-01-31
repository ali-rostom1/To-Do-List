
// open and close ADD FORM
var popupButton = document.getElementById('buttonAdd');
var formModal = document.getElementById('formModal');
var popupCloseButton = document.getElementById('closeButton');
var overlay = document.getElementById('overlay');

popupButton.onclick = function displayFormModal(){
    
    formModal.style.display = 'block';
    overlay.style.display = 'block';
}
popupCloseButton.onclick = function closeFormModal(){
    formModal.style.display = 'none';
    overlay.style.display = 'none';
}
overlay.addEventListener('click', function(){
    formModal.style.display = 'none';
    editModal.style.display = 'none';
    overlay.style.display = 'none';
})

function Task(name,date,status,prio,description){
    this.name = name;
    this.date = date;
    this.status = status;
    this.prio = prio;
    this.description = description;
    this.delBtnId = new Date().getTime();
    this.editBtnId = new Date().getTime()+ 1;
}
let Tasks = [];
var taskForm = document.getElementById('taskForm');


taskForm.addEventListener('submit',function(event){
    event.preventDefault();

    var inputName = document.getElementById('nameInput').value;
    var inputDate = document.getElementById('dateInput').value;
    var inputStatus = document.getElementById('statusInput').value;
    var inputPriority = document.getElementById('priorityInput').value;
    var inputDescription = document.getElementById('descriptionInput').value;

    var task=new Task(inputName,inputDate,inputStatus,inputPriority,inputDescription);
    Tasks.push(task);
    addTaskToBoard(task);

    taskForm.reset();
    formModal.style.display = 'none';
    overlay.style.display = 'none';
})
function addTasksToBoard(){
    Tasks.forEach(Task => {
        let card = document.createElement('div');
        let prio="";
        if(Task.prio == 1 ){
            prio = 'highPrio';
        }
        if(Task.prio == 2){
            prio = 'mediumPrio';
        }
        if(Task.prio == 3){
            prio = 'lowPrio';
        }
        card.className=`task-card p-3 ${prio} `;
        card.innerHTML=`
                <div class="row align-items-center ">
                    <div class="col-lg-12 col-md-12 task-name text-md-start mb-3">${Task.name}</div>
                    <div class="col-lg-5 col-md-12 task-date text-md-start mb-lg-0 mb-md-3">${Task.Date}</div>
                    <div class="col-lg-3 col-md-6">
                            <button id='${Task.editBtnId}' type="button" class="btn task-button btn-sm btn-edit">edit</button>      
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <button ${Task.delBtnId} type="button" class="btn task-button btn-sm btn-del">del</button>
                    </div>
                </div>`;
        if(Task.status == 1){
            document.getElementById('toDoContainer').appendChild(card);
        }
        if(Task.status == 2){
            document.getElementById('doingContainer').appendChild(card);
        }
        if(Task.status == 3){
            document.getElementById('doneContainer').appendChild(card);
        }

    });
}
function addTaskToBoard(task){
    let card = document.createElement('div');
    let prio="";
    if(task.prio == 1 ){
        prio = 'highPrio';
    }
    if(task.prio == 2){
        prio = 'mediumPrio';
    }
    if (task.prio == 3){
        prio = 'lowPrio';
    }
    card.className=`task-card p-3 ${prio} fadeIn`;
    card.innerHTML=`
            <div class="row align-items-center ">
                <div class="col-lg-12 col-md-12 task-name text-md-start mb-3">${task.name}</div>
                <div class="col-lg-5 col-md-12 task-date text-md-start mb-lg-0 mb-md-3">${task.date}</div>
                <div class="col-lg-3 col-md-6">
                        <button id="${task.editBtnId}" type="button" class="btn task-button btn-sm btn-edit">edit</button>      
                </div>
                <div class="col-lg-3 col-md-6">
                    <button id="${task.delBtnId}" type="button" class="btn task-button btn-sm btn-del">del</button>
                </div>
            </div>`;
    if(task.status == 1){
        document.getElementById('toDoContainer').appendChild(card);
    }
    if(task.status == 2){
        document.getElementById('doingContainer').appendChild(card);
    }
    if(task.status == 3){
        document.getElementById('doneContainer').appendChild(card);
    }
    applyCounters();
    deleteTaskButton(task); 
    editTaskButton(task); 
}

function deleteTaskButton(task){
    let delBtn = document.getElementById(`${task.delBtnId}`);
    delBtn.onclick = function(){
        let card = delBtn.parentNode.parentNode.parentNode;
        card.classList.add('fadeOut');
        card.addEventListener('animationend',function (){
            card.remove();
            Tasks.pop(task);
            console.log(Tasks);
            applyCounters();
        })
    }
    
}

var editModal = document.getElementById('editModal');
var editTaskForm = document.getElementById('taskEditForm');
var closePopupEditBtn = document.getElementById('closeButton2');

closePopupEditBtn.onclick = function(){
    editModal.style.display = 'none';
    overlay.style.display = 'none';
}

function editTaskButton(task){
    let editBtn = document.getElementById(`${task.editBtnId}`);
    editBtn.onclick = function(){
        editModal.style.display = 'block';
        overlay.style.display = 'block';
        var inputName = document.getElementById('nameInputEdit');
        var inputDate = document.getElementById('dateInputEdit');
        var inputStatus = document.getElementById('statusInputEdit');
        var inputPriority = document.getElementById('priorityInputEdit');
        var inputDescription = document.getElementById('descriptionInputEdit');
        inputName.value = task.name;
        inputDate.value = task.date;
        inputStatus.value = task.status;
        inputPriority.value = task.prio;
        inputDescription.value = task.description;
        editTaskForm.onsubmit = function(event){
            event.preventDefault();

            task.name = inputName.value;
            task.date = inputDate.value;
            task.status = inputStatus.value;
            task.prio = inputPriority.value;
            task.description = inputDescription.value;
            console.log(Tasks);
            let card=editBtn.closest('.task-card');
            card.remove();
            addTaskToBoard(task);
            editTaskForm.reset();
            editModal.style.display = 'none';
            overlay.style.display = 'none';
            
        }
        applyCounters();
    }

}


//ADDING COUNTERS FOR EACH STATUS

function getToDoCounter(){
    let counter=0;
    Tasks.forEach(task => {
        if(task.status == 1){
            counter++;
        }
    });
    return counter;
}

function getDoingCounter(){
    let counter = 0;
    Tasks.forEach(task =>{
        if(task.status == 2){
            counter++;
        }
    });
    return counter;
}

function getDoneCounter(){
    let counter = 0;
    Tasks.forEach(task =>{
        if(task.status == 3){
            counter++;
        }
    });
    return counter;
}

var toDoContainer = document.getElementById('toDoContainer');
var doingContainer = document.getElementById('doingContainer');
var doneContainer = document.getElementById('doneContainer');


function applyCounters(){
    if(getToDoCounter() > 0){
        toDoContainer.children[0].textContent = `TO DO | ${getToDoCounter()}`;
    }else{
        toDoContainer.children[0].textContent = `TO DO | 0`;
    }
    if(getDoingCounter() > 0){
        doingContainer.children[0].textContent = `DOING | ${getDoingCounter()}`;
    }else{
        doingContainer.children[0].textContent = `DOING | 0`;
    }
    if(getDoneCounter() > 0){
        doneContainer.children[0].textContent = `DONE | ${getDoneCounter()}`;
    }else{
        doneContainer.children[0].textContent = `DONE | 0`;
    }
}
