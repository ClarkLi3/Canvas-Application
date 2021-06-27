import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PencilFrontendAssignment';
  isSignedIn = false;

  constructor(public authService:AuthService){}

  ngOnInit(): void {
    
    if(localStorage.getItem('user')!== null){
      this.isSignedIn=true
    }
    else {
      this.isSignedIn = false
    }
    
    
  }
  async loginWithGoogle(){
    await this.authService.loginWithGoogle();
    if (this.authService.isLoggedIn){
      this.isSignedIn = true;
    }
  }
  async handleLogout(){
    this.authService.logOut();
    this.isSignedIn = false;
  }
}
