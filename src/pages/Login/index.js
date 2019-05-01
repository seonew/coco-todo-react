import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Spinner from 'components/Spinner';
import api from '../../api';

const styles = theme => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    padding: '60px 50px',
    border: '1px solid #f2f4f5',
    width: '490px',
  },
  titleWrapper: {
    alignItems: "center",
    padding: '30px'
  },
  bold: {
    fontWeight: 'bold'
  },
  margin: {
    marginTop: '20px'
  },
  logo: {
    fontFamily: "Righteous",
    fontSize: "4rem",
    fontWeight: "lighter",
    lineHeight: 1,
    letterSpacing: 2,
    [theme.breakpoints.down("xs")]: {
      fontSize: "3rem"
    }
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      password: '',
      showSpinner: false
    }
  }

  handleChange = name => (event => {
    this.setState({
      [name]: event.target.value,
    })
  });

  render () {
    const { showSpinner } = this.state;
    const { classes } = this.props;
    
    return (
      <div className={classes.root}>
        <div className={classNames(classes.container, showSpinner ? "dimmer":"")}>
          <div className={classes.titleWrapper}>
            <Typography color={"primary"} className={classes.logo}>
              COCO TODO
            </Typography>
          </div>
          <form> 
            <TextField
              id="standard-input"
              label="ID"
              value={this.state.id}
              onChange={this.handleChange('id')}
              margin="normal"
              fullWidth
              variant="outlined"
            />
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              margin="normal"
              value={this.state.password}
              onChange={this.handleChange('password')}
              fullWidth
              variant="outlined"
            />
            <Button variant="contained" size="medium" color="primary" fullWidth className={classNames(classes.margin, classes.bold)} onClick={this.authorize}>
              LOGIN
            </Button>
          </form>
        </div>
        <Spinner show={showSpinner} ></Spinner>
      </div>
    );
  }


  authorize = () => {
    const { id, password } = this.state;

    if (id === '' && password === ''){
      this.errorEmail = true
      this.errorPW = true
      return
    } 
    else if (id === '') {
      this.errorEmail = true
      return
    }
    else if (password === '') {
      this.errorPW = true
      return
    }

    this.setState({ showSpinner: true });

    api.authorize(id, password)
    .then((response) => {
      console.log(response)
      this.setState({ showSpinner: false });

      localStorage.setItem('authToken', response.data.token);
      window.location.href = "/"
    })
    .catch((error) => {
      console.dir(error)
      this.setState({ showSpinner: false });
      alert(error.response.data)
      return
    })
  }

}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);