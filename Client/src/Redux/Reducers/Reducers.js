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
  GET_OFFERS_BYNAME,
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
  USER_TRAINING,
  GET_TRAININGS_BY_VALUE,
  CLEAR_FREELANCERS,
  GET_Q_AND_A,
  GET_ALL_BLOGS,
  GET_BLOGS_BY_ID,
  FREELANCER_BY_NAME,
  TRAINING_BY_NAME,
  OFFERS_BY_NAME,
  ENABLE_SPEECH,
  enableSpeech,
} from "../Actions/Actions";

const initialState = {
  offers: [],
  offer: [],
  companies: [],
  companiesDelete: [],
  users: [],
  usersDelete: [],
  currentAccount: {},
  admins: [],
  adminsDeleted: [],
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
  userDetail: {},
  trainingsUser: [],
  trainingsApproved: [],
  trainingsDeclined: [],
  trainingsNoCheck: [],
  faqs: [],
  blogs: [],
  blog: [],
  enableSpeech: false,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        currentAccount: action.payload,
      };

    case GET_USERS:
      if (action.payload.type === "deleted") {
        return {
          ...state,
          usersDelete: action.payload.array,
        };
      } else if (action.payload.type === "online") {
        return {
          ...state,
          users: action.payload.array,
        };
      }

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
      if (action.payload.type === "deleted") {
        return {
          ...state,
          adminsDeleted: action.payload.array,
        };
      } else if (action.payload.type === "online") {
        return {
          ...state,
          admins: action.payload.array,
        };
      }

    case EDIT_ADMIN:
      return {
        ...state,
      };

    case GET_COMPANIES:
      if (action.payload.type === "deleted") {
        return {
          ...state,
          companiesDelete: action.payload.array,
        };
      } else if (action.payload.type === "online") {
        return {
          ...state,
          companies: action.payload.array,
        };
      }

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

    case GET_OFFERS_BYNAME:
      return {
        offer: action.payload,
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
        errors: {},
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
        offer: [],
        trainingsDetail: {},
      };

    case ADD_USER_TRAINING:
      return {
        ...state,
      };

    case USER_TRAINING:
      return {
        ...state,
        trainingsUser: action.payload,
      };
    case GET_TRAININGS_BY_VALUE:
      if (action.payload[0].approved === true) {
        return {
          ...state,
          trainingsApproved: action.payload,
        };
      } else if (action.payload[0].approved === false) {
        return {
          ...state,
          trainingsDeclined: action.payload,
        };
      } else {
        return {
          ...state,
          trainingsNoCheck: action.payload,
        };
      }

    case CLEAR_FREELANCERS:
      return {
        ...state,
        userDetail: {},
      };
    case GET_Q_AND_A:
      return {
        ...state,
        faqs: action.payload,
      };

    case FREELANCER_BY_NAME:
      return {
        ...state,
        freelancers: action.payload,
      };

    case TRAINING_BY_NAME:
      return {
        ...state,
        trainings: action.payload,
        trainingsFiltered: action.payload,
      };

    case OFFERS_BY_NAME:
      return {
        ...state,
        offers: action.payload,
      };

    case GET_ALL_BLOGS:
      return {
        ...state,
        blogs: action.payload,
      };

    case GET_BLOGS_BY_ID:
      return {
        ...state,
        blog: action.payload,
      };

    case ENABLE_SPEECH:
      return {
        ...state,
        enableSpeech: action.payload,
      };

    default:
      return { ...state };
  }
}
