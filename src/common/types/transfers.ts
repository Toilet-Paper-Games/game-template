import { GameDataDefinition } from '@toilet-paper-games/core';

export enum GameTransfer {
  BUTTON_PRESS,
  CURRENT_BUTTON_COUNT,
}

export interface GameDataTransferStructure {
  type: GameTransfer;
  data: unknown;
}

export interface ButtonPressTransfer extends GameDataTransferStructure {
  type: GameTransfer.BUTTON_PRESS;
  data: {};
}

export interface CurrentButtonCountTransfer extends GameDataTransferStructure {
  type: GameTransfer.CURRENT_BUTTON_COUNT;
  data: {
    count: number;
  };
}

export type H2C = CurrentButtonCountTransfer;
export type C2H = ButtonPressTransfer;

export type GameDataTransferType = H2C | C2H;

export type Prettify<T> = {
  [K in keyof T]: T[K];
};

export type GameTemplateGameDataDefinition = Prettify<GameDataDefinition<C2H, H2C>>;

export function isGameDataTransfer(data: unknown): data is GameDataTransferType {
  return (
    typeof data === 'object' &&
    data !== null &&
    'type' in data &&
    typeof data.type === 'number' &&
    'data' in data &&
    typeof data.data !== 'undefined'
  );
}
