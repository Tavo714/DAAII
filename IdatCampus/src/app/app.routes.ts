import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { StudentCreateComponent } from './components/student-create/student-create.component';
import { StudentsComponent } from './components/students/students.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'students',
        component: StudentsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'students/new',
        component: StudentCreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'students/:id',
        component: StudentEditComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'',
        redirectTo: '/students',
        pathMatch: 'full'
    },
    {
        path:'**',
        redirectTo: '/dashboard'
    }
];
