import '@/common/styles/css/App.css';

import { HosterCommunicator } from '@toilet-paper-games/core';

import { GameTemplateGameDataDefinition } from '../common/types/transfers';
import { HosterGameModel } from './models/GameModel';
import { Game } from './components/Game';

const hosterCommunicator = new HosterCommunicator<GameTemplateGameDataDefinition>();
export const hosterGameModel = new HosterGameModel(hosterCommunicator);

export const App = () => <Game />;
