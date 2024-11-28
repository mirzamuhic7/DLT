import { useQuery } from "react-query";
import { apiClient } from "../apiClient";


const createCheckTokenFn = async (token) => {
    const response = await apiClient.get("/auth/check-token", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;  // Ensure response has the expected structure
};

export function useCheckToken(token) {

    return useQuery(
        ["checkToken", token],
        () => createCheckTokenFn(token),
        {
            enabled: !!token, // Only run if token exists
        }
    );
}


