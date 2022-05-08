import './style.css';
import { VirtualKeyBoard } from './ClassBoard';
import { arrKey } from './arrKey';
import { ListenKey } from './ClassListen';

let board = new VirtualKeyBoard('Virtual KeyBoard');
board.render(arrKey);

let listen = new ListenKey('textarea', '.keywords');
listen.void();
