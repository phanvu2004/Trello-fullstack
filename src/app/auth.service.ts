import { Injectable } from '@angular/core';
import { AuthUser, getCurrentUser, signOut } from 'aws-amplify/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }
  user: Partial<AuthUser> = {}

  async getUser() {
    if (JSON.stringify(this.user) == '{}')
      this.user = await getCurrentUser()

    return this.user;
  }
  async signOut() {
    this.user = {}
    await signOut()
    this.router.navigate(['login'])
  }

  async isAuthenticated() {
    try {
      await getCurrentUser()
      return true
    } catch (error) {
      return false;
    }
  }
}
