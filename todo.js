var ToDoModule = (function(){


let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

// console.log('Working');

async function fetchToDoAPI(){

    // fetch('https://jsonplaceholder.typicode.com/todos')//get Request //return promise
    // .then(function(response){
    //     return response.json()
    // }).then(function (data){
    //     tasks=data.slice(0,10)
    //     renderList()
    // }) 
    // . catch(function(error){
    //     console.log('error',error)
    // })   

    try{
        const response=await fetch('https://jsonplaceholder.typicode.com/todos');
    const data=await response.json();
    tasks=data.slice(0,10);
    renderList();
    }catch(error)
    {
        console.log(error);
    }


}

function addTaskToDOM(task){

    const li=document.createElement('li');

    li.innerHTML=`
     
    <input type="checkbox" id= "${task.id}" ${task.completed ? 'checked' : ''}  class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <img src="bin.svg" class="delete" data-id="${task.id}" />
  `;

  taskList.append(li);

}


function renderList () {
    taskList.innerHTML='';

    for(let i=0;i<tasks.length;i++)
    {
        addTaskToDOM(tasks[i])
    }

    tasksCounter.innerHTML=tasks.length

}

function toggleTask (taskId) {

    const newTask2 = tasks.filter(function (task){
        return task.id===Number(taskId);
    })
 
   if(newTask2.length>0)
   {
    const currentTask=newTask2[0];

    currentTask.completed=!currentTask.completed;
    renderList();
    showNotification('Task toggle successfully')
    return;
   }
   showNotification('Could not toggle the task')
}

function deleteTask (taskId) {
    const newTasks = tasks.filter(function (task){
        return task.id!==Number(taskId);
    })
    tasks=newTasks;
    renderList();
    showNotification("Task Deleted successfully")
}

function addTask (task) {

    // for post request

    // if(task)
    //     {
    //         fetch('https://jsonplaceholder.typicode.com/todos',{
    //             method:'POST',
    //             headers:{
    //                 'Content-Type':'application/json',
    //             },
    //             body:JSON.stringify(task),
    //         })
    //         .then(function(response){
    //             return response.json()
    //         }).then(function (data){
    //             tasks.push(task)
    //             tasks=data.slice(0,10)
    //             renderList()
    //             showNotification('Task added successfully');
    //         }) 
    //         . catch(function(error){
    //             console.log('error',error)
    //         })   
    //     }



    //tasks array me add kar do task ko
            if(task){
        tasks.push(task)
        renderList();
        showNotification('Task added successfully');
        return;
        }
        showNotification('Task cannot be added');
}

function showNotification(text) {
    alert(text)
}


function handleInputkeyPress(e){
    if(e.key==='Enter'){
        const text=e.target.value;
        console.log("Input : " ,  e.target.value)

        if(!text){
            showNotification("Text cannot be empty")
            return;
        }

        //object banao
        const task={
           title: text,
            id: Date.now(),
            completed:false
        }

        e.target.value='';
        addTask(task)
    }
}


function handleClickListener(e){
    const target=e.target;
    // console.log(target)

    if(target.className==="delete"){
        const taskId=target.dataset.id;
        deleteTask(taskId)
        console.log("delete successfully");
        return

    }else if(target.className==='custom-checkbox'){
        const taskId=target.id;
        toggleTask(taskId);
        return 
        


    }


}


function initializeapp(){
    fetchToDoAPI();
document.addEventListener('click',handleClickListener)
addTaskInput.addEventListener('keyup',handleInputkeyPress)

}

// initializeapp();
return {
   initialize:initializeapp
}


})()