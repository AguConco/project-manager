import { useContext, useEffect, useState } from "react"
import { ProjectsContext } from "../../context/projectsContext"
import { Link, useNavigate } from "react-router-dom"

export const InvitationCode = () => {

    const { codeProject, idProject } = useContext(ProjectsContext)
    const [copy, setCopy] = useState(false)
    
    const navigate = useNavigate()

    const copyCode = () => {

        navigator.clipboard.writeText(codeProject)
            .then(() => setCopy(true))
            .catch((error) => {
                console.error('Error al copiar el código: ', error)
            });
    }

    useEffect(() => {
        idProject || navigate('/project/new-project')
    }, [])

    return (
        <div>
            <div className="container-invitation-code">
                <h1>Código de invitacion</h1>
                <p>Con este código podés invitar a otras personas para que formen parte del proyecto</p>
                <div className="invitation-code">
                    <span id="code-project"> {codeProject} </span>
                    <div></div>
                    <frameElement className="copy-code" onClick={copyCode} >
                        {copy
                            ? <i className="fa-solid fa-copy"></i>
                            : <i className="fa-regular fa-copy"></i>
                        }
                        <pre>{copy ? "Copiado" : "Copiar"}</pre>
                    </frameElement>
                </div>
            </div>
            <div className='container-btn'>
                <Link to={'/project/' + idProject} className='btn-first-stage'>Finalizar</Link>
            </div>
        </div >
    )
}