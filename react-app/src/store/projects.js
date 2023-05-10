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

export const deleteProject = (id) => async (dispatch, getState) => {
    const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    // remove the template from the store
    let tstate = getState().projects.projects;
    let newProjects = [];
    if (tstate.projects)
        newProjects = tstate.projects.filter((project) => project.id !== id);
    dispatch(setProjects(newProjects));

    return data;
};

export const createProject = (projectData, templateID) => async (dispatch) => {
    const name = projectData;
    const response = await fetch("/api/projects/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            templateID,
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
