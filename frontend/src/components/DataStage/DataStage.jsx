import { useContext, useState } from "react"
import { ProjectsContext } from "../../context/projectsContext"
import { generateId } from "../../data/functions"
import { socket } from "../Project/project"

export const DataStage = ({ setNewStage, setMessage }) => {

    const { createStage, idProject } = useContext(ProjectsContext)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [color, setColor] = useState('#aaaaaa')

    const maxLetterName = 50
    const maxLetterDescription = 500

    const changeName = ({ target }) => {
        const name = target.value

        maxLetterName >= name.length && setName(name)
        setMessage(null)
    }

    const changeDescription = ({ target }) => {
        const description = target.value

        maxLetterDescription >= description.length && setDescription(description)
        setMessage(null)
    }

    const changeColor = (e) => {
        setColor(e.target.value)
    }

    const newStage = (e) => {
        e.preventDefault()

        const data = { name, id: generateId(), idProject, description, color }

        createStage(data)
            .then(e => e.json())
            .then(e => {
                setMessage({ text: e.message, status: e.status })
                e.status && setNewStage(false)
                socket.emit('listStage', idProject)
            })
            .catch(error => console.log(error))
    }

    return (
        <form className="form-data-stage" onSubmit={newStage}>
            <input tabIndex={1} type="text" placeholder="Nombre" onChange={changeName} value={name} />
            <span className="counter-leter">{name.length}/50</span>
            <textarea tabIndex={2} placeholder="Descripción" onChange={changeDescription} value={description} />
            <span className="counter-leter">{description.length}/500</span>
            <div>
                <input type="color" onChange={changeColor} />
                <span className="color-name" style={name ? { color, borderColor: color, padding: "5px 10px" } : {}}>{name}</span>
            </div>
            <div className="container-btn-stage">
                <button type="button" tabIndex={5} onClick={() => setNewStage(false)}><i className="fa-solid fa-times"></i></button>
                <button type="submit" tabIndex={4}>Agregar</button>
            </div>
        </form>
    )
}