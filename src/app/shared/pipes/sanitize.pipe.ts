import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'sanitize', standalone: true })
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) { }

  transform(v: any): any {
    return this._sanitizer.bypassSecurityTrustHtml(v);
  }
}
