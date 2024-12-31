import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoggedUser } from '@app/core/interfaces/user/user.interface';

@Component({
  selector: 'dashboard-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {
  @Input() LoggedUser!: LoggedUser;
}
