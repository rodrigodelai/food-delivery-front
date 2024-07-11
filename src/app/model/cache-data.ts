import { Observable } from "rxjs";

export interface CacheData {
    value: Observable<any>;
    expiration: number;
}