
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