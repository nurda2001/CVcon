import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import EditAuto from './components/profile-forms/EditAuto';
import AutoCheck from './components/profile-forms/AutoCheck';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Alert from './components/layout/Alert';
import CreateCar from './components/profile-forms/CreateCar';
import EditCar from './components/profile-forms/EditCar';
import Push from 'react-announcement';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { getAllCars } from './actions/cars';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const [cars, setCars] = useState();
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getAllCars());
  }, []);

  // const renderCars = (routerProps) => {
  //   let carId = routerProps.match.params.carsId;
  //   let foundCar = cars.find((car) => car._id === carId);
  //   return foundCar ? <AutoCheck car={foundCar} /> : 'null';
  // };

  // const renderCars2 = (routerProps) => {
  //   let carId = routerProps.match.params.carsId;
  //   let foundCar = cars.find((car) => car._id === carId);
  //   return foundCar ? <EditCar car={foundCar} /> : 'null';
  // };

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Push
            title='Here is your component'
            subtitle='The best announcement component for React is finally here. Install it in all your projects.'
            daysToLive={3}
            secondsBeforeBannerShows={1}
            closeIconSize={30}
          />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/create-car' component={CreateCar} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <Route exact path='/car-change/:carsId' component={EditCar} />
              <Route
                exact
                path='/cars'
                render={() => <EditAuto cars={cars} />}
                cars={cars}
              />
              <Route exact path='/cars/:carsId' component={AutoCheck} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
