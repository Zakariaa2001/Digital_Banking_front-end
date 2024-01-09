import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink],
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent {
  constructor(public authService:AuthServiceService,private router:Router){}

  handleLogout(){
    this.authService.logout();
  }
}
