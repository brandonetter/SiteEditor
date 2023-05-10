// / constants
const SHOW_SIDEBAR = "modals/SHOW_SIDEBAR";
const HIDE_SIDEBAR = "modals/HIDE_SIDEBAR";
const SHOW_TEMPLATE_SAVE = "modals/SHOW_TEMPLATE_SAVE";
const HIDE_TEMPLATE_SAVE = "modals/HIDE_TEMPLATE_SAVE";
const SHOW_DELETE_TEMPLATE = "modals/SHOW_DELETE_TEMPLATE";
const HIDE_DELETE_TEMPLATE = "modals/HIDE_DELETE_TEMPLATE";
const SHOW_CREATE_PROJECT = "modals/SHOW_CREATE_PROJECT";
const HIDE_CREATE_PROJECT = "modals/HIDE_CREATE_PROJECT";
const SHOW_ALIGN = "modals/SHOW_ALIGN";
const HIDE_ALIGN = "modals/HIDE_ALIGN";
const SET_ALIGN_FUNCTION = "modals/SET_ALIGN_FUNCTION";
const SHOW_ADD_IMAGE = "modals/SHOW_ADD_IMAGE";
const HIDE_ADD_IMAGE = "modals/HIDE_ADD_IMAGE";
const SET_ADD_IMAGE_FUNCTION = "modals/SET_ADD_IMAGE_FUNCTION";
const SHOW_ADD_FILE = "modals/SHOW_ADD_FILE";
const HIDE_ADD_FILE = "modals/HIDE_ADD_FILE";
const SHOW_ADD_LINK = "modals/SHOW_ADD_LINK";
const HIDE_ADD_LINK = "modals/HIDE_ADD_LINK";
const SET_ADD_LINK_FUNCTION = "modals/SET_ADD_LINK_FUNCTION";
const SHOW_DELETE_PROJECT = "modals/SHOW_DELETE_PROJECT";
const HIDE_DELETE_PROJECT = "modals/HIDE_DELETE_PROJECT";
const SHOW_COLOR = "modals/SHOW_COLOR";
const HIDE_COLOR = "modals/HIDE_COLOR";
const SET_COLOR_FUNCTION = "modals/SET_COLOR_FUNCTION";
const SET_COLOR = "modals/SET_COLOR";
const SHOW_USER = "modals/SHOW_USER";
const HIDE_USER = "modals/HIDE_USER";
const SET_BIG_LOADER = "modals/SET_BIG_LOADER";
const HIDE_BIG_LOADER = "modals/HIDE_BIG_LOADER";

const showBigLoader = () => ({
    type: SET_BIG_LOADER,
});
const hideBigLoader = () => ({
    type: HIDE_BIG_LOADER,
});


const showUser = () => ({
    type: SHOW_USER,
});
const hideUser = () => ({
    type: HIDE_USER,
});

const showColor = () => ({
    type: SHOW_COLOR,
});
const hideColor = () => ({
    type: HIDE_COLOR,
});
const setColorFunction = (func) => ({
    type: SET_COLOR_FUNCTION,
    payload: func,
});

const showDeleteProject = (id) => ({
    type: SHOW_DELETE_PROJECT,
    payload: id,
});
const hideDeleteProject = () => ({
    type: HIDE_DELETE_PROJECT,
});

const showSidebar = () => ({
    type: SHOW_SIDEBAR,
});
const hideSidebar = () => ({
    type: HIDE_SIDEBAR,
});
const showAlign = () => ({
    type: SHOW_ALIGN,
});
const setAddLinkFunction = (func) => ({
    type: SET_ADD_LINK_FUNCTION,
    payload: func,
});
const showAddLink = () => ({
    type: SHOW_ADD_LINK,
});
const hideAddLink = () => ({
    type: HIDE_ADD_LINK,
});

const hideAlign = () => ({
    type: HIDE_ALIGN,
});
const showAddFile = () => ({
    type: SHOW_ADD_FILE,
});
const hideAddFile = () => ({
    type: HIDE_ADD_FILE,
});

const setAlignFunction = (func) => ({
    type: SET_ALIGN_FUNCTION,
    payload: func,
});
const showAddImage = () => ({
    type: SHOW_ADD_IMAGE,
});
const hideAddImage = () => ({
    type: HIDE_ADD_IMAGE,
});
const setAddImageFunction = (func) => ({
    type: SET_ADD_IMAGE_FUNCTION,
    payload: func,
});



const showDeleteTemplate = (id) => ({
    type: SHOW_DELETE_TEMPLATE,
    payload: id,
});
const hideDeleteTemplate = () => ({
    type: HIDE_DELETE_TEMPLATE,
});

const showCreateProject = () => ({
    type: SHOW_CREATE_PROJECT,
});
const hideCreateProject = () => ({
    type: HIDE_CREATE_PROJECT,
});

const showTemplateSave = () => ({
    type: SHOW_TEMPLATE_SAVE,
});
const hideTemplateSave = () => ({
    type: HIDE_TEMPLATE_SAVE,
});


const initialState = { bigLoader: false, user: false, prevColor: null, color: false, setColorFunction: null, addLinkFunction: null, addLink: false, addFile: false, addImage: false, addImageFunction: null, sidebar: true, templateSave: false, deleteTemplate: false, deleteID: null, createProject: false, align: false, alignFunction: null, deleteProject: false, deleteProjectID: null };

