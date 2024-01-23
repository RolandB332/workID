import { createAction, createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axios'

export const changeTaskState = createAction('todos/changeStateToDo');
export const deleteTaskId = createAction('todo/deleteToDoId');


export const addTask = createAsyncThunk('todos/addToDo', async (task)=>{
    return await axios.post('/task',task)
});

export const loadTodos = createAsyncThunk('todo/loadToDos', async ()=>{
    const response = await axios.get('/tasks');
    return response.data;
})

const initialState = {todos:[]}

const todoReducer = createReducer(initialState, (builder)=>{
    builder
    .addCase(changeTaskState, (state,action)=>{
        const taskIndex = state.todos.findIndex((v)=>{return v._id === action.payload.taskId});

        const task = {...state.todos[taskIndex]};
        task.completed = !task.completed;

        const todosCopy = [...state.todos];
        todosCopy[taskIndex] = task;
        return{
            ...state,
            todos: todosCopy
        }
    })
    .addCase(deleteTaskId,(state,action)=>{
        const taskIndex = state.todos.findIndex((v)=>{return v._id === action.payload.taskId});
        const todosCopy = [...state.todos];
        todosCopy.splice(taskIndex,1);

        return{
            ...state,
            todos: todosCopy
        }
    })
    .addCase(loadTodos.fulfilled, (state,action)=>{
        return{
            ...state,
            todos: action.payload
        }
    })
    .addCase(addTask, (state,action)=>{
        const todosCopy = [...state.todos];
        todosCopy.push(action.payload);
        return{
            ...state,
            todosCopy
        }
    })
});

export default todoReducer;