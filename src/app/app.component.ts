import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import  outputs from "../../amplify_outputs.json";
import { Amplify } from 'aws-amplify';

Amplify.configure(outputs)
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor() {
    Amplify.configure(outputs)
  }
}
