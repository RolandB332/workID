const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var cors = require('cors');
const { request, response } = require('express');

const app = express();

const initDatabaseConnection = require('./dbConnection')
initDatabaseConnection("todo");

const Task = require('./models/task');

var Id=0;
var to_do = {tasks:[]};

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/tasks', async(request, response)=>{
    if(request.query.title){
        let tasksTitle = [];
        for(let task of to_do.tasks){
            if(task.title == request.query.title){
                tasksTitle.push(task);
            }
        }
        response.status(200).send(tasksTitle);
    }else{
        let tasks = await Task.find();
        response.status(200).send(tasks)
    }
});

app.post('/task', (request, response)=>{
    let newTask = request.body;
    newTask.completed = false;
    if(newTask.title != ''){
        let task = new Task(newTask);
        task.save((err) =>{
            if(err){
                response.status(400).send("An error occured!");
            }else{
                response.status(200).send("New item added!");
            }
        })
    }else{
        response.status(400).send("data have the wrong format");
    }
});

app.put('/task', (req, res)=>{
    let taskToChange = req.body;
    if(taskToChange.title != '' && taskToChange._id != null && taskToChange.completed != null){
        let updatedTaskData = {
            title: taskToChange.title,
            completed: !taskToChange.completed
        }
        Task.findByIdAndUpdate({_id:taskToChange._id}, updatedTaskData, (err,result)=>{
            if(err){
                res.status(422).send("Data are not correct!");
            }else{
            res.status(201).send("Update was succesful!");
            }
        });
    }else{
        res.status(400).send("data have the wrong format");
    }
});

app.delete('/task/:id', (request, response)=>{
    const id = request.params.id;
    try{
        Task.deleteOne({_id:id}).then(()=>{
            response.status(200).send("task was deleted");
        }).catch(err =>{
            response.status(500).send(`task could not be deleted! \n err:${err}`);
        })
    }catch(error){
        let errorObj = {body:request.body, errorMessage:"Server error!" };
        response.status(500).send(errorObj);
    }
});


const port = 3005;
app.listen(port, () =>{
    console.log(`Example listening at:${port}`)
});