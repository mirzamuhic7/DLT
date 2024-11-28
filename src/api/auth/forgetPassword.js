import { useMutation } from "react-query";
import { showSnackBar, useVisionUIController } from "../../context";
import { apiClient } from "../apiClient";
import { useHistory } from "react-router-dom";

const createForgetPasswordFn = async (email) => {
    const response = await apiClient.post("/auth/forgot-password", { email });
    return response.data;
};

export function useForgetPassword() {
    const [, dispatch] = useVisionUIController(); // Get dispatch from context
    const history = useHistory();

    return useMutation({
        mutationFn: createForgetPasswordFn,
        onSuccess: (data) => {
            showSnackBar(dispatch, data.message || "Check your email for password reset instructions.", "success");
            return true
        },
        onError: (err, credentials, context) => {
            // Trigger error Snackbar
            showSnackBar(dispatch, err.response?.data?.message || "An error occurred!", "error");
        },
    });
}

