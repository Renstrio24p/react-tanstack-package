import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { HTTP_RESPONSES } from "~/lib/constants";
import { httpClient } from "~/server/axios";

export const useHttp = () => {
    const handleApiError = (error: AxiosError) => {
        if (error instanceof AxiosError) {
            const statusCode = error.response?.status;

            switch (statusCode) {
                case HTTP_RESPONSES.UNAUTHORIZED:
                    return toast.error("Unauthorized access. Please log in.", {
                        autoClose: 5000,
                    });
                case HTTP_RESPONSES.FORBIDDEN:
                    return toast.error(
                        "Forbidden. You do not have access to this resource.",
                        { autoClose: 5000 }
                    );
                case HTTP_RESPONSES.NO_CONTENT:
                    return toast.error("Resource not found.", { autoClose: 5000 });
                case HTTP_RESPONSES.BAD_REQUEST:
                    return toast.error("Server error. Please try again later.", {
                        autoClose: 5000,
                    });
                default:
                    return toast.error("An unexpected error occurred.", {
                        autoClose: 5000,
                    });
            }
        }

        console.error("Unexpected Error:", error);
        return toast.error("Something went wrong", { autoClose: 5000 });
    };

    return {
        httpClient,
        handleApiError,
    };
};
