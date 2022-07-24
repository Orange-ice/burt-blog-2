import styles from './style.css';
import type {ButtonHTMLAttributes} from 'react';
import cs from 'classnames';
import type {LinksFunction} from '@remix-run/node';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'dark';
}

export const links: LinksFunction = () => [
  {rel: 'stylesheet', href: styles},
];

export function Button(props: ButtonProps) {
  const {color = 'primary', className, children, ...rest} = props;
  const classes = cs('button', className, color);
  return (
    <button className={classes} {...rest}>{children}</button>
  );
}
