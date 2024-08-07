import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { Menu } from './models/menu';
import { StudentService } from './services/student.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,           
            MatToolbarModule, 
            MatIconModule, 
            MatButtonModule, 
            MatSidenavModule,
            MatListModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  
})

export class AppComponent {
  title = 'Campus IDAT';
  menu: Menu[];

constructor(private router: Router){
 this.menu= this.populateMenu();
}

redirectTo(path:string){
  this.router.navigate([path]);
}
  
  populateMenu(){
    let menu: Menu[] = [
      new Menu('Tablero', 'dashboard', 'dashboard'),
      new Menu('Estudiantes', 'students', 'person'),
      new Menu('Configuracion', 'settings', 'settings'),
    ];
    return menu;
  }
  
}
