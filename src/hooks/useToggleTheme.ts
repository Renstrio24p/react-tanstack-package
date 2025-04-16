import Cookies from "js-cookie";

export const useToggleTheme = () => {
    function toggleTheme() {
        const isDark =
            document.documentElement.classList.contains("dark") ||
            (!Cookies.get("theme") &&
                window.matchMedia("(prefers-color-scheme: dark)").matches);

        const options = {
            sameSite: "None" as const,
            secure: true,
            partitioned: true,
        };

        if (isDark) {
            document.documentElement.classList.remove("dark");
            Cookies.set("theme", "light", options);
        } else {
            document.documentElement.classList.add("dark");
            Cookies.set("theme", "dark", options);
        }
    }

    return { toggleTheme };
}