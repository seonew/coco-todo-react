import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVert from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import DonutChart from 'components/DonutChart';
import CheckList from 'components/CheckList';

const styles = theme => ({
  padding: {
    padding: '0.25rem',
  },
  side: {
    float: 'right',
  },
  content: {
    flex: 'inherit',
    width: '95%',
    padding: '0 0.5rem',
    wordBreak: 'break-all',
    [theme.breakpoints.down("lg")]: {
      width: '95%',
      padding: '0.3rem 1.3rem',
    },
    [theme.breakpoints.down("md")]: {
      width: '90%',
    },
    [theme.breakpoints.down("xs")]: {
      width: '80%',
      paddingRight: '0.5rem',
      padding: '0.3rem 0.8rem',
    }
  },
  moreButton: {
    visibility: 'hidden',
  }
});

class TodoItem extends React.Component {
  state = {
    open: false,
  }

  handleToggle = () => {
    const { onToggle, todo } = this.props;
    onToggle({todo});
  };

  handleExpandChanged = () => {
    this.setState({open: !this.state.open});
  }

  handleMenuChanged = event => {
    const { onMenuOpenChanged, menuOpen, onEditClick, todo } = this.props;
    onEditClick(todo);
    onMenuOpenChanged(event, menuOpen);
  }

  render () {
    const { classes } = this.props;
    const { content, checklist } = this.props.todo;

    return (
      <div className={classes.padding}>
        <ListItem  button className={classes.padding} onClick={this.handleExpandChanged}>
          <DonutChart value={this.getAchievementRate(checklist)} />
          <ListItemText primary={content} className={classes.content}/>
          <MoreVert color="secondary" size="medium" className={this.state.open ? '' : classes.moreButton} onClick={this.handleMenuChanged}/>
        </ListItem>
        <Divider variant="inset" component="li" />
        <CheckList checklist={checklist} state={this.state.open}/>
      </div>
    );
  }

  getAchievementRate = (checklist) => {
    const listSize = checklist.length;
    let count = 0;
    checklist.forEach(element => {
      if(element.state === 1){
        count++;
      }
    });
    
    let result = 0;
    if(listSize > 0){
      result = parseInt((count/listSize)*100);
    }

    return result;
  }

}

TodoItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TodoItem);