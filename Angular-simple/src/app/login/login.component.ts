import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: any = {
    data: {},
    message: '',
    inputerror: {}
  }

  constructor(private httpClient: HttpClient, public route: Router) {

  }

  signIn() {
    console.log('Login Id: ', this.form.data.loginId)
    console.log('Password: ', this.form.data.password)
   this.httpClient.post('http://localhost:8080/Auth/login', this.form.data).subscribe((res: any) => {
      console.log('res => ', res)

      this.form.message = '';
      this.form.inputerror = {};

      if (res.result.message) {
        this.form.message = res.result.message;   
      }

      if (!res.success) {
        this.form.inputerror = res.result.inputerror;
      }
      if (res.success) {
        this.route.navigateByUrl('welcome')
      }
    })
  }

  signUp() {
    this.route.navigateByUrl('signup')
  }
}