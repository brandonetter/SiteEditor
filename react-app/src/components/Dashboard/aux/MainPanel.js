import './MainPanel.css'
import { Route, Switch } from 'react-router-dom';
import TemplateMaker from '../../TemplateMaker';
function MainPanel({ sidebarState }) {
    let mainPanelClass = "dashboard-main-panel";
    if (sidebarState) {
        mainPanelClass = "dashboard-main-panel sidebar-open";
    }
    return (
        <div className={mainPanelClass}>

            <Switch>
                <Route path="/dashboard/newTemplate">
                    <TemplateMaker />
                </Route>
                <Route path="/dashboard">
                    asdased
                </Route>

            </Switch>

        </div>
    )
}

export default MainPanel
