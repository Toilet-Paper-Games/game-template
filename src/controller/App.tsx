import '@/common/styles/css/App.css';

import { ControllerCommunicator } from '@toilet-paper-games/core';

import { GameTemplateGameDataDefinition } from '../common/types/transfers';
import { ControllerGameModel } from './models/GameModel';
import { Game } from './components/Game';

const controllerCommunicator =
  new ControllerCommunicator<GameTemplateGameDataDefinition>();
export const controllerGameModel = new ControllerGameModel(controllerCommunicator);

export const App = () => <Game />;
