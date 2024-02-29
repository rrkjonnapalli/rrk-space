import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apps-board',
  standalone: true,
  imports: [],
  templateUrl: './apps-board.component.html',
  styleUrl: './apps-board.component.scss'
})
export class AppsBoardComponent {
  apps = [
    {
      name: 'Me',
      link: ['me']
    },
    {
      name: 'Text Share',
      link: ['text-share']
    },
    {
      name: 'Real Stream',
      link: ['real-stream']
    },
    {
      name: 'Auction',
      link: ['auction']
    },
    {
      name: 'Others',
      link: ['others']
    }
  ]

  constructor(private router: Router) {
  }

  gotoApp(app: any) {
    this.router.navigate(app.link);
  }
}
