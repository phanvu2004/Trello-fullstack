import { Component } from '@angular/core';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { Hub } from 'aws-amplify/utils';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AmplifyAuthenticatorModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) {
    Hub.listen('auth', (data) => {
      this.onAuthEvent(data);
    });
  }

  onAuthEvent(payload: any) {
    if (payload.payload.event === "signedIn")
      this.router.navigate([''])
  }
}
