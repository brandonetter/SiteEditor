import Header from './aux/Header'
import MainPanel from './aux/MainPanel'
import { useSelector } from 'react-redux'
import Sidebar from './aux/modals/Sidebar'
function Dashboard() {
    const modals = useSelector((state) => state.modals);
    return (
        <div className="dashboard">

            <Header />
            <MainPanel sidebarState={modals.sidebar} />
            <Sidebar state={modals.sidebar} />
        </div>
    )
}
export default Dashboard
