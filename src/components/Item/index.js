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
    padding: '0.3em',
  },
  side: {
    float: 'right',
  },
  content: {
    flex: 'inherit',
    width: '90%',
    padding: '0 0.5em',
    [theme.breakpoints.down("md")]: {
      width: '85%',
    },
    [theme.breakpoints.down("xs")]: {
      width: '72%',
    }
  }
});

class Item extends React.Component {
  handleToggle = () => {
    const { onToggle, todo } = this.props;
    onToggle({todo});
  };

  handleEditClick = () => {
    this.setState({ opend: true });

    const { onEditClick, todo } = this.props;
    onEditClick({todo});
  }

  handleDeleteClick = () => {
    const { onDeleteClick, todo } = this.props;
    onDeleteClick({todo})
  }

  render () {
    const { classes } = this.props;
    const { content, state } = this.props.todo;

    return (
      <div className={classes.padding}>
        <ListItem dense button className={classes.padding}>
          <Checkbox
            checked={state !== 0}
            onChange={this.handleToggle}
            className={classes.padding}
          />
          <ListItemText primary={content} className={classes.content}/>
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

  getDate(timestampParam) {
    let date = new Date(timestampParam);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = "0" + month;
    }

    if (day < 10) {
      day = "0" + day;
    }

    let result = [year, month, day].join("-");
    return result;
  }
}

Item.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Item);