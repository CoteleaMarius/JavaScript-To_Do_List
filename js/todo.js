const form = document.querySelector("#itemForm");
const itemInput = document.querySelector("#itemInput");
const itemList = document.querySelector(".item-list");
const feedback = document.querySelector(".feedback");
const clearAll = document.querySelector("#clear-items");

let todoItems = [];

const showFeedback = function(message, status){
    if (message != null || message != undefined && message.length > 0){
        feedback.innerHTML= message;
        if(status != null || status != undefined && status == 'success'){
            feedback.classList.add('showItem', 'alert-success');
        }else{
            feedback.classList.add('showItem', 'alert-danger');
        }        
    }
}

const handleItem = function(itemName){
    const items = itemList.querySelectorAll('.item');

    items.forEach(function(item){
        console.log('Elem ' + item);
         item.querySelector('.complete-item').addEventListener('click', function(){
            if(item.querySelector('.complete-item').classList.contains('completed') != true){
                console.log(item);
                // item.querySelector('.complete-item').classList.toggle('completed');
                item.querySelector('.item-name').classList.add('completed');
                // this.classList.toggle('visibility');
                item.querySelector('.complete-item').classList.toggle('visibility');
            }
         });
        
// add eventListner edit
        item.querySelector('.edit-item').addEventListener('click', function(){
            itemInput.value=itemName;
            itemList.removeChild(item);
            todoItems = todoItems.filter(function(item){
                return item != itemName;
            });
        });
// delete event listner

item.querySelector('.delete-item').addEventListener('click', function(){
    itemList.removeChild(item);
    todoItems = todoItems.filter(function(item){
                return item != itemName;
            });
            setTimeout(()=>{
            showFeedback('task was deleted', 'success');
            feedback.classList.add('showItem', 'alert-success');
            setLocalStorage(todoItems);
            }, 1000);
            setTimeout(()=>{
            feedback.classList.remove('showItem', 'alert-success');
                feedback.innerHTML='';
            }, 3000);
});
    });
}



const removeItem =function(item){
    const removeIndex = todoItems.indexOf(item);
    console.log(removeIndex);
    todoItems.splice(removeIndex, 1);
    setLocalStorage(todoItems);
}

const getList = function(itemsHtml){
    itemList.innerHTML = '';
    itemsHtml.forEach(function(item){
        itemList.insertAdjacentHTML('beforeend', `<div class="item my-3"><h5 class="item-name">${item}</h5><div class="item-icons"><a href="#" class="complete-item mx-2 item-icon"><i class="fas fa-check-circle"></i></a><a href="#" class="edit-item mx-2 item-icon"><i class="fas fa-edit"></i></a><a href="#" class="delete-item item-icon"><i class="fas fa-times-circle"></i></a></div>`);
        handleItem(item);
    });
}

const getLocalStorage = function (){
    const todoStorage = localStorage.getItem('todoItems');
    if(todoStorage === 'undefined' || todoStorage === null){
        todoItems = [];
    } else{
        todoItems = JSON.parse(todoStorage);
        getList(todoItems);
    }
}

const setLocalStorage = function(items){
    localStorage.setItem('todoItems', JSON.stringify(items));
}

getLocalStorage();

form.addEventListener('submit', function(e){
    e.preventDefault();
    const itemName = itemInput.value;
console.log('itemName ' + itemName + ' _ ' + itemName.length);
    if(itemName == undefined ||(itemName != null && itemName.length == undefined) || (itemName != null && itemName.length === 0)){
        feedback.innerHTML='Pleas adda real Task !';
        feedback.classList.add('showItem', 'alert-danger');
        setTimeout( 
            function(){
                feedback.classList.remove('showItem', 'alert-danger');
                feedback.innerHTML='';
            }, 3000);
     
    }else{
        todoItems.push(itemName);
        setLocalStorage(todoItems);
        getList(todoItems);
    }
    itemInput.value = '';
});

clearAll.addEventListener('click', function(){
    todoItems = [];
    localStorage.clear();
    getList(todoItems);
})