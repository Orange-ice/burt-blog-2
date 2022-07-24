/**
 * @description 后台登录页面
 * */
import type {ActionFunction, LinksFunction} from '@remix-run/node';
import loginStyleUrl from '~/styles/backstage/login.css';
import {json} from '@remix-run/node';
import {db} from '~/utils/db.server';
import {useActionData, useSearchParams} from '@remix-run/react';
import {createUserSession, login, register} from '~/utils/session.server';

type ActionData = {
  formError?: string;
}

export const links: LinksFunction = () => [
  {rel: 'stylesheet', href: loginStyleUrl},
];

const badRequest = (data: ActionData) => json(data, {status: 400});

export const action: ActionFunction = async ({request}) => {
  const form = await request.formData();
  const loginType = form.get('loginType');
  const name = form.get('name');
  const password = form.get('password');
  const redirectTo = form.get('redirectTo') || '/backstage/admin';

  // 非空校验（非 undefined）
  if (typeof loginType !== 'string' || typeof name !== 'string' || typeof password !== 'string' || typeof redirectTo !== 'string') {
    return badRequest({formError: `Form not submitted correctly.`});
  }

  switch (loginType) {
    case 'login':
      const user = await login({name, password});
      if (!user) {
        return badRequest({formError: `Name/Password combination is incorrect`});
      }
      console.log(user);
      return createUserSession(user.id, redirectTo);
    case 'register':
      const userExists = await db.user.findFirst({where: {name}});
      if (userExists) {
        return badRequest({formError: 'User already exists'});
      }
      const newUser = await register({name, password});
      if (!newUser) {
        return badRequest({formError: 'Register failed'});
      }
      return createUserSession(newUser.id, redirectTo);
    default:
      return badRequest({formError: 'Login type invalid'});
  }
};

export default function BackStageLogin() {
  const actionData = useActionData<ActionData>();
  const [searchParams] = useSearchParams();
  return (
    <div className="container">
      <h1>Burt Blog 后台系统</h1>
      <form method="post" className="form">
        <input
          type="hidden"
          name="redirectTo"
          value={
            searchParams.get('redirectTo') ?? undefined
          }
        />
        <fieldset>
          <legend>
            登录或注册？
          </legend>
          <label>
            <input type="radio" name="loginType" value="login" defaultChecked />{' '}登录
          </label>
          <label>
            <input type="radio" name="loginType" value="register" />{' '}注册
          </label>
        </fieldset>
        <div>
          <label htmlFor="name-input">用户名</label>
          <input type="text" id="name-input" name="name" />
        </div>
        <div>
          <label htmlFor="password-input">密码</label>
          <input type="password" id="password-input" name="password" />
        </div>
        <button type="submit">提交</button>
        {actionData && <span>{actionData.formError}</span>}
      </form>
    </div>
  );
}
