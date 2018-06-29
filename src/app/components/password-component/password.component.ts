import { Component } from '@angular/core';
import { PasswordService } from './password.service';
@Component({
  selector: 'app-pass',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
  providers : [PasswordService]
})
export class PasswordComponent {
  title = 'Password Component';
}
