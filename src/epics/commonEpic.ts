import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import ActionTypes from '../actions/ActionTypes';
import AjaxObservable from '../fetch/AjaxObservable';
import { Store } from '../reducers/State';
import { empty } from '../actions';
import { message } from 'antd';
import { MessageType } from '@fewbox/react-components';
import { createIntlCache, createIntl } from 'react-intl';
import langs from '../langs';
import { of } from 'rxjs';

const initAppEpic = (action$: ActionsObservable<any>, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_APP),
        mergeMap((action) => {
            let appsettings = window.localStorage.getItem(`${location.hostname}_lane_appsettings`);
            if (appsettings) {
                return of();
            }
            else {
                return new AjaxObservable({ isDirectly: true, url: `/appsettings.json`, method: 'GET' });
            }
        }),
        map((payload) => {
            window.localStorage.setItem(`${location.hostname}_lane_appsettings`, JSON.stringify(payload))
            return empty();
        }),
        catchError((errorAction) => {
            return errorAction;
        })
    );
const showMessageEpic = (action$: ActionsObservable<any>) =>
    action$.pipe(
        ofType(ActionTypes.SHOW_MESSAGE),
        map((action) => {
            const cache = createIntlCache();
            let messages = langs(window.localStorage.getItem('lang') ? window.localStorage.getItem('lang') : 'en-us');
            const intl = createIntl({
                locale: 'en',
                messages: messages
            }, cache);

            let messageContent = intl.formatMessage({ id: action.value.intlId }, action.value.values);
            switch (action.value.type) {
                case MessageType.Error:
                    message.error(messageContent);
                    break;
                case MessageType.Info:
                    message.info(messageContent);
                    break;
                case MessageType.Success:
                    message.success(messageContent);
                    break;
                case MessageType.Warning:
                    message.warning(messageContent);
                    break;
                default:
                    break;
            }
            return empty();
        })
    );

const changeLanguageEpic = (action$: ActionsObservable<any>) =>
    action$.pipe(
        ofType(ActionTypes.CHANGE_LANGUAGE),
        map((action) => {
            window.localStorage.setItem('lang', action.lang);
            return empty();
        })
    );

export default [initAppEpic, showMessageEpic, changeLanguageEpic];