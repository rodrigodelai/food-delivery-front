import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Banner } from '../model/banner';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class BannerService extends CrudService<Banner> {

  constructor() {
    super('banner');
  }

}
