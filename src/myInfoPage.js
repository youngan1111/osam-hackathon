import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import app from "./firebase";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AccountBox from "@material-ui/icons/AccountBox";
import Lock from "@material-ui/icons/Lock";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import { Slide } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4, 0, 4),
    width: "100%",
    backgroundColor: "#fafafa",
  },
  textField: {
    fontFamily: ["Jua", '"sans-serif"'],
    marginTop: theme.spacing(0),
    fontSize: 16,
    marginBottom: theme.spacing(0),
    padding: theme.spacing(2),
    paddingLeft: "7.787%",
    width: "100%",
  },
  tableRow: {
    fontSize: 16,
    fontFamily: ["Jua", '"sans-serif"'],
    paddingLeft: "5%",
    backgroundColor: "#0f4c8133",
  },
  tableCell: {
    fontSize: 16,
    fontFamily: ["Jua", '"sans-serif"'],
    paddingLeft: "5%",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  passwordInput: {
    margin: theme.spacing(3),
    display: "flex",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const MyInfoPage = () => {
  const [userInfo, setUserInfo] = React.useState({});
  const [value, setValue] = React.useState("1");
  const [authUser, setAuthUser] = React.useState(null);
  const [rank, setRank] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [firstPasswordError, setFirstPasswordError] = React.useState("");
  const [secondPasswordError, setSecondPasswordError] = React.useState("");
  const [thirdPasswordError, setThirdPasswordError] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [snackBar, setSnackBar] = React.useState(false);

  const classes = useStyles();

  const handleModify = (event) => {
    event.preventDefault();
    setOpen(true);
    setPasswordError("");

    app
      .auth()
      .signInWithEmailAndPassword(userInfo.email, password)
      .then(
        ({ user }) => {
          app
            .firestore()
            .collection("users")
            .where("uid", "==", user.uid)
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                setSnackBar(true);
                setPassword("");
                app
                  .firestore()
                  .collection("users")
                  .doc(doc.id)
                  .update({ rank });
              });
            });
        },
        (error) => {
          switch (error.code) {
            case "auth/wrong-password":
              setPasswordError("잘못된 비밀번호입니다.");
              break;
            default:
          }
        }
      );

    setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();

    setOpen(true);
    setFirstPasswordError("");
    setSecondPasswordError("");
    setThirdPasswordError("");

    const { password, newPassword, passwordCheck } = event.target.elements;

    if (password.value === "")
      setFirstPasswordError("비밀번호를 입력해주세요.");
    else if (newPassword.value === "")
      setSecondPasswordError("새로운 비밀번호를 입력해주세요.");
    else if (passwordCheck.value === "")
      setThirdPasswordError("비밀번호를 다시 한번 입력해주세요.");
    else if (newPassword.value !== passwordCheck.value)
      setThirdPasswordError("비밀번호가 일치하지 않습니다.");
    else {
      app
        .auth()
        .signInWithEmailAndPassword(userInfo.email, password.value)
        .then(
          () => {
            authUser
              .updatePassword(newPassword.value)
              .then(function () {
                setSnackBar(true);
                password.value = "";
                newPassword.value = "";
                passwordCheck.value = "";
              })
              .catch(function (error) {
                switch (error.code) {
                  case "auth/weak-password":
                    setSecondPasswordError("6자 이상의 비밀번호를 사용하세요.");
                    break;
                  default:
                    break;
                }
              });
          },
          (error) => {
            switch (error.code) {
              case "auth/wrong-password":
                setFirstPasswordError("비밀번호가 올바르지 않습니다.");
                break;
              default:
            }
          }
        );
    }

    setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  React.useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setAuthUser(user);
      app
        .firestore()
        .collection("users")
        .where("uid", "==", user.uid)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            setUserInfo(doc.data());
            setRank(doc.data().rank);
          });
        });
    });
  }, []);

  return (
    <div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          label="개인정보 변경"
          value="1"
          icon={<AccountBox />}
        />
        <BottomNavigationAction
          label="비밀번호 변경"
          value="2"
          icon={<Lock />}
        />
      </BottomNavigation>
      {value === "1" ? (
        <Container component="main" maxWidth="md">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow key="name">
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.tableRow}
                  >
                    이름
                  </TableCell>
                  <TableCell align="left" className={classes.tableCell}>
                    {userInfo.name}
                  </TableCell>
                </TableRow>

                <TableRow key="email">
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.tableRow}
                  >
                    이메일
                  </TableCell>
                  <TableCell align="left" className={classes.tableCell}>
                    {userInfo.email}
                  </TableCell>
                </TableRow>

                <TableRow key="password">
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.tableRow}
                  >
                    비밀번호 확인
                  </TableCell>
                  <th>
                    <FormControl
                      fullWidth
                      error={passwordError === "" ? false : true}
                    >
                      <Input
                        id="standard-adornment-weight"
                        value={password}
                        onChange={({ target: { value } }) => setPassword(value)}
                        type="password"
                        className={classes.textField}
                        aria-describedby="standard-weight-helper-text"
                        inputProps={{ "aria-label": "weight" }}
                        placeholder="비밀번호를 입력해주세요."
                      />
                    </FormControl>
                  </th>
                </TableRow>
                <TableRow key="military">
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.tableRow}
                  >
                    군 구분
                  </TableCell>
                  <TableCell align="left" className={classes.tableCell}>
                    {userInfo.military}
                  </TableCell>
                </TableRow>

                <TableRow key="rank">
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.tableRow}
                  >
                    계급
                  </TableCell>
                  <th>
                    <Select
                      className={classes.textField}
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={(event) => setRank(event.target.value)}
                      label="계급 선택"
                      value={rank}
                      align="left"
                    >
                      <MenuItem value="대장">대장</MenuItem>
                      <MenuItem value="중장">중장</MenuItem>
                      <MenuItem value="소장">소장</MenuItem>
                      <MenuItem value="준장">준장</MenuItem>
                      <MenuItem value="대령">대령</MenuItem>
                      <MenuItem value="중령">중령</MenuItem>
                      <MenuItem value="소령">소령</MenuItem>
                      <MenuItem value="대위">대위</MenuItem>
                      <MenuItem value="중위">중위</MenuItem>
                      <MenuItem value="소위">소위</MenuItem>
                      <MenuItem value="준위">준위</MenuItem>
                      <MenuItem value="원사">원사</MenuItem>
                      <MenuItem value="상사">상사</MenuItem>
                      <MenuItem value="중사">중사</MenuItem>
                      <MenuItem value="하사">하사</MenuItem>
                      <MenuItem value="병장">병장</MenuItem>
                      <MenuItem value="상병">상병</MenuItem>
                      <MenuItem value="일병">일병</MenuItem>
                      <MenuItem value="이병">이병</MenuItem>
                      <MenuItem value="생도">생도</MenuItem>
                      <MenuItem value="1급">1급</MenuItem>
                      <MenuItem value="2급">2급</MenuItem>
                      <MenuItem value="3급">3급</MenuItem>
                      <MenuItem value="4급">4급</MenuItem>
                      <MenuItem value="5급">5급</MenuItem>
                      <MenuItem value="6급">6급</MenuItem>
                      <MenuItem value="7급">7급</MenuItem>
                      <MenuItem value="8급">8급</MenuItem>
                      <MenuItem value="9급">9급</MenuItem>
                    </Select>
                  </th>
                </TableRow>

                <TableRow key="sn">
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.tableRow}
                  >
                    군번
                  </TableCell>
                  <TableCell align="left" className={classes.tableCell}>
                    {userInfo.serialNumber}
                  </TableCell>
                </TableRow>

                <TableRow key="account">
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.tableRow}
                  >
                    계정
                  </TableCell>
                  <TableCell align="left" className={classes.tableCell}>
                    {userInfo.admin === "true" ? "관리자계정" : "일반계정"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <span className={classes.buttons}>
            <Button
              onClick={handleModify}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              수정
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              회원탈퇴
            </Button>
            <Backdrop
              className={classes.backdrop}
              open={open}
              onClick={() => {
                setOpen(false);
              }}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </span>
          <Snackbar
            autoHideDuration={2000}
            open={snackBar}
            onClose={() => setSnackBar(false)}
            TransitionComponent={Slide}
            message="개인정보 변경이 완료되었습니다."
          />
        </Container>
      ) : (
        <Container component="main" maxWidth="sm">
          <form noValidate onSubmit={handlePasswordChange}>
            <Chip label="기존 비밀번호" variant="outlined" />
            <TextField
              type="password"
              error={firstPasswordError === "" ? false : true}
              className={classes.passwordInput}
              required
              helperText={firstPasswordError}
              id="password"
              label="기존 비밀번호"
              placeholder="기존 비밀번호 입력"
              variant="outlined"
            />
            <Chip label="새로운 비밀번호" variant="outlined" />
            <TextField
              type="password"
              error={secondPasswordError === "" ? false : true}
              helperText={secondPasswordError}
              className={classes.passwordInput}
              required
              id="newPassword"
              label="새로운 비밀번호"
              placeholder="새로운 비밀번호 입력"
              variant="outlined"
            />
            <Chip label="비밀번호 확인" variant="outlined" />
            <TextField
              type="password"
              error={thirdPasswordError === "" ? false : true}
              helperText={thirdPasswordError}
              className={classes.passwordInput}
              required
              id="passwordCheck"
              label="비밀번호 확인"
              placeholder="비밀번호 확인"
              variant="outlined"
            />
            <span className={classes.buttons}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                비밀번호 변경
              </Button>
              <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
              </Backdrop>
            </span>
          </form>
          <Snackbar
            autoHideDuration={2000}
            open={snackBar}
            onClose={() => setSnackBar(false)}
            TransitionComponent={Slide}
            message="비밀번호 변경이 완료되었습니다."
          />
        </Container>
      )}
    </div>
  );
};

export default MyInfoPage;
