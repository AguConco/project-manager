import { useContext, useEffect, useState } from 'react'
import './NewTask.css'
import { ProjectsContext } from '../../context/projectsContext'
import { AuthContext } from '../../context/authContext'
import { generateId } from '../../data/functions'
import { socket } from '../Project/project'

export const NewTask = () => {

    const { newTask, setNewTask, createTask } = useContext(ProjectsContext)
    const { user } = useContext(AuthContext)

    const { stageName, id, idProject } = newTask

    const [priority, setPriority] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState(null)

    const maxLetterName = 50

    const changeName = ({ target }) => {
        let name = target.value

        maxLetterName >= name.length && setName(name)
        message !== null && setMessage(null)
    }

    socket.on('tasks', (e)=> console.log(e))

    const submitFormCreateTask = (e) => {
        e.preventDefault()

        const creationDate = new Date().getTime()

        const data = { name, creationDate, id: generateId(), userId: user.uid, priority, idProject, idStage: id }

        createTask(data)
            .then(e => e.json())
            .then(e => {
                const { status, data, message } = e

                if (status) {
                    document.querySelectorAll('input[type=radio]').forEach(e => e.checked = false)
                    setName('')
                    setPriority('')
                    socket.emit('tasks', { idProject, idStage: id, state: ''})
                }
                setMessage({ text: message, status })
            })
    }

    useEffect(() => {
        const handleKeyUp = (e) => {
            e.keyCode === 27 && setNewTask(null)
        };

        document.addEventListener('keyup', handleKeyUp)

        return () => {
            document.removeEventListener('keyup', handleKeyUp)
        };
    }, [])

    return (
        <section className='section-new-task'>
            <header>
                <button onClick={() => setNewTask(null)}><i className="fa-solid fa-times"></i></button>
                <h4>Nueva tarea de "{stageName}"</h4>
            </header>
            <form onSubmit={submitFormCreateTask}>
                <div className='container-name-task'>
                    <input type="text" placeholder='Nombre de la tarea' value={name} onChange={changeName} />
                    <span>{name.length}/50</span>
                </div>
                <div>
                    <span>Prioridad</span>
                    <div className='priority-options'>
                        <div>
                            <input type="radio" value={"low"} id="low" name='priority' onChange={(e) => { setPriority(e.target.value) }} />
                            <label htmlFor="low"> Baja</label>
                        </div>
                        <div>
                            <input type="radio" value={"medium"} id="medium" name='priority' onChange={(e) => { setPriority(e.target.value) }} />
                            <label htmlFor="medium"> Media</label>
                        </div>
                        <div>
                            <input type="radio" value={"high"} id="high" name='priority' onChange={(e) => { setPriority(e.target.value) }} />
                            <label htmlFor="high"> Alta</label>
                        </div>
                    </div>
                </div>
                {message !== null && <span className={message.status ? 'message-success' : 'message-error'}>{message.text}</span>}
                <button>Crear</button>
            </form>
        </section>
    )
}