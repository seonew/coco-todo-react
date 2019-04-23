import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  root: {
    padding: '2px 10px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    position: 'fixed',
    bottom: '0',
    backgroundColor: '#ffffff'
  },
  divider: {
    width: 1,
    height: 28,
    margin: 10
  },
  floating: {
    position: 'absolute',
    right: '23px',
    bottom: '14px',
    zIndex: 10,
  },
  dialogRoot: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit * 1,
    color: theme.palette.grey[500],
  },
  textfield: {
    paddingLeft: theme.spacing.unit * 1,
    paddingRight: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
  }
});

class TodoInputDrawer extends React.Component {
  state = {
    open: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handleItemAddClick = () => {
    const { onItemAddClick, content } = this.props;
    onItemAddClick(content);
  }

  handleContentChanged = event => {
    const { onContentChanged } = this.props;
    onContentChanged(event.target.value);
  };

  handleInputVisibleChanged = () => {
    const { onInputVisibleChanged } = this.props;
    onInputVisibleChanged();
  };

  render() {
    const { classes, content, open } = this.props;

    return (
      <div className={classes.root}>
        <Drawer
          anchor="bottom"
          open={open}
        >
          <div
            tabIndex={0}
            role="button"
          >
            <div className={classes.dialogRoot}>
              <Typography variant="h6">Add a todo</Typography>
              <IconButton aria-label="Close" className={classes.closeButton} onClick={this.handleInputVisibleChanged}>
                <CloseIcon />
              </IconButton>
            </div>
            <TextField
                id="standard-input"
                label="Please enter a todo"
                value={content}
                onChange={this.handleContentChanged}
                margin="normal"
                variant="outlined"
                fullWidth
                className={classes.textfield}
                InputProps={{
                  endAdornment: (
                    <InputAdornment variant="filled" position="end">
                      <Divider className={classes.divider} />
                      <IconButton color="secondary" aria-label="Add" onClick={this.handleItemAddClick}>
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
            />  
          </div>
        </Drawer>
      </div>
    );
  }

}

TodoInputDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TodoInputDrawer);