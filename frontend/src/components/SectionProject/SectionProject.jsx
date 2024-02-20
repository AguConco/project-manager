import { Route, Routes } from 'react-router-dom'
import { SectionProjectEmpty } from '../SectionProjectEmpty/SectionProjectEmpty'
import { Project } from '../Project/project'
import { NewProject } from '../NewProject/NewProject'
import { JoinProject } from '../JoinProject/JoinProject'

export const SectionProject = () => {
    
    return (
        <>
            <Routes>
                <Route path="/" element={<SectionProjectEmpty />} />
                <Route path="/:id/*" element={<Project />} />
                <Route path="/new-project/*" element={<NewProject />} />
                <Route path="/join-project" element={<JoinProject />} />
            </Routes>
        </>
    )
}
