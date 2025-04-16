import { HeadContent, ScriptOnce, Scripts } from "@tanstack/react-router";

export function RootDocument({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ScriptOnce log={false}>
          {`document.documentElement.classList.toggle(
            'dark',
            localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
            )`}
        </ScriptOnce>

        {children}

        <Scripts />
      </body>
    </html>
  );
}
