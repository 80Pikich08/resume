import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Courses } from './pages/courses/courses';
import { Projects } from './pages/projects/projects';
import { Practice } from './pages/practice/practice';
import { Selfdev } from './pages/selfdev/selfdev';
import { About } from './pages/about/about';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'courses', component: Courses },
    { path: 'projects', component: Projects },
    { path: 'practice', component: Practice },
    { path: 'selfdev', component: Selfdev },
    { path: 'about', component: About },
    { path: '**', redirectTo: '' }
];
