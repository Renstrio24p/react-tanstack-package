import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import { HeadElement, RootDocument } from "~/html";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: HeadElement,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}
