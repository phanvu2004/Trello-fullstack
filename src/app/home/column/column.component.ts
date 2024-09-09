import { Component, Input, OnChanges } from '@angular/core';
import { CardComponent } from './card/card.component';
import { AddCardComponent } from './add-card/add-card.component';
import { CrudService } from '../crud.service';
import { CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { HomeComponent } from '../home.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-column',
   standalone: true, 
   imports: [
    CardComponent,
    AddCardComponent,
    CdkDrag,
    CdkDropList,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './column.component.html',
  styleUrl: './column.component.css'
})
export class ColumnComponent implements OnChanges {

  constructor(private crud: CrudService, private home: HomeComponent) {}
  @Input()
  column: any

  @Input()
  columns?: any[]
  columnIds?: string[]

  async addCard(title: string) {
    const { data } = await this.crud.createCard({
      columnId: this.column.id,
      title: title,
      order: this.column?.cardsList?.length || 0
    })

    if (!this.column?.cardsList)
      this.column.cardsList = [ data ];
    else 
      this.column.cardsList.push(data);
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

     event.container.data.forEach(async (card, index ) => {
      if (index === card.order && card.columnId === this.column.id)
        return;

      await this.crud.updateInstance("Card", {
        id: card.id,
        order: index,
        columnId: this.column.id
      })

      card.order = index
    })
  }
  deleteColumn() {
    if (this.column.cardsList?.length)
      this.column.cardsList.forEach((card: any) => {
        this.deleteCard(card.id)
      });
    this.home.deleteColumn(this.column.id)
  }

  deleteCard(id: string) {
    this.crud.deleteInstance("Card", id)
    this.column.cardsList = this.column.cardsList.filter( (card: any) => card.id! !== id)
  }
  ngOnChanges(): void {
    this.columnIds = this.columns?.map(elem => elem.id).filter(id => id !== this.column.id)
  }
}
