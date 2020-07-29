import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createCar } from '../../actions/profile';

const CreateCar = ({ createCar, history }) => {
  const [formData, setFormData] = useState({
    carname: '',
    driver: '',
    phone_number: '',
    distance: '',
    description: '',
    type_of_car: '',
    city: '',
    gov_number: '',
    mail: '',
  });

  const {
    carname,
    driver,
    phone_number,
    distance,
    description,
    type_of_car,
    city,
    gov_number,
    mail,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createCar(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Добавление машины</h1>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <option value='0'>* Выберите тип транспорта</option>
          <select
            name='type_of_car'
            value={type_of_car}
            onChange={(e) => onChange(e)}
          >
            <option value='Машина'>Машина</option>
            <option value='Легковой Автомобиль'>Легковой Автомобиль</option>
            <option value='Автобус'>Автобус</option>
            <option value='Вездеход'>Вездеход</option>
            <option value='Грузовой Транспорт'>Грузовой Транспорт</option>
            <option value='Прицеп'>Прицеп</option>
          </select>
          <small className='form-text'>Детали Транспорта</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Название Машины'
            name='carname'
            value={carname}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Полное название машины(марка, серия)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Водитель'
            name='driver'
            value={driver}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Ф.И.О</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Город'
            name='city'
            value={city}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Почта'
            name='mail'
            value={mail}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Пробег?'
            name='distance'
            value={distance}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Номер Телефона в формате 7707'
            name='phone_number'
            value={phone_number}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>7(707)XXX XX-XX</small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='Краткое описание'
            name='description'
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className='form-text'>Заметки об транспорте</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Гос.Номера'
            name='gov_number'
            value={gov_number}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>111XXX01</small>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

export default connect(null, { createCar })(withRouter(CreateCar));
