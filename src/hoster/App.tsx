import '@/common/styles/css/App.css';

import { HosterCommunicator } from '@toilet-paper-games/core';

import { GameTemplateGameDataDefinition } from '../common/types/transfers';
import { Game } from './components/Game';
import { HosterGameModel } from './models/GameModel';

const hosterCommunicator = new HosterCommunicator<GameTemplateGameDataDefinition>();
export const hosterGameModel = new HosterGameModel(hosterCommunicator);

export const App = () => <Game />;
