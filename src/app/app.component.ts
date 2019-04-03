import { Component } from '@angular/core';
import { OrderBy } from './orderBy.pipe';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ OrderBy ]
})
export class AppComponent {

  // constructor( private orderBy: OrderBy){}
  name = 'Angular';
  order: string = '';
  templist = [];
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  ELEMENT_DATA: Element[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
    { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
    { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
    { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
    { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
    { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
    { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
    { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
    { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
    { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
  ];

  sortByCol(name: string) {
    // if(this.order === '') {
    //   this.order += name;
    // } else if(this.order !=='' && this.order.includes(name)){
    //   console.log('alreday includes name');
    //   this.order.replace(name, '');
    // } else {
    //   console.log('in last else');
    //   this.order += name;
    // }

    if(this.templist.length > 0 ) {
      if(this.templist.indexOf(name) !== -1){
        console.log('alreday includes name');
        this.templist.pop();
      }else {
        console.log('not  includes name');
        this.templist.push(name);
      }
    } else {
      this.templist.push(name);
    }

    this.order = this.templist.join();
   // this.orderBy.transform(this.ELEMENT_DATA, this.order);
    console.log(name, this.order);
  }

}


export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}