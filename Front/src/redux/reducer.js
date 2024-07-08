import {
	FETCH_CLIENTS_REQUEST,
	FETCH_CLIENTS_SUCCESS,
	FETCH_CLIENTS_FAILURE,
  } from './actions';
  
  const initialState = {
	clients: {
		totalItems: 0,
		totalPages: 1,
		currentPage: 1,
		clients: []
	},
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
	  default:
		return state;
	}
  };
  
  export default reducer;
  