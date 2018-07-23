import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HierarchyService {
  constructor(private http: HttpClient) {}

  loadFirstNode() {
    return this.http.get('./assets/data.json');
  }

  loadChild(clickElement: any, successFn: Function) {
    const data = [
      {
        name: 'Son of A'
      },
      {
        name: 'Daughter of A'
      },
      {
        name: 'Daughter of b'
      }
    ];
    successFn(data);
  }
}