export const hideAlignModal = () => (dispatch) => {
    dispatch(hideAlign());
    return {};
};
export const setPrevColor = (color) => (dispatch) => {
    console.log("setting prev color", color);
    dispatch({ type: SET_COLOR, payload: color });
    return {};
};

export const showAddImageModal = () => (dispatch) => {
    dispatch(showAddImage());
    return {};
};
export const hideAddImageModal = () => (dispatch) => {
    dispatch(hideAddImage());
    return {};
};

export const toggleColor = () => (dispatch, getState) => {
    const { color } = getState().modals;
    if (color) {
        dispatch(hideColor());
    } else {
        dispatch(showColor());
    }
};
export const setColorFunctionS = (func) => (dispatch) => {
    dispatch(setColorFunction(func));
    return {};
};


export const toggleAddImage = () => (dispatch, getState) => {
    const { addImage } = getState().modals;
    if (addImage) {
        dispatch(hideAddImage());
    } else {
        dispatch(showAddImage());
    }
};
export const toggleAddLink = () => (dispatch, getState) => {
    const { addLink } = getState().modals;
    if (addLink) {
        dispatch(hideAddLink());
    } else {
        dispatch(showAddLink());
    }
};
export const setAddLinkFunctionS = (func) => (dispatch) => {
    dispatch(setAddLinkFunction(func));
    return {};
};

export const toggleAddFile = () => (dispatch, getState) => {
    const { addFile } = getState().modals;
    if (addFile) {
        dispatch(hideAddFile());
    } else {
        dispatch(showAddFile());
    }
};


export const setAddImageFunctionS = (func) => (dispatch) => {
    dispatch(setAddImageFunction(func));

    return {};
};


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
export const toggleCreateProject = () => (dispatch, getState) => {
    const { createProject } = getState().modals;
    if (createProject) {
        dispatch(hideCreateProject());
    } else {
        dispatch(showCreateProject());
    }
};

export const toggleAlign = () => (dispatch, getState) => {
    const { align } = getState().modals;
    if (align) {
        dispatch(hideAlign());
    } else {
        dispatch(showAlign());
    }
};

export const setAlignFunctionS = (func) => (dispatch) => {
    dispatch(setAlignFunction(func));
    return {};
};


export const toggleDeleteTemplate = (id) => (dispatch, getState) => {
    const { deleteTemplate } = getState().modals;
    if (deleteTemplate) {
        dispatch(hideDeleteTemplate());
    } else {
        dispatch(showDeleteTemplate(id));
    }
};

export const toggleDeleteProject = (id) => (dispatch, getState) => {
    const { deleteProject } = getState().modals;
    if (deleteProject) {
        dispatch(hideDeleteProject());
    } else {
        dispatch(showDeleteProject(id));
    }
};
export const toggleUser = () => (dispatch, getState) => {
    const { user } = getState().modals;
    if (user) {
        dispatch(hideUser());
    } else {
        dispatch(showUser());
    }
};

export const toggleBigLoader = () => (dispatch, getState) => {
    const { bigLoader } = getState().modals;
    if (bigLoader) {
        dispatch(hideBigLoader());
    } else {
        dispatch(showBigLoader());
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
        case SHOW_DELETE_TEMPLATE:
            return { ...state, deleteTemplate: true, deleteID: action.payload };
        case HIDE_DELETE_TEMPLATE:
            return { ...state, deleteTemplate: false };
        case SHOW_CREATE_PROJECT:
            return { ...state, createProject: true };
        case HIDE_CREATE_PROJECT:
            return { ...state, createProject: false };
        case SHOW_ALIGN:
            return { ...state, align: true };
        case HIDE_ALIGN:
            return { ...state, align: false };
        case SET_ALIGN_FUNCTION:
            return { ...state, alignFunction: action.payload };
        case SHOW_ADD_IMAGE:
            return { ...state, addImage: true };
        case HIDE_ADD_IMAGE:
            return { ...state, addImage: false };
        case SET_ADD_IMAGE_FUNCTION:
            return { ...state, addImageFunction: action.payload };
        case SHOW_ADD_FILE:
            return { ...state, addFile: true };
        case HIDE_ADD_FILE:
            return { ...state, addFile: false };
        case SHOW_ADD_LINK:
            return { ...state, addLink: true };
        case HIDE_ADD_LINK:
            return { ...state, addLink: false };
        case SET_ADD_LINK_FUNCTION:
            return { ...state, addLinkFunction: action.payload };
        case SHOW_DELETE_PROJECT:
            return { ...state, deleteProject: true, deleteProjectID: action.payload };
        case HIDE_DELETE_PROJECT:
            return { ...state, deleteProject: false };
        case SHOW_COLOR:
            return { ...state, color: true };
        case HIDE_COLOR:
            return { ...state, color: false };
        case SET_COLOR_FUNCTION:
            return { ...state, setColorFunction: action.payload };
        case SET_COLOR:
            return { ...state, prevColor: action.payload };
        case SHOW_USER:
            return { ...state, user: true };
        case HIDE_USER:
            return { ...state, user: false };
        case SET_BIG_LOADER:
            return { ...state, bigLoader: true };
        case HIDE_BIG_LOADER:
            return { ...state, bigLoader: false };


        default:
            return state;
    }
}
