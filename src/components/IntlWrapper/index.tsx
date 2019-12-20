import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ComingSoonPage from '../../containers/ComingSoonPage';
import SignInPage from '../../containers/SignInPage';
import SignUpPage from '../../containers/SignUpPage';
import RecoverPasswordPage from '../../containers/RecoverPasswordPage';
import MasterPage from '../../containers/MasterPage';
import { injectIntl } from 'react-intl';

class IntlWrapper extends React.Component<any, any> {
    public render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={SignInPage} />
                        <Route exact path="/signup" component={SignUpPage} />
                        <Route exact path="/recoverpassword" component={RecoverPasswordPage} />
                        <Route path="/master" component={MasterPage} />
                        <Route component={ComingSoonPage} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default injectIntl(IntlWrapper);