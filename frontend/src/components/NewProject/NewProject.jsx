import './NewProject.css'
import { FormCreateStage } from './FormCreateStage';
import { FormNewProject } from './FormNewProject';
import { InvitationCode } from './InvitationCode';

export const NewProject = () => {
    return (
        <>
            <FormNewProject />
            <FormCreateStage />
            <InvitationCode />
        </>
    )
}
// http://localhost:3000/project/new-project/new-stage/finis
