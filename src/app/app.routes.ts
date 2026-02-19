import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { UserHome } from './pages/user-home/user-home';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'auth/login',
        component: Login
    },
    {
        path: 'auth/signup',
        component: Register
    },
    {
        path: 'userHome',
        component: UserHome
    }
];
