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
        const file = 'createProject.php'
        const method = 'POST'
        const data = { ...e, admin: user.uid }

        return await requestsToServer({ file, method, data })
    }

    const createStage = async (e) => {
        const file = 'createStage.php'
        const method = 'POST'
        const data = e

        return requestsToServer({ file, method, data })
    }

    const getProject = async () => {
        const file = 'getStage.php?idProject='+idProject
        const method = 'GET'

        return requestsToServer({ file, method, data: null})
    }

    return <ProjectsContext.Provider value={{
        createProject,
        createStage,
        getProject,
        setNameProject,
        setIdProject,
        setCodeProject,
        nameProject,
        idProject,
        codeProject
    }}>{children}</ProjectsContext.Provider>
}
