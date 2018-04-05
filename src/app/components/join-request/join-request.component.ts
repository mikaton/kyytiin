import { Component, OnInit } from '@angular/core';
import { JoinRequestService } from '../../services/joinrequest.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-join-request',
  templateUrl: './join-request.component.html',
  styleUrls: ['./join-request.component.css']
})
export class JoinRequestComponent implements OnInit {
  request: any;

  constructor(
    private requestService: JoinRequestService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    await this.getRequest();
  }

  getRequest(): void {
    const request_id = this.route.snapshot.paramMap.get('id');
    this.requestService.getRequestById(request_id)
    .then((request) => {
      this.request = request.data;
    })
    .catch((err) => console.error('getRequest epäonnistui: ' + err.message));
  }
}
