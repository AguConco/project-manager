import './NewProject.css'
import { FormCreateStage } from './FormCreateStage';
import { FormNewProject } from './FormNewProject';
import { InvitationCode } from './InvitationCode';
import { Route, Routes } from 'react-router-dom';

export const NewProject = () => {

    return (
        <section className='section-new-project'>
            <Routes>
                <Route path='/' element={ <FormNewProject /> } />
                <Route path='/new-stage' element={ <FormCreateStage /> } />
                <Route path='/finish' element={ <InvitationCode /> } />
            </Routes>
        </section>
    )

}
// http://localhost:3000/project/new-project/new-stage/finis
