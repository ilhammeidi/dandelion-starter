import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import guideData from 'dan-api/dummy/guideData';
import styles from './guide-jss';

const maxStepsSwipe = guideData.length;

const Transition = React.forwardRef(function Transition(props, ref) { // eslint-disable-line
  return <Slide direction="up" ref={ref} {...props} />;
});

class GuideSlider extends React.Component { // eslint-disable-line
  state = {
    activeStepSwipe: 0,
  };

  handleNextSwipe = () => {
    this.setState(prevState => ({
      activeStepSwipe: prevState.activeStepSwipe + 1,
    }));
  };

  handleBackSwipe = () => {
    this.setState(prevState => ({
      activeStepSwipe: prevState.activeStepSwipe - 1,
    }));
  };

  handleStepChangeSwipe = activeStepSwipe => {
    this.setState({ activeStepSwipe });
  };

  handleClose = () => {
    const { closeGuide } = this.props;
    closeGuide();
    this.setState({ activeStepSwipe: 0 });
  }

  render() {
    const {
      classes,
      theme,
      openGuide,
      closeGuide
    } = this.props;
    const { activeStepSwipe } = this.state;

    return (
      <Dialog
        TransitionComponent={Transition}
        keepMounted
        open={openGuide}
        onClose={closeGuide}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.root}
      >
        <DialogContent className={classes.rootContent}>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStepSwipe}
            onChangeIndex={this.handleStepChangeSwipe}
            enableMouseEvents
            className={classes.guideWrap}
          >
            {guideData.map((step, index) => (
              <div className={classes.figure} key={index.toString()}>
                <img key={step.label} className={classes.img} src={step.imgPath} alt={step.title} />
              </div>
            ))}
          </SwipeableViews>
          <article className={classes.text}>
            <Typography variant="h6">{guideData[activeStepSwipe].title}</Typography>
            <Typography>{guideData[activeStepSwipe].label}</Typography>
          </article>
          <MobileStepper
            variant="progress"
            steps={maxStepsSwipe}
            position="static"
            activeStep={activeStepSwipe}
            className={classes.mobileStepper}
            nextButton={
              activeStepSwipe === maxStepsSwipe - 1 ? (
                <Button size="small" color="primary" onClick={this.handleClose}>
                  Done
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              ) : (
                <Button size="small" onClick={this.handleNextSwipe}>
                  Next
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              )
            }
            backButton={(
              <Button size="small" onClick={this.handleBackSwipe} disabled={activeStepSwipe === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Back
              </Button>
            )}
          />
        </DialogContent>
      </Dialog>
    );
  }
}

GuideSlider.propTypes = {
  openGuide: PropTypes.bool.isRequired,
  closeGuide: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(GuideSlider);
