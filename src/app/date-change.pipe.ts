import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateChange'
})
export class DateChangePipe implements PipeTransform {

  transform(value: any): any {
    value = new Date(value).toLocaleDateString('fa');
    return value;

  }

}
