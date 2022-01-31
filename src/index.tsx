import React from 'react';
import ReactDOM from 'react-dom';
import "./styles.scss"
import imageUrl from "./assets/img/image.jpeg";
import { makeStyles } from "./theme";
import { Header } from "./Header";
import { SideBar } from "./SideBar";

function App() {
  const { classes } = useStyles();


  return <div className={classes.root}>
    <Header />

    <section className={classes.section}>
      <div className={classes.articleWrapper}>
        {
          [1, 2, 3, 4, 5].map(number =>
            <article key={number}>
              <div>
                <h2>Article {number}</h2>
                <p>
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </p>
              </div>
              <img src={imageUrl} alt="article illustration" />

            </article>)

        }
      </div>

      <SideBar />

    </section>

  </div>
}
const useStyles = makeStyles()({
  "root": {
    "position": "relative"
  },
  "section": {
    "display": "flex",
    "flexDirection": "row",
    "paddingLeft": "100px",
    "backgroundColor": "lightblue",
  },
  "articleWrapper": {
    "flex": 1.5,
    "& img": {
      "width": "100%"
    }
  },
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


