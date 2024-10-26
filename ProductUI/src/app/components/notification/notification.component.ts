import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Notification, NotificationService } from '../../services/notification.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-notification',
  templateUrl: 'notification.component.html',
  styleUrls: ['notification.component.css'],
  standalone: true,
  providers: [NotificationService],
  imports: [
    NgClass,
    NgIf,
    CommonModule,
    FormsModule
  ],
  animations: [
    trigger('notificationState', [
      state('hidden', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      state('visible', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('hidden => visible', animate('300ms ease-in')),
      transition('visible => hidden', animate('300ms ease-out'))
    ])
  ]
})
export class NotificationComponent implements OnInit {
  show: boolean = false;
  currentNotification?: Notification | null;

  constructor(private readonly notificationService: NotificationService) {
    console.log('NotificationService instance created');
  }

  ngOnInit(): void {
    this.notificationService.notification$.subscribe((notification: Notification | null) => {
      console.log('Received notification:', notification);

      if (notification) {
        this.currentNotification = notification;
      } else {
        this.currentNotification = {
          status: "success",
          message: "I am default message"
        };
      }

      setTimeout(() => {
        this.currentNotification = null;
      }, 3000);
    });
  }
}
