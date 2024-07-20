import { 
	FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE,
	FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE
  } from './actions';
  
  const initialState = {
	user: { data: null, loading: false, error: null },
	products: { data: [], loading: false, error: null }
  };
  
  const rootReducer = (state = initialState, action) => {
	switch (action.type) {
	  case FETCH_USER_REQUEST:
		return { ...state, user: { ...state.user, loading: true, error: null } };
	  case FETCH_USER_SUCCESS:
		return { ...state, user: { data: action.payload, loading: false, error: null } };
	  case FETCH_USER_FAILURE:
		return { ...state, user: { ...state.user, loading: false, error: action.error } };
	  case FETCH_PRODUCTS_REQUEST:
		return { ...state, products: { ...state.products, loading: true, error: null } };
	  case FETCH_PRODUCTS_SUCCESS:
		return { ...state, products: { data: action.payload, loading: false, error: null } };
	  case FETCH_PRODUCTS_FAILURE:
		return { ...state, products: { ...state.products, loading: false, error: action.error } };
	  default:
		return state;
	}
  };
  
  export default rootReducer;
  