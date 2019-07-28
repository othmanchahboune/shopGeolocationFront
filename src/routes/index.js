import React from 'react';
import { Route } from 'react-router-dom';
import App from '../components/app';
import RequireAuth from '../components/auth/require_auth';
import Signin from '../components/auth/signin';
import Signout from '../components/auth/signout';
import Signup from '../components/auth/signup';
import ShopsGeoSorted from '../components/shopListGeoSorted';
import ShopsPrefered from '../components/shopListPrefered';
import Welcome from '../components/welcome';

const Routes = () => {
    return (
        <App>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signout" component={Signout} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/geoSortedShops" component={RequireAuth(ShopsGeoSorted)} />
            <Route exact path="/preferedShops" component={RequireAuth(ShopsPrefered)} />
        </App>
    );
};

export default Routes;
