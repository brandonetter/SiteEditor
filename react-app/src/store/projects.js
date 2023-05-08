// constants
const SET_PROJECT = "projects/SET_PROJECT";
const SET_PROJECTS = "projects/SET_PROJECTS";


const setProject = (project) => ({
    type: SET_PROJECT,
    payload: project,
});

const setProjects = (projects) => ({
    type: SET_PROJECTS,
    payload: projects,
});


const initialState = { project: null, projects: null };

export const getProjects = () => async (dispatch) => {
    const response = await fetch("/api/projects/");
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setProjects(data));
    return data;
};
export const setProjectThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/projects/${id}`);
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setProject(data));
    return data;
};


export const createProject = (projectData) => async (dispatch) => {
    const name = projectData;
    const response = await fetch("/api/projects/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
        }),
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setProject(data));
    return {};
};




export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_PROJECT:
            return { ...state, project: action.payload };
        case SET_PROJECTS:
            return { ...state, projects: action.payload };




        default:
            return state;
    }
}
