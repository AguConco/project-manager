import { Link } from 'react-router-dom'
import './Task.css'

export const Task = ({ task }) => {

    const { name, priority, last_modification, creation_date, userName, userPhoto } = task

    const [creation, modicication] = [new Date(parseInt(creation_date)), new Date(parseInt(last_modification))] // Obtén la fecha actual
    const optionsFormat = { hour: 'numeric', minute: 'numeric', month: 'short', day: 'numeric', };
    const creationDate = creation.toLocaleDateString('es-ES', optionsFormat);
    const lastModicication = modicication.toLocaleDateString('es-ES', optionsFormat);

    const ViewPriority = () => {
        if (priority === 'high')
            return (
                <div className='priority priority-high'>
                    <pre>Prioridad alta</pre>
                </div>
            )
        else if (priority === 'medium')
            return (
                <div className='priority priority-medium'>
                    <pre>Prioridad media</pre>
                </div>
            )
        else return (
            <div className='priority priority-low'>
                <pre>Prioridad baja</pre>
            </div>
        )
    }

    return (
        <div className='task'>
            <Link to={'/task/' + task.id}>
                <ViewPriority />
                <h5>
                    {name}
                </h5>
                <div>
                    <span className='task-date'>
                        Última modificación
                        <div>
                            <img src={userPhoto} />
                            <pre> {userName} </pre>
                            {last_modification === '0' ? creationDate : lastModicication} hs
                        </div>
                    </span>
                </div>
            </Link>
            <div className="task-options">
                <button><i className="fa-regular fa-pen-to-square"></i></button>
                <button><i className="fa-regular fa-trash-can"></i></button>
            </div>
        </div>
    )
}