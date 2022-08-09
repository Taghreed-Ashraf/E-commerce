import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutTitle'
})
export class CutTitlePipe implements PipeTransform {

  transform(description:string , limit:number):string {
    return description.split(' ').slice(0,limit).join(' ');
  }

}
