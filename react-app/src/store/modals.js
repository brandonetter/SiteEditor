// / constants
const SHOW_SIDEBAR = "modals/SHOW_SIDEBAR";
const HIDE_SIDEBAR = "modals/HIDE_SIDEBAR";

const showSidebar = () => ({
    type: SHOW_SIDEBAR,
});
const hideSidebar = () => ({
    type: HIDE_SIDEBAR,
});


const initialState = { sidebar: true };

export const toggleSidebar = () => (dispatch, getState) => {
    const { sidebar } = getState().modals;
    if (sidebar) {
        dispatch(hideSidebar());
    } else {
        dispatch(showSidebar());
    }
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_SIDEBAR:
            return { ...state, sidebar: true };
        case HIDE_SIDEBAR:
            return { ...state, sidebar: false };

        default:
            return state;
    }
}
