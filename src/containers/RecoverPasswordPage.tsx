import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Store } from '../reducers/State';
import './SignInPage.scss';
import RecoverPassword from '../components/RecoverPassword';

export interface IRecoverPasswordProps {
    form: any;
    intl: any;
}

class SRecoverPasswordPage extends React.Component<IRecoverPasswordProps, any> {
    public render() {
        return (
            <div className="recoverPasswordPage">
                <RecoverPassword />
            </div>
        );
    }
}

const mapStateToProps = ({ }: Store) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(SRecoverPasswordPage);