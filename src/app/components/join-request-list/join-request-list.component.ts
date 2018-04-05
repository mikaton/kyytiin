import { Component, OnInit } from '@angular/core';
import { LocalAuthService } from '../../services/auth.service';
import { JoinRequestService } from '../../services/joinrequest.service';
import { RideService } from '../../services/ride.service';

@Component({
  selector: 'app-join-request-list',
  templateUrl: './join-request-list.component.html',
  styleUrls: ['./join-request-list.component.css']
})
export class JoinRequestListComponent implements OnInit {
  requests = [];
  unreadRequestsCount: number = 0;
  unreadNotifications: number = 0;

  constructor(
    private requestService: JoinRequestService,
    private localAuthService: LocalAuthService
    ) { }

  async ngOnInit() {
    await this.getUserRequests();
  }

  getUserRequests() {
    // Haetaan kaikki pyynnöt käyttäjän id:llä. Jos pyyntöjä on, muutetaan unreadRequestsCount vastaamaan niiden määrää
    this.requestService.getAllRequestsByUserId(this.localAuthService.decodeToken())
    .then((requests) => {
      this.requests = requests.data;
      if(this.requests.length > 0) this.unreadRequestsCount = this.requests.length;
    })
    .catch((err) => console.error(err));
  }

  getNotifications() {
    // Haetaan ilmoitukset TODO refaktoroi reaaliaikaiseksi socket.io:lla
    
  }

  
}
