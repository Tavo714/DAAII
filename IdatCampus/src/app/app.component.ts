import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { Menu } from './models/menu';
import { AuthService } from './services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteItemDialogComponent } from './components/delete-item-dialog/delete-item-dialog.component';


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
  isLogged: boolean=true;

constructor(private router: Router, private authService: AuthService, public dialog: MatDialog){
 this.menu= this.populateMenu();
 this.isLogged=this.authService.isAuthenticated();
  
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

  logout(){  
    let deleteDialogRef = this.dialog.open(DeleteItemDialogComponent, {
      width: '300px',
      data: {
        title: 'Cerrar Sesion',
        message: `Esta seguro que desea cerrar sesion?`,
        actionDescription: 'Cerrar Sesion'
      }
    });

    deleteDialogRef.afterClosed().subscribe(result =>{
     
      if(result.action === 'cancel'){
        return;
      }
      this.authService.logout()
      .subscribe(
        data=>{
          this.router.navigate(['/login']);
        },
        error=>{
          console.log('Error al cerrar sesion', error);
        }
      );
    });

    
  }
  
}
