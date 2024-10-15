import { HosterCommunicator } from '@toilet-paper-games/core';

import {
  GameTemplateGameDataDefinition,
  GameTransfer,
} from '../../common/types/transfers';
import { makeAutoObservable } from 'mobx';

export class HosterGameModel {
  count = 0;

  constructor(
    public hosterCommunicator: HosterCommunicator<GameTemplateGameDataDefinition>,
  ) {
    makeAutoObservable(this);
    this.setupListeners();
    this.hosterCommunicator.ready();
  }

  setupListeners() {
    this.hosterCommunicator.addGameMessageListener((data) => {
      if (data.payload.type === GameTransfer.BUTTON_PRESS) {
        this.count++;
        this.hosterCommunicator.broadcastGameMessage({
          type: GameTransfer.CURRENT_BUTTON_COUNT,
          data: {
            count: this.count,
          },
        });
      }
    });

    this.hosterCommunicator.playerStore.addPlayerReadyListener((player) => {
      this.hosterCommunicator.sendGameMessage(
        {
          type: GameTransfer.CURRENT_BUTTON_COUNT,
          data: {
            count: this.count,
          },
        },
        player.connectionId,
      );
    });
  }
}
