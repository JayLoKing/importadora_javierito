import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'login-form',
  imports: [CardModule,
    ImageModule,
    IconFieldModule,
    PasswordModule,
    InputTextModule,
    InputIconModule,
    FloatLabelModule,
    ButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormLoginComponent {

}
