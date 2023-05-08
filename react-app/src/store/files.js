// constants

const SET_FILES = "files/SET_FILES";
const SET_FILE = "files/SET_FILE";

const setFile = (file) => ({
    type: SET_FILE,
    payload: file,
});

const setFiles = (files) => ({
    type: SET_FILES,
    payload: files,
});



const initialState = { file: null, files: null };


export const getFiles = (id) => async (dispatch) => {
    const response = await fetch(`/api/projects/${id}/file`);
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setFiles(data.files));
    return data;
};

export const setFileS = (file) => async (dispatch) => {
    dispatch(setFile(file));
    return {};
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
    dispatch(setFile(data));
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



export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_FILE:
            return { ...state, file: action.payload };
        case SET_FILES:
            return { ...state, files: action.payload };



        default:
            return state;
    }
}
