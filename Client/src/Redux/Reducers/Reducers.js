import {
  CREATE_USER,
  GET_USERS,
  EDIT_USER,
  CREATE_ADMIN,
  GET_ADMINS,
  EDIT_ADMIN,
  GET_COMPANIES,
  CREATE_COMPANY,
  EDIT_COMPANY,
  CREATE_OFFER,
  DELETE_OFFER,
  GET_OFFERS,
  EDIT_OFFER,
  CREATE_TRAINING,
  DELETE_TRAINING,
  EDIT_TRAINING,
  LOGIN,
  LOGOUT,
  GET_CITY,
  GET_COUNTRIES,
  GET_STATE,
  GET_TRAININGS,
  GET_CATEGORIES,
  ERRORS,
  CLEAR_ERRORS,
  FILTER_OFFER,
  COMPANY_BUTTONS,
  TRAINING_FILTER,
  GET_FREELANCERS,
  ADDVIDEO,
  IMAGECHANGE,
  TRAINING_DETAIL,
  COMMENTS_POST,
  COMPANY_DETAIL,
  GET_SUCCESCASES,
  GET_USER_BY_ID,
  CLEAR_VIDEOS,
  ADD_USER_TRAINING,
  USER_TRAINING
} from "../Actions/Actions";

const initialState = {
  offers: [],
  offer: [],
  companies: [],
  users: [],
  currentAccount: {},
  admins: [],
  countries: [],
  states: [],
  cities: [],
  trainings: [],
  training: [],
  prefixes: [],
  errors: {},
  buttonsBool: false,
  trainingsFiltered: [],
  categories: [],
  freelancers: [],
  video: [],
  imageChange: false,
  trainingsDetail: {},
  comments: [],
  companyDetail: {},
  successCases: [],
  imageChange: false,
  userDetail: {},
  trainingsUser: []
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        currentAccount: action.payload,
      };

    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case GET_SUCCESCASES:
      return {
        ...state,
        successCases: action.payload,
      };

    case EDIT_USER:
      return {
        ...state,
      };

    case GET_FREELANCERS:
      return {
        ...state,
        freelancers: action.payload,
      };

    case CREATE_ADMIN:
      return {
        ...state,
      };

    case GET_ADMINS:
      return {
        ...state,
        admins: action.payload,
      };

    case EDIT_ADMIN:
      return {
        ...state,
      };

    case GET_COMPANIES:
      return {
        ...state,
        companies: action.payload,
      };

    case CREATE_COMPANY:
      return {
        ...state,
        currentAccount: action.payload,
      };

    case EDIT_COMPANY:
      return {
        ...state,
      };

    case CREATE_OFFER:
      return {
        ...state,
      };

    case DELETE_OFFER:
      return {
        ...state,
      };

    case GET_OFFERS:
      return {
        ...state,
        offers: action.payload,
      };

    case EDIT_OFFER:
      return {
        ...state,
      };

    case FILTER_OFFER:
      return {
        ...state,
        offers: action.payload,
      };

    case CREATE_TRAINING:
      return {
        ...state,
      };
    case GET_TRAININGS:
      return {
        ...state,
        trainings: action.payload,
        trainingsFiltered: action.payload,
      };

    case DELETE_TRAINING:
      return {
        ...state,
      };

    case EDIT_TRAINING:
      return {
        ...state,
      };

    case LOGIN:
      return {
        ...state,
        currentAccount: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        currentAccount: {},
      };

    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };

    case GET_STATE:
      return {
        ...state,
        states: action.payload,
      };
    case GET_CITY:
      return {
        ...state,
        cities: action.payload,
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case ERRORS:
      const errObj = action.payload;
      return {
        ...state,
        errors: { ...state.errors, [errObj.type]: errObj.error },
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: {},
      };
    case COMPANY_BUTTONS:
      return {
        ...state,
        buttonsBool: action.payload,
      };

    case TRAINING_FILTER:
      return {
        ...state,
        trainingsFiltered: action.payload,
      };

    case ADDVIDEO:
      let arr = [...state.video, action.payload];
      return {
        ...state,
        video: arr,
      };

    case IMAGECHANGE:
      const goku = state.imageChange === true ? false : true;
      return {
        ...state,
        imageChange: goku,
      };
    case TRAINING_DETAIL:
      return {
        ...state,
        trainingsDetail: action.payload,
      };

    case COMMENTS_POST:
      return {
        ...state,
        comments: action.payload,
      };

    case GET_USER_BY_ID:
      return {
        ...state,
        userDetail: action.payload,
      };

    case COMPANY_DETAIL:
      return {
        ...state,
        companyDetail: action.payload,
      };

    case CLEAR_VIDEOS:
      return {
        ...state,
        video: [],
      };

    case ADD_USER_TRAINING:
      return {
        ...state,
      };

    case USER_TRAINING:
      return {
        ...state,
        trainingsUser: action.payload
      }

    default:
      return { ...state };
  }
}
