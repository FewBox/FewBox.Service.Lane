import * as React from 'react';
import { Icon } from 'antd';
import GreenLogoSvg from '../../../assets/images/logo-green.svg';
import WhiteLogoSvg from '../../../assets/images/logo-white.svg';

const fontSize = { fontSize: '20px' };
export const GreenLogoIcon = props => <Icon style={fontSize} component={GreenLogoSvg} {...props} />;
export const WhiteLogoIcon = props => <Icon style={fontSize} component={WhiteLogoSvg} {...props} />;
// No style
export const NoStyleGreenLogoIcon = props => <Icon component={GreenLogoSvg} {...props} />;
export const NoStyleWhiteLogoIcon = props => <Icon component={WhiteLogoSvg} {...props} />;