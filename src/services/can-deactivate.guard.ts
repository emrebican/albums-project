import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

import { I_CanComponentDeactivate } from 'src/shared/models/canDeactivate.model';

export class CanDeactivateGuard
  implements CanDeactivate<I_CanComponentDeactivate>
{
  canDeactivate(
    component: I_CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}
