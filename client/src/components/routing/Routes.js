import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from '../auth/Register';
import Login from '../auth/Login';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import PrivateRoute from '../routing/PrivateRoute';
import Alert from '../layout/Alert';
import NotFound from '../layout/NotFound';

export const Routes = () => {
    return (
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
    );
};
