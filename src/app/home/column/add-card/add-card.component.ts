import { Component, Output, EventEmitter } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-card',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './add-card.component.html',
  styleUrl: './add-card.component.css'
})
export class AddCardComponent {
  editState = false;
  @Output()
  emitTitle = new EventEmitter<string>();
  changeState() {
    this.editState = !this.editState
  }

  submit(title: string) {
    this.changeState()
    if (title.length)
      this.emitTitle.emit(title)
  }
}
