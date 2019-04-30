import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import TodoItem from 'components/TodoItem';
import MenuDrawer from 'components/MenuDrawer';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    paddingTop: '8px',
  },
  padding: {
    padding: '0 5px'
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class TodoList extends React.Component {
  state = {
    menuOpen: false,
    todo: {},
  }

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

  handleSettingItemEditClick = todo => {
    this.setState({todo: todo});
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

  handleMenuChanged = (event, menuOpen) => {
    event.stopPropagation();
    this.setState({menuOpen: !menuOpen});
  }

  render() {
    const { data, classes } = this.props;
    const list = data.map(
      (todo, index) => (<TodoItem key={index} todo={todo} menuOpen={this.state.menuOpen} 
              onMenuOpenChanged={this.handleMenuChanged} onToggle={this.handleItemToggleClick} onEditClick={this.handleSettingItemEditClick} onDeleteClick={this.handleItemDeleteClick}/>)
    );
    
    return (
      <div className={classes.root}>
        <List className={classes.padding}>
          {list}
        </List>
        {this.state.menuOpen ? <MenuDrawer open={this.state.menuOpen} todo={this.state.todo} 
              onMenuOpenChanged={this.handleMenuChanged} onEditClick={this.handleItemEditClick} onDeleteClick={this.handleItemDeleteClick}/> : ''}
      </div>
    );
  }

}

TodoList.defaultProps = {
  data: []
}

TodoList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TodoList);