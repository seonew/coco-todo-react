import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
});

class MenuDrawer extends React.Component {
  handleItemAddClick = () => {
    const { onItemAddClick, content } = this.props;
    onItemAddClick(content);
  }

  handleContentChanged = event => {
    const { onContentChanged } = this.props;
    onContentChanged(event.target.value);
  };

  handleEditClick = event => {
    event.stopPropagation();
    const { onEditClick, todo } = this.props;
    onEditClick({todo});
  }

  handleDeleteClick = event => {
    event.stopPropagation();
    const { onDeleteClick, todo } = this.props;
    onDeleteClick({todo})
  }

  handleMenuOpenChanged = event => {
    const { onMenuOpenChanged, open } = this.props;
    onMenuOpenChanged(event, open);
  };

  render() {
    const { classes, open } = this.props;
    const items = [{name: 'Edit', callback: this.handleEditClick}, {name: 'Delete', callback: this.handleDeleteClick}];

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
              <Typography variant="subtitle1">Setting</Typography>
              <IconButton aria-label="Close" className={classes.closeButton} onClick={this.handleMenuOpenChanged}>
                <CloseIcon />
              </IconButton>
            </div>
            <List>
              {items.map((item, index) => (
                <ListItem button dense key={item.name} onClick={item.callback}>
                  <ListItemIcon>{index % 2 === 0 ? <EditIcon fontSize="small"/> : <DeleteIcon fontSize="small" />}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
            <Divider />
          </div>
        </Drawer>
      </div>
    );
  }

}

MenuDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuDrawer);