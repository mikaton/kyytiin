import { Component, OnInit } from '@angular/core';
import {  } from '/features.json';
@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.css']
})
export class ChangelogComponent implements OnInit {
  features: any[];
  constructor() { }

  ngOnInit() {
  }

}
