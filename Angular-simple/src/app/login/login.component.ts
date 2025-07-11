import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';

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

  constructor(private httpservice: HttpServiceService, public router: Router, private route: ActivatedRoute ) {

  }

    ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.form.message = params['errorMessage'] || null;
      console.log('msg = >', this.form.message)
    });
  }

  signIn() {
    var self = this
    this.httpservice.post('http://localhost:8080/Auth/login', this.form.data, function(res: any){

      console.log('res => ', res)

      self.form.message = '';
      self.form.inputerror = {};

      if (res.result.message) {
        self.form.message = res.result.message;
      }

      if (!res.success) {
        self.form.inputerror = res.result.inputerror;
      }

      if (res.success && res.result.data != null) {
        localStorage.setItem('firstName', res.result.data.firstName)
        localStorage.setItem('roleName', res.result.data.roleName)
        localStorage.setItem('id', res.result.data.id)  
             localStorage.setItem('token', 'Bearer ' + res.result.token)
        self.router.navigateByUrl('welcome');
      }
    })
  }

  signUp() {
    this.router.navigateByUrl('signup')
  }
}