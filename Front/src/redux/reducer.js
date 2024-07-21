import {
	FETCH_CLIENTS_REQUEST,
	FETCH_CLIENTS_SUCCESS,
	FETCH_CLIENTS_FAILURE,
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAILURE,
	RESET_ERROR_STATE,
	RESET_USER_STATE,
} from './actions';

const initialState = {
	clients: {
		totalItems: 0,
		totalPages: 1,
		currentPage: 1,
		clients: []
	},
	user: null,
	loading: false,
	error: null,

};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_CLIENTS_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};
		case FETCH_CLIENTS_SUCCESS:
			return {
				...state,
				loading: false,
				clients: {
					clients: action.payload.clients,
					totalItems: action.payload.totalItems,
					totalPages: action.payload.totalPages,
					currentPage: action.payload.currentPage,
				}
			};
		case FETCH_CLIENTS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case REGISTER_USER_REQUEST:
			return { ...state, loading: true };
		case REGISTER_USER_SUCCESS:
			return { ...state, loading: false, user: action.payload };
		case REGISTER_USER_FAILURE:
			return { ...state, loading: false, error: action.payload };
		case REGISTER_USER_FAILURE:
			return { ...state, loading: false, error: action.payload };
		case RESET_ERROR_STATE:
			return { ...state, error: null };
		case RESET_USER_STATE:
			return { ...state, user: null };
		default:
			return state;
	}
};

export default reducer;
