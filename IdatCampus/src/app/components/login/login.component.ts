import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginRequest } from '../../models/login-request';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  title="Inicio de Sesion";
  loginForm: FormGroup;
  returnUrl: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private activatedRoute:ActivatedRoute,
    private _snackBar: MatSnackBar    
  )
  
  {
    this.loginForm= new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void{
    this.authService.logout();
    this.returnUrl= this.activatedRoute.snapshot.queryParams["returnUrl"] || '/';
    console.log(this.returnUrl)
  }

  loginSubmit(){
    let login= this.loginForm.value as LoginRequest;
    console.log(login);    
    this.authService.login(login)
    .subscribe(
      data=>{
        console.log(data);
        this.router.navigate([this.returnUrl]);
      },
      error=>{
        this._snackBar.open("Usuario y/o clave incorrectos", "OK");
        console.log('error al iniciar sesion', error);
      }
    );
  }

}
