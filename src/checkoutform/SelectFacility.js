import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/SportsBasketball";
import app from "../firebase";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1)
    },
    extendedIcon: {
        marginRight: theme.spacing(2)
    },
    top: {
        textAlign: 'center'
    }
}));

const SelectFacility = ({ name, next, save }) => {
    const classes = useStyles();
    const [facilities, setFacilities] = React.useState([]);

    React.useEffect(() => {
        const fetchData = () => {
            const db = app.firestore();
            // 이것은 document아래를 프린트 할때 쓰이는 것 지우지 말것
            // db.collection("camp").doc(name).get().then(doc => {
            //     const data = doc.data();
            //     for (let i = 1; i < Object.keys(data).length + 1; i++) {
            //         setFacilities(oldArray => [...oldArray, { name: data[i] }]);
            //     }
            // });
            db.collection("camp").doc(name).collection('facility').get().then(snapshot => {
                snapshot.forEach(doc => {
                    setFacilities(oldArray => [...oldArray, { name: doc.id }]);
                });
            });

        };
        fetchData();
    }, [name]);

    const onClickEvent = (name) => {
        next();
        save(name);
    }

    return (
        <div className={classes.top}>
            {
                facilities.map(facility => (
                    <Fab
                        key={facility.name}
                        variant="extended"
                        color="primary"
                        aria-label="add"
                        className={classes.margin}
                        onClick={() => onClickEvent(facility.name)}
                    >
                        <NavigationIcon className={classes.extendedIcon} />
                        {facility.name}
                    </Fab>
                ))
            }
        </div>
    );
}

export default SelectFacility