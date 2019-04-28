import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import CheckItem from 'components/CheckItem';

const styles = () => ({
  padding: {
    padding: '0.3rem',
  },
});

class CheckList extends React.Component {
  handleItemToggleClick = () => {
    console.log('CheckList toggle')
  };

  handleItemEditClick = () => {
    console.log('CheckList edit')
  }

  handleItemDeleteClick = () => {
    console.log('CheckList delete')
  }

  render () {
    const { checklist, state } = this.props;

    const list = checklist.map(
      (checklist, index) => (<CheckItem key={index} checklist={checklist} onToggle={this.handleItemToggleClick} onEditClick={this.handleItemEditClick} onDeleteClick={this.handleItemDeleteClick}/>)
    );
    
    return (
      <div>
        <Collapse in={state} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {list}
          </List>
        </Collapse>
      </div>
    );
  }

}

CheckList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckList);