import { Link, Route, Routes, useParams } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import { useContext, useEffect, useState } from "react"
import './Project.css'
import { ListStages } from "../ListStages/ListStages"
import { Loading } from "../Loading/Loading"
import { Members } from "../Members/Members"
import { Notifications } from "../Notifications/Notifications"
import { ProjectsContext } from "../../context/projectsContext"
import { io } from "socket.io-client"
import { backURL } from "../../data/constants"
import { DataStage } from "../DataStage/DataStage"

export const socket = io(backURL)

export const Project = () => {

    const { user } = useContext(AuthContext)
    const { getProjects } = useContext(ProjectsContext)

    const { id } = useParams()

    const [project, setProject] = useState(null)
    const [foundProject, setFoundProject] = useState(true)
    const [newStage, setNewStage] = useState(false)
    const [message, setMessage] = useState('')


    useEffect(() => {
        setProject(null)
        setFoundProject(true)
        newStage && setNewStage(false)

        user !== null
            && getProjects({ admin: user.uid, id })
                .then(e => e.json())
                .then(e => {
                    e.length === 0 ? setFoundProject(false) : setProject(e[0])
                    document.title = e[0]?.name || 'Proyecto no encontrado'
                })
                .finally(() => {
                    setFoundProject(false)
                })


        const handleKeyUp = (e) => {
            e.keyCode === 27 && setNewStage(false)
        };

        document.addEventListener('keyup', handleKeyUp)

        return () => {
            document.removeEventListener('keyup', handleKeyUp)
        };
    }, [id, user])

    return (
        <section>
            {project !== null
                ? <>
                    <header className="header-project">
                        <div>
                            <h1 className="name-project">{project.name}</h1>
                            <div className="option-project">
                                {project.admin === user.uid && <Notifications project={project} id={id} admin={user.uid} />}
                                <Link to={'/settings/' + id}>Ajustes</Link>
                            </div>
                        </div>
                        <div>
                            <nav className='nav-project'>
                                {/* <Link to={'/videocall/' + id}>Video llamada</Link> */}
                                <button className="create-new-stage" onClick={() => setNewStage(true)}>Crear nueva categoría</button>
                                {newStage
                                    && <div className="container-new-stage">
                                        <DataStage setNewStage={setNewStage} setMessage={setMessage} />
                                        {(message !== null && !message.status) && <span className='message-error'>{message.text}</span>}
                                    </div>
                                }
                                <ul>
                                    <li><Link to={'/project/' + id}>Actividades</Link></li>
                                    <li><Link to={`/chat/${id}`}>Chat</Link></li>
                                </ul>
                            </nav>
                            <div className="info-project">
                                <Members code={project.code} id={id} />
                                <div className="progress-project">
                                    <div className='progress-completed' style={{ width: (parseInt(project.progress) * 180) / 100 }}></div>
                                    <div className='progress-total'></div>
                                    <span>{project.progress}%</span>
                                </div>
                            </div>
                        </div>
                    </header>
                    <Routes>
                        <Route path={'/'} element={<ListStages />} />
                        {/* <Route path={'/chat'} element={'hola este es el chat'} /> */}
                    </Routes>

                </>
                : foundProject
                    ? <Loading />
                    : <div className="project-not-found"><p>No se encontró el proyecto <Link to={'/project'}>Volver al inicio</Link></p></div>
            }
        </section>

    )
}