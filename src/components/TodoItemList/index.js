import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Item from '../Item';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class TodoItemList extends React.Component {
  handleItemToggleClick = current => {
    const { onItemToggle, data } = this.props;
    const todo = current["todo"];

    let index = 0;
    for (let i = 0; i < data.length; i++){
      if(data[i] === todo) {
        index = i;
        break;
      }
    }
    onItemToggle(todo, index);
  }

  handleItemEditClick = todo => {
    const { onItemEditClick } = this.props;
    onItemEditClick(todo);
  }

  handleItemDeleteClick = current => {
    const { onItemDeleteClick, data } = this.props;
    const todo = current["todo"];

    let index = 0;
    for (let i = 0; i < data.length; i++){
      if(data[i] === todo) {
        index = i;
        break;
      }
    }
    onItemDeleteClick(index);
  }

  render() {
    const { data, classes } = this.props;
    const list = data.map(
      (todo, index) => (<Item key={index} todo={todo} onToggle={this.handleItemToggleClick} onEditClick={this.handleItemEditClick} onDeleteClick={this.handleItemDeleteClick}/>)
    );
    
    return (
      <div className={classes.root}>
        <List>
          {list}
        </List>
      </div>
    );
  }

  static defaultProps = {
    data: []
  }
}

TodoItemList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TodoItemList);