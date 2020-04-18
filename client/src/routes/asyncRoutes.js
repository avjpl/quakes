import { AsyncComponent } from '../utils';

export const routes = [
  {
    component: AsyncComponent(() => import('../components/Home')),
    path: '/',
    exact: true,
  },
];
