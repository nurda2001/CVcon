import axios from 'axios';
import { setAlert } from './alert';

import { GET_CARS, CARS_ERROR, GET_CAR, CAR_ERROR } from './types';

export const getAllCars = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/cars/`);
    dispatch({
      type: GET_CARS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CARS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getCurrentCar = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/cars/${id}`);
    dispatch({
      type: GET_CARS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CARS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createCar = (formData, history, created) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('api/cars/create-car', formData);

    dispatch({
      type: GET_CARS,
      payload: res.data,
    });

    dispatch(setAlert(created ? 'Машина добавлена ' : 'Машина добавлена'));

    if (!created) {
      history.push('/dashboard');
    }
  } catch {}
};
