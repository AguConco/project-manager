import { Link } from 'react-router-dom'
import './Task.css'

export const Task = ({ task }) => {

    console.log(task)

    return (
        <div className='task'>
            <Link to={'/task/' + task.id}>
                <div style={{ color: '#f11' }}>{task.priority}</div>
                {task.name}
            </Link>
        </div>
    )
}