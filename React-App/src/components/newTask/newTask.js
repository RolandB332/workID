import {useState} from 'react';
import {useNavigate } from 'react-router-dom';
import Content from '../Content/Content';
import axios from "../../axios";

import {useDispatch} from 'react-redux';
import {addTask} from '../../reducer/reducer';
const NewTask = (props) =>{
    const [title, setTitle] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onTitleChange = (e) =>{
        setTitle(e.target.value);
    }
    const addNewTask = async ()=>{
        await dispatch(addTask({title})).unwrap();
        navigate("/");
    }
    return(
        <Content>
            <div className='NewTask'>
                <div className='NewTask__Content'>
                    <label>New Task Title:<input type="text" value={title} onChange={onTitleChange}/></label>
                    <button onClick={addNewTask}>Add</button>
                </div>
            </div>
        </Content>
    )
}

export default NewTask;