import { useState } from 'react';
import './NewProject.css'
import { FormCreateStage } from './FormCreateStage';
import { FormNewProject } from './FormNewProject';
import { InvitationCode } from './InvitationCode';

export const NewProject = () => {

    const [progressCreateProject, setProgressCreateProject] = useState(1)

    switch (progressCreateProject) {
        case 1: return <FormNewProject setProgressCreateProject={setProgressCreateProject} />
        case 2: return <FormCreateStage setProgressCreateProject={setProgressCreateProject} />
        case 3: return  <InvitationCode />
        default: return <FormNewProject setProgressCreateProject={setProgressCreateProject} />
    }

}