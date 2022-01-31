import { memo, useState, useEffect } from "react";
import { makeStyles } from "./theme";
import { useEvt } from "evt/hooks";
import { Evt } from "evt";
import { useDomRect } from "powerhooks/useDomRect";
import { useConst } from "powerhooks/useConst";


export const SideBar = memo(() => {

	const [contentPusherMargin, setContentPusherMargin] = useState(0);
	const [scrollDirection, setScrollDirection] = 
	useState<"up" | "down">("down");
	const { domRect: { height }, ref } = useDomRect();

	const scrollValue = useConst(()=>{
		return {
			"y": 0
		}
	});

	useEvt(ctx => {
		Evt.from(ctx, window, "scroll").attach(e => {

			if(scrollValue.y > window.scrollY){
				setScrollDirection("up")
			}

			if(scrollValue.y < window.scrollY){
				setScrollDirection("down");
			}

			scrollValue.y = window.scrollY;
		})

	},[])


	const { classes } = useStyles({ 
		contentPusherMargin, 
		scrollDirection ,
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
	scrollDirection: "up" | "down";
	asideHeight: number
}>()(
	(...[, { contentPusherMargin, scrollDirection, asideHeight }]) => ({
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
		"contentWrapper": {
			"position": "sticky",
			"border": "solid red 2px",
			...(() => {
				const value = asideHeight - window.innerHeight;
				console.log(`value :${value}`)
				if (scrollDirection === "down") {
					return {
						"top": -value
					}
				}

				return {
					"bottom": -value
				}

			})()
		},
		"contentPusher": {
			"marginTop": contentPusherMargin

		}
	}))