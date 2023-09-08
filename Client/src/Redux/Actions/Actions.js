import axios from "axios";
import Swal from "sweetalert2";

export const CREATE_USER = "CREATE_USER";
export const GET_USERS = "GET_USERS";
export const EDIT_USER = "EDIT_USER";

export const GET_FREELANCERS = "GET_FREELANCERS";
export const GET_USER_BY_ID = "GET_USER_BY_ID";

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
export const ADDVIDEO = "ADDVIDEO";

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

export const IMAGECHANGE = "IMAGECHANGE"

// const serverURL = "https://caravanaserver.onrender.com";
const serverURL = "http://localhost:3001";

export const createUser = (user) => {
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = "http://localhost:3001/user/signup";

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/user/signup`;

  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint, user);
      const { data } = response;

      dispatch({
        type: CREATE_USER,
        payload: data,
      });
      Swal.fire({
        title: "Registro Completado!",
        text: "Bienvenido",
        icon: "success",
        customClass: {
          popup: "holahola",
          confirmButton: "bg-light-1",
        },
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
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = "http://localhost:3001/user/all";

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/user/all`;
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
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = `http://localhost:3001/user/freelancers`;

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/user/freelancers`;
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
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = `http://localhost:3001/user/update/${id}`;

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/user/update/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.patch(endpoint, user);
      const { data } = response;
      console.log(data);
      dispatch({
        type: EDIT_USER,
      });
      return data
    } catch (error) {
      console.log(error);
    }
  };
};

export const createAdmin = (admin) => {
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = "http://localhost:3001/admin/signup";

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/admin/signup`;
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
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = `http://localhost:3001/admin/update/${id}`;

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/admin/update/${id}`;
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
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = "http://localhost:3001/admin/all";

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/admin/all`;
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
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = `http://localhost:3001/company/all`;

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/company/all`;
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
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = "http://localhost:3001/company/signup";

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/company/signup`;

  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint, company);
      const { data } = response;

      dispatch({
        type: CREATE_COMPANY,
        payload: data,
      });
      Swal.fire({
        title: "Registro Completado!",
        text: "Bienvenido",
        icon: "success",
        customClass: {
          popup: "holahola",
        },
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
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = `http://localhost:3001/company/update/${id}`;

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/company/update/${id}`;
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
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = "http://localhost:3001/offers/";

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/offers/`;

  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint + localStorage.accId, offer);
      const { data } = response;
      Swal.fire({
        title: "Oferta Creada con exito!",

        icon: "success",
        customClass: {
          popup: "holahola",
        },
      });
      return dispatch({ type: CREATE_OFFER });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteOffer = (id) => {
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = `http://localhost:3001/offer/${id}`;

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/offer/${id}`;
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
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = `http://localhost:3001/offers/`;

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/offers/`;

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

  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = `http://localhost:3001/offers?country=${country}&companyName=${companyName}&category=${category}`;

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/offers?country=${country}&companyName=${companyName}&category=${category}`;
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
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = `http://localhost:3001/offer/${id}`;

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/offer/${id}`;
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
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = `http://localhost:3001/trainings`;

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/trainings`;
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
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = "http://localhost:3001/trainings/";

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/trainings/`;

  return async (dispatch) => {
    try {
      const response = await axios.post(
        endpoint + localStorage.accId,
        training
      );
      const { data } = response;

      dispatch({ type: CREATE_TRAINING, payload: data });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteTraining = (id) => {
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = `http://localhost:3001/trainings/delete${id}`;

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/trainings/delete${id}`;
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
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = `http://localhost:3001/trainings/update/${id}`;

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/trainings/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.patch(endpoint, training);
      const { data } = response;
      Swal.fire({
        title: "Capacitacion Anadida!",

        icon: "success",
        customClass: {
          popup: "",
        },
      });
      return dispatch({ type: EDIT_TRAINING });
    } catch (error) {
      console.log(error);
    }
  };
};

export const login = (user) => {
  // const endpoint = `http://localhost:3001/login`;

  const endpoint = `${serverURL}/login`;

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
      localStorage.setItem("profilePicture", data.acc.profilePicture);

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
      //---------- Endpoint to Dev server -- Descomentar para usar
      // const response = (await axios.get("http://localhost:3001/countries"))

      //---------- Endpoint to deployed server
      const response = (await axios.get(`${serverURL}/countries`)).data;
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
        const response =
          //---------- Endpoint to Dev server -- Descomentar para usar
          // await axios.get("http://localhost:3001/countries?name=" + value)

          //---------- Endpoint to deployed server
          (await axios.get(`${serverURL}/countries?name=` + value)).data;

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
      const response =
        //---------- Endpoint to Dev server -- Descomentar para usar
        // await axios.get("http://localhost:3001/countries?name=" + value)

        //---------- Endpoint to deployed server
        (await axios.get(`${serverURL}/countries?name=` + value)).data;
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
      //---------- Endpoint to Dev server -- Descomentar para usar
      // const response = (await axios.get("http://localhost:3001/rubro")).data;

      //---------- Endpoint to deployed server
      const response = (await axios.get(`${serverURL}/rubro`)).data;
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
          //---------- Endpoint to Dev server -- Descomentar para usar
          // `http://localhost:3001/filter?country=${country}&category=${category}`

          //---------- Endpoint to deployed server
          `${serverURL}/filter?country=${country}&category=${category}`
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

export function uploadVideo(video) {
  return async function (dispatch) {
    try {
      const response = axios.post(`${serverURL}/video/upVideo`, video).data;
    } catch (error) {
      console.log(error);
    }
  };
}

export function addVideo(link) {
  return async function (dispatch) {
    try {
      dispatch({ type: ADDVIDEO, payload: link });
    } catch (error) {
      console.log(error);
    }
  };
}

export function imageChange() {
  return async function (dispatch) {
    try {
      dispatch({ type:  IMAGECHANGE });
    } catch (error) {
      console.log(error);
    }
  };
}

export const getUserById = (id) => {
  return async function (dispatch) {
    try {
      const response = (await axios.get(`${serverURL}/user/`+id)).data;
      return dispatch({
        type: GET_USER_BY_ID,
        payload: response,
      });
    } catch (error) {
      console.log("cat", error.message);
    }
  };
};