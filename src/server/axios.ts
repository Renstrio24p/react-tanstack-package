import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { HTTP_RESPONSES } from "~/lib/constants";

// Define base URL
const baseURL =
    import.meta.env.MODE === "production"
        ? "https://magic-api-dev.onrender.com"
        : "http://localhost:8080";

// Extract base domain from URL
const baseDomain = new URL(baseURL).hostname;

// Allowed domains (includes baseDomain always)
const ALLOWED_DOMAINS =
    import.meta.env.MODE === "production"
        ? [
            baseDomain, // always allow the backend base
            "magic899.com",
            "oneweather.org",
            "api.weatherapi.com",
            "magic899-web-api.onrender.com",
            "magic899-api.onrender.com",
            "magic-dev.onrender.com",
            "static.cloudflareinsights.com",
            "client-c2nwzired-renstrio24ps-projects.vercel.app/"
        ]
        : [
            "localhost",
            baseDomain,
            "magic899.com",
            "oneweather.org",
            "api.weatherapi.com",
            "magic-api-dev.onrender.com",
            "magic899-api.onrender.com",
            "magic-dev.onrender.com",
        ];

// SSRF-safe URL validator
function isValidURL(url: string): boolean {
    try {
        const parsedURL = new URL(url, baseURL);
        return ALLOWED_DOMAINS.some((domain) => parsedURL.hostname.endsWith(domain));
    } catch {
        return false;
    }
}

// Create axios instance
export const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    maxRedirects: 0, // Prevent SSRF via redirects
});

// Request interceptor with SSRF protection
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        config.headers.set("Accept", "application/json");
        config.headers.set("Content-Type", "application/json");

        const csrfToken = Cookies.get("csrf_token");
        if (csrfToken) {
            config.headers.set("X-CSRF-Token", csrfToken);
        }

        if (config.url && !isValidURL(config.url)) {
            const blockedHost = new URL(config.url, baseURL).hostname;
            return Promise.reject(
                new Error(`❌ Blocked SSRF attempt: ${blockedHost} is not in ALLOWED_DOMAINS`)
            );
        }

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// Response interceptor with cleaner error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            const { status, data } = error.response;

            if (status === HTTP_RESPONSES.SERVER_ERROR) {
                console.error({
                    message: "Error",
                    description: "Server error occurred!",
                    details: data,
                });
            } else {
                console.error({
                    message: "Request failed",
                    status,
                    details: data,
                });
            }
        } else {
            if (import.meta.env.DEV) console.error("❌ Network or unexpected error:", error.message);
        }

        return Promise.reject(error);
    }
);

export { axiosInstance as httpClient };
