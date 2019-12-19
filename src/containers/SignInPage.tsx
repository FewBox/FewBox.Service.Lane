import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Row, Input, Button, Form, Icon, Checkbox, Avatar } from 'antd';
import { autobind } from 'core-decorators';
import { Redirect, MessageType } from '@fewbox/react-components';
import { Store } from '../reducers/State';
import { signIn, clearPath } from '../actions';
import SignIn from '../components/SignIn';
import './SignInPage.scss';

export interface ISignInProps {
    form: any;
    intl: any;
    username: string;
    isUsernameAndPasswordValid: boolean;
    signIn: (username, password) => void;
    clearPath: () => void;
    changeUserType: any;
    redirectPath: string;
    isSignInButtonLoading: boolean;
}

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class SignInPage extends React.Component<ISignInProps, any> {
    public render() {
        return (
            <div className="signInPage">
                <SignIn intl={this.props.intl} />
                <Redirect path={this.props.redirectPath} clearPath={this.props.clearPath} />
            </div>
        );
    }
}

const mapStateToProps = ({ signinPage, masterPage }: Store) => ({
    isUsernameAndPasswordValid: signinPage.isUsernameAndPasswordValid,
    isSignInButtonLoading: signinPage.isSignInButtonLoading,
    redirectPath: masterPage.path
})

const mapDispatchToProps = {
    signIn,
    clearPath
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);