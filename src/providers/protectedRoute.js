import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from "context/auth/authContext"; // Assuming this is your custom hook for auth context

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user } = useAuth();  // Get user from auth context

    return (
        <Route
            {...rest}
            render={(props) =>
                user ? (
                    <Component {...props} /> // Render the requested component if user is authenticated
                ) : (
                    <Redirect to="/authentication/sign-in" /> // Redirect to login page if not authenticated
                )
            }
        />
    );
};

export default ProtectedRoute;
