import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderDate',
  standalone: true
})
export class OrderDatePipe implements PipeTransform {

  transform(date?: string) {
    if (date) {
      const dateObj = new Date(date);

      const newDate = `${dateObj.toLocaleString('pt-BR', { weekday: 'long' }).split('-')[0]}, ${dateObj.toLocaleString('pt-BR', { day: 'numeric', month: 'long' })}`;
      const hours = dateObj.toLocaleString('pt-BR', { hour: 'numeric', minute: 'numeric' });

      return newDate[0].toUpperCase() + newDate.slice(1) + ' às ' + hours;
    }
    return date;
  }

}
