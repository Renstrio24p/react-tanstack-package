import { useNewQuery } from "~/hooks/useNewQuery"; // or wherever it is

type Post = {
    id: number;
    title: string;
    views: number;
    body: string;
};

export const useFetchPost = (opts?: { enabled?: boolean }) => {
    return useNewQuery<Post[]>({
        key: "posts",
        api: "http://localhost:3001/posts",
        ...opts,
    });
};
