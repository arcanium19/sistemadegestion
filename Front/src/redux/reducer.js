import {
	FETCH_CLIENTS_REQUEST,
	FETCH_CLIENTS_SUCCESS,
	FETCH_CLIENTS_FAILURE,
	FETCH_EMPLOYEES_REQUEST,
	FETCH_EMPLOYEES_SUCCESS,
	FETCH_EMPLOYEES_FAILURE,
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAILURE,
	RESET_ERROR_STATE,
	RESET_USER_STATE,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT,
} from './actions';

const initialState = {
	clients: {
		clients: [],
		totalItems: 0,
		totalPages: 1,
		currentPage: 1,
	},
	employees: {  // Nueva propiedad para almacenar empleados
		employees: [],
		totalItems: 0,
		totalPages: 1,
		currentPage: 1,
	},
	user: null,
	loading: false,
	error: {
		state: false,
		message: null,
	},
	register: {
		state: false,
		data: null,
	},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_CLIENTS_REQUEST:
			return {
				...state,
				loading: true,
				error: {
					state: false,
					message: null,
				},
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
				error: {
					state: true,
					message: action.payload,
				},
			};
		case FETCH_EMPLOYEES_REQUEST:
			return {
				...state,
				loading: true,
				error: {
					state: false,
					message: null,
				},
			};
		case FETCH_EMPLOYEES_SUCCESS:
			return {
				...state,
				loading: false,
				employees: {
					employees: action.payload.employees,
					totalItems: action.payload.totalItems,
					totalPages: action.payload.totalPages,
					currentPage: action.payload.currentPage,
				},
			};
		case FETCH_EMPLOYEES_FAILURE:
			return {
				...state,
				loading: false,
				error: {
					state: true,
					message: action.payload,
				},
			};
		case REGISTER_USER_REQUEST:
			return {
				...state,
				loading: true
			};
		case REGISTER_USER_SUCCESS:
			return {
				...state,
				loading: false,
				register: {
					state: false,
					data: action.payload,
				},
			};
		case REGISTER_USER_FAILURE:
			return {
				...state, 
				loading: false,
				error: {
					state: true,
					message: action.payload,
				},
			};
		case RESET_ERROR_STATE:
			return {
				...state,
				error: {
					state: false,
					message: null,
				},
			};
		case RESET_USER_STATE:
			return {
				...state,
				register: {
					state: false,
					data: null,
				},
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				error: {
					state: false,
					message: null,
				},
			};
		case LOGIN_FAILURE:
			return {
				...state,
				error: {
					state: true,
					message: action.payload,
				},
			};
		case LOGOUT:
			return {
				...state,
				error: {
					state: false,
					message: null,
				},
			};
		default:
			return state;
	}
};

export default reducer;
