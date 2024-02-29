import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, placeholder } from '@codemirror/view';
import _ from 'lodash';
import { stateExt } from './ext';

@Component({
  selector: 'app-cm-editor-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CmEditorComponent)
    }
  ],
  templateUrl: './cm-editor.component.html',
  styleUrl: './cm-editor.component.scss'
})
export class CmEditorComponent implements AfterViewInit, ControlValueAccessor {
  @ViewChild('editor', { static: true }) editor: any;


  /**
   *
   *
   * https://discuss.codemirror.net/t/codemirror-6-proper-way-to-listen-for-changes/2395/11
   *
   *
   */

  @Input()
  lineNumbers: boolean = true;

  @Input()
  readonly: boolean = false;

  private _code!: any;

  onTouched = () => { };
  onChanged = (v: any) => { };

  @Output() editorSubmit: EventEmitter<any> = new EventEmitter<any>();

  state!: EditorState;
  view!: EditorView;

  constructor() {
  }


  ngAfterViewInit(): void {
    if (!this.editor) {
      return;
    }
    const element = this.editor.nativeElement;

    try {
      this.setState('');
    } catch (e) {
      console.error(e);
    }

    this.view = new EditorView({
      state: this.state,
      parent: element,
      extensions: [
        EditorView.theme({
          '.cm-editor': {height: '100% !important'}
        }),
      ]
    });

    this.view.focus();
  }

  submit = () => {
    let text: any = _.get(this.view, 'state.doc.text', []);
    let firstIx = Infinity;
    let lastIx = -Infinity;
    text = text.map((e: string, ix: number) => {
      if (!e) { return ''; }
      const trimLength = e.trim().length;
      if (!trimLength) { return ''; }
      if (firstIx > ix) {
        firstIx = ix;
      }
      if (lastIx < ix) {
        lastIx = ix;
      }
      return e;
    });
    text = text.slice(firstIx, lastIx + 1);
    this.writeValue({ text });
    this.editorSubmit.emit();
  }

  setState(str: string) {
    this.state = EditorState.create({
      doc: str,
      extensions: [
        ...stateExt,
        placeholder('Enter text here...'),
        EditorView.theme({
          '.cm-editor': {height: '100% !important'},
          '.c1': {height: '100% !important'}
        }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            this.onChanged({
              text: _.get(update.state.doc, 'text'),
              dom: this.view.contentDOM
            });
          }
        }),
        keymap.of([
          {
            key: 'Ctrl-Enter',
            run: () => {
              this.submit();
              return true;
            }
          }
        ])
      ]
    });
  }

  writeValue(input: any): void {
    const str = _.get(input, 'text', []).join('\n');
    if (_.get(input, 'new') || str !== this._code) {
      _.unset(input, 'new');
      this._code = str;
      this.setState(this._code)
      this.view.setState(this.state);
      this.view.focus();
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.readonly = isDisabled;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
}
