/* @flow */
import React, { Component } from 'react';
import cx from 'classnames';
import { compose } from 'recompose';
import Grid from '@material-ui/core/Grid';
// import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import { ToastContainer } from 'react-toastify';
import {
  ErrorBoundary,
  withStyles,
  Footer,
  withStylesProps,
  //  License,
} from '@kudoo/components';
import Header from './Header';
import Gradient from './Gradient';
import ProductBlock from './ProductBlock';
// import FeatureBlock from './FeatureBlock';
// import Tablet from './Tablet';
import TeamMember from './TeamMember';
// import PricingPeriod from './PricingPeriod';
import SupportForm from './SupportForm';
import NewsLetter from './NewsLetter';
import JustinImage from 'images/justin.jpg';
import JadeImage from 'images/jade.jpg';
import TomImage from 'images/tom.png';
import SarjuImage from 'images/sarju.jpg';
import styles, { toastStyle } from './styles';
// JT -Commented out the Features section until we relaunch the CIS
/*
import dashboardImage from 'images/dashboard.png';
import attachmentsImage from 'images/attachments.png';
import approvalsImage from 'images/approvals.png';
import invoicingImage from 'images/invoicing.png';
import projectsImage from 'images/projects.png';
import timesheetsImage from 'images/timesheets.png';

const screenshotMap = {
  dashboard: dashboardImage,
  attachments: attachmentsImage,
  approvals: approvalsImage,
  invoicing: invoicingImage,
  projects: projectsImage,
  timesheets: timesheetsImage,
};

*/
type Props = {
  // ...$Exact<withStylesFlowType>,
};

class Home extends Component<Props> {
  static propTypes = {
    ...withStylesProps,
  };

  state = {
    selectedPricingPeriod: 0,
    selectedFeatureBlock: 'dashboard',
    selectedCurrency: 'USD',
  };

  _handleFreeTrialButtonClick = () => {
    if (typeof mixpanel != 'undefined') {
      mixpanel.track('Free trial button clicked', {
        'Page Name': 'Landing Page',
      });
    }
    window.location.href = 'https://app.kudoo.io/';
  };

  _renderBanner() {
    const { classes } = this.props;
    return (
      <Gradient>
        <div className={classes.banner}>
          <div className={classes.bannerTitle}>Where big ideas grow</div>
          <div className={classes.bannerSubtitle}>
            Elegant timesheets, seamless invoicing.
          </div>
        </div>
      </Gradient>
    );
  }

