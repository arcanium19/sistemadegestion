import axios from "axios";

export const FETCH_CLIENTS_REQUEST = 'FETCH_CLIENTS_REQUEST';
export const FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS';
export const FETCH_CLIENTS_FAILURE = 'FETCH_CLIENTS_FAILURE';
export const FETCH_EMPLOYEES_REQUEST = 'FETCH_EMPLOYEES_REQUEST';
export const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS';
export const FETCH_EMPLOYEES_FAILURE = 'FETCH_EMPLOYEES_FAILURE';
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
export const RESET_ERROR_STATE = 'RESET_ERROR_STATE';
export const RESET_USER_STATE = 'RESET_USER_STATE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

const NEXT_PUBLIC_HOST = process.env.NEXT_PUBLIC_HOST;
const NEXT_PUBLIC_PORT_BACKEND = process.env.NEXT_PUBLIC_PORT_BACKEND;



const fetchClientsRequest = () => ({
	type: FETCH_CLIENTS_REQUEST,
});

const fetchClientsSuccess = (clients, totalItems, totalPages, currentPage) => ({
	type: FETCH_CLIENTS_SUCCESS,
	payload: { clients, totalItems, totalPages, currentPage },
});

const fetchClientsFailure = (error) => ({
	type: FETCH_CLIENTS_FAILURE,
	payload: error.message,
});

export const fetchClients = (page = 1, limit = 10) => async (dispatch) => {
	dispatch(fetchClientsRequest());
	try {
		// const response = await fetch(`/api/clients?page=${page}&limit=${limit}`);
		const response = await axios.get(`http://${NEXT_PUBLIC_HOST}:${NEXT_PUBLIC_PORT_BACKEND}/api/client/`, {
			params: { page, limit }
		});
		
		const data = response.data.data
		dispatch(fetchClientsSuccess(data.clients, data.totalItems, data.totalPages, data.currentPage));
	} catch (error) {
		dispatch(fetchClientsFailure(error.toString()));
	}
};

// En actions.js (o donde tengas tus acciones)
export const deleteClient = (clientId) => async (dispatch) => {
	try {
	  // Realizamos la solicitud DELETE a la API
	  const response = await axiosInstance.delete(`/client/${clientId}`);
	  
	  // Verificamos la respuesta
	  if (response.data.error) {
		// Si hubo un error, mostramos el mensaje de error
		alert(response.data.message); // Podrías manejar esto con una notificación más elegante
	  } else {
		// Si la eliminación fue exitosa, mostramos el mensaje y actualizamos el estado
		alert(response.data.data); // Muestra el mensaje de éxito
		dispatch({
		  type: "DELETE_CLIENT",
		  payload: clientId,
		});
		
		// Después de eliminar el cliente, traemos nuevamente la lista de clientes
		dispatch(fetchClients()); // Esto traerá todos los clientes nuevamente desde el backend
	  }
	} catch (error) {
	  // Si hubo un error con la solicitud HTTP, lo manejamos aquí
	  alert("Error al eliminar el cliente: " + error.message);
	  console.error("Error al eliminar cliente:", error.message);
	}
  };
  
//---------------------------------------------------------------------------------
// Users

export const registerUser = (userData) => async (dispatch) => {
	dispatch({ type: REGISTER_USER_REQUEST });

	try {
		const response = await axios.post(`http://${NEXT_PUBLIC_HOST}:${NEXT_PUBLIC_PORT_BACKEND}/api/user/`, userData);

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

export const login = (email, password) => async (dispatch) => {
	try {
		const response = await fetch(`http://${NEXT_PUBLIC_HOST}:${NEXT_PUBLIC_PORT_BACKEND}/api/user/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		const data = await response.json();
		if (!data.error) {
			// Guarda el token en una cookie
			// Cookies.set("token", data.data, { secure: true, sameSite: "strict" });
			localStorage.setItem("token", data.data);
			dispatch({ type: LOGIN_SUCCESS, payload: data.data });
		} else {
			dispatch({ type: LOGIN_FAILURE, payload: data.message });
		}
	} catch (error) {
		dispatch({ type: LOGIN_FAILURE, payload: "Error en la conexión" });
	}
};

export const logout = () => (dispatch) => {
	localStorage.removeItem("token");
	dispatch({ type: LOGOUT });
};


//---------------------------------------------------------------------------------------
//Employees

const fetchEmployeesRequest = () => ({
	type: FETCH_EMPLOYEES_REQUEST,
});

const fetchEmployeesSuccess = (employees, totalItems, totalPages, currentPage) => ({
	type: FETCH_EMPLOYEES_SUCCESS,
	payload: { employees, totalItems, totalPages, currentPage },
});

const fetchEmployeesFailure = (error) => ({
	type: FETCH_EMPLOYEES_FAILURE,
	payload: error.message,
});

// Función principal para obtener la lista de empleados
export const fetchEmployees = (page = 1, limit = 10) => async (dispatch) => {
	dispatch(fetchEmployeesRequest());
	try {
		const response = await axios.get(`http://${NEXT_PUBLIC_HOST}:${NEXT_PUBLIC_PORT_BACKEND}/api/employee/`, {
			params: { page, limit }
		});

		const data = response.data.data;
		dispatch(fetchEmployeesSuccess(data.employees, data.totalItems, data.totalPages, data.currentPage));
	} catch (error) {
		dispatch(fetchEmployeesFailure(error.toString()));
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