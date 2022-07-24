/**
 * @description 后台主页
 * */
import {Outlet} from '@remix-run/react';
import type {LoaderFunction} from '@remix-run/node';
import {requireUserId} from '~/utils/session.server';

export const loader: LoaderFunction = async ({request}) => {
  const userId = await requireUserId(request);
  console.log(userId);
  return null;
};

export default function BackstageAdmin() {
  return (
    <div>
      <aside>aside</aside>
      <main>
        <header>header</header>
        <Outlet />
      </main>
    </div>
  );
}
