//39
import './Task.css'
const Task = (props)=>{
    let arrowLeft = null;
    let arrowRight = null;
    if(props.task.completed){
        arrowLeft = (
            <div className="Task_ArrowLeft" onClick={props.moveTask}>
                &#9664;
            </div>
        );
    }else{
        arrowRight = (
            <div className="Task_ArrowRight" onClick={props.moveTask}>
                &#9654;
            </div>
        )
    }
    return (
        <div className="Task">
            {arrowLeft}
            <div className="Task_Content">
                <div className="Task_Content_Title">
                    {props.task.title}
                </div>
                <div className="Task_Content_Delete" onClick={props.deleteTask}>
                    <div>
                        &#128465;
                    </div>
                </div>
            </div>
            {arrowRight}
        </div>
    )
}

export default Task;