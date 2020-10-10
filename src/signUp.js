import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./firebase";
import { AuthContext } from "./auth";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        체육시설 예약체계
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  marginTop: {
    marginTop: theme.spacing(1)
  },
  formControl: {
    width: '100%'
  }
}));

const SignUp = ({ history }) => {
  const classes = useStyles();

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordCheckError, setPasswordCheckError] = useState('')
  const [militaryError, setMilitaryError] = useState('')
  const [rankError, setRankError] = useState('')
  const [nameError, setNameError] = useState('')
  const [serialNumberError, setSerialNumberError] = useState('')
  const [military, setMilitary] = React.useState('');
  const [rank, setRank] = React.useState('');
  const [adminState, setAdminState] = React.useState(false);

  const handleChange = (event) => {
    setAdminState(event.target.checked);
  };
  const handleMilitary = (event) => {
    setMilitary(event.target.value);
  };
  const handleRank = (event) => {
    setRank(event.target.value);
  };

  const handleSignUp = useCallback((event) => {
    event.preventDefault();
    setEmailError('')
    setPasswordError('')
    setMilitaryError('')
    setRankError('')
    setNameError('')
    setSerialNumberError('')
    setPasswordCheckError('')

    const { email, password, name, serialNumber, passwordCheck } = event.target.elements;

    if (military === '') setMilitaryError('군을 선택하십시오.')
    else if (rank === '') setRankError('계급을 선택하십시오.')
    else if (name.value === '') setNameError('이름을 입력하십시오.')
    else if (serialNumber.value === '') setSerialNumberError('군번을 입력하십시오.')
    else if (email.value === '') setEmailError('이메일을 입력하십시오.')
    else if (password.value === '') setPasswordError('비밀번호를 입력하십시오.')
    else if (passwordCheck.value === '') setPasswordCheckError('비밀번호를 다시 한번 입력해주십시오.')
    else if (passwordCheck.value !== password.value) setPasswordCheckError('비밀번호가 일치하지 않습니다.')
    else {
      app.auth().createUserWithEmailAndPassword(email.value, password.value).then(({ user }) => {
        app.firestore().collection("users").add({ name: name.value, military, rank, serialNumber: serialNumber.value, email: email.value, uid: user.uid, admin: adminState })

        history.push("/");
      }, (error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            setEmailError('이미 사용중인 이메일입니다.')
            break;
          case "auth/invalid-email":
            setEmailError('잘못된 이메일 형식입니다.')
            break;
          case "auth/weak-password":
            setPasswordError('6자 이상의 비밀번호를 사용하세요.')
            break;
          default: break;
        }
      });
    }
  },
    [history, military, rank, adminState]
  );

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.marginTop}>
          회원가입
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSignUp}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl required variant="outlined" className={classes.formControl}>
                <InputLabel id="military">군 선택</InputLabel>
                <Select
                  labelId="military"
                  id="military"
                  value={military}
                  onChange={handleMilitary}
                  label="군 선택"
                >
                  <MenuItem value='해군'>해군</MenuItem>
                  <MenuItem value='육군'>육군</MenuItem>
                  <MenuItem value='공군'>공군</MenuItem>
                </Select>
              </FormControl>
              <p className="errorMessage">{militaryError}</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl required variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">계급</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={rank}
                  onChange={handleRank}
                  label="계급 선택"
                >
                  <MenuItem value='대장'>대장</MenuItem>
                  <MenuItem value='중장'>중장</MenuItem>
                  <MenuItem value='소장'>소장</MenuItem>
                  <MenuItem value='준장'>준장</MenuItem>
                  <MenuItem value='대령'>대령</MenuItem>
                  <MenuItem value='중령'>중령</MenuItem>
                  <MenuItem value='소령'>소령</MenuItem>
                  <MenuItem value='대위'>대위</MenuItem>
                  <MenuItem value='중위'>중위</MenuItem>
                  <MenuItem value='소위'>소위</MenuItem>
                  <MenuItem value='준위'>준위</MenuItem>
                  <MenuItem value='원사'>원사</MenuItem>
                  <MenuItem value='상사'>상사</MenuItem>
                  <MenuItem value='중사'>중사</MenuItem>
                  <MenuItem value='하사'>하사</MenuItem>
                  <MenuItem value='병장'>병장</MenuItem>
                  <MenuItem value='상병'>상병</MenuItem>
                  <MenuItem value='일병'>일병</MenuItem>
                  <MenuItem value='이병'>이병</MenuItem>
                  <MenuItem value='생도'>생도</MenuItem>
                  <MenuItem value='1급'>1급</MenuItem>
                  <MenuItem value='2급'>2급</MenuItem>
                  <MenuItem value='3급'>3급</MenuItem>
                  <MenuItem value='4급'>4급</MenuItem>
                  <MenuItem value='5급'>5급</MenuItem>
                  <MenuItem value='6급'>6급</MenuItem>
                  <MenuItem value='7급'>7급</MenuItem>
                  <MenuItem value='8급'>8급</MenuItem>
                  <MenuItem value='9급'>9급</MenuItem>
                </Select>
              </FormControl>
              <p className="errorMessage">{rankError}</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="성명"
              />
              <p className="errorMessage">{nameError}</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="serialNumber"
                variant="outlined"
                required
                fullWidth
                id="serialNumber"
                label="군번"
              />
              <p className="errorMessage">{serialNumberError}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일 입력"
                name="email"
                autoComplete="email"
              />
              <p className="errorMessage">{emailError}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="비밀번호 입력"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <p className="errorMessage">{passwordError}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordCheck"
                label="비밀번호 재확인"
                type="password"
                id="passwordCheck"
                autoComplete="current-password"
              />
              <p className="errorMessage">{passwordCheckError}</p>
            </Grid>
            <FormControlLabel
              labelPlacement="start"
              label="관리자 계정 신청을 원하실 경우 선택하십시오  "
              control={
                <Checkbox
                  checked={adminState}
                  onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            가입하기
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withRouter(SignUp);
