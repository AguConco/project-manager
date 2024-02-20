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
        const route = '/project/create'
        const method = 'POST'
        const data = { ...e, admin: user.uid }

        return requestsToServer({ route, method, data })
    }

    const createStage = (e) => {
        const route = '/project/stage'
        const method = 'POST'
        const data = e

        return requestsToServer({ route, method, data })
    }

    const getStage = (e) => {
        const route = '/project/stage?idProject=' + (idProject || e)
        const method = 'GET'

        return requestsToServer({ route, method, data: null })
    }

    const getProjects = (e) => {
        const { admin, id } = e
        const route = `/project?admin=${admin}&id=${id}`
        const method = 'GET'

        return requestsToServer({ route, method, data: null })
    }

    const getProjectsByCode = (e) => {
        const route = `/project/code?admin=${e}`
        const method = 'GET'

        return requestsToServer({ route, method, data: null })
    }

    const createTask = (e) => {
        const route = '/task/create'
        const method = 'POST'
        const data = e

        return requestsToServer({ route, method, data })
    }

    const deleteProject = (e) => {
        const route = '/project/delete'
        const method = 'DELETE'
        const data = { id: e }

        return requestsToServer({ route, method, data })
    }

    return <ProjectsContext.Provider value={{
        createProject,
        createStage,
        createTask,
        deleteProject,
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
