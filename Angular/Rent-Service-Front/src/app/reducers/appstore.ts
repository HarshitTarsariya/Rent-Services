import { Store } from '@ngrx/store';
import {createStore} from 'redux';
import { Appstate } from './appstate';
import {appreducer} from './appreducer'

const appstore=createStore(appreducer)

export default appstore