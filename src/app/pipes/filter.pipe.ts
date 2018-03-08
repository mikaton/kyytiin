import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'rideSearch'
})

/* Toimii seuraavasti:
    let ride of rides | rideSearch: haku:termit:tähän:erotettuna:kaksoispisteellä
*/


export class FilterPipe implements PipeTransform {
    transform(items: any[], startingplace: string, destination: string) {
        if(items && items.length) {
            return items.filter(item => {
                if(startingplace && item.startingplace.toLowerCase().indexOf(startingplace.toLowerCase()) === -1) {
                    return false;
                }
                if(destination && item.destination.toLowerCase().indexOf(destination.toLowerCase()) === -1) {
                    return false;
                }
                return true;
            })
        } else {
            return items;
        }
    } 
}