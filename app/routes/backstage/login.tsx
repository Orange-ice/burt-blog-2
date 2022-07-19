/**
 * @description 后台登录页面
 * */
import type {ActionFunction, LinksFunction} from '@remix-run/node';
import loginStyleUrl from '~/styles/backstage/login.css';

export const links: LinksFunction = () => [
  {rel: 'stylesheet', href: loginStyleUrl},
];

export const action: ActionFunction = async ({request}) => {
  const form = await request.formData();
  const username = form.get('username');
  const password = form.get('password');
  console.log(username, password);
  return null;
};

export default function BackStageLogin() {
  return (
    <div className="container">
      <h1>Burt Blog 后台系统</h1>
      <form method="post" className="form">
        <div>
          <label htmlFor="username-input">用户名</label>
          <input type="text" id="username-input" name="username" />
        </div>
        <div>
          <label htmlFor="password-input">密码</label>
          <input type="password" id="password-input" name="password" />
        </div>
        <button type="submit">登录</button>
      </form>
    </div>
  );
}
