export const FETCH_CLIENTS_REQUEST = 'FETCH_CLIENTS_REQUEST';
export const FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS';
export const FETCH_CLIENTS_FAILURE = 'FETCH_CLIENTS_FAILURE';

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
