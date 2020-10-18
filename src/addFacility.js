import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import app from "./firebase";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import { Slide } from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    fontSize: 10,
    margin: theme.spacing(1, 4, 1),
    justifyContent: "flex-end",
    display: "flex",
  },
  breadcrumbsTypography: {
    fontSize: 12,
  },
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
    paddingLeft: theme.spacing(5),
    width: "100%",
  },
  tableRow: {
    fontSize: 16,
    fontFamily: ["Jua", '"sans-serif"'],
    paddingLeft: theme.spacing(5),
    backgroundColor: "#0f4c8133",
  },
  tableCell: {
    fontSize: 16,
    fontFamily: ["Jua", '"sans-serif"'],
    paddingLeft: theme.spacing(5),
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

const AddFacility = () => {
  //   const [authUser, setAuthUser] = React.useState(null);
  const [password, setPassword] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [snackBar, setSnackBar] = React.useState(false);

  const classes = useStyles();

  const handleModify = (event) => {
    event.preventDefault();
    setOpen(true);

    setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  React.useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      //   setAuthUser(user);
      app
        .firestore()
        .collection("users")
        .where("uid", "==", user.uid)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            app
              .firestore()
              .collection("users")
              .doc(doc.id)
              .collection("camp")
              .get()
              .then((snapshot) => {
                snapshot.forEach((doc) => {
                  console.log(doc.id);
                });
              });
          });
        });
    });
  }, []);

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  return (
    <div>
      <Breadcrumbs
        className={classes.breadcrumbs}
        // separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link color="inherit" href="/" onClick={handleClick}>
          HOME
        </Link>
        <Typography
          color="textPrimary"
          className={classes.breadcrumbsTypography}
        >
          관리자페이지
        </Typography>
        <Typography
          color="textPrimary"
          className={classes.breadcrumbsTypography}
        >
          부대 관리
        </Typography>
      </Breadcrumbs>

      <Typography
        color="textPrimary"
        variant="h5"
        style={{
          fontFamily: ["Jua", '"sans-serif"'],
          marginBottom: 32,
          textAlign: "center",
        }}
      >
        부대 관리
      </Typography>

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
                  부대명
                </TableCell>
                <th>
                  <Input
                    id="standard-adornment-weight"
                    value={password}
                    onChange={({ target: { value } }) => setPassword(value)}
                    type="text"
                    className={classes.textField}
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{ "aria-label": "weight" }}
                    placeholder="."
                  />
                </th>
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
            추가
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
    </div>
  );
};

export default AddFacility;
