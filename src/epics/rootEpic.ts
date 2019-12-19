import { combineEpics } from 'redux-observable';
import signInPageEpic from './signInPageEpic';
import commonEpic from './commonEpic';
import landingPageEpic from './landingPageEpic';

export default combineEpics(...signInPageEpic, ...commonEpic, ...landingPageEpic);