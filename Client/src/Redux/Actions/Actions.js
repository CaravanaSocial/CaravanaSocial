import axios from "axios";

export const CREATE_USER = "CREATE_USER";
export const GET_USERS = "GET_USERS";
export const EDIT_USER = "EDIT_USER";

export const GET_FREELANCERS = "GET_FREELANCERS";

export const CREATE_ADMIN = "CREATE_ADMIN";
export const GET_ADMINS = "GET_ADMINS";
export const EDIT_ADMIN = "EDIT_ADMIN";

export const GET_COMPANIES = "GET_COMPANIES";
export const CREATE_COMPANY = "CREATE_COMPANY";
export const EDIT_COMPANY = "EDIT_COMPANY";

export const CREATE_OFFER = "CREATE_OFFER";
export const DELETE_OFFER = "DELETE_OFFER";
export const GET_OFFERS = "GET_OFFERS";
export const EDIT_OFFER = "EDIT_OFFER";
export const FILTER_OFFER = "FILTER_OFFER";

export const CREATE_TRAINING = "CREATE_TRAINING";
export const DELETE_TRAINING = "DELETE_TRAINING";
export const EDIT_TRAINING = "EDIT_TRAINING";
export const GET_TRAININGS = "GET_TRAININGS";

export const GET_LOCATION = "GET_LOCATION";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const ERRORS = "ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_STATE = "GET_STATE";
export const GET_CITY = "GET_CITY";

export const GET_CATEGORIES = "GET_CATEGORIES";

export const COMPANY_BUTTONS = "COMPANY_BUTTONS";

export const TRAINING_FILTER = "TRAINING_FILTER";

export const createUser = (user) => {
  const endpoint = "http://localhost:3001/user/signup";
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint, user);
      const { data } = response;

      dispatch({
        type: CREATE_USER,
        payload: data,
      });
      return false;
    } catch (error) {
      dispatch({
        type: ERRORS,
        payload: { type: CREATE_USER, payload: error.response.data },
      });
      return error;
    }
  };
};

export const getUsers = () => {
  const endpoint = "http://localhost:3001/user/all";
  return async (dispatch) => {
    try {
      const response = await axios(endpoint);
      const { data } = response;
      return dispatch({
        type: GET_USERS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getFreelancers = () => {
  const endpoint = `http://localhost:3001/user/freelancers`;
  return async (dispatch) => {
    try {
      const response = await axios(endpoint);
      const { data } = response;

      return dispatch({ type: GET_FREELANCERS, payload: data });
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
      const { data } = response;
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
      const { data } = response;
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
      const { data } = response;
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
      const { data } = response;
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
      const { data } = response;
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
      const { data } = response;

      dispatch({
        type: CREATE_COMPANY,
        payload: data,
      });
      return false;
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: ERRORS,
        payload: { type: CREATE_COMPANY, payload: error.response.data },
      });
      return error;
    }
  };
};

export const editCompany = (id, company) => {
  const endpoint = `http://localhost:3001/company/update/${id}`;
  return async (dispatch) => {
    try {
      const headers = { "Content-Type": "application/json" };
      const response = await axios.patch(endpoint, company, { headers });
      const { data } = response;

      dispatch({
        type: EDIT_COMPANY,
      });
      return false;
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: ERRORS,
        payload: { type: EDIT_COMPANY, payload: error.response.data },
      });
      return error;
    }
  };
};

export const createOffer = (offer) => {
  const endpoint = "http://localhost:3001/offers/";
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint + localStorage.accId, offer);
      const { data } = response;
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
      const { data } = response;
      return dispatch({ type: DELETE_OFFER });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOffers = () => {
  const endpoint = `http://localhost:3001/offers/`;
  return async (dispatch) => {
    try {
      const response = await axios(endpoint);
      const { data } = response;
      return dispatch({ type: GET_OFFERS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const filterOffer = (data) => {
  const { country, companyName, category } = data;
  const endpoint = `http://localhost:3001/offers?country=${country}&companyName=${companyName}&category=${category}`;
  return async (dispatch) => {
    try {
      const response = await axios(endpoint);
      const { data } = response;
      return dispatch({ type: FILTER_OFFER, payload: data });
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
      const { data } = response;
      return dispatch({ type: EDIT_OFFER });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTrainings = () => {
  const endpoint = `http://localhost:3001/trainings`;
  return async (dispatch) => {
    try {
      const response = await axios(endpoint);
      const { data } = response;

      return dispatch({ type: GET_TRAININGS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createTraining = (training) => {
  const endpoint = "http://localhost:3001/trainings/";

  return async (dispatch) => {
    try {
      const response = await axios.post(
        endpoint + localStorage.accId,
        training
      );
      const { data } = response;

      return dispatch({ type: CREATE_TRAINING, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteTraining = (id) => {
  const endpoint = `http://localhost:3001/trainings/delete${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.delete(endpoint);
      const { data } = response;
      return dispatch({ type: DELETE_OFFER });
    } catch (error) {
      console.log(error);
    }
  };
};

export const editTraining = (id, training) => {
  const endpoint = `http://localhost:3001/trainings/update/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.patch(endpoint, training);
      const { data } = response;
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
      const { data } = response;
      const account = JSON.stringify(data.acc);
      localStorage.setItem("account", account);
      localStorage.setItem("authorization", data.token);
      localStorage.setItem("accName", data.acc.name);
      localStorage.setItem("accId", data.acc.id);
      localStorage.setItem("type", data.type);

      dispatch({ type: LOGIN, payload: data });
      return false;
    } catch (error) {
      dispatch({
        type: ERRORS,
        payload: { type: LOGIN, error: error.response.data },
      });
      return error;
    }
  };
};

export const logOut = () => {
  localStorage.clear();
  return (dispatch) => {
    dispatch({ type: LOGOUT });
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

export const getCategories = () => {
  return async function (dispatch) {
    try {
      const response = (await axios.get("http://localhost:3001/rubro")).data;
      return dispatch({
        type: GET_CATEGORIES,
        payload: response,
      });
    } catch (error) {
      console.log("cat", error.message);
    }
  };
};

export function setNewErrors(obj) {
  return async function (dispatch) {
    dispatch({
      type: ERRORS,
      payload: obj,
    });
  };
}

export function clearErrors() {
  return async function (dispatch) {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };
}

export function companyButtons(boolean) {
  return async function (dispatch) {
    dispatch({
      type: COMPANY_BUTTONS,
      payload: boolean,
    });
  };
}

export function filterTrainingBy(data) {
  return async function (dispatch) {
    const { country, category } = data;
    try {
      const response = (
        await axios.get(
          `http://localhost:3001/filter?country=${country}&category=${category}`
        )
      ).data;

      dispatch({
        payload: response,
        type: TRAINING_FILTER,
      });
    } catch (error) {
      console.log("Error con el filtro", error.message);
    }
  };
}
