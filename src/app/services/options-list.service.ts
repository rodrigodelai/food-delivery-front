import { Injectable } from '@angular/core';
import { OptionsList } from '../model/options-list';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OptionsListService extends CrudService<OptionsList> {

  constructor(http: HttpClient) {
    super(http, 'optionsList');
  }
}
