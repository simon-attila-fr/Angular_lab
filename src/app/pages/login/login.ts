import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    router = inject(Router);
    auth = inject(AuthService);
    loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })

    handleLogin() {
      console.log(this.loginForm.controls.username.value)
      const username: string = this.loginForm.controls.username.value ?? "";
      const password: string = this.loginForm.controls.password.value ?? "";
      this.auth.login(username, password);
      this.router.navigate(["/userHome"])
    }
}
