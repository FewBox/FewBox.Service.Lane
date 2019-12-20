import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Store } from '../reducers/State';
import './SignInPage.scss';
import SignUp from '../components/SignUp';

export interface ISignUpProps {
    form: any;
    intl: any;
}

class SignUpPage extends React.Component<ISignUpProps, any> {
    public render() {
        return (
            <div className="signUpPage">
                <SignUp />
            </div>
        );
    }
}

const mapStateToProps = ({ }: Store) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);