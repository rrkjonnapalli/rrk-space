import _ from "lodash";

_.set(window, '_', _);

export function getRandomInt(min: number, max: number) {

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getUUID() {
  return crypto.randomUUID();
}
