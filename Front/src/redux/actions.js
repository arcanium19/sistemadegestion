import axios from "axios";

export const FETCH_CLIENTS_REQUEST = 'FETCH_CLIENTS_REQUEST';
export const FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS';
export const FETCH_CLIENTS_FAILURE = 'FETCH_CLIENTS_FAILURE';
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
export const RESET_ERROR_STATE = 'RESET_ERROR_STATE';
export const RESET_USER_STATE = 'RESET_USER_STATE';

const fetchClientsRequest = () => ({
	type: FETCH_CLIENTS_REQUEST,
});

const fetchClientsSuccess = (clients, totalItems, totalPages, currentPage) => ({
	type: FETCH_CLIENTS_SUCCESS,
	payload: { clients, totalItems, totalPages, currentPage },
});

const fetchClientsFailure = (error) => ({
	type: FETCH_CLIENTS_FAILURE,
	payload: error,
});

export const fetchClients = (page = 1, limit = 10) => async (dispatch) => {
	dispatch(fetchClientsRequest());
	try {
		const response = await fetch(`/api/clients?page=${page}&limit=${limit}`);
		const data = await response.json();
		dispatch(fetchClientsSuccess(data.clients, data.totalItems, data.totalPages, data.currentPage));
	} catch (error) {
		dispatch(fetchClientsFailure(error.toString()));
	}
};

//---------------------------------------------------------------------------------
// Users

export const registerUser = (userData) => async (dispatch) => {
	dispatch({ type: REGISTER_USER_REQUEST });

	try {
		const response = await axios.post('http://localhost:3001/api/user/', userData);

		dispatch({
			type: REGISTER_USER_SUCCESS,
			payload: response.data,
		});
	} catch (error) {
		dispatch({
			type: REGISTER_USER_FAILURE,
			payload: error.response.data.message,
		});
	}
};

//---------------------------------------------------------------------------------------
//Error modals states

export const resetErrorState = () => ({
	type: RESET_ERROR_STATE,
});

export const resetUserState = () => ({
	type: RESET_USER_STATE,
});