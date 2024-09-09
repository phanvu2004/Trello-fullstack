import { Component, OnInit } from '@angular/core';
import { ColumnComponent } from './column/column.component';
import { CrudService } from './crud.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AddColumnComponent } from './add-column/add-column.component';
import { CdkDragDrop,
  moveItemInArray,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ToolbarComponent,
    ColumnComponent,
    AddColumnComponent,
    CdkDrag,
    CdkDropList
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private crud: CrudService) {}
  columns: Array<any> = [];

  async createColumn(title: string) {
    const { data } = await this.crud.createColumn({
      title: title,
      order: this.columns?.length ?? 0
    })
    this.columns = [
      ...this.columns,
      data
    ]
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.columns!, event.previousIndex, event.currentIndex)
    this.columns?.forEach(async (elem, index) => {
      if (elem.order === index)
        return;

      await this.crud.updateInstance('Column', {
        id: elem.id,
        order: index
      })
      elem.order = index;
    })
  }

  deleteColumn(id:string) {
    this.crud.deleteInstance("Column",  id)
    this.columns = this.columns?.filter(column => column.id != id)
  }
  ngOnInit(): void {
   (async () => {
      this.columns = await this.crud.readAll()
    })()
  }
}

