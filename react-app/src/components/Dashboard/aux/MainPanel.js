import './MainPanel.css'
import { Route, Switch } from 'react-router-dom';
import TemplateMaker from '../../TemplateMaker';
import MyTemplates from '../../MyTemplates';
import MyProjects from '../../MyProjects';
import ProjectEditor from '../../ProjectEditor';
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
                <Route path="/dashboard/myTemplates">
                    <MyTemplates />
                </Route>
                <Route path="/dashboard/myProjects">
                    <MyProjects />
                </Route>
                {/* catch /dashboard/projects/<id> */}
                <Route path="/dashboard/projects/:id" component={ProjectEditor} />

                <Route path="/dashboard">
                    asdased
                </Route>



            </Switch>

        </div>
    )
}

export default MainPanel
