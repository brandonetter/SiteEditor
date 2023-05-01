// / constants
const SHOW_SIDEBAR = "modals/SHOW_SIDEBAR";
const HIDE_SIDEBAR = "modals/HIDE_SIDEBAR";
const SHOW_TEMPLATE_SAVE = "modals/SHOW_TEMPLATE_SAVE";
const HIDE_TEMPLATE_SAVE = "modals/HIDE_TEMPLATE_SAVE";

const showSidebar = () => ({
    type: SHOW_SIDEBAR,
});
const hideSidebar = () => ({
    type: HIDE_SIDEBAR,
});
const showTemplateSave = () => ({
    type: SHOW_TEMPLATE_SAVE,
});
const hideTemplateSave = () => ({
    type: HIDE_TEMPLATE_SAVE,
});


const initialState = { sidebar: true, templateSave: false };

export const toggleSidebar = () => (dispatch, getState) => {
    const { sidebar } = getState().modals;
    if (sidebar) {
        dispatch(hideSidebar());
    } else {
        dispatch(showSidebar());
    }
};
export const toggleTemplateSave = () => (dispatch, getState) => {
    const { templateSave } = getState().modals;
    if (templateSave) {
        dispatch(hideTemplateSave());
    } else {
        dispatch(showTemplateSave());
    }
};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_SIDEBAR:
            return { ...state, sidebar: true };
        case HIDE_SIDEBAR:
            return { ...state, sidebar: false };
        case SHOW_TEMPLATE_SAVE:
            return { ...state, templateSave: true };
        case HIDE_TEMPLATE_SAVE:
            return { ...state, templateSave: false };

        default:
            return state;
    }
}
