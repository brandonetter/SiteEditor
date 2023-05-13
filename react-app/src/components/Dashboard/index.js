import Header from './aux/Header'
import MainPanel from './aux/MainPanel'
import { useSelector } from 'react-redux'
import Sidebar from './aux/modals/Sidebar'
import SaveTemplate from './aux/modals/SaveTemplate'
import DeleteTemplate from './aux/modals/DeleteTemplate'
import CreateProject from './aux/modals/CreateProject'
import Align from './aux/modals/Align'
import AddImage from './aux/modals/AddImage'
import AddFile from './aux/modals/AddFile'
import AddLink from './aux/modals/AddLink'
import DeleteProject from './aux/modals/DeleteProject'
import Color from './aux/modals/Color'
import User from './aux/modals/User'
import DeleteFile from './aux/modals/DeleteFile'
function Dashboard() {
    const modals = useSelector((state) => state.modals);

    return (
        <div className="dashboard">

            <Header />
            <MainPanel sidebarState={modals.sidebar} />

            <Sidebar state={modals.sidebar} />
            {modals.templateSave && (
                <SaveTemplate />

            )}
            {modals.deleteTemplate && (
                <DeleteTemplate />
            )}
            {modals.createProject && (
                <CreateProject />
            )}
            {modals.align && (
                <Align />
            )}
            {modals.addImage && (
                <AddImage />
            )}
            {modals.addFile && (
                <AddFile />
            )}
            {modals.addLink && (
                <AddLink />
            )}
            {modals.deleteProject && (
                <DeleteProject />
            )}
            {modals.color && (
                <Color />
            )}{modals.user && (
                <User />
            )}
            {modals.deleteFile && (
                <DeleteFile />
            )}


        </div>
    )
}
export default Dashboard
