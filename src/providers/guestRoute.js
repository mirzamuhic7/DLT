import { useAuth } from 'context/auth/authContext';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';



const GuestRoute = ({ component: Component, ...rest }) => {
    const { user } = useAuth();  // Get the current authenticated user

    return (
        <Route
            {...rest}
            render={(props) =>
                !user ? (
                    <Component {...props} /> // Render the requested component if user is not authenticated
                ) : (
                    <Redirect to="/dashboard" /> // Redirect authenticated users to the dashboard or home page
                )
            }
        />
    );
};

export default GuestRoute;
