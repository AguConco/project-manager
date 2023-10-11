import './Stage.css'
import { Link } from 'react-router-dom'

export const Stage = ({ data }) => {

    const { name, description, task_quantity, id, id_project } = data

    return (
        <Link to={`/project/${id_project}/${id}`} className='stage'>
            <h2>{name}</h2>
            <p>{description}</p>
            <span>{task_quantity}</span>
        </Link>
    )
}