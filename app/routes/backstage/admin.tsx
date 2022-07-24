/**
 * @description 后台主页
 * */
import {Outlet} from '@remix-run/react';

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
