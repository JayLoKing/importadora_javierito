import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginContainerComponent } from '../modules/auth/components/login/login-container/login-container.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ImportadoraJavieritoWeb';
}
