import { memo } from "react";
import { makeStyles } from "./theme";

export const headerHeight = 100;


export const Header = memo(() => {

	const { classes } = useStyles();

	return <header className={classes.root}>Header</header>

})

const useStyles = makeStyles()({
		"root": {
			"backgroundColor": "darkblue",
			"color": "white",
			"height": headerHeight,
			"fontSize": "2rem",
			"display": "flex",
			"alignItems": "center",
			"justifyContent": "center",
			"position": "sticky",
			"top": 0,
			"zIndex": 2

		}
	})
