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

// const sports = { '야구장': 'SportsBaseball', '농구장': 'SportsBasketball', '축구장': 'SportsSoccer', '테니스장': 'SportsTennis' }

const SelectFacility = ({ name }) => {
    const classes = useStyles();
    const [facilities, setFacilities] = React.useState([]);

    React.useEffect(() => {
        const fetchData = () => {
            const db = app.firestore();
            db.collection("camp").doc(name).get().then(doc => {
                const data = doc.data();
                for (let i = 1; i < Object.keys(data).length + 1; i++) {
                    setFacilities(oldArray => [...oldArray, { name: data[i] }]);
                }
            });
        };
        fetchData();
    }, [name]);

    return (
        <div className={classes.top}>
            {
                facilities.map(facility => (
                    <Fab
                        variant="extended"
                        color="primary"
                        aria-label="add"
                        className={classes.margin}
                    // onClick={() => onClickEvent(facility.name)}
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