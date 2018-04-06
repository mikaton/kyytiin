import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registersuccess',
  templateUrl: './registersuccess.component.html',
  styleUrls: ['./registersuccess.component.css']
})
export class RegistersuccessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/frontpage']);
  }
}
