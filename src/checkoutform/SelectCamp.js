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


const SelectCamp = ({ next, save }) => {
    const classes = useStyles();
    const [camps, setCamps] = React.useState([]);

    React.useEffect(() => {
        const fetchData = () => {
            const db = app.firestore();
            db.collection("camp").get().then(snapshot => {
                snapshot.forEach(doc => {
                    setCamps(oldArray => [...oldArray, { name: doc.id }]);
                });
            });
        };
        fetchData();
    }, []);

    const onClickEvent = (name) => {
        next();
        save(name);
    }

    return (
        <div className={classes.top}>
            {
                camps.map(camp => (
                    <Fab
                        key={camp.name}
                        variant="extended"
                        color="primary"
                        aria-label="add"
                        className={classes.margin}
                        onClick={() => onClickEvent(camp.name)}
                    >
                        <NavigationIcon className={classes.extendedIcon} />
                        {camp.name}
                    </Fab>
                ))
            }
        </div>
    );
}

export default SelectCamp;
