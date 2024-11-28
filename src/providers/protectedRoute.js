import { useAuth } from 'context/auth/authContext';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const ProtectedRoute = ({ component: Component, ...rest }) => {

    const { user } = useAuth()

    return (
        <Route
            {...rest}
            render={(props) =>
                user
                    ? (
                        <Component {...props} /> // Render the requested component if user is authenticated
                    ) : (
                        <Redirect to="/authentication/sign-in" /> // Redirect to login page if not authenticated
                    )
            }
        />
    );
};

export default ProtectedRoute;
