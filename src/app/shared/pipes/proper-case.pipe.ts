import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'properCase'
})
export class ProperCasePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    const words = value.split(' ').map(word => {
      return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }).join(' ');
    return words;
  }

}
