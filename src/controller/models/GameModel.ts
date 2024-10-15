import { ControllerCommunicator } from '@toilet-paper-games/core';

import {
  GameTemplateGameDataDefinition,
  GameTransfer,
} from '../../common/types/transfers';
import { action, makeAutoObservable } from 'mobx';

export class ControllerGameModel {
  count = 0;

  constructor(
    public controllerCommunicator: ControllerCommunicator<GameTemplateGameDataDefinition>,
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.setupListeners();
    this.controllerCommunicator.ready();
  }

  setupListeners() {
    this.controllerCommunicator.addGameMessageListener(
      action((data) => {
        if (data.payload.type === GameTransfer.CURRENT_BUTTON_COUNT) {
          this.count = data.payload.data.count;
        }
      }),
    );
  }

  sendIncrementCount() {
    this.controllerCommunicator.sendGameMessage({
      type: GameTransfer.BUTTON_PRESS,
      data: {},
    });
  }
}
