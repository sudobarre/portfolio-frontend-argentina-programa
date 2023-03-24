import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { LoginRequestPayload } from 'src/app/models/login-request.payload';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit {

  loginRequestPayload: LoginRequestPayload = {
    'username': 'test',
    'password': '1234'
  }
  constructor(
    private ruta: Router,
    private storageService: StorageService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { 
  }

  ngOnInit(): void {
  }

  onLogin(){
    this.authService.login(this.loginRequestPayload)
      .subscribe({
        next : data => {
        this.storageService.saveUser(data);
        this.ruta.navigate(['/portfolio']);
        this.toastr.success('Ingresado correctamente');
        window.location.reload();
      },
      error: err => {
        window.localStorage.clear();
        this.toastr.error('Ha habido un error. Por favor intenta nuevamente en unos momentos.','Error');
        catchError(err);
      }
  });
  }

  
}
