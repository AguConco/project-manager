import './Stage.css'
import { Link } from 'react-router-dom'

export const Stage = ({ data }) => {

    const { name, description, id, id_project } = data

    return (
        <li className='stage'>
            <Link to={`/project/${id_project}/${id}`}>
                <h2>{name}</h2>
                <p>{description}</p>
            </Link>
            <div className='options-stage'>
                <button><i className="fa-solid fa-plus"></i></button>
                <button><i className="fa-regular fa-trash-can"></i></button>
            </div>
        </li>
    )
}