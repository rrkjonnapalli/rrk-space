import { deleteTrailingWhitespace, indentLess, indentMore } from "@codemirror/commands";
import { keymap } from "@codemirror/view";
import { basicSetup } from "codemirror";


/**
 *
 * https://pastebin.com/28Z610Es
 */

export const stateExt = [
  basicSetup,
  keymap.of([
    { key: "Tab", run: indentMore, shift: indentLess }
  ])
];

export const viewExt= [

];
