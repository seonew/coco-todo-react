import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

class Item extends React.Component {
  
  handleToggle(event) {
    const { onToggle, todo } = this.props;
    onToggle({todo});
  };

  handleEditClick(event) {
    console.log("==handleEditClick==")
    const { onEditClick, todo } = this.props;
    onEditClick({todo});
  }

  handleDeleteClick(event) {
    const { onDeleteClick, todo } = this.props;
    onDeleteClick({todo})
  }

  render () {
    const { content, registerDate, editedDate, state } = this.props.todo;
    const onToggleClickCallback = this.handleToggle.bind(this);
    const onEditClickCallback   = this.handleEditClick.bind(this);
    const onDeleteClickCallback = this.handleDeleteClick.bind(this);

    return (
      <ListItem dense button>
        <Checkbox
          checked={state !== 0}
          onChange={onToggleClickCallback}
        />
        <ListItemText primary={content} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Edit" onClick={onEditClickCallback} >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="Delete" onClick={onDeleteClickCallback} >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
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

export default Item;