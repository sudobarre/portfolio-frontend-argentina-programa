import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, switchMap } from 'rxjs';
import { Info } from 'src/app/models/info';
import { LoginRequestPayload } from 'src/app/models/login-request.payload';
import { SignupRequestPayload } from 'src/app/models/signup-request.payload';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderService } from 'src/app/services/header.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  form: FormGroup;
  signupForm : FormGroup;
  name: string | undefined;
  loginRequestPayload: LoginRequestPayload;
  signupRequestPayload: SignupRequestPayload;
  isLogged: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private ruta: Router,
    private storageService: StorageService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    };
    this.signupRequestPayload = {
      username: '',
      email: '',
      password: '',
      //user is added by default on the backend but for clarity and to match the dto.
      role: ["user"],
    };
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      repeatPassword: [''],
    }, {validator: this.passwordMatchValidator});
  }


  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('repeatPassword')?.value
       ? null : {'mismatch': true};
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
      this.toastr.error('Por favor revisa tus datos','Error');
      return;
    }
    this.loginRequestPayload.username = this.form.get('username')?.value;
    this.loginRequestPayload.password = this.form.get('password')?.value;
    event.preventDefault;
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
        this.toastr.error('Por favor revisa tus datos','Error');
        catchError(err);
      }
  });
}

  onSignup(event: Event) {
    if (this.signupForm.invalid) {
      this.toastr.error('Por favor revisa tus datos','Error');
      return;
    }
    this.signupRequestPayload.username = this.signupForm.get('username')?.value;
    this.signupRequestPayload.password = this.signupForm.get('password')?.value;
    this.signupRequestPayload.email=this.signupForm.get('email')?.value;

    event.preventDefault;
    this.authService.signup(this.signupRequestPayload)
      .subscribe((data) => {
        this.ruta.navigate(['/portfolio']);
        this.toastr.success('Por favor revisa tu casilla de correo para el mail de verificacion','Registrado');
      });
  }

  handleClear() {
    this.name = '';
  }

  logout(){
    this.authService.logout()
      .subscribe((data) => {
        localStorage.clear();
        this.ruta.navigate(['/portfolio']);
        window.location.reload();
      });
  }
}
