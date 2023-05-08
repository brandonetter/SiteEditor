// constants
const SET_TEMPLATE = "session/SET_TEMPLATE";
const SET_TEMPLATES = "session/SET_TEMPLATES";


const setTemplate = (template) => ({
    type: SET_TEMPLATE,
    payload: template,
});

const setTemplates = (templates) => ({
    type: SET_TEMPLATES,
    payload: templates,
});


export const assignTemplate = (template) => async (dispatch) => {
    dispatch(setTemplate(template));
};
export const assignTemplates = (templates) => async (dispatch) => {
    dispatch(setTemplates(templates));
};

export const saveTemplate = (templateData) => async (dispatch) => {
    const { name, gridTemplate, divs } = templateData;
    const response = await fetch("/api/templates/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            gridTemplate,
            divs
        }),
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    return {};
};

export const deleteTemplate = (templateId) => async (dispatch, getState) => {
    const response = await fetch(`/api/templates/${templateId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    // remove the template from the store
    let tstate = getState().shared.templates;
    console.log("asdasdsd", tstate);
    let newTemplates = [];
    if (tstate.templates)
        newTemplates = tstate.templates.filter((template) => template.id !== templateId);
    else
        newTemplates = tstate.filter((template) => template.id !== templateId);
    dispatch(assignTemplates(newTemplates));
    console.log("asdasdsd", newTemplates)
    return { 'success': 'success' };
};

export const updateTemplate = (templateData) => async (dispatch, getState) => {
    const { name } = templateData;
    const response = await fetch(`/api/templates/${templateData.id}`, {
        method: "PUT",
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
    let tstate = getState().shared.templates;
    let newTemplates = [];
    if (tstate.templates)
        newTemplates = tstate.templates.map((template) => {
            if (template.id === templateData.id) {
                template.name = name;
            }
            return template;
        });
    else
        newTemplates = tstate.map((template) => {
            if (template.id === templateData.id) {
                template.name = name;
            }
            return template;
        });
    dispatch(assignTemplates(newTemplates));

    return {};
};


export const getTemplates = () => async (dispatch) => {
    const response = await fetch("/api/templates/");
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(assignTemplates(data));
    return data;
};




const initialState = { template: null, templates: null };


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_TEMPLATE:
            return { ...state, template: action.payload };
        case SET_TEMPLATES:
            return { ...state, templates: action.payload };

        default:
            return state;
    }
}
