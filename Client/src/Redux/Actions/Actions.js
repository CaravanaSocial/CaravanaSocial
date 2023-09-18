import axios from "axios";
import Swal from "sweetalert2";

export const CREATE_USER = "CREATE_USER";
export const GET_USERS = "GET_USERS";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USERS = "DELETE_USERS";
export const RESTORE_USERS = "RESTORE_USERS";

export const GET_SUCCESCASES = "GET_SUCCESCASES";

export const GET_FREELANCERS = "GET_FREELANCERS";
export const GET_USER_BY_ID = "GET_USER_BY_ID";

export const CREATE_ADMIN = "CREATE_ADMIN";
export const GET_ADMINS = "GET_ADMINS";
export const EDIT_ADMIN = "EDIT_ADMIN";
export const DELETE_ADMINS = "DELETE_ADMINS";
export const RESTORE_ADMINS = "RESTORE_ADMINS";

export const GET_COMPANIES = "GET_COMPANIES";
export const CREATE_COMPANY = "CREATE_COMPANY";
export const EDIT_COMPANY = "EDIT_COMPANY";
export const RESTORE_COMPANIES = "RESTORE_COMPANIES";
export const DELETE_COMPANIES = "DELETE_COMPANIES";
export const GET_COMPANY_BY_ID = "GET_COMPANY_BY_ID";

export const CREATE_OFFER = "CREATE_OFFER";
export const DELETE_OFFER = "DELETE_OFFER";
export const GET_OFFERS = "GET_OFFERS";
export const GET_OFFERS_BYNAME = "GET_OFFERS_BYNAME";
export const EDIT_OFFER = "EDIT_OFFER";
export const FILTER_OFFER = "FILTER_OFFER";

export const CREATE_TRAINING = "CREATE_TRAINING";
export const DELETE_TRAINING = "DELETE_TRAINING";
export const EDIT_TRAINING = "EDIT_TRAINING";
export const GET_TRAININGS = "GET_TRAININGS";
export const GET_TRAININGS_BY_VALUE = "GET_TRAININGS_BY_VALUE";
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

export const IMAGECHANGE = "IMAGECHANGE";

export const TRAINING_DETAIL = "TRAINING_DETAIL";

export const COMMENTS_POST = "COMMENTS_POST";

export const COMPANY_DETAIL = "COMPANY_DETAIL";

export const CLEAR_VIDEOS = "CLEAR_VIDEOS";

export const ADD_USER_TRAINING = "ADD_USER_TRAINING";

export const USER_TRAINING = "USER_TRAINING";

export const CLEAR_FREELANCERS = "CLEAR_FREELANCERS";
export const GET_Q_AND_A = "GET_Q_AND_A";
export const DELETE_Q_AND_A = "DELETE_Q_AND_A";

export const POST_BLOG = "POST_BLOG";
export const GET_ALL_BLOGS = "GET_ALL_BLOGS";
export const GET_BLOGS_BY_ID = "GET_BLOGS_BY_ID";

export const FREELANCER_BY_NAME = "FREELANCER_BY_NAME";
export const TRAINING_BY_NAME = "TRAINING_BY_NAME";
export const OFFERS_BY_NAME = "OFFERS_BY_NAME";
export const ENABLE_SPEECH = "ENABLE_SPEECH";

const serverURL = "https://caravanaserver.onrender.com";
// const serverURL = "http://localhost:3001";

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
        text: `Hemos enviado un correo electronico a ${user.email} para confirmar su registro`,
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
        payload: { type: CREATE_USER, payload: error?.response?.data },
      });
      return error;
    }
  };
};

