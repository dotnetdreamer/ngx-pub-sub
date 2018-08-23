import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { NgxPubSubService } from '@ngx-pub-sub/ngx-pub-sub';

@Component({
  selector: 'ngx-pub-sub-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent {

  @Input() eventName: string;

  subscription: Subscription;
  isSubscribed = false;
  list: any[] = [];

  colors = ['primary', 'accent', 'warn'];
  colorCounter = 0;

  constructor(private pubSub: NgxPubSubService) { }

  subscribeEvent() {

    console.log('subscribed');
    this.subscription = this.pubSub.subscribe(this.eventName,
      data => {
        this.colorCounter++;
        // append at the top
        this.list.unshift({
          myColor: this.colors[this.colorCounter % this.colors.length],
          myNumber: data
        })
        console.log(data);
      });
    this.isSubscribed = true;
  }

  unsubscribeEvent() {
    console.log('unsubscribed');
    this.subscription.unsubscribe();
    this.list = [];
    this.isSubscribed = false;
  }
}
