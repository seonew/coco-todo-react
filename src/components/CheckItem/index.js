import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  padding: {
    padding: '0.15rem 0.3rem',
  },
  side: {
    float: 'right',
  },
  content: {
    flex: 'inherit',
    width: '90%',
    padding: '0 0.3rem',
    wordBreak: 'break-all',
    [theme.breakpoints.down("md")]: {
      width: '85%',
    },
    [theme.breakpoints.down("xs")]: {
      width: '72%',
    }
  }
});

class CheckItem extends React.Component {
  state = {
    open: false
  }

  handleToggle = () => {
    const { onToggle } = this.props;
    onToggle();
  };

  handleEditClick = () => {
    const { onEditClick } = this.props;
    onEditClick();
  }

  handleDeleteClick = () => {
    const { onDeleteClick } = this.props;
    onDeleteClick();
  }

  render () {
    const { classes, checklist } = this.props;

    return (
      <div>
        <ListItem dense button className={classes.nested}>
          <Checkbox
            checked={checklist.state !== 0}
            onChange={this.handleToggle}
            className={classes.padding}
          />
          <ListItemText inset secondary={checklist.content} />
          <ListItemSecondaryAction className={classes.side}>
            <IconButton aria-label="Edit" onClick={this.handleEditClick} className={classes.padding}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="Delete" onClick={this.handleDeleteClick} className={classes.padding} >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ListItemSecondaryAction> 
        </ListItem>
      </div>
    );
  }

}

CheckItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckItem);