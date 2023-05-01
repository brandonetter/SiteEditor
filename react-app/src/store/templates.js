// constants
const SET_TEMPLATE = "session/SET_TEMPLATE";

const setTemplate = (template) => ({
    type: SET_TEMPLATE,
    payload: template,
});

export const assignTemplate = (template) => async (dispatch) => {
    dispatch(setTemplate(template));
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


const initialState = { template: null };


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_TEMPLATE:
            return { template: action.payload };
        default:
            return state;
    }
}
