import bcrypt from 'bcryptjs';
import {db} from './db.server';
import {createCookieSessionStorage, redirect} from '@remix-run/node';

type LoginForm = {
  name: string;
  password: string;
}

export async function login({name, password}: LoginForm) {
  const user = await db.user.findFirst({
    where: {name},
  });
  if (!user) return null;

  const isCorrectPassword = await bcrypt.compare(
    password,
    user.passwordHash
  );
  if (!isCorrectPassword) return null;

  return {id: user.id, name};
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set');
}
const storage = createCookieSessionStorage({
  cookie: {
    name: 'burt_blog_session',
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  }
});

/**
 * @description 创建 session，并重定向到指定路由地址
 * */
export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set('userId', userId);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session)
    }
  });
}

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'));
}

/**
 * @description 通过用户 session 获取用户 id
 * */
export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get('userId');
  if (!userId || typeof userId !== 'string') return null;
  return userId;
}

/**
 * @description 获取用户 id，如未登录，则跳转到登录页面
 * */
export async function requireUserId(request: Request, redirectTo: string = new URL(request.url).pathname) {
  const userId = await getUserId(request);
  if (!userId) {
    const searchParams = new URLSearchParams([
      ['redirectTo', redirectTo],
    ]);
    throw redirect(`/backstage/login?${searchParams}`);
  }
  return userId;
}
