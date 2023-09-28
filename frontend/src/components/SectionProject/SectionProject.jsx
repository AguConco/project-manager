import { Route, Routes } from 'react-router-dom'
import { NavBar } from '../NavBar/NavBar'
import { SectionProjectEmpty } from '../SectionProjectEmpty/SectionProjectEmpty'
import { Project } from '../Project/project'
import { NewProject } from '../NewProject/NewProject'

export const SectionProject = () => {
    
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<SectionProjectEmpty />} />
                <Route path=":id" element={<Project />} />
                <Route path="/new-project" element={<NewProject />} />
            </Routes>
        </>
    )
}