  _renderProduct() {
    const { classes } = this.props;
    return (
      <div className={classes.productWrapper} id="product">
        <h1 className={classes.sectionTitle}>Product</h1>
        <div className={classes.products}>
          <Grid container>
            <Grid item xs={12} sm={6} md={3}>
              <ProductBlock
                icon={<i className="fa fa-cloud" />}
                title={'Cloud Based'}
                description={
                  'No need to install anything. Get regular updates without upgrading.'
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ProductBlock
                icon={<i className="fa fa-retweet" />}
                title={'24/7 Support'}
                description={
                  'Speak to a human anytime, either via a phone call or live chat.'
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ProductBlock
                icon={<i className="fa fa-desktop" />}
                title={'Cross Platform'}
                description={
                  "It doesn't matter whether you're on Windows, Mac, iPhone or Android. Kudoo works everywhere."
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ProductBlock
                icon={<i className="fa fa-comments-o" />}
                title={'Request a Feature'}
                description={
                  "Wish we had a feature? We'll develop custom features just for you."
                }
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }

  _handleFeatureBlockClick = feature => {
    this.setState(() => {
      return {
        selectedFeatureBlock: feature,
      };
    });
  };

  _renderFeatures() {
    //const { classes, width } = this.props;
    const { classes } = this.props;
    return (
      <div className={classes.featureWrapper} id="features">
        {/*
        <h1
          className={cx(
            classes.sectionTitle,
            classes.sectionTitleWhite,
            classes.marginTop0
          )}>
          Features
        </h1>
        <div className={classes.features}>
          <Grid container>
            <Grid item xs={12} sm={6} lg={3}>
              <div className={classes.featuresSide}>
                <FeatureBlock
                  onClick={() => {
                    this._handleFeatureBlockClick('dashboard');
                  }}
                  icon={<i className="icon icon-dashboard" />}
                  iconPosition={width === 'xs' ? 'left' : 'right'}
                  title={'Dashboard'}
                  description={
                    'Beautiful dashboards give you an immediate overview of your businesses health.'
                  }
                />
                <FeatureBlock
                  onClick={() => {
                    this._handleFeatureBlockClick('timesheets');
                  }}
                  icon={<i className="icon icon-timesheets" />}
                  title={'Timesheets'}
                  iconPosition={width === 'xs' ? 'left' : 'right'}
                  description={
                    'Simple, flexible timesheets that allow advanced functionality for your staff.'
                  }
                />
                <FeatureBlock
                  onClick={() => {
                    this._handleFeatureBlockClick('invoicing');
                  }}
                  icon={<i className="icon icon-invoicing" />}
                  title={'Invoicing'}
                  iconPosition={width === 'xs' ? 'left' : 'right'}
                  description={
                    'Improve your cash flow by easily converting timesheets to invoices.'
                  }
                />
              </div>
            </Grid>
            <Hidden mdDown>
              <Grid item lg={6}>
                <Tablet
                  screenSrc={screenshotMap[this.state.selectedFeatureBlock]}
                />
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={6} lg={3}>
              <div className={classes.featuresSide}>
                <FeatureBlock
                  onClick={() => {
                    this._handleFeatureBlockClick('approvals');
                  }}
                  icon={<i className="icon icon-tick" />}
                  title={'Approvals'}
                  description={
                    'Reduce invoicing errors by enabling intuitive timesheet approvals.'
                  }
                />
                <FeatureBlock
                  onClick={() => {
                    this._handleFeatureBlockClick('attachments');
                  }}
                  icon={<i className="icon icon-sales" />}
                  title={'Attachments'}
                  description={
                    'Attachments can be added to timesheets and invoicing for supporting documentation.'
                  }
                />
                <FeatureBlock
                  onClick={() => {
                    this._handleFeatureBlockClick('projects');
                  }}
                  icon={<i className="icon icon-projects" />}
                  title={'Projects'}
                  description={
                    'Projects allow you to perform advanced invoicing and billing rules.'
                  }
                />
              </div>
            </Grid>
          </Grid>
        </div>
                */}
      </div>
    );
  }

  _renderIntegration() {
    const { classes } = this.props;
    return (
      <div className={classes.integrationWrapper}>
        {/*
        <h1 className={classes.sectionTitle}>Integrations</h1>
        */}
        <Grid container>
          {/* <Grid item xs={12} sm={6} /> */}
          {/*
          <Grid item xs={12}>
            <div className={classes.integrationTitle}>
              Connect with your favourite apps
            </div>
            <div className={classes.integrations}>
              <Grid container>
                <Grid item xs={12} md={4}>
                  <div className={classes.integrationIconWrapper}>
                    <img
                      src={require('images/slack_logo.png')}
                      alt="Slack logo"
                      className={classes.integrationIcon}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div className={classes.integrationIconWrapper}>
                    <img
                      src={require('images/microsoft_dynamics_logo.png')}
                      alt="Microsoft D365 logo"
                      className={classes.integrationIcon}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div className={classes.integrationIconWrapper}>
                    <img
                      src={require('images/zapier_logo.png')}
                      alt="Zapier logo"
                      className={classes.integrationIcon}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
          */}
        </Grid>
      </div>
    );
  }

  _onConvertCurrencyDDChange = async value => {
    this.setState({ selectedCurrency: value });
  };

  _renderPricing() {
    const { classes } = this.props;
    //    const { selectedCurrency } = this.state;
    // const { selectedPricingPeriod } = this.state;
    // const isMonthly = selectedPricingPeriod === PricingPeriodType.MONTHLY;
    return (
      <div className={classes.pricingWrapper} id="pricing">
        {/*
        <h1 className={classes.sectionTitle}>Pricing</h1>
        */}
        {/*        <PricingPeriod
          onChange={index => {
            this.setState({ selectedPricingPeriod: index });
          }}
        />
        <div className={classes.thrityDayTrial}>
          Sign up for our 30 days free trial
        </div>

        <div className={classes.pricings}>
          <License
            {...this.props}
            currency={selectedCurrency || 'USD'}
            isVizierRepo={false}
            isWebsite={true}
            subscriptionPrice={[
              Number(process.env.ONE_OF_FEE_FREE),
              Number(process.env.ONE_OF_FEE_PAID),
            ]}
            subscriptionRange={Number(process.env.LICENSE_REVENUE)}
            onConvertCurrencyDDChange={this._onConvertCurrencyDDChange}
          />
        </div>
          */}
      </div>
    );
  }

  _renderTeam() {
    const { classes } = this.props;
    return (
      <Gradient classes={{ component: classes.teamWrapper }} id="team">
        <h1 className={classes.sectionTitle}>Our Team</h1>
        <div className={classes.teamMembers}>
          <Grid container>
            <Grid item xs={12} sm={6} md={3}>
              <TeamMember
                avatar={JustinImage}
                name="Justin Trollip"
                title="CO FOUNDER & CEO"
                description="A polymath with an insatiable curiosity and love of technology."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TeamMember
                avatar={JadeImage}
                name="Jade Mallett"
                title="CO FOUNDER & UX STRATEGIST"
                description="Making beautiful, user centric design a core tenet of our strategy."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TeamMember
                avatar={SarjuImage}
                name="Sarju Hansaliya"
                title="FULL STACK ENGINEER"
                description="An incredibly talented developer, producing state of the art code."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TeamMember
                avatar={TomImage}
                name="Tomasz Sulima"
                title="BACK-END ENGINEER"
                description="Our Elixir wizard. Creating lightning fast distributed back-ends."
              />
            </Grid>
          </Grid>
        </div>
      </Gradient>
    );
  }

  _renderSupport() {
    const { classes } = this.props;
    return (
      <div className={classes.supportWrapper} id="support">
        <h1 className={classes.sectionTitle} style={{ marginTop: 0 }}>
          Support
        </h1>
        <div className={classes.supportContent}>
          <Grid container>
            <Grid item xs={12} lg={4}>
              <div
                className={cx(classes.supportInfoWrapper, classes.contactIcon)}>
                <Gradient classes={{ component: classes.supportInfoIcon }}>
                  <i className="fa fa-phone" />
                </Gradient>
                <div className={classes.supportInfo}>
                  <div className={classes.supportInfoTitle}>Contact Us</div>
                  <div className={classes.supportInfoText}>+61 03 45052405</div>
                  <div className={classes.supportInfoText}>
                    support@kudoo.cloud
                  </div>
                </div>
              </div>
              <div className={classes.supportInfoWrapper}>
                <Gradient classes={{ component: classes.supportInfoIcon }}>
                  <i className="fa fa-user-circle-o" />
                </Gradient>
                <div className={classes.supportInfo}>
                  <div className={classes.supportInfoTitle}>Live Chat</div>
                  <div className={classes.supportInfoText}>
                    Available Hours:
                  </div>
                  <div className={classes.supportInfoText}>
                    9am - 6pm (AEST)
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} lg={8}>
              <SupportForm />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <ErrorBoundary>
        <div className={classes.page}>
          <Header />
          {this._renderBanner()}
          {this._renderProduct()}
          <NewsLetter />
          {this._renderFeatures()}
          {this._renderIntegration()}
          {this._renderPricing()}
          {this._renderTeam()}
          {this._renderSupport()}
          <Footer />
        </div>
        <ToastContainer
          closeButton={false}
          hideProgressBar
          toastClassName={toastStyle}
        />
      </ErrorBoundary>
    );
  }
}

export default compose(
  withWidth(),
  withStyles(styles)
)(Home);
