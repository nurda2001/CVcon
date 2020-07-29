import React, { useState, useEffect } from 'react';
import CarsCard from './CarsCard';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllCars } from '../../actions/cars';

const EditAuto = ({ getAllCars, cars: { cars, loading } }) => {
  const [formCars, setFormCars] = useState({
    cars: [],
  });

  useEffect(() => {
    getAllCars();
    setFormCars({
      cars: cars,
    });
    console.log(cars);
  }, [loading]);

  return (
    <React.Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Машины</h1>{' '}
        {cars.map((car) => {
          return <CarsCard car={car} key={car._id} />;
        })}
      </section>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  cars: state.cars,
});

export default connect(mapStateToProps, { getAllCars })(withRouter(EditAuto));
