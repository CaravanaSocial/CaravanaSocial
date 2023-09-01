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
export const GET_TRAINING = "GET_TRAINING";

export const GET_LOCATION = "GET_LOCATION";

export const LOGIN = "LOGIN";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_STATE = "GET_STATE";
export const GET_CITY = "GET_CITY";

export const createUser = (user) => {
  const endpoint = "http://localhost:3001/user/signup";
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint, user);
      const { data } = response
      localStorage.setItem("authorization", data.token)
      return dispatch({
        type: CREATE_USER,
        payload: data
      });
    } catch (error) {
      console.log();(error.data.error);
    }
  };
};

export const getUsers = () => {
  const endpoint = "http://localhost:3001/user/all";
  return async (dispatch) => {
    try {
      const response = await axios(endpoint);
      const { data } = response
      return dispatch({
        type: CREATE_USER,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const editUser = (id, user) => {
  const endpoint = `http://localhost:3001/user/update/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.patch(endpoint, user);
      const { data } = response
      return dispatch({
        type: EDIT_USER,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createAdmin = (admin) => {
  const endpoint = "http://localhost:3001/admin/signup";
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint, admin);
      const { data } = response
      return dispatch({
        type: CREATE_ADMIN,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const editAdmin = (id, admin) => {
  const endpoint = `http://localhost:3001/admin/update/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.patch(endpoint, admin);
      const { data } = response
      return dispatch({
        type: EDIT_ADMIN,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAdmins = () => {
  const endpoint = "http://localhost:3001/admin/all";
  return async (dispatch) => {
    try {
      const response = await axios(endpoint);
      const { data } = response
      return dispatch({
        type: GET_ADMINS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCompanies = () => {
  const endpoint = `http://localhost:3001/company/all`;
  return async (dispatch) => {
    try {
      const response = await axios(endpoint);
      const { data } = response
      return dispatch({ type: GET_COMPANIES, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createCompany = (company) => {
  const endpoint = "http://localhost:3001/company/signup";
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint, company);
      const { data } = response
      return dispatch({ type: CREATE_COMPANY });
    } catch (error) {
      console.log(error);
    }
  };
};

export const editCompany = (id, company) => {
  const endpoint = `http://localhost:3001/company/update/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.patch(endpoint, company);
      const { data } = response
      return dispatch({ type: EDIT_COMPANY });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createOffer = (offer) => {
  const endpoint = "http://localhost:3001/offer";
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint, offer);
      const { data } = response
      return dispatch({ type: CREATE_OFFER });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteOffer = (id) => {
  const endpoint = `http://localhost:3001/offer/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.delete(endpoint);
      const { data } = response
      return dispatch({ type: DELETE_OFFER });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOffer = (id) => {
  const endpoint = `http://localhost:3001/offer/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios(endpoint);
      const { data } = response
      return dispatch({ type: GET_OFFER, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const editOffer = (id) => {
  const endpoint = `http://localhost:3001/offer/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.patch(endpoint);
      const { data } = response
      return dispatch({ type: EDIT_OFFER });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTraining = () => {
  const endpoint = `http://localhost:3001/training`;
  return async (dispatch) => {
    try {
      const response = await axios(endpoint);
      const { data } = response
      return dispatch({ type: GET_TRAINING, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createTraining = (training) => {
  const endpoint = "http://localhost:3001/training/create";
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint, training);
      const { data } = response
      return dispatch({ type: CREATE_TRAINING, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteTraining = (id) => {
  const endpoint = `http://localhost:3001/training/delete${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.delete(endpoint);
      const { data } = response
      return dispatch({ type: DELETE_OFFER });
    } catch (error) {
      console.log(error);
    }
  };
};

export const editTraining = (id, training) => {
  const endpoint = `http://localhost:3001/training/update/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.patch(endpoint, training);
      const { data } = response
      return dispatch({ type: EDIT_TRAINING });
    } catch (error) {
      console.log(error);
    }
  };
};

export const login = (user) => {
  const endpoint = `http://localhost:3001/login`;
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint, user);
      const { data } = response
      return dispatch({ type: LOGIN, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCountry = () => {
  return async function (dispatch) {
    try {
      const response = (await axios.get("http://localhost:3001/countries"))
        .data;
      return dispatch({
        type: GET_COUNTRIES,
        payload: response,
      });
    } catch (error) {
      console.log("get countries", error.message);
    }
  };
};

export const getState = (value) => {
  return async function (dispatch) {
    try {
      if (value !== "default") {
        const response = (
          await axios.get("http://localhost:3001/countries?name=" + value)
        ).data;

        return dispatch({
          type: GET_STATE,
          payload: response,
        });
      }
    } catch (error) {
      console.log("get state", error.message);
    }
  };
};

export const getCity = (value) => {
  return async function (dispatch) {
    try {
      const response = (
        await axios.get("http://localhost:3001/countries?name=" + value)
      ).data;
      return dispatch({
        type: GET_CITY,
        payload: response,
      });
    } catch (error) {
      console.log("get city", error.message);
    }
  };
};
