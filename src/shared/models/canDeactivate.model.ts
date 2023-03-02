import { Observable } from 'rxjs';

export interface I_CanComponentDeactivate {
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean;
}
