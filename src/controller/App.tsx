import '@/common/styles/css/App.css';

import { ControllerCommunicator } from '@toilet-paper-games/core';

import { GameTemplateGameDataDefinition } from '../common/types/transfers';
import { Game } from './components/Game';
import { ControllerGameModel } from './models/GameModel';

const controllerCommunicator =
  new ControllerCommunicator<GameTemplateGameDataDefinition>();
export const controllerGameModel = new ControllerGameModel(controllerCommunicator);

export const App = () => <Game />;
