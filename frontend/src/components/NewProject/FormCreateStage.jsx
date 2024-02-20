import { useContext, useEffect, useState } from "react"
import { DataStage } from "../DataStage/DataStage"
import { ProjectsContext } from "../../context/projectsContext"
import { useNavigate } from "react-router-dom"
import { Loading } from "../Loading/Loading"

export const FormCreateStage = () => {

    const { getStage, nameProject, idProject, deleteProject } = useContext(ProjectsContext)

    const [newStage, setNewStage] = useState(false)
    const [message, setMessage] = useState(null)
    const [stage, setStage] = useState([])
    const [cancel, setCancel] = useState(false)

    const navigate = useNavigate()

    const submitSecondStage = (e) => {
        e.preventDefault()
        navigate('/project/new-project/finish')
    }

    const cancelProject = () => {
        setCancel(true)
        deleteProject(idProject)
            .then(e => e.json())
            .then(e => {
                e.status ? navigate('/project/new-project') : alert(e.message)
            })
            .finally(()=> {
                setCancel(false)
            })
    }

    useEffect(() => {
        idProject || navigate('/project/new-project')

        getStage()
            .then(e => e.json())
            .then(e => {
                if (e.status) {
                    setStage(e.data)
                }
            })
            .catch(error => console.log(error))
    }, [newStage])

    return (
        <div>
            <h1>Agrega las categorías que necesita <span>{nameProject}</span></h1>
            <h3>Estas sirven para dividir el proyecto y que sea más organizado</h3>
            <p className="stage-notice">Si se te olvidan o todavía no sabes cuantas categorías va a contener tu proyecto, después podrás agregar más</p>
            {message !== null && <span className={message.status ? 'message-success' : 'message-error'}>{message.text}</span>}
            <div className="container-stage">
                {newStage
                    ? <DataStage setNewStage={setNewStage} setMessage={setMessage} />
                    : <button type="button" className="btn-new-stage" onClick={() => {
                        setNewStage(true)
                        setMessage(null)
                    }}><span>Nueva categoría</span><i className="fa-solid fa-plus"></i></button>
                }
                {stage.map(e =>
                    <div className="new-stage">
                        <span>{e.name}</span>
                    </div>
                )}
            </div>
            <form onSubmit={submitSecondStage}>
                {!cancel
                    ? <div className='container-btn'>
                        <button type='button' className='btn-cancel-project' onClick={cancelProject}>Cancelar</button>
                        {/*⬆️⬆️ segun el id que recibe como props, se hace una petición al back y se borra el proyecto ⬆️⬆️*/}
                        {/*⬆️⬆️ primero va a aparecer un cartel que diga si esta seguro de eliminar el proyecto ⬆️⬆️*/}
                        <button type='submit' className='btn-first-stage'>Siguiente <i className="fa-solid fa-arrow-right"></i></button>
                    </div>
                    : <Loading />
                }
            </form>
        </div>
    )
}