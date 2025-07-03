import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  form: any = {
    list: [],
    searchParams: {},
    deleteParams: {},
    preload: [],
    message: '',
    pageNo: 0
  }

  constructor(private httpClient: HttpClient) {
    console.log('in userlist constructor')
  }

  ngOnInit(): void {
    console.log('in userlist ngOnInit')
    this.search();
  }

  search() {
    this.httpClient.post('http://localhost:8080/User/search/' + this.form.pageNo, this.form.searchParams).subscribe((res: any) => {
      this.form.list = res.result.data;
    })
  }

  next() {
    this.form.pageNo++;
    console.log('pageNo => ', this.form.pageNo)
    this.search();
  }

  previous() {
    this.form.pageNo--;
    console.log('pageNo => ', this.form.pageNo)
    this.search();
  }
}