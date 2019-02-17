import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  divider: {
    width: 1,
    height: 28,
    margin: 10
  }
});

class ConfirmModal extends React.Component {
  handleClose = () => {
    this.setState({ open: false });
    
    const { onCloseClick } = this.props;
    onCloseClick();
  };

  handleConfirmClick = () => {
    const { onConfirmClick } = this.props;
    onConfirmClick();
  }

  render() {
    const { classes, message, todoContent, open } = this.props;

    return (
      <div className={classes.root}>
        <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{message}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {todoContent}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleConfirmClick} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

}

ConfirmModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfirmModal);