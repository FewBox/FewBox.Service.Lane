import * as React from 'react';
import { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { FormattedMessage } from 'react-intl';
import { Store } from '../reducers/State';
import { Layout, Menu, Icon, Dropdown, Avatar, Skeleton, message, Result, Button } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
import { Route, Link, Switch } from 'react-router-dom';
import { Redirect, MessageType } from '@fewbox/react-components';
import { hideMessage, signOut, clearPath, showLockWindow, hideLockWindow } from '../actions';
const LandingPage = lazy(() => import('./LandingPage'));
const AboutPage = lazy(() => import('./AboutPage'));
import './MasterPage.scss';
import { GreenLogoIcon, WhiteLogoIcon } from '../components/Icon';
import SignIn from '../components/SignIn';

export interface IMasterPageProps {
    signOut: () => void;
    clearPath: () => void;
    redirectPath: (string) => void;
    isLockWindowVisible: boolean;
    signIn: (username, password) => void;
    hideLockWindow: () => void;
    intl?: any;
}

class MasterPage extends React.Component<IMasterPageProps, any> {
    constructor(props) {
        super(props);
        this.state = { collapsed: false };
    }

    @autobind
    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    public render() {
        message.config({ maxCount: 3 });
        const menu = (
            <Menu>
                <Menu.Item>
                    <Button type='link' onClick={this.props.signOut}><FormattedMessage id="Label.SignOut" /></Button>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className="masterPage">
                <SignIn isVisiable={this.props.isLockWindowVisible} signIn={this.props.signIn} close={this.props.hideLockWindow} />
                <Redirect path={this.props.redirectPath} clearPath={this.props.clearPath} />
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <div className='logo'>
                            <Avatar size={64} src="/assets/images/logo-green.svg" />
                        </div>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
                            <Menu.Item key="0">
                                <Link to='/master/landing'><WhiteLogoIcon />
                                    <FormattedMessage id="Navigation.Landing" /></Link>
                            </Menu.Item>
                            <Menu.SubMenu key='sub1' title={<span><WhiteLogoIcon /><FormattedMessage id="Navigation.Unknow" /></span>}>
                                <Menu.Item key="11">
                                    <Link to='/master/unknow'><WhiteLogoIcon />
                                            <FormattedMessage id="Navigation.Unknow" /></Link>
                                </Menu.Item>
                            </Menu.SubMenu>
                            <Menu.Item key="3">
                                <Link to='/master/about'><Icon type="info-circle" />
                                    <FormattedMessage id="Navigation.About" /></Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link" href="#" style={{ float: 'right', marginRight: '20px' }}>
                                    <Avatar icon="user" style={{ marginRight: '5px' }} />
                                    <Icon type="down" />
                                </a>
                            </Dropdown>
                        </Header>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                            <Suspense fallback={<Skeleton active />}>
                                <Switch>
                                    <Route path="/master/landing" render={props => <LandingPage {...props} />} />
                                    <Route path="/master/about" render={props => <AboutPage {...props} />} />
                                    <Route component={() => <Result status='error' icon={<GreenLogoIcon />} title={<FormattedMessage id="Message.404" />} subTitle={<FormattedMessage id="Message.404Caption" />} />} />
                                </Switch>
                            </Suspense>
                        </Content>
                        <Footer><FormattedMessage id="Label.Copyright" /></Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = ({ }: Store) => ({
})

const mapDispatchToProps = {
    hideMessage,
    signOut,
    clearPath,
    hideLockWindow,
    showLockWindow
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterPage);