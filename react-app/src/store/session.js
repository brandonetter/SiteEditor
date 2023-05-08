// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const SET_TOASTS = "session/SET_TOASTS";
const REMOVE_TOAST = "session/REMOVE_TOAST";

const setToasts = (toasts) => ({
	type: SET_TOASTS,
	payload: toasts,
});
const removeToast = (id) => ({
	type: REMOVE_TOAST,
	payload: id,
});

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const initialState = { user: null, toasts: [] };

export const addToast = (toast) => (dispatch, getState) => {
	const { toasts } = getState().session;
	if (toasts) {
		toast.id = toasts.length;
		dispatch(setToasts([...toasts, toast]));

		return {};
	} else {
		dispatch(setToasts([toast]));
	}
};

export const removeToastS = (id) => (dispatch, getState) => {
	const { toasts } = getState().session;
	dispatch(setToasts(toasts.filter((toast) => toast.id !== id)));
	return {};
};

export const getNextToast = () => (dispatch, getState) => {
	const { toasts } = getState().session;
	if (toasts) {

		if (toasts.length > 0) {
			return [toasts.pop(), dispatch(setToasts(toasts))];
		}
	};
	return null;
};

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case SET_TOASTS:
			return { ...state, toasts: action.payload };
		case REMOVE_TOAST:
			return {
				...state,
				toasts: state.toasts.filter((toast) => toast.id !== action.payload),
			};


		default:
			return state;
	}
}
