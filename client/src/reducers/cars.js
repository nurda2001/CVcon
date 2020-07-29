import {
  CARS_ERROR,
  GET_CARS,
  CLEAR_CARS,
  GET_CAR,
  CAR_ERROR,
} from '../actions/types';

const initialState = {
  car: null,
  cars: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CARS:
      return {
        ...state,
        cars: payload,
        loading: false,
      };
    case CARS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_CARS:
      return {
        ...state,
        cars: [],
        loading: false,
      };
    case GET_CAR:
      return {
        ...state,
        car: payload,
        loading: false,
      };
    case CAR_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
