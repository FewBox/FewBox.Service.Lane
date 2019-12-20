import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Form, Row, Col, Tabs, Input, Icon, Checkbox, Button } from 'antd';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import './style.scss';
import { Link } from 'react-router-dom';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export interface IRecoverPassword {
    isRecoverButtonLoading: boolean;
    recoverPassword: (email: string) => void;
    form: any;
    intl: any;
}


class RecoverPassword extends React.PureComponent<IRecoverPassword> {
    @autobind
    recoverPassword(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
            }
        });
    }
    public render() {
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;
        const emailError = isFieldTouched('emailError') && getFieldError('emailError');
        return (
            <div className="recoverPassword">
                <Row style={{ height: "60px" }}></Row>
                <Row>
                    <Col span={5}></Col>
                    <Col span={14}>
                        <Row gutter={12}>
                            <Col span={12}><div className="background"></div></Col>
                            <Col span={12}>
                                <h4><FormattedMessage id="Label.RecoverPasswordTitle" /></h4>
                                <p><FormattedMessage id="Label.RecoverPasswordDescription" /></p>
                                <Form layout="inline" onSubmit={this.recoverPassword}>
                                    <Form.Item validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
                                        {getFieldDecorator('email', {
                                            rules: [{ required: true, message: <FormattedMessage id='Message.EmailRequired' /> }],
                                        })(
                                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={this.props.intl.formatMessage({ id: 'Label.Email' })} />
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        <Button>
                                            <Link to="/">
                                                <FormattedMessage id="Label.BackToSignIn" />
                                            </Link>
                                        </Button>
                                        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} loading={this.props.isRecoverButtonLoading}>
                                            <FormattedMessage id="Label.RecoverPassword" />
                                        </Button>
                                    </Form.Item>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(injectIntl(RecoverPassword)));