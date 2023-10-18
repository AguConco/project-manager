import { useContext } from 'react'
import './Stage.css'
import { Link } from 'react-router-dom'
import { ProjectsContext } from '../../context/projectsContext'

export const Stage = ({ data }) => {

    const { name, description, id, id_project } = data

    const { setNewTask } = useContext(ProjectsContext)

    return (
        <>
            <li className='stage'>
                <Link to={`/project/${id_project}/${id}`}>
                    <h2>{name}</h2>
                    <p>{description}</p>
                </Link>
                <div className='options-stage'>
                    <button onClick={() => setNewTask({ stageName: name, id, comes: 'list', idProject: id_project })}><i className="fa-solid fa-plus"></i></button>
                    <button><i className="fa-regular fa-trash-can"></i></button>
                </div>
            </li>
        </>
    )
}