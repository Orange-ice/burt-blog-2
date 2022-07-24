/**
 * @description 后台主页
 * */
import {Link, Outlet, useLoaderData} from '@remix-run/react';
import type {LinksFunction, LoaderFunction} from '@remix-run/node';
import adminStyleUrl from '~/styles/backstage/admin.css';
import {getUser} from '~/utils/session.server';
import {json} from '@remix-run/node';

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>
}

export const links: LinksFunction = () => [
  {rel: 'stylesheet', href: adminStyleUrl},
];

export const loader: LoaderFunction = async ({request}) => {
  const user = await getUser(request);
  const data: LoaderData = {user};
  return json(data);
};

export default function BackstageAdmin() {
  const data = useLoaderData<LoaderData>();
  return (
    <div className="container">
      <header>
        <h1>Burt Blog 后台系统</h1>
        <span>welcome, {data.user?.name}!</span>
        <form action="/backstage/logout" method="post">
          <button type="submit">
            退出
          </button>
        </form>
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
