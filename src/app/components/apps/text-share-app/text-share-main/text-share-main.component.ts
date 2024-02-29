import { Component, OnInit, ViewChild } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FormsModule } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import _ from 'lodash';
import { SanitizeHtmlPipe } from '@shared/pipes/sanitize.pipe';
import { $black5 } from '@styles';
import { getRandomInt, getUUID } from '@utils';
import { presetColors } from 'ng-zorro-antd/core/color';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_ENUMS, IO, ROUTES } from '@constants';
import { CmEditorComponent } from '@shared/components/cm-editor/cm-editor.component';
import { RoomCreatorComponent } from '@shared/components/room-creator/room-creator.component';
import { RoomService } from '@services/room/room.service';
import { IoService } from '@services/io/io.service';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';

@Component({
  selector: 'app-text-share-main',
  standalone: true,
  imports: [
    NzInputModule,
    NzCardModule,
    NzAvatarModule,
    NzButtonModule,
    FormsModule,
    NzToolTipModule,
    SanitizeHtmlPipe,
    RoomCreatorComponent,
    CmEditorComponent,
    ToolbarComponent
  ],
  providers: [
    SanitizeHtmlPipe
  ],
  templateUrl: './text-share-main.component.html',
  styleUrl: './text-share-main.component.scss'
})
export class TextShareMainComponent implements OnInit {

  roomType = APP_ENUMS.TEXT_SHARE;

  cardBodyStyle = {
    padding: '5px',
    height: '100%',
    display: 'flex',
    'background-color': $black5,
    'flex-direction': 'column'
  };

  msgBodyStyle = {
    padding: '0px 5px',
    display: 'flex',
    'background-color': $black5
  }

  id = 1;
  messages: any = [];
  msg: any;

  submitPending = false;
  user = String.fromCharCode(getRandomInt(65, 90));
  roomID = '';

  @ViewChild('msgContainer') msgContainer: any;

  isJoined = false;

  colors = presetColors;

  constructor(private roomService: RoomService, private io: IoService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.roomService.setCurrentRoomType(this.roomType);
    this.io.init(IO.TEXT_SHARE_SERVER);
    const routeParams = this.route.snapshot.params;
    this.roomID = _.get(routeParams, 'id');
    if (!this.isJoined && this.roomID) {
      this.roomService.joinRoom({ roomID: this.roomID });
      this.isJoined = true;
    }

    this.roomService.currentRoom$.subscribe({
      next: (roomID) => {
        if (!roomID || roomID !== 'invalid') return;
        this.roomService.setCurrentRoom('');
        return this.router.navigate(ROUTES.TEXT_SHARE.HOME());
      }
    })
    this.roomService.setCurrentRoom(this.roomID);


    this.roomService.messages$.subscribe({
      next: (messages) => {
        let lastUser: any = null;
        this.messages = messages.map((e: any) => {
          if (e.user !== lastUser) {
            e.needAvatar = true;
          }
          lastUser = e.user;
          return e;
        });
      }
    })
  }

  onToolbarAction(event: any) {
    if (event.type === 'COPY_ROOM_ID') {
      this.copyRoomID();
    }
  }

  copyRoomID() {
    navigator.clipboard.writeText(this.roomID).catch((e) => {
      console.log(`error while copy`,e);
    })
  }

  scrollToBottom() {
    if (!this.msgContainer) {
      return;
    }
    setTimeout(() => {
      const element = this.msgContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    }, 100);
  }


  onSubmit() {
    if (this.submitPending) {
      return;
    }
    this.submitPending = true;
    this.addMessage(_.get(this.msg, 'dom.innerHTML', ''));
    this.submitPending = false;
  }

  private formatText(msg: string) {
    let s = msg;
    s = s.replaceAll('  ', '&nbsp;&nbsp;');
    s = s.replace(' ', '&nbsp;');
    return s;
  }

  needAvatar(ix: number) {
    if (ix === 0) {
      return true;
    }
    const lastUser = _.get(this.messages[ix - 1], 'user');
    return this.user !== lastUser ? true : false;
  }

  getToolTipTitle(m: any) {
    const time = _.get(m, 'time');
    const user = _.get(m, 'user');
    return `at ${new Date(time).toLocaleString()} by ${user}`;
  }

  addMessage = (msg: string) => {
    if (_.isEmpty(msg)) {
      return;
    }
    const message = {
      text: this.formatText(msg),
      time: new Date(),
      id: getUUID(),
      user: this.user
    };
    this.roomService.sendMessage(message);
    this.msg = { text: [], dom: '', new: true };
    this.scrollToBottom();
  }

}
