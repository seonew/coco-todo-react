import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = () => ({
  floating: {
    position: 'fixed',
    right: '24px',
    bottom: '24px',
    zIndex: 10,
  }
});

class AddButton extends React.Component {
  handleInputVisibleChanged = () => {
    const { onInputVisibleChanged } = this.props;
    onInputVisibleChanged();
  };

  render() {
    const { classes, show } = this.props;

    return (
      <div className={show ? "":"hidden"}>
        <Fab size="medium" color="secondary" aria-label="Add" className={classes.floating} onClick={this.handleInputVisibleChanged}>
          <AddIcon />
        </Fab>
      </div>
    );
  }

}

AddButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddButton);