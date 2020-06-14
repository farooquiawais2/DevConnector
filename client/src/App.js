import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Landing from './components/layout/Landing';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import PrivateRoute from './components/routing/PrivateRoute';
import Alert from './components/layout/Alert';
import NotFound from './components/layout/NotFound';
// Redux
import store from './store';
import { Provider } from 'react-redux';
import { loadUser } from "./actions/auth";
import setAuthToken from './utils/setAuthToken';

import './App.css';
import Footer from './components/layout/Footer';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exect path='/' component={Landing} />
          <Navbar />
          <section className="container">
            <Alert />
            <Switch>
              <Route exect path='/register' component={Register} />
              <Route exect path='/login' component={Login} />
              <Route exect path='/profiles' component={Profiles} />
              <Route exect path='/profile/:id' component={Profile} />
              <PrivateRoute exect path='/dashboard' component={Dashboard} />
              <PrivateRoute exect path='/create-profile' component={CreateProfile} />
              <PrivateRoute exect path='/edit-profile' component={EditProfile} />
              <PrivateRoute exect path='/add-experience' component={AddExperience} />
              <PrivateRoute exect path='/add-education' component={AddEducation} />
              <PrivateRoute exect path='/posts' component={Posts} />
              <PrivateRoute exect path='/post/:id' component={Post} />
              <Route component={NotFound} />
            </Switch>
          </section>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};


export default App;
