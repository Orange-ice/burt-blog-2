import type {LinksFunction, MetaFunction} from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import globalStyleUrl from '~/styles/global.css';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Burt Blog',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [
  {rel: 'stylesheet', href: globalStyleUrl},
];

export default function App() {
  return (
    <html lang="zh">
    <head>
      <Meta />
      <Links />
    </head>
    <body>
    <Outlet />
    <ScrollRestoration />
    <Scripts />
    <LiveReload />
    </body>
    </html>
  );
}
