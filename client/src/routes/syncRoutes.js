import Home from '../components/Home';
import Login from '../components/Login';
import IsLoggedIn from '../components/IsLoggedIn';

export const routes = [
  {
    component: IsLoggedIn,
    path: '/',
    exact: true,
  },
  {
    component: Home,
    path: '/quakes',
    exact: true,
  },
  {
    component: Login,
    path: '/login',
    exact: true,
  },
];
