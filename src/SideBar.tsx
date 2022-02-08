/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useState, useEffect } from "react";
import { makeStyles } from "./theme";
import { useEvt } from "evt/hooks";
import { Evt } from "evt";
import { useDomRect } from "powerhooks/useDomRect";
import { headerHeight } from "./Header";


export const SideBar = memo(() => {

	const [contentPusherMargin, setContentPusherMargin] = useState(0);
	const [scrollDirection, setScrollDirection] =
		useState<"up" | "down">("down");
	const { domRect: { height }, ref } = useDomRect();

	useEvt(ctx => {
		let previousScrollY = 0;
		Evt.from(ctx, window, "scroll").attach(() => {

			if (previousScrollY > window.scrollY) {
				setScrollDirection("up")
			}

			if (previousScrollY < window.scrollY) {
				setScrollDirection("down");
			}

			previousScrollY = window.scrollY;
		});

	}, []);



	useEffect(() => {

		const overflowingPartHeight = height - window.innerHeight + headerHeight;

		if (overflowingPartHeight <= 0) {
			return;
		}

		switch (scrollDirection) {
			case "up":
				if (window.scrollY < overflowingPartHeight) {
					break;
				};
				if (
					window.scrollY < contentPusherMargin ||
					contentPusherMargin === 0 ||
					window.scrollY > contentPusherMargin + overflowingPartHeight
				) {
					setContentPusherMargin(window.scrollY - overflowingPartHeight);
				};
				break;

			case "down":
				if (window.scrollY < contentPusherMargin) {
					setContentPusherMargin(window.scrollY);
				}
		}

	}, [scrollDirection]);



	const { classes } = useStyles({
		contentPusherMargin,
		"asideHeight": height

	});

	return <aside className={classes.root}>
		<div className={classes.contentPusher}></div>
		<div ref={ref} className={classes.contentWrapper}>
			<h2>Aside</h2>
			<ul>
				{
					[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(number =>
						<li key={number}>Lorem Ipsum {number}</li>)
				}
			</ul>

		</div>
	</aside>

})

const useStyles = makeStyles<{
	contentPusherMargin: number;
	asideHeight: number
}>()(
	(...[, { contentPusherMargin, asideHeight }]) => ({
		"root": {
			"flex": "0.5",
			"backgroundColor": "lavender",
			"marginLeft": "50px",
			"& h2": {
				"textAlign": "center"
			},
			"& ul": {
				"& li": {
					"fontSize": "1.2rem",
					"marginBottom": 40
				}
			}

		},
		"contentPusher": {
			"marginTop": contentPusherMargin,
		},
		"contentWrapper": {
			"position": "sticky",
			...(() => {
				const value = 40;

				return {
					"paddingTop": value,
					"paddingBottom": value
				}
			})(),
			"backgroundColor": "orange",
			...(() => {
				const value = asideHeight - window.innerHeight;
				if (value + headerHeight <= 0) {
					return {
						"top": headerHeight
					}
				}
				return {
					"top": -value,
					"bottom": -value - headerHeight
				}

			})()
		}
	}))