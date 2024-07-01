import { HttpClient } from '@angular/common/http'
import { take } from 'rxjs';
import { environment } from '../../environments/environment';
 
export class CrudService<T extends {id?: number}> {

  protected readonly API_URL: string;

  constructor(protected http: HttpClient, endpoint: string) { 
    this.API_URL = environment.apiUrl + endpoint;
  }

  list(params: { [key: string]: boolean } = {}) {
    return this.http.get<T[]>(this.API_URL, { params: params }).pipe(take(1));
  }

  read(id: any) {
    return this.http.get<T>(this.API_URL + '/' + id).pipe(take(1));
  }

  create(record: T) {
    return this.http.post<T>(this.API_URL, record).pipe(take(1));
  }

  update(record: T) {
    return this.http.put<T>(this.API_URL + '/' + record.id, record).pipe(take(1));
  }

  delete(record: T) {
    return this.http.delete<T>(this.API_URL + '/' + record.id).pipe(take(1));
  }
}
