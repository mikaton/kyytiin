import { Component, OnInit } from '@angular/core';
import { LocalAuthService } from '../../services/auth.service';
import { JoinRequestService } from '../../services/joinrequest.service';
import { RideService } from '../../services/ride.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-join-request-list',
  templateUrl: './join-request-list.component.html',
  styleUrls: ['./join-request-list.component.css']
})
export class JoinRequestListComponent implements OnInit {
  requests = [];
  notifications = [];
  unreadRequestsCount: number = 0;
  unreadNotifications: number = 0;

  constructor(
    private requestService: JoinRequestService,
    private notificationService: NotificationService,
    private localAuthService: LocalAuthService
    ) { }

  async ngOnInit() {
    await Promise.all([this.getUserRequests(), this.getNotification()])
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

  getNotification() {
    this.notificationService.getUserNotifications(this.localAuthService.decodeToken())
    .then((notifications) => {
      this.notifications = notifications.data;
      if(this.requests.length > 0) this.unreadRequestsCount = this.requests.length;
    })
    .catch((err) => console.error('getNotifications epäonnistui: ' + err.message));
  }
}
