import { Routes } from '@angular/router';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppsBoardComponent } from './components/apps/apps-board/apps-board.component';
import { TextShareMainComponent } from './components/apps/text-share-app/text-share-main/text-share-main.component';
import { RealStreamMainComponent } from './components/apps/real-stream/real-stream-main/real-stream-main.component';
import { AuctionComponent } from './components/apps/auction-app/auction/auction.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/apps'
  },
  {
    path: 'apps',
    component: AppsBoardComponent
  },
  {
    path: 'text-share',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: TextShareMainComponent
      },
      {
        path: ':id',
        component: TextShareMainComponent
      }
    ]
  },
  {
    path: 'real-stream',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: RealStreamMainComponent
      },
      {
        path: ':id',
        component: RealStreamMainComponent
      }
    ]
  },
  {
    path: 'auction',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AuctionComponent
      },
      {
        path: ':id',
        component: AuctionComponent
      }
    ]
  },
  {
    path: 'me',
    component: PortfolioComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
