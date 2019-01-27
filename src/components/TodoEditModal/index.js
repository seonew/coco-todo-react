import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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

class TodoEditModal extends React.Component {
  handleClose = () => {
    this.setState({ open: false });
    
    const { onCloseClick } = this.props;
    onCloseClick();
  };

  handleContentEditClick = () => {
    const { onContentEditClick, content } = this.props;
    onContentEditClick(content);
  }

  handleContentChanged = event => {
    const { onContentChanged } = this.props;
    onContentChanged(event.target.value);
  };

  render() {
    const { classes, content, open } = this.props;

    return (
      <div className={classes.root}>
        <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit a todo</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To update to this todo, please enter your todo here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              variant="outlined"
              value={content}
              multiline
              fullWidth
              onChange={this.handleContentChanged}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleContentEditClick} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

}

TodoEditModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TodoEditModal);