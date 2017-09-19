import {AuthenticatedGuard} from '../guards/authenticated.guard';
import {DashboardComponent} from '../components/dashboard/dashboard.component';
import {LoginComponent} from '../components/login/login.component';
import {NotificationsComponent} from '../components/notifications/notifications.component';
import {SearchComponent} from '../components/search/search.component';
export const ROOT_ROUTES = [

    {path: '', name: 'Dashboard', canActivate: [AuthenticatedGuard], component: DashboardComponent},
    {path: 'login', name: 'Login', component: LoginComponent},
    {
        path: 'notifications',
        name: 'Notifications',
        canActivate: [AuthenticatedGuard],
        component: NotificationsComponent
    },
    {path: 'radiussearch', name: 'RadiusSearch', canActivate: [AuthenticatedGuard], component: SearchComponent}
];
