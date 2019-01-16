import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
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
});

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: '',
      password: ''
    }
  }

  handleChange = name => (event => {
    this.setState({
      [name]: event.target.value,
    })
  });

  render () {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.titleWrapper}>
            <Typography color={"primary"} variant="h4" className={classes.bold}>
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
      </div>
    );
  }


  authorize = () => {
    let { id, password } = this.state;

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
      
    api.authorize(id, password)
    .then((response) => {
      console.log(response)
      
      localStorage.setItem('authToken', response.data.token);
      window.location.href = "/"
    })
    .catch((error) => {
      console.dir(error)
      alert(error.response.data)
      return
    })
  }

}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);