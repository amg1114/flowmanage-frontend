import { Component } from '@angular/core';

import { ActionCreateComponent } from '../../components/buttons/action-create.component';
import { ActionFilterComponent } from '../../components/buttons/action-filter.component';
import { ActionInfoComponent } from '../../components/buttons/action-info.component';
import { LoggedUser } from '@app/core/interfaces/user/user.interface';
import { UsersService } from '@app/core/services/users.service';
import { LucideAngularModule, Loader } from 'lucide-angular';
import { WorkflowCardComponent } from '../../components/workflows/workflow-card/workflow-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dashboard-workflow-listing',
  imports: [
    ActionCreateComponent,
    ActionFilterComponent,
    ActionInfoComponent,
    LucideAngularModule,
    WorkflowCardComponent,
    RouterLink,
  ],
  templateUrl: './workflow-listing.component.html',
  styles: ``,
})
export class WorkflowListingComponent {
  readonly LoadIcon = Loader;

  loggedUser: LoggedUser | null = null;

  constructor(private usersService: UsersService) {
    this.usersService.loggedUser.subscribe((user) => {
      if (user) {
        this.loggedUser = user;
      }
    });
  }
}
