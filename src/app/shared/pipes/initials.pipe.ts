// src/app/shared/pipes/initials.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
  standalone: true
})
export class InitialsPipe implements PipeTransform {
  transform(name: string): string {
    if (!name) return '';
    
    const names = name.split(' ');
    let initials = names[0].charAt(0).toUpperCase();
    
    if (names.length > 1) {
      initials += names[names.length - 1].charAt(0).toUpperCase();
    }
    
    return initials;
  }
}