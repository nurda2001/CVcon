import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Push from 'react-announcement';

const Warnings = (props) => {
  const message = props.warnings;
  const style = {
    color: 'red',
  };
  console.log(message);

  function sendMessage() {
    Axios.post(`/api/cars/message-to-mail/${props.carId}`)
      .then((response) => {
        return <h1>Отправлено!!!</h1>;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleClear() {
    Axios.post(`/api/cars/clear-warnings/${props.carId}`)
      .then((response) => {
        return <h1>Отправлено!!!</h1>;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className='repo bg-white p-1 my-1'>
      <div>
        <h4>
          <a href='#' target='_blank' rel='noopener noreferrer'>
            Предупреждения по данной машине
          </a>
        </h4>
        <ul>
          <li style={style}>{message}</li>
        </ul>
      </div>
      <div>
        <ul>
          <li onClick={sendMessage} className='badge badge-primary'>
            Отправить уведомление на почту
          </li>
          <li className='badge badge-dark'>Скинуть рассылку на whatsup</li>
          <li onClick={handleClear} className='badge badge-light'>
            Очистить
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Warnings;