export const getUsers = (value) => {
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = "http://localhost:3001/user/all";

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/user/all?value=${value}`;
  return async (dispatch) => {
    try {
      const response = await axios(endpoint);
      const { data } = response;
      return dispatch({
        type: GET_USERS,
        payload:
          value === "deleted"
            ? { type: "deleted", array: data }
            : { type: "online", array: data },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUsers = (id) => {
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = "http://localhost:3001/user/all";

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/user/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.delete(endpoint);
      const { data } = response;
      return dispatch({
        type: DELETE_USERS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const restoreUsers = (id) => {
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = "http://localhost:3001/user/all";

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/user/restore/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint);
      const { data } = response;
      return dispatch({
        type: RESTORE_USERS,
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
      dispatch({
        type: EDIT_USER,
      });
      return false;
    } catch (error) {
      return error;
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
      dispatch({
        type: ERRORS,
        payload: { type: CREATE_ADMIN, payload: error.response.data },
      });
      return error;
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
      return data;
    } catch (error) {
      return error;
    }
  };
};

export const getAdmins = (value) => {
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = "http://localhost:3001/admin/all";

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/admin/all?value=${value}`;
  return async (dispatch) => {
    try {
      const response = await axios(endpoint);
      const { data } = response;
      return dispatch({
        type: GET_ADMINS,
        payload:
          value === "deleted"
            ? { type: "deleted", array: data }
            : { type: "online", array: data },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deletedAdmins = (id) => {
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = "http://localhost:3001/admin/all";

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/admin/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.delete(endpoint);
      const { data } = response;
      return dispatch({
        type: DELETE_ADMINS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const restoreAdmins = (id) => {
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = "http://localhost:3001/admin/all";

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/admin/restore/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint);
      const { data } = response;
      return dispatch({
        type: RESTORE_ADMINS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCompanies = (value) => {
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = `http://localhost:3001/company/all`;

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/company/all?value=${value}`;
  return async (dispatch) => {
    try {
      const response = await axios(endpoint);
      const { data } = response;

      return dispatch({
        type: GET_COMPANIES,
        payload:
          value === "deleted"
            ? { type: "deleted", array: data }
            : { type: "online", array: data },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCompanies = (id) => {
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = `http://localhost:3001/company/all`;

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/company/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.delete(endpoint);
      const { data } = response;

      return dispatch({ type: DELETE_COMPANIES, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const restoreCompanies = (id) => {
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = `http://localhost:3001/company/all`;

  //---------- Endpoint to deployed server
  const endpoint = `${serverURL}/company/restore/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint);
      const { data } = response;

      return dispatch({ type: RESTORE_COMPANIES, payload: data });
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
        text: `Hemos enviado un correo electronico a ${company.email} para confirmar su registro`,
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
        payload: { type: CREATE_COMPANY, payload: error?.response?.data },
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

export const getOfferByName = (name) => {
  const endpoint = `${serverURL}/offers/${name}`;

  return async (dispatch) => {
    try {
      const response = await axios(endpoint);
      const { data } = response;
      return dispatch({ type: GET_OFFERS_BYNAME, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOffers = () => {
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
      console.log("No existen Capacitaciones en la base de datos.", error);
    }
  };
};

export const getTrainingsByValue = (value) => {
  //---------- Endpoint to Dev server -- Descomentar para usar
  // const endpoint = `http://localhost:3001/trainings`;

  //---------- Endpoint to deployed server

  const endpoint = `${serverURL}/trainings/?option=${value}`;
  return async (dispatch) => {
    try {
      const response = await axios.get(endpoint);
      const { data } = response;

      return dispatch({ type: GET_TRAININGS_BY_VALUE, payload: data });
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

export const acceptTraining = (id, answer) => {
  const endpoint = `${serverURL}/trainings/admin/${id}`;
  return async function (dispatch) {
    try {
      const response = await axios.patch(endpoint, answer);
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

export function detailCompany(id) {
  return async function (dispatch) {
    try {
      const response = (await axios.get(`${serverURL}/company/${id}`)).data;

      return dispatch({
        type: COMPANY_DETAIL,
        payload: response,
      });
    } catch (error) {
      return error;
    }
  };
}

export const getSuccesCases = () => {
  //---------- Endpoint to Dev server -- Descomentar para usar
  const endpoint = "http://localhost:3001/user/all";

  //---------- Endpoint to deployed server
  // const endpoint = `${serverURL}/success`;
  return async (dispatch) => {
    try {
      const response = await axios(endpoint);
      const { data } = response;
      return dispatch({
        type: GET_SUCCESCASES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function imageChange() {
  return async function (dispatch) {
    try {
      dispatch({ type: IMAGECHANGE });
    } catch (error) {
      console.log(error);
    }
  };
}

export function trainingDetail(id) {
  return async function (dispatch) {
    const endpoint = `${serverURL}/trainings/${id}`;
    try {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: TRAINING_DETAIL,
        payload: data[0],
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function createComment(id, comment) {
  return async function (dispatch) {
    const endpoint = `${serverURL}/comments/create/${id}`;
    try {
      const { data } = await axios.post(endpoint, comment);
      dispatch({
        type: COMMENTS_POST,
        payload: data,
      });
    } catch (error) {}
  };
}

export const getUserById = (id) => {
  return async function (dispatch) {
    try {
      const response = (await axios.get(`${serverURL}/user/` + id)).data;
      return dispatch({
        type: GET_USER_BY_ID,
        payload: response,
      });
    } catch (error) {
      console.log("cat", error.message);
    }
  };
};

export const clearVideos = () => {
  return async function (dispatch) {
    return dispatch({
      type: CLEAR_VIDEOS,
    });
  };
};

export const adduser = (idObject) => {
  return async function (dispatch) {
    try {
      const response = (
        await axios.post(`${serverURL}/user-training/adduser`, idObject)
      ).data;
      return dispatch({
        type: ADD_USER_TRAINING,
        payload: response,
      });
    } catch (error) {
      console.log("cat", error.message);
    }
  };
};

export const getTrainingsUser = (id) => {
  return async function (dispatch) {
    try {
      const response = (
        await axios.get(`${serverURL}/user-training/trainingsByUser/` + id)
      ).data;
      return dispatch({
        type: USER_TRAINING,
        payload: response,
      });
    } catch (error) {
      console.log("cat", error.message);
    }
  };
};

export const clearFreelancers = () => {
  return function (dispatch) {
    return dispatch({
      type: CLEAR_FREELANCERS,
    });
  };
};

export const createQAndA = (input) => {
  return async function (dispatch) {
    try {
      const response = (await axios.post(`${serverURL}/question/create`, input))
        .data;
    } catch (error) {
      console.log("cat", error.message);
    }
  };
};

export const getQAndAs = () => {
  return async function (dispatch) {
    try {
      const response = (await axios.get(`${serverURL}/question`)).data;
      dispatch({
        type: GET_Q_AND_A,
        payload: response,
      });
    } catch (error) {
      console.log("cat", error.message);
    }
  };
};

export const updateQAndA = (id, input) => {
  return async function (dispatch) {
    try {
      const response = (
        await axios.patch(`${serverURL}/question/update/${id}`, input)
      ).data;
    } catch (error) {
      console.log("cat", error.message);
    }
  };
};

export const deleteQAndA = (id) => {
  return async function (dispatch) {
    try {
      const response = (
        await axios.delete(`${serverURL}/question/delete/${id}`)
      ).data;
    } catch (error) {
      console.log("cat", error.message);
    }
  };
};

export const postBlog = (info) => {
  return async function (dispatch) {
    try {
      await axios.post(`${serverURL}/blogs/create`, info);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllBlogs = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${serverURL}/blogs/all`);
      dispatch({
        type: GET_ALL_BLOGS,
        payload: data,
      });
    } catch (error) {}
  };
};

export const getBlogsByID = (id) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${serverURL}/blogs/${id}`);
      dispatch({
        type: GET_BLOGS_BY_ID,
        payload: data,
      });
    } catch (error) {}
  };
};
export const searchFreelancersByName = (name) => {
  return async function (dispatch) {
    try {
      const response = (await axios.get(`${serverURL}/user/?name=${name}`))
        .data;
      return dispatch({
        type: FREELANCER_BY_NAME,
        payload: response,
      });
    } catch (error) {
      console.log("searchFreelancersByName", error.message);
    }
  };
};

export const searchTrainingByName = (name) => {
  return async function (dispatch) {
    try {
      const response = (await axios.get(`${serverURL}/trainings/?name=${name}`))
        .data;

      return dispatch({
        type: TRAINING_BY_NAME,
        payload: response,
      });
    } catch (error) {
      console.log("searchTrainingByName", error.message);
    }
  };
};

export const searchOffersByName = (name) => {
  return async function (dispatch) {
    try {
      const response = (await axios.get(`${serverURL}/offers/by?name=${name}`))
        .data;

      return dispatch({
        type: OFFERS_BY_NAME,
        payload: response,
      });
    } catch (error) {
      console.log("searchOffersByName", error.message);
    }
  };
};

export const emailVerify = (email, code) => {
  return async function (dispatch) {
    try {
      const verifyEmail = (
        await axios.get(`${serverURL}/email/?email=${email}&code=${code}`)
      ).data;
      return verifyEmail;
    } catch (error) {
      return error;
    }
  };
};

export const enableSpeech = (boolean) => {
  return async function (dispatch) {
    return dispatch({
      type: ENABLE_SPEECH,
      payload: boolean,
    });
  };
};
