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
  GET_OFFER,
  EDIT_OFFER,
  CREATE_TRAINING,
  DELETE_TRAINING,
  EDIT_TRAINING,
  LOGIN,
  GET_CITY,
  GET_COUNTRIES,
  GET_STATE,
  GET_TRAINING,
} from "../Actions/Actions";

const initialState = {
  offers: [],
  offer: [],
  companies: [],
  users: [],
  currentAccount: {},
  admins: [],
  countries:[],
  states: [],
  cities: [],
  trainings: [],
  prefixes: []
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        currentAccount: action.payload
      };

    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case EDIT_USER:
      return {
        ...state,
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

    case GET_OFFER:
      return {
        ...state,
        offer: action.payload,
      };

    case EDIT_OFFER:
      return {
        ...state,
      };

    case CREATE_TRAINING:
      return {
        ...state,
        trainings: action.payload
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
        currentAccount: action.payload
      };

    case GET_COUNTRIES:
        return{
            ...state,
            countries: action.payload
        }  
    
    case GET_STATE:
        return{
            ...state,
            states: action.payload
        }
    case GET_CITY:
        return{
            ...state,
            cities: action.payload
        }
    case GET_TRAINING:
      return {
        ...state,
        trainings: action.payload
      } 

    case GET_CATEGORIES:
        return {
          ...state,
          categories: action.payload
        }  

    default:
      return { ...state };
  }
}
