import React from 'react';
import { Link } from 'react-router-dom';

const DashboardAction = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary'></i> Edit Profile
      </Link>
      <Link to='/cars' className='btn btn-light'>
        <i className='fas fa-car text-primary'></i> Checking the Auto
      </Link>
      <Link to='/create-car' className='btn btn-light'>
        <i className='fas fa-plus-square'></i> Добавить Машину
      </Link>
    </div>
  );
};

export default DashboardAction;
