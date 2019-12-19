import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Form, Row, Col, Tabs, Input, Icon, Checkbox, Button } from 'antd';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { reSignIn } from '../../actions';
import './style.scss';

const { TabPane } = Tabs;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export interface ISignIn {
    isSignInButtonLoading: boolean;
    signIn: (userName: string, password: string) => void;
    form: any;
    intl: any;
}


class SignIn extends React.PureComponent<ISignIn> {
    @autobind
    signIn(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.signIn(values.userName, values.password);
            }
        });
    }
    @autobind
    enter(e) {
        if (e.keyCode == 13 || e.key == 'Enter') {
            this.signIn(e);
        }
    }
    public render() {
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div className="signIn" onKeyDown={this.enter}>
                <Row style={{ height: "60px" }}></Row>
                <Row>
                    <Col span={5}></Col>
                    <Col span={14}>
                        <Row gutter={12}>
                            <Col span={12}><img src="/assets/images/signin.png" /></Col>
                            <Col span={12}>
                                <Form layout="inline" onSubmit={this.signIn}>
                                    <Tabs defaultActiveKey="1">
                                        <TabPane tab={<FormattedMessage id="Label.JWT" />} key="1">
                                            <Form.Item validateStatus={userNameError ? 'error' : ''} help={userNameError || ''}>
                                                {getFieldDecorator('userName', {
                                                    rules: [{ required: true, message: <FormattedMessage id='Message.UsernameRequired' /> }],
                                                })(
                                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={this.props.intl.formatMessage({ id: 'Label.Username' })} />
                                                )}
                                            </Form.Item>
                                            <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                                                {getFieldDecorator('password', {
                                                    rules: [{ required: true, message: <FormattedMessage id='Message.PasswordRequired' /> }],
                                                })(
                                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={this.props.intl.formatMessage({ id: 'Label.Password' })} />
                                                )}
                                            </Form.Item>
                                            <Form.Item>
                                                {getFieldDecorator('remember', {
                                                    valuePropName: 'checked',
                                                    initialValue: true,
                                                })(
                                                    <Checkbox><FormattedMessage id="Label.RememberMe" /></Checkbox>
                                                )}
                                                <Button type="link">
                                                    <FormattedMessage id="Label.ForgotPassword" />
                                                </Button>
                                            </Form.Item>
                                            <Form.Item>
                                                <Button>
                                                    <FormattedMessage id="Label.SignUp" />
                                                </Button>
                                                <Button type="primary" htmlType="submit" className="login-form-button" disabled={hasErrors(getFieldsError())} loading={this.props.isSignInButtonLoading}>
                                                    <FormattedMessage id="Label.SignIn" />
                                                </Button>
                                            </Form.Item>
                                        </TabPane>
                                        <TabPane tab={<FormattedMessage id="Label.Firebase" />} key="2">
                                        </TabPane>
                                        <TabPane tab={<FormattedMessage id="Label.Auth0" />} key="3">
                                        </TabPane>
                                    </Tabs>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={5}></Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = () => ({
})

const mapDispatchToProps = {
    reSignIn
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(injectIntl(SignIn)));