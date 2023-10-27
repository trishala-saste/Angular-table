import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indianNumberFormat'
})
export class IndianNumberFormatPipe implements PipeTransform {

  transform(value: number | string): string {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }
    
    if (!isNaN(value)) {
      // Format the number with an Indian style thousand separator
      return value.toLocaleString('en-IN');
    }
    
    return value.toString();
  }

}
