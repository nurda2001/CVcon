import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class CarsCard extends React.Component {
  render() {
    return (
      <div className='posts'>
        <div className='post bg-white p-1 my-1'>
          <div>
            <Link to={`/cars/${this.props.car._id}`}>
              <img
                className='round-img'
                src='https://image.flaticon.com/icons/png/512/55/55204.png'
                alt=''
              />
              <h4>{this.props.car.carname}</h4>
              <p>{this.props.car.gov_number.toUpperCase()}</p>
            </Link>
          </div>
          <div>
            <p className='my-1'>{this.props.car.description}</p>
            <p className='post-date'>{this.props.car.date}</p>
            <button type='button' className='btn btn-light'>
              <span>{this.props.car.warnings.length} - </span>
              <i className='fas fa-exclamation'></i>
            </button>
            <Link
              to={`/cars/${this.props.car._id}`}
              className='btn btn-primary'
            >
              Просмотреть
            </Link>
            <Link
              to={`/car-change/${this.props.car._id}`}
              className='btn btn-primary'
            >
              Изменить
            </Link>
            <button type='button' className='btn btn-danger'>
              <i className='fas fa-times'></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CarsCard;
