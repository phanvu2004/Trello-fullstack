import { Component, Output, EventEmitter } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-add-column',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './add-column.component.html',
  styleUrl: './add-column.component.css'
})
export class AddColumnComponent {
  @Output()
  emitTitle = new EventEmitter<string>();

  editState = false;
  changeState() {
    this.editState = !this.editState
  }

  submit(title: string) {
    this.changeState()
    if (title.length)
      this.emitTitle.emit(title)
  }
}
