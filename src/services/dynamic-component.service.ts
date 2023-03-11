import { Injectable, OnDestroy } from '@angular/core';
import {
  ComponentFactoryResolver,
  ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertComponent } from 'src/shared/alert/alert.component';
import { ShowImageComponent } from 'src/shared/show-image/show-image.component';
import { PlaceholderDirective } from 'src/shared/directives/placeholder.directive';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentService implements OnDestroy {
  @ViewChild(PlaceholderDirective, { static: true })
  imageHost!: PlaceholderDirective;
  private SUBSCRIPTION!: Subscription;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnDestroy(): void {
    this.SUBSCRIPTION.unsubscribe();
  }

  // Dynamic Component Creation
  showDynamicComponent(
    message: string,
    host: PlaceholderDirective,
    type: string
  ) {
    const imageCmpFactory: any =
      type === 'error'
        ? this.componentFactoryResolver.resolveComponentFactory(
            AlertComponent
          )
        : this.componentFactoryResolver.resolveComponentFactory(
            ShowImageComponent
          );

    const hostViewContainerRef = host.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef: any =
      hostViewContainerRef.createComponent(imageCmpFactory);

    if (type === 'error') {
      componentRef.instance.alertMessage = message;
      this.SUBSCRIPTION = componentRef.instance.close.subscribe(
        () => {
          this.SUBSCRIPTION.unsubscribe();
          hostViewContainerRef.clear();
        }
      );
    } else {
      componentRef.instance.imageUrl = message;
      this.SUBSCRIPTION = componentRef.instance.close.subscribe(
        () => {
          this.SUBSCRIPTION.unsubscribe();
          hostViewContainerRef.clear();
        }
      );
    }
  }
}
