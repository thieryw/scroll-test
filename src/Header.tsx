import { memo, useRef, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { makeStyles } from "./theme";
import { useEvt } from "evt/hooks";
import { Evt } from "evt";

export type HeaderProps = {
	title: ReactNode;
}

export const headerHeight = 100;

export const Header = memo((props: HeaderProps) => {

	const { title } = props;

	const [titleWidth, setTitleWidth] = useState(0);
	const [linksWidth, setLinksWidth] = useState(0);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const titleRef = useRef<HTMLDivElement>(null);
	const linksRef = useRef<HTMLUListElement>(null);

	useEvt(ctx => {
		Evt.from(ctx, window, "resize").attach(() => {
			setWindowWidth(window.innerWidth);
		})
	}, [])

	useEffect(() => {
		if (!titleRef.current || !linksRef.current) return;

		setLinksWidth(linksRef.current.clientWidth);
		setTitleWidth(titleRef.current.clientWidth);

	}, [titleRef.current?.clientWidth, linksRef.current?.clientWidth]);

	const { classes } = useStyles({
		titleWidth,
		linksWidth,
		windowWidth
	});

	return <header className={classes.root}>
		<div ref={titleRef}>{
			typeof title === "string" ?
				<h1>{title}</h1> :
				title
		}</div>
		<ul ref={linksRef} className={classes.list}>
			{
				[1, 2, 3, 4].map(number => <li key={number}>{`link ${number}`}</li>)
			}
		</ul>
	</header>

})

const useStyles = makeStyles<{
	titleWidth: number;
	linksWidth: number;
	windowWidth: number;
}>()((...[, { linksWidth, titleWidth, windowWidth }]) => {
	const isCollapsed = linksWidth + 220 > windowWidth - titleWidth;

	console.log(linksWidth);
	console.log(titleWidth);
	return {
		"root": {
			"overflow": "hidden",
			"backgroundColor": "darkblue",
			"color": "white",
			"height": headerHeight,
			"fontSize": "2rem",
			"display": "flex",
			"alignItems": "center",
			"justifyContent": "space-between",
			"position": "sticky",
			"top": 0,
			"zIndex": 2,
			...(() => {
				const value = 100;
				return {
					"paddingLeft": value,
					"paddingRight": value
				}
			})()

		},
		"list": {
			"position": "absolute",
			"right": 100,
			"display": "flex",
			"gap": 50,
			"listStyleType": "none",
			...(()=>{
				if(!isCollapsed){
					return {}
				};

				return {
					"opacity": 0,
					"pointerEvents": "none"
				}
			})()
		}
	}
});
