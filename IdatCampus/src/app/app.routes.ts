import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { StudentCreateComponent } from './components/student-create/student-create.component';
import { StudentsComponent } from './components/students/students.component';


export const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'students',
        component: StudentsComponent
    },
    {
        path: 'students/new',
        component: StudentCreateComponent
    },
    {
        path: 'students/:id',
        component: StudentEditComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    }
];
