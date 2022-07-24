/**
 * @description 后台主页
 * */
import {Link, Outlet} from '@remix-run/react';
import type {LinksFunction, LoaderFunction} from '@remix-run/node';
import {requireUserId} from '~/utils/session.server';
import adminStyleUrl from '~/styles/backstage/admin.css';

export const links: LinksFunction = () => [
  {rel: 'stylesheet', href: adminStyleUrl},
];

export const loader: LoaderFunction = async ({request}) => {
  const userId = await requireUserId(request);
  console.log(userId);
  return null;
};

export default function BackstageAdmin() {
  return (
    <div className="container">
      <header>
        <h1>Burt Blog 后台系统</h1>
        <span>welcome, username!</span>
        <button>退出</button>
      </header>
      <div className="content">
        <aside>
          <nav>
            <ul>
              <li>
                <Link to="/backstage/admin">首页</Link>
              </li>
              <li>
                <Link to="posts">博客管理</Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
