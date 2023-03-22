import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequestPayload } from 'src/app/models/login-request.payload';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  form: FormGroup;
  name: string | undefined;
  loginRequestPayload: LoginRequestPayload;
  isLogged: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private ruta: Router,
    private storageService: StorageService,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  ngOnInit(): void {
    this.isLogged =  this.storageService.isLoggedIn();

  }

  get Email() {
    return this.form.get('username');
  }
  get Password() {
    return this.form.get('password');
  }

  onEnviar(event: Event) {
    if (this.form.invalid) {
      alert('Mal logueado');
      return;
    }
    this.loginRequestPayload.username = this.form.get('username')?.value;
    this.loginRequestPayload.password = this.form.get('password')?.value;
    event.preventDefault;
    this.authService.login(this.loginRequestPayload)
      .subscribe((data) => {
        this.ruta.navigate(['/portfolio']);
      });
  }
  handleClear() {
    this.name = '';
  }

  logout(){
    this.authService.logout()
      .subscribe((data) => {
        this.ruta.navigate(['/portfolio']);
      });
  }
}
