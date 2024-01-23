import './ShowToDo.css'
import React from "react";
import {useState, useEffect} from "react";
import Content from '../Content/Content';
import Task from '../Task/Task';
import axios from '../../axios';
import {useDispatch,useSelector} from 'react-redux';
import {loadTodos, deleteTaskId,changeTaskState} from '../../reducer/reducer'
const ShowToDo = ()=>{
    const tasks = useSelector((state)=>{return state.todos});
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(loadTodos());
    },[]);

    const moveTask = (taskId) =>{
        const taskIndex = tasks.findIndex((v) => {return v._id === taskId});
        const task = {...tasks[taskIndex]};
        console.log(task);
        axios.put('/task',{...task}).then((res)=>{
            dispatch(changeTaskState({taskId}))
        }).catch((err)=>{
            console.log(err)
        })
    }

    const deleteTask = (taskId) =>{

        axios.delete(`/task/${taskId}`).then((res)=>{
            dispatch(deleteTaskId({taskId}))
        }).catch((err)=>{
            console.log(err)
        })
    }

    const completedTasks = [];
    const openTasks = [];
    for(const task of tasks){
        if(task.completed){
            completedTasks.push(<Task task={task} key={task._id}
                moveTask={()=>moveTask(task._id)} deleteTask={()=>deleteTask(task._id)}/>)
        }else{
            openTasks.push(<Task task={task} key={task._id}
                moveTask={()=>moveTask(task._id)} deleteTask={()=>deleteTask(task._id)}/>)
        }
        
    }

    return(
        <Content>
            <div className='ShowToDo'>
                <div className="ShowToDo__Wrapper">
                    <h2>
                        Open
                        <hr />
                    </h2>
                    <div>
                        {openTasks}
                    </div>
                </div>
            </div>
            <div className="ShowToDo__Wrapper">
                <h2>
                    Completed
                    <hr />
                </h2>
                <div>
                    {completedTasks}
                </div>
            </div>
        </Content>
    )
}

export default ShowToDo;