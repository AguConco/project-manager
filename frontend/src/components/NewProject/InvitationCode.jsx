import { useContext, useState } from "react"
import { ProjectsContext } from "../../context/projectsContext"

export const InvitationCode = () => {

    const { codeProject } = useContext(ProjectsContext)
    const [copy, setCopy] = useState(false)

    const copyCode = () => {

        navigator.clipboard.writeText(codeProject)
            .then(() => setCopy(true))
            .catch((error) => {
                console.error('Error al copiar el código: ', error)
            });
    }

    return (
        <>
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
                <button type='submit' className='btn-first-stage' onClick={()=> window.close()}>Finalizar</button>
            </div>
        </>
    )
}