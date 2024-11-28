import { Box, CircularProgress } from '@mui/material';
import colors from 'assets/theme/base/colors';
import { useAuth } from 'context/auth/authContext';
import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const { dark } = colors

const ProtectedRoute = ({ component: Component, ...rest }) => {

    const { user } = useAuth()
    const history = useHistory()

    useEffect(() => {
        if (!user) {
            history.push("/authentication/sign-in")
        }
    }, [user])

    return (
        <Route
            {...rest}
            render={(props) =>
                user
                    ? (
                        <Component {...props} /> // Render the requested component if user is authenticated
                    ) : (
                        <Box sx={{ display: "flex", background: dark.body, alignItems: "center", justifyContent: "center", position: "fixed", zIndex: 30, top: 0, left: 0, width: "100%", height: "100%" }} >
                            <CircularProgress color={"info"} />
                        </Box>
                    )
            }
        />
    );
};

export default ProtectedRoute;
