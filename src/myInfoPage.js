import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import app from "./firebase";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Bookmarks from '@material-ui/icons/Bookmarks';
import AccountBox from '@material-ui/icons/AccountBox';
import Lock from '@material-ui/icons/Lock';
import CalendarToday from '@material-ui/icons/CalendarToday';


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(4, 0, 2),
        width: '100%',
        backgroundColor: "#fafafa",
    },
}));

const MyInfoPage = () => {
    const [userInfo, setUserInfo] = React.useState({})
    const [value, setValue] = React.useState('recents');

    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            app.firestore().collection("users").where('uid', '==', user.uid).get().then(snapshot => {
                snapshot.forEach(doc => {
                    setUserInfo(doc.data());
                });
            });
        });
    }, []);


    return (
        <div>
            <BottomNavigation value={value} onChange={handleChange} showLabels className={classes.root}>
                <BottomNavigationAction label="개인정보 변경" value="recents" icon={<AccountBox />} />
                <BottomNavigationAction label="비밀번호 변경" value="favorites" icon={<Lock />} />
                <BottomNavigationAction label="내 예약현황" value="nearby" icon={<CalendarToday />} />
                <BottomNavigationAction label="이용현황" value="folder" icon={<Bookmarks />} />
            </BottomNavigation>
            <Container component="main" maxWidth="xs">

                <Typography align="center" component="h1" variant="h5">
                    {userInfo.name}
                    {userInfo.military}
                    {userInfo.rank}
                    {userInfo.serialNumber}
                    {userInfo.admin === "true" ? '관리자계정' : '일반계정'}
                </Typography>
            </Container>
        </div>
    );
}

export default MyInfoPage;
