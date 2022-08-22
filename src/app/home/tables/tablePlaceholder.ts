import {Component, ViewEncapsulation} from '@angular/core';

/**
 * 
 *    PLACEHOLDER DE UNA TABLA
 * 
 */

@Component({
  selector: 'tablePlaceholder',
  styleUrls: ['../assets/tables.component.css'],
  templateUrl: 'tablePlaceholder.html',
  encapsulation: ViewEncapsulation.None
})

export class TablePlaceholder {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen 2', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium 2', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium 2', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium 2', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron 2', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon 2', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen 2', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen 2', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine 2', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon 2', weight: 20.1797, symbol: 'Ne'},
  {position: 1, name: 'Hydrogen 2', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium 2', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium 2', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium 2', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron 2', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon 2', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen 2', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen 2', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine 2', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon 2', weight: 20.1797, symbol: 'Ne'},
];
