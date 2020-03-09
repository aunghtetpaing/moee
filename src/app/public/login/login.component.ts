import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/cores/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  get control() {
    return this.loginForm.controls;
  }

  private loginFormBuilder() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.loginFormBuilder();
  }

  submit() {
    if(this.loginForm.invalid) {
      return;
    }
    
   if(!this.loginForm.invalid) {
    this.authService.login(this.loginForm.value);
    this.router.navigateByUrl('/dashboard');
   }
    
  }

}
