import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = theme => ({
  root: {
    padding: '2px 10px',
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

class TodoItemInputbox extends React.Component {
  handleItemAddClick = () => {
    const { onItemAddClick, content } = this.props;
    onItemAddClick(content);
  }

  handleContentChanged = event => {
    const { onContentChanged } = this.props;
    onContentChanged(event.target.value);
  };

  render() {
    const { classes, content } = this.props;

    return (
      <div className={classes.root}>
        <TextField
            id="standard-input"
            label="Add a todo"
            value={content}
            onChange={this.handleContentChanged}
            margin="normal"
            variant="outlined"
            fullWidth
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
    );
  }

}

TodoItemInputbox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TodoItemInputbox);