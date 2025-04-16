import { useFetchPost } from "~/hooks";
import { ThemeToggle } from "~/lib/components";

export default function Home() {
  const { data, isError, isLoading } = useFetchPost({ enabled: true });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching posts</div>;
  }

  return (
    <div className="p-4">
      <ThemeToggle />
      <h1 className="text-2xl font-bold mb-4">HomePage</h1>
      {data?.map(({ id, title, body, views }) => (
        <div key={id} className="mb-2 pb-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p>{body}</p>
          <p>have {views} views</p>
        </div>
      ))}
    </div>
  );
}
