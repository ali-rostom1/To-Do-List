
// open and close ADD FORM
var popupButton = document.getElementById('buttonAdd');
var formModal = document.getElementById('formModal');
var heroArea = document.getElementsByClassName('hero_area')[0];

popupButton.onclick = function displayFormModal(){
    
    formModal.style.display = 'block';
    heroArea.children[0].style.display = 'none';
    heroArea.children[1].style.display = 'none';
}

var popupCloseButton = document.getElementById('closeButton');
popupCloseButton.onclick = function closeFormModal(){
    formModal.style.display = 'none';
    heroArea.children[0].style.display = 'block';
    heroArea.children[1].style.display = 'block';
}

// adding cards
var myForm = document.getElementById('taskForm');
myForm.addEventListener('submit',function(event){
    event.preventDefault();

    var inputName = document.getElementById('nameInput').value;
    var inputDate = document.getElementById('dateInput').value;
    var inputStatus = document.getElementById('statusInput').value;
    var inputPriority = document.getElementById('priorityInput').value;
    var inputDescription = document.getElementById('descriptionInput').value;
    var card = document.createElement('div');
    var prio='';
    if(inputPriority == 1 ){
        prio = 'lowPrio' ;
    }
    if(inputPriority == 2){
        prio ='mediumPrio' ;
    }
    if(inputPriority == 3){
        prio ='highPrio';
    }
    card.className = `task-card p-3 ${prio}`;
    card.innerHTML = `
        <div class="row align-items-center ">
                            <div class="col-lg-12 col-md-12 task-name text-md-start mb-3">${inputName}</div>
                            <div class="col-lg-5 col-md-12 task-date text-md-start mb-lg-0 mb-md-3">${inputDate}</div>
                            <div class="col-lg-3 col-md-6">
                                <button id="btn-edit" type="button" class="btn task-button btn-sm">edit</button>
                                
                            </div>
                            <div class="col-lg-3 col-md-6">
                                <button id="btn-del" type="button" class="btn task-button btn-sm">del</button>
                            </div>
                        </div>`;
    
    if(inputStatus == 1){
        document.getElementById('toDoContainer').appendChild(card);
    }
    if(inputStatus == 2){
        document.getElementById('doingContainer').appendChild(card);
    }
    if(inputStatus == 3){
        document.getElementById('doneContainer').appendChild(card);
    }
    

    myForm.reset();
    formModal.style.display = 'none';
    heroArea.children[0].style.display = 'block';
    heroArea.children[1].style.display = 'block';
});


