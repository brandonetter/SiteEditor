import Header from './aux/Header'
import MainPanel from './aux/MainPanel'
import { useSelector } from 'react-redux'
import Sidebar from './aux/modals/Sidebar'
import SaveTemplate from './aux/modals/SaveTemplate'
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
        </div>
    )
}
export default Dashboard
