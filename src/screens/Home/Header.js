import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { compose } from 'recompose';
import ButtonBase from '@material-ui/core/ButtonBase';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import scrollToElement from 'scroll-to-element';
//import { withStyles, Button, withStylesProps } from '@kudoo/components';
import { withStyles, withStylesProps } from '@kudoo/components';
import { HeaderStyles as styles } from './styles';

type Props = {
  showLinks: boolean,
  // ...$Exact<withStylesFlowType>
};

class Header extends React.Component<Props, any> {
  _header: HTMLElement;
  static propTypes = {
    showLinks: PropTypes.bool,
    ...withStylesProps,
  };

  static defaultProps = {
    showLinks: true,
  };

  state = {
    isSticky: false,
    openSmallMenu: false,
  };

  componentDidMount() {
    this._init();
  }

  componentWillUnmount() {
    this._detach();
  }

  _init() {
    window.addEventListener('scroll', this._checkSticky);
    window.addEventListener('resize', this._checkSticky);
  }

  _detach() {
    window.removeEventListener('scroll', this._checkSticky);
    window.removeEventListener('resize', this._checkSticky);
  }

  _checkSticky = () => {
    const height = this._header.offsetHeight;
    this.setState({
      isSticky: window.scrollY >= height,
    });
  };

  _scrollTo = id => () => {
    scrollToElement(`#${id}`, {
      offset: -this._header.offsetHeight,
      ease: 'linear',
      duration: 500,
    });
    this.setState({ openSmallMenu: false });
  };

  _toggleSmallMenu = () => {
    this.setState(prevState => ({
      openSmallMenu: !prevState.openSmallMenu,
    }));
  };

  _renderBigMenu() {
    const { classes, showLinks } = this.props;
    //const { classes, theme, showLinks } = this.props;
    return (
      <div className={classes.bigHeader}>
        <a className={classes.logoWrapper} href="https://kudoo.io/">
          <img
            src={require('@kudoo/components/build/assets/images/logo.png')}
            alt="Kudoo logo"
            className={classes.logo}
          />
        </a>
        {showLinks ? (
          <div className={classes.headerMiddle}>
            <a
              className={classes.headerLink}
              onClick={this._scrollTo('product')}>
              Product
            </a>
            {/*
            <a
              className={classes.headerLink}
              onClick={this._scrollTo('features')}>
              Features
            </a>
            <a
              className={classes.headerLink}
              onClick={this._scrollTo('pricing')}>
              Pricing
            </a>
            */}
            <a className={classes.headerLink} onClick={this._scrollTo('team')}>
              Team
            </a>
            <a
              className={classes.headerLink}
              onClick={this._scrollTo('support')}>
              Support
            </a>
          </div>
        ) : (
          <div className={classes.headerMiddle} />
        )}
        <div className={classes.headerRightPart}>
          {/*
          <Button
            classes={{
              component: classes.loginButton,
              text: classes.loginButtonText,
            }}
            title="Login"
            href="https://app.kudoo.io/#/login"
            width={100}
          />
          <Button
            title="Sign Up"
            href="https://app.kudoo.io/#/login"
            buttonColor={theme.palette.primary.color2}
            applyBorderRadius
            width={200}
          />
          */}
        </div>
      </div>
    );
  }

  _renderSmallMenu() {
    const { classes, showLinks } = this.props;
    return (
      <div className={classes.smallHeader}>
        <a className={classes.logoWrapper} href="https://kudoo.io/">
          <img
            src={require('images/logo.png')}
            alt="Kudoo logo"
            className={classes.smallLogo}
          />
        </a>
        <ButtonBase
          classes={{ root: classes.hamburgerIcon }}
          onClick={this._toggleSmallMenu}>
          <i className="fa fa-bars" />
        </ButtonBase>
        {this.state.openSmallMenu ? (
          <div className={classes.smallMenuWrapper}>
            {showLinks && (
              <div>
                <ButtonBase
                  component="a"
                  className={classes.smallMenuItem}
                  onClick={this._scrollTo('product')}>
                  Product
                </ButtonBase>
                <ButtonBase
                  component="a"
                  className={classes.smallMenuItem}
                  onClick={this._scrollTo('features')}>
                  Features
                </ButtonBase>
                <ButtonBase
                  component="a"
                  className={classes.smallMenuItem}
                  onClick={this._scrollTo('pricing')}>
                  Pricing
                </ButtonBase>
                <ButtonBase
                  component="a"
                  className={classes.smallMenuItem}
                  onClick={this._scrollTo('team')}>
                  Team
                </ButtonBase>
                <ButtonBase
                  component="a"
                  className={classes.smallMenuItem}
                  onClick={this._scrollTo('support')}>
                  Support
                </ButtonBase>
              </div>
            )}
            <ButtonBase
              component="a"
              className={classes.smallMenuItem}
              href="https://app.kudoo.io/#/login">
              Login
            </ButtonBase>
            <ButtonBase
              component="a"
              className={classes.smallMenuItem}
              href="https://app.kudoo.io/#/login">
              Sign Up
            </ButtonBase>
          </div>
        ) : null}
      </div>
    );
  }

  render() {
    const { classes, width } = this.props;
    return (
      <div
        className={cx(classes.component, {
          sticky: this.state.isSticky,
        })}
        ref={ref => (this._header = ref)}>
        {isWidthDown('md', width)
          ? this._renderSmallMenu()
          : this._renderBigMenu()}
      </div>
    );
  }
}

export default compose(
  withWidth(),
  withStyles(styles)
)(Header);
