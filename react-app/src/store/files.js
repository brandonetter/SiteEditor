// constants

const SET_FILES = "files/SET_FILES";
const SET_FILE = "files/SET_FILE";
const SET_FILE_CLICK = "files/SET_FILE_CLICK";

const setFile = (file) => ({
    type: SET_FILE,
    payload: file,
});

const setFiles = (files) => ({
    type: SET_FILES,
    payload: files,
});

const setFileClick = (fileClick) => ({
    type: SET_FILE_CLICK,
    payload: fileClick,
});



const initialState = { fileClick: 0, file: null, files: null };


export const getContent = (id) => async (dispatch, getState) => {
    return getState().files.file.content;
}

export const getFiles = (id) => async (dispatch) => {
    const response = await fetch(`/api/projects/${id}/file`);
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setFiles(data.files));
    return data;
};
export const addFileClick = () => async (dispatch, getState) => {
    let fileClick = getState().files.fileClick;
    fileClick++;
    dispatch(setFileClick(fileClick));

    return {};
};


export const setFileS = (file) => async (dispatch) => {
    dispatch(setFile(file));
    return {};
};

export const deleteFile = (p_id, f_id) => async (dispatch, getState) => {
    const response = await fetch(`/api/projects/${p_id}/file/${f_id}`, {
        method: "DELETE",
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    let tstate = getState().files.files;
    let newFiles = [];
    if (tstate.files)
        newFiles = tstate.files.filter((file) => file.id !== f_id);
    else if (tstate) {
        newFiles = tstate.filter((file) => file.id != f_id);
    }
    if (newFiles.length > 0) {
        dispatch(setFile(newFiles[0]));
    }
    dispatch(setFiles(newFiles));


    // return data;
};

export const saveFileContents = (p_id, f_id, contents) => async (dispatch) => {
    const response = await fetch(`/api/projects/${p_id}/file/${f_id}/content`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: contents }),
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    //dispatch(setFile(data));
    dispatch(getFiles(p_id));
    return data;
};

export const createNewFile = (p_id, name, templateid) => async (dispatch) => {
    const response = await fetch(`/api/projects/${p_id}/file`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, templateid: templateid }),
    });
    const data = await response.json();
    if (data.errors) {

        return data;
    }
    dispatch(setFile(data));
    dispatch(getFiles(p_id));
    return data;
};

export const updateFile = (p_id, f_id, name) => async (dispatch) => {
    const response = await fetch(`/api/projects/${p_id}/file/${f_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setFile(data));
    dispatch(getFiles(p_id));
    return data;
};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_FILE:
            return { ...state, file: action.payload };
        case SET_FILES:
            return { ...state, files: action.payload };
        case SET_FILE_CLICK:
            return { ...state, fileClick: action.payload };



        default:
            return state;
    }
}
