import { Injectable } from '@angular/core';
import { OptionsList } from '../model/options-list';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class OptionsListService extends CrudService<OptionsList> {

  constructor() {
    super('optionsList');
  }
  
}
