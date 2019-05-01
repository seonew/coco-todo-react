import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    width: '100%',
    top: '0',
    zIndex: '100',
  },
  init: {
    padding: '0',
  },
  grow: {
    flexGrow: 1,
  },
  menu: {
    color: 'white',
    padding: '0.8rem',
  },
  logo: {
    fontFamily: "Righteous",
    fontSize: "1.4rem",
    fontWeight: "lighter",
    padding: '12px 0',
    lineHeight: 1,
    letterSpacing: 1,
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.3rem"
    }
  },
});

class Header extends React.Component {

  handleMenuClick = () => {
    console.log("===handleMenuClick===")
  }

  render () {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.init}>
            <IconButton aria-label="Menu" onClick={this.handleMenuClick} className={classes.menu}>
              <MenuIcon fontSize="inherit" />
            </IconButton>
            <Typography color="inherit" className={classes.logo}>
              COCO<br/>TODO
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);