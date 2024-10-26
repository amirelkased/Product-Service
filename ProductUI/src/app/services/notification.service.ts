import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  message: string;
  status: 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly notificationSubject = new BehaviorSubject<Notification | null>(null);
  notification$: Observable<Notification | null> = this.notificationSubject.asObservable();

  showNotification(message: string, status: 'success' | 'error') {
    const notification: Notification = {
      status, message
    }
    console.log('Notification emitted:', notification);
    this.notificationSubject.next(notification);
  }
}
