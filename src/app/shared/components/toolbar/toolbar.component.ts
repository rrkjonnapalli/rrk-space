import { Component, EventEmitter, Output } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { $black5 } from '@styles';
import { TOOLBAR_ACTIONS } from '@constants';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    NzCardModule,
    NzButtonModule,
    NzToolTipModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  sidebarStyle = {
    padding: '12px',
    height: '100%',
    display: 'flex',
    'background-color': $black5,
    'flex-direction': 'column'
  }

  @Output() action: EventEmitter<any> = new EventEmitter<any>();

  copyRoomID() {
    this.action.emit({ type: TOOLBAR_ACTIONS.COPY_ROOM_ID });
  }

}
