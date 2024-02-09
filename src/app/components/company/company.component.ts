import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent implements OnChanges {
  @Input('company') item: any;
  @Input() tileStyle = 'bg-white';

  textStyle = 'text-black';

  ngOnChanges(changes: SimpleChanges): void {
    if (_.get(changes, 'tileStyle')) {
      this.textStyle = this.tileStyle === 'bg-white' ? 'text-black' : 'text-white';
    }
  }

}
