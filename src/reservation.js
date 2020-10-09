import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SelectCamp from './checkoutform/SelectCamp';
import SelectFacility from './checkoutform/SelectFacility';
import SelectDate from './checkoutform/SelectDate';
import app from "./firebase";
import moment from "moment";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    table: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    }
}));

const steps = ['부대 선택', '체육시설 선택', '날짜 선택'];

export default function Checkout() {
    function getStepContent(step) {
        switch (step) {
            case 0:
                return <SelectCamp next={handleNext} save={selectCamp} />;
            case 1:
                return <SelectFacility name={selectedCamp} next={handleNext} save={selectFacility} />;
            case 2:
                return <SelectDate camp={selectedCamp} facility={selectedFacility} save={saveRestInfo} />;
            default:
                throw new Error('Unknown step');
        }
    }

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [selectedCamp, setSelectedCamp] = React.useState('');
    const [selectedFacility, setSelectedFacility] = React.useState('');
    const [restInfo, setRestInfo] = React.useState({});

    const selectCamp = (name) => {
        setSelectedCamp(name);
    }
    const selectFacility = (name) => {
        setSelectedFacility(name);
    }
    const saveRestInfo = (object) => {
        setRestInfo(object);
    }
    const handleNext = () => {
        if (activeStep === steps.length - 1 && Object.keys(restInfo).length === 0) {
            alert('시간을 선택해주십시오.');
            return;
        }
        setActiveStep(activeStep + 1);
    };
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    React.useEffect(() => {
        const tempFunction = async () => {
            if (activeStep === steps.length) {
                app.auth().onAuthStateChanged((user) => {
                    if (user) {
                        const start = new Date(restInfo.start)
                        const end = new Date(restInfo.end)
                        app.firestore().collection("camp").doc(selectedCamp).collection('facility').doc(selectedFacility).collection('reservation').add({ start, end, uid: user.uid, title: restInfo.title })
                    } else {
                        alert("로그인 오류 발생! 다시 한번 시도해주십시오.")
                    }
                });
            }
        }
        tempFunction();
    })

    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        체육시설 예약하기
          </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    체육시설 예약이 정상적으로 처리되었습니다.
                                </Typography>
                                <Box boxShadow={1}>
                                    <Typography className={classes.table} variant="subtitle1">
                                        <TableContainer component={Paper}>
                                            <Table aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>부대</TableCell>
                                                        <TableCell align="right">체육시설</TableCell>
                                                        <TableCell align="right">예약명</TableCell>
                                                        <TableCell align="right">시작시간</TableCell>
                                                        <TableCell align="right">종료시간</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow key='reservationInfo'>
                                                        <TableCell component="th" scope="row">{selectedCamp}</TableCell>
                                                        <TableCell align="right">{selectedFacility}</TableCell>
                                                        <TableCell align="right">{restInfo.title}</TableCell>
                                                        <TableCell align="right">{moment(restInfo.start).format('YYYY년 M월 D일 HH:mm')}</TableCell>
                                                        <TableCell align="right">{moment(restInfo.end).format('YYYY년 M월 D일 HH:mm')}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Typography>
                                </Box>
                                <Typography variant="subtitle1">
                                    신청하신 예약은 마이페이지 또는 예약환인 탭에서 조회하실 수 있습니다.
                                 </Typography>
                            </React.Fragment>
                        ) : (
                                <React.Fragment>
                                    {getStepContent(activeStep)}
                                    {activeStep !== 0 && (
                                        <div className={classes.buttons}>
                                            <Button variant="contained" onClick={handleBack} className={classes.button}>
                                                이전
                                            </Button>

                                            {activeStep === steps.length - 1 && (
                                                < Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleNext}
                                                    className={classes.button}
                                                >
                                                    {activeStep === steps.length - 1 ? '예약하기' : '다음'}
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </React.Fragment>
                            )}
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment >
    );
}
