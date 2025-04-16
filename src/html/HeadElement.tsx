import appCss from "~/lib/styles/index.css?url";

export const HeadElement = () => ({
  meta: [
    {
      charSet: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "author",
      content: "Your name",
    },
    {
      name: "description",
      content: "Your Website Description",
    },
    {
      title: "Tanstack React Router SSR",
    },
  ],
  links: [
    { rel: "stylesheet", href: appCss },
    {
      rel: "icon",
      href: "tanstack.webp",
    },
  ],
});
