import { createContext, useContext, useState } from "react";
import { requestsToServer } from "../data/functions";
import { AuthContext } from "./authContext";

export const ProjectsContext = createContext()

export const ProjectsProvider = ({ children }) => {

    const { user } = useContext(AuthContext)
    const [nameProject, setNameProject] = useState(null)
    const [idProject, setIdProject] = useState(null)
    const [codeProject, setCodeProject] = useState(null)

    const createProject = async (e) => {
        const file = '/project/create'
        const method = 'POST'
        const data = { ...e, admin: user.uid }

        return await requestsToServer({ file, method, data })
    }

    const createStage = async (e) => {
        const file = '/project/stage'
        const method = 'POST'
        const data = e

        return requestsToServer({ file, method, data })
    }

    const getStage = async (e) => {
        const file = '/project/stage?idProject=' + (idProject || e)
        const method = 'GET'

        return requestsToServer({ file, method, data: null })
    }

    const getProjects = (e) => {
        const {admin, id} = e
        const file = `/project?admin=${admin}&id=${id}`
        const method = 'GET'

        return requestsToServer({ file, method, data: null })
    }

    return <ProjectsContext.Provider value={{
        createProject,
        createStage,
        getStage,
        getProjects,
        setNameProject,
        setIdProject,
        setCodeProject,
        nameProject,
        idProject,
        codeProject
    }}>{children}</ProjectsContext.Provider>
}
