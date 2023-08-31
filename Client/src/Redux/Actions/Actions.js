import axios from "axios";

export const CREATE_USER = "CREATE_USER";
export const GET_USERS = "GET_USERS";
export const EDIT_USER = "EDIT_USER";

export const CREATE_ADMIN = "CREATE_ADMIN";
export const GET_ADMINS = "GET_ADMINS";
export const EDIT_ADMIN = "EDIT_ADMIN";

export const GET_COMPANIES = "GET_COMPANIES";
export const CREATE_COMPANY = "CREATE_COMPANY";
export const EDIT_COMPANY = "EDIT_COMPANY";

export const CREATE_OFFER = "CREATE_OFFER";
export const DELETE_OFFER = "DELETE_OFFER";
export const GET_OFFER = "GET_OFFER";
export const EDIT_OFFER = "EDIT_OFFER";

export const CREATE_TRAINING = "CREATE_TRAINING";
export const DELETE_TRAINING = "DELETE_TRAINING";
export const EDIT_TRAINING = "EDIT_TRAINING";

export const LOGIN = "LOGIN";

export const createUser = (user) => {
  const endpoint = "http://localhost:3001/user/signup";
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint, user);
      alert(response.data);
      return dispatch({
        type: CREATE_USER,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const getUsers = () => {
  const endpoint = "http://localhost:3001/user/all";
  return async (dispatch) => {
    try {
      const response = await axios(endpoint);
      alert(response.data);
      return dispatch({
        type: CREATE_USER,
        payload: response.data,
      });
    } catch (error) {
      alert("asdasd");
    }
  };
};

export const editUser = (id, user) => {
  const endpoint = `http://localhost:3001/user/update/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.patch(endpoint, user);
      alert(response.data);
      return dispatch({
        type: EDIT_USER,
      });
    } catch (error) {
      alert("asdasd");
    }
  };
};

export const createAdmin = (admin) => {
  const endpoint = "http://localhost:3001/admin/signup";
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint, admin);
      alert(response.data);
      return dispatch({
        type: CREATE_ADMIN,
      });
    } catch (error) {
      alert("asdasd");
    }
  };
};

export const editAdmin = (id, admin) => {
  const endpoint = `http://localhost:3001/admin/update/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.patch(endpoint, admin);
      alert(response.data);
      return dispatch({
        type: EDIT_ADMIN,
      });
    } catch (error) {
      alert("asdasd");
    }
  };
};

export const getAdmins = () => {
  const endpoint = "http://localhost:3001/admin/all";
  return async (dispatch) => {
    try {
      const response = await axios(endpoint);
      alert(response.data);
      return dispatch({
        type: GET_ADMINS,
        payload: response.data,
      });
    } catch (error) {
      alert("asdasd");
    }
  };
};

export const getCompanies = () => {
  const endpoint = `http://localhost:3001/company/all`;
  return async (dispatch) => {
    try {
      const response = await axios(endpoint);
      alert(response.data);
      return dispatch({ type: GET_COMPANIES, payload: response.data });
    } catch (error) {
      alert("asdasd");
    }
  };
};

export const createCompany = (company) => {
  const endpoint = "http://localhost:3001/company/signup";
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint, company);
      alert(response.data);
      return dispatch({ type: CREATE_COMPANY });
    } catch (error) {
      alert("asdasd");
    }
  };
};

export const editCompany = (id, company) => {
  const endpoint = `http://localhost:3001/company/update/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.patch(endpoint, company);
      alert(response.data);
      return dispatch({ type: EDIT_COMPANY });
    } catch (error) {
      alert("asdasd");
    }
  };
};

export const createOffer = (offer) => {
  const endpoint = "http://localhost:3001/offer";
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint, offer);
      alert(response.data);
      return dispatch({ type: CREATE_OFFER });
    } catch (error) {
      alert("asdasd");
    }
  };
};

export const deleteOffer = (id) => {
  const endpoint = `http://localhost:3001/offer/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.delete(endpoint);
      alert(response.data);
      return dispatch({ type: DELETE_OFFER });
    } catch (error) {
      alert("asdasd");
    }
  };
};

export const getOffer = (id) => {
  const endpoint = `http://localhost:3001/offer/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios(endpoint);
      alert(response.data);
      return dispatch({ type: GET_OFFER, payload: response.data });
    } catch (error) {
      alert("asdasd");
    }
  };
};

export const editOffer = (id) => {
  const endpoint = `http://localhost:3001/offer/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.patch(endpoint);
      alert(response.data);
      return dispatch({ type: EDIT_OFFER });
    } catch (error) {
      alert("asdasd");
    }
  };
};

export const createTraining = (training) => {
  const endpoint = "http://localhost:3001/training/create";
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint, training);
      alert(response.data);
      return dispatch({ type: CREATE_TRAINING });
    } catch (error) {
      alert("asdasd");
    }
  };
};

export const deleteTraining = (id) => {
  const endpoint = `http://localhost:3001/training/delete${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.delete(endpoint);
      alert(response.data);
      return dispatch({ type: DELETE_OFFER });
    } catch (error) {
      alert("asdasd");
    }
  };
};

export const editTraining = (id, training) => {
  const endpoint = `http://localhost:3001/training/update/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.patch(endpoint, training);
      alert(response.data);
      return dispatch({ type: EDIT_TRAINING });
    } catch (error) {
      alert("asdasd");
    }
  };
};

export const login = (user) => {
  const endpoint = `http://localhost:3001/login`;
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint, user);
      alert(response.data);
      return dispatch({ type: LOGIN });
    } catch (error) {
      alert("asdasd");
    }
  };
};