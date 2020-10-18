import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import AddIcon from "@material-ui/icons/Add";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import app from "./firebase";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Slide from "@material-ui/core/Slide";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 6),
  },
  root: {
    width: 500,
  },
  navigationStyle: {
    "&$navigationSelected": {
      marginTop: "5px",
      fontSize: "18px",
      fontFamily: ["Jua", '"sans-serif"'],
    },
    fontSize: "18px",
    marginTop: "5px",
    fontFamily: ["Jua", '"sans-serif"'],
  },
  navigationSelected: {},
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    paddingTop: "22px",
    paddingBottom: "10px",
    textAlign: "center",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  textField: {
    fontFamily: ["Jua", '"sans-serif"'],
    marginTop: theme.spacing(0),
    fontSize: 16,
    marginBottom: theme.spacing(0),
    padding: "3%",
    paddingLeft: "5%",
    width: "100%",
  },
  tableRow: {
    fontSize: 16,
    fontFamily: ["Jua", '"sans-serif"'],
    paddingLeft: "5%",
    backgroundColor: "#0f4c8133",
    width: "30%",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  breadcrumbs: {
    backgroundColor: theme.palette.background.paper,
    fontSize: 10,
    padding: "4px 2%",
    justifyContent: "flex-end",
    display: "flex",
  },
  breadcrumbsTypography: {
    fontSize: 12,
  },
  typography: {
    fontFamily: ["Jua", '"sans-serif"'],
  },
  modalTypography: {
    fontFamily: ["Jua", '"sans-serif"'],
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  cardButton: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    "@media (min-width: 600px)": {
      width: "80%",
    },
    width: "95%",
    height: "70%",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 0, 3),
  },
  tableContainer: {
    maxHeight: 400,
  },
}));

const AddCamp = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("1");
  const [camps, setCamps] = React.useState([]);
  const [authUserId, setAuthUserId] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openProgress, setOpenProgress] = React.useState(false);
  const [campName, setCampName] = React.useState("");
  const [inputFields, setInputFields] = React.useState([
    { facility: "", location: "" },
  ]);
  const [campNameError, setCampNameError] = React.useState("");
  const [facilityError, setFacilityError] = React.useState([
    { facility: "", location: "" },
  ]);
  const [snackBar, setSnackBar] = React.useState(false);

  const handleAddFields = () => {
    setInputFields((oldArray) => [...oldArray, { facility: "", location: "" }]);
    setFacilityError((oldArray) => [
      ...oldArray,
      { facility: "", location: "" },
    ]);
  };
  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };
  const handleInputChange = (index, value, location) => {
    const values = [...inputFields];
    if (location === 0) values[index].facility = value;
    else values[index].location = value;
    setInputFields(values);
  };

  const addCamp = () => {
    setOpenProgress(true);
    setCampNameError("");
    for (let i = 0; i < inputFields.length; i++) {
      const values = [...facilityError];
      values[i].facility = "";
      values[i].location = "";
      setFacilityError(values);
    }
    setTimeout(() => {
      setOpenProgress(false);
    }, 400);

    if (campName === "") {
      setCampNameError(1);
      return;
    } else {
      for (let i = 0; i < inputFields.length; i++) {
        const values = [...facilityError];
        if (inputFields[i].facility === "") {
          values[i].facility = "error";
          return;
        } else if (inputFields[i].location === "") {
          values[i].location = "error";
          return;
        }
        setFacilityError(values);
      }
    }
    setSnackBar(true);
    setTimeout(() => {
      handleClose();
    }, 1000);
  };
  const handleClose = () => {
    setOpen(false);
    setInputFields([{ facility: "", location: "" }]);
    setCampNameError("");
    for (let i = 0; i < inputFields.length; i++) {
      const values = [...facilityError];
      values[i].facility = "";
      values[i].location = "";
      setFacilityError(values);
    }
  };

  React.useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      app
        .firestore()
        .collection("users")
        .where("uid", "==", user.uid)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            setAuthUserId(doc.id);
            app
              .firestore()
              .collection("users")
              .doc(doc.id)
              .collection("camp")
              .get()
              .then((snapshot) => {
                snapshot.forEach((doc) => {
                  setCamps((oldArray) => [...oldArray, doc.id]);
                });
              });
          });
        });
    });
  }, []);

  function handleClick(event) {
    console.log(camps);
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  const showFacility = (camp) => {
    setCamps([]);
    app
      .firestore()
      .collection("users")
      .doc(authUserId)
      .collection("camp")
      .doc(camp)
      .collection("facility")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setCamps((oldArray) => [...oldArray, doc.id]);
        });
      });
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
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
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              className={classes.typography}
            >
              부대 관리
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
              className={classes.typography}
            >
              기존의 관리자가 추가한 부대와 추가하고 싶은 부대가 있다면 아래
              플러스 버튼을 이용하여 추가하싶시오. 추가이후에 총괄관리자가
              승인을 해주면 해당 체육시설을 예약 이용할 수 있습니다.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <BottomNavigation
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  showLabels
                  className={classes.root}
                >
                  <BottomNavigationAction
                    classes={{
                      label: classes.navigationStyle,
                      selected: classes.navigationSelected,
                    }}
                    label="내가 추가한 부대"
                    value="1"
                    icon={<AddToQueueIcon />}
                  />
                  <BottomNavigationAction
                    classes={{
                      label: classes.navigationStyle,
                      selected: classes.navigationSelected,
                    }}
                    label="승인 대기중인 부대"
                    value="2"
                    icon={<HourglassEmptyIcon />}
                  />
                </BottomNavigation>
              </Grid>
            </div>
          </Container>
        </div>
        {value === "1" ? (
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {camps.map((camp) => (
                <Grid item key={camp} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography variant="h5" component="h2">
                        {camp}
                      </Typography>
                      {/* <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography> */}
                    </CardContent>
                    <CardActions className={classes.cardButton}>
                      <Button
                        value={camp}
                        color="primary"
                        onClick={() => showFacility(camp)}
                      >
                        자세히
                      </Button>
                      <Button color="primary">수정</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}

              <Grid item key="addCamp" xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent} id="check">
                    <Button
                      color="primary"
                      onClick={() => {
                        setOpen(true);
                      }}
                    >
                      <AddIcon fontSize="large" />
                    </Button>
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      className={classes.modal}
                      open={open}
                      onClose={handleClose}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                      }}
                    >
                      <Slide direction="up" in={open}>
                        <div className={classes.paper}>
                          <Container component="main" maxWidth="md">
                            <Typography className={classes.modalTypography}>
                              부대 추가하기
                            </Typography>
                            <TableContainer
                              component={Paper}
                              className={classes.tableContainer}
                            >
                              <Table aria-label="simple table">
                                <TableBody>
                                  <TableRow key="campName">
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      className={classes.tableRow}
                                    >
                                      부대명
                                    </TableCell>
                                    <th>
                                      <FormControl
                                        fullWidth
                                        error={
                                          campNameError === "" ? false : true
                                        }
                                      >
                                        <Input
                                          value={campName}
                                          onChange={({ target: { value } }) =>
                                            setCampName(value)
                                          }
                                          type="text"
                                          className={classes.textField}
                                          aria-describedby="standard-weight-helper-text"
                                          inputProps={{
                                            "aria-label": "weight",
                                          }}
                                          placeholder="부대명을 입력해주십시오."
                                        />
                                      </FormControl>
                                    </th>
                                  </TableRow>

                                  {inputFields.map((input, index) => (
                                    <React.Fragment key={`${input}~${index}`}>
                                      <TableRow key={index}>
                                        <TableCell
                                          component="th"
                                          scope="row"
                                          className={classes.tableRow}
                                        >
                                          체육시설
                                        </TableCell>
                                        <th>
                                          <FormControl
                                            fullWidth
                                            error={
                                              facilityError[index].facility ===
                                              ""
                                                ? false
                                                : true
                                            }
                                          >
                                            <Input
                                              value={input.facility || ""}
                                              onChange={({
                                                target: { value },
                                              }) =>
                                                handleInputChange(
                                                  index,
                                                  value,
                                                  0
                                                )
                                              }
                                              type="text"
                                              className={classes.textField}
                                              placeholder="체육시설을 입력해주십시오."
                                            />
                                          </FormControl>
                                          <FormControl
                                            fullWidth
                                            error={
                                              facilityError[index].location ===
                                              ""
                                                ? false
                                                : true
                                            }
                                          >
                                            <Input
                                              value={input.location || ""}
                                              onChange={({
                                                target: { value },
                                              }) =>
                                                handleInputChange(
                                                  index,
                                                  value,
                                                  1
                                                )
                                              }
                                              type="text"
                                              className={classes.textField}
                                              placeholder="위치를 입력해주십시오."
                                            />
                                          </FormControl>
                                        </th>
                                        <th>
                                          <IndeterminateCheckBoxIcon
                                            onClick={() =>
                                              handleRemoveFields(index)
                                            }
                                            style={{
                                              cursor: "pointer",
                                              color: "orangered",
                                            }}
                                          />
                                        </th>
                                      </TableRow>
                                    </React.Fragment>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>

                            <span className={classes.buttons}>
                              <Button
                                variant="contained"
                                className={classes.button}
                                onClick={handleAddFields}
                              >
                                체육시설 추가하기
                              </Button>

                              <span>
                                <Button
                                  onClick={addCamp}
                                  variant="contained"
                                  color="primary"
                                  className={classes.button}
                                >
                                  추가
                                </Button>
                                <Backdrop
                                  className={classes.backdrop}
                                  open={openProgress}
                                >
                                  <CircularProgress color="inherit" />
                                </Backdrop>
                                <Snackbar
                                  autoHideDuration={2000}
                                  open={snackBar}
                                  onClose={() => setSnackBar(false)}
                                  TransitionComponent={Slide}
                                  message="부대를 추가하였습니다. 관리자의 승인을 기다립니다."
                                />
                                <Button
                                  onClick={handleClose}
                                  variant="contained"
                                  color="secondary"
                                  className={classes.button}
                                >
                                  닫기
                                </Button>
                              </span>
                            </span>
                          </Container>
                        </div>
                      </Slide>
                    </Modal>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        ) : (
          <div>asd</div>
        )}
      </main>

      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center">
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
};

export default AddCamp;
