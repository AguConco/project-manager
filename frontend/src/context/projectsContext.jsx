import { createContext, useContext, useState } from "react";
import { requestsToServer } from "../data/functions";
import { AuthContext } from "./authContext";

export const ProjectsContext = createContext()

export const ProjectsProvider = ({ children }) => {

    const { user } = useContext(AuthContext)
    const [nameProject, setNameProject] = useState(null)
    const [idProject, setIdProject] = useState(null)
    const [codeProject, setCodeProject] = useState(null)
    const [newTask, setNewTask] = useState(null)


    const createProject = (e) => {
        const file = '/project/create'
        const method = 'POST'
        const data = { ...e, admin: user.uid }

        return requestsToServer({ file, method, data })
    }   

    const createStage = (e) => {
        const file = '/project/stage'
        const method = 'POST'
        const data = e

        return requestsToServer({ file, method, data })
    }

    const getStage = (e) => {
        const file = '/project/stage?idProject=' + (idProject || e)
        const method = 'GET'

        return requestsToServer({ file, method, data: null })
    }

    const getProjects = (e) => {
        const { admin, id } = e
        const file = `/project?admin=${admin}&id=${id}`
        const method = 'GET'

        return requestsToServer({ file, method, data: null })
    }

    const getProjectsByCode = (e) => {
        const file = `/project/code?admin=${e}`
        const method = 'GET'

        return requestsToServer({ file, method, data: null })
    }

    const createTask = (e) => {
        const file = '/task/create'
        const method = 'POST'
        const data = e

        return requestsToServer({ file, method, data })
    }

    return <ProjectsContext.Provider value={{
        createProject,
        createStage,
        createTask,
        getStage,
        getProjects,
        getProjectsByCode,
        setNameProject,
        setIdProject,
        setCodeProject,
        setNewTask,
        nameProject,
        idProject,
        codeProject,
        newTask
    }}>{children}</ProjectsContext.Provider>
}
