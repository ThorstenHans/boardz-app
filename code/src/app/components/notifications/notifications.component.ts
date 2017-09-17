import {Component} from '@angular/core';

import {NotificationService} from '../../services/notifications/notification.service';

@Component({
    selector: 'app-notifications',
    templateUrl: 'notifications.component.html'
})
export class NotificationsComponent {
    constructor(public notificationService: NotificationService) {
    }
}
