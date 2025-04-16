import { useSuspenseQuery } from "@tanstack/react-query";
import { httpService } from "~/services";

type Props = {
    api: string;
    key: string;
    id?: string;
    name?: string;
    title?: string;
    staleTime?: number;
    onWindowFocus?: boolean;
    interval?: number;
    retry?: number | boolean;
    refetchOnMount?: boolean;
    wcredentials?: boolean;
    enabled?: boolean; // 🆕 to fix hydration mismatch
};

export const useNewQuery = <T,>({
    key,
    api,
    id,
    name,
    title,
    staleTime = 30000,
    onWindowFocus = true,
    interval = 0,
    retry = false,
    refetchOnMount = true,
    wcredentials = true,
}: Props) => {
    const queryKey = ["query", key, id, name, title].filter(Boolean);

    return useSuspenseQuery<T>({
        queryKey,
        queryFn: async (): Promise<T> => {
            try {
                const parts = [api];
                if (id) parts.push(id);
                if (name) parts.push(name);
                if (title) parts.push(title);
                const endpoint = parts.join("/");

                const res = await httpService(endpoint, wcredentials);

                return res.data ?? res;
            } catch (error) {
                if (import.meta.env.DEV) {
                    console.error("❌ Error fetching data:", error);
                }
                throw error;
            }
        },
        staleTime,
        refetchOnWindowFocus: onWindowFocus,
        refetchInterval: interval,
        refetchOnMount,
        retry,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });
};
