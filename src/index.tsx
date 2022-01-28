import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import "./styles.scss"
import imageUrl from "./assets/img/image.jpeg";
import { useEvt } from "evt/hooks";
import { Evt } from "evt";

let y = 0;

function App() {
  //const headerRef = useRef<HTMLHeadingElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  useEvt(ctx => {
    Evt.from(ctx, window, "wheel").attach((e) => {
      if(!ref.current) return;
      console.log(ref.current.clientHeight);
      /*console.log(ref.current.clientHeight);
      console.log(ref.current.clientTop);*/
    })
  }, []);

  return <div className="contentWrapper">
    <header /*ref={headerRef}*/ id="header">Header</header>

    <section id="section">
      <h1>Section with articles</h1>
      <div className="articlesAndAsideWrapper">
        <div ref={ref} className="articlesWrapper">
          {
            [1, 2, 3, 4].map(number =>
              <div key={number} className="articleWrapper">
                <article>
                  <h2>Article</h2>
                  <p>
                    Proin et pharetra erat, vel posuere sem. Nullam scelerisque, libero vel accumsan gravida, nibh libero sodales ante, vel fermentum turpis tortor nec dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse in aliquet orci. Nullam sed ullamcorper ante, sed finibus tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ex sapien, blandit nec sodales sed, molestie non tellus. Donec urna dolor, dignissim a tristique sit amet, finibus at nulla. Nam porta ante turpis, ac egestas ligula sodales sit amet. Sed tincidunt imperdiet semper. Nulla eu lorem vulputate, fringilla justo vitae, mollis nunc. Donec molestie libero ac mi sodales, at feugiat velit rhoncus. Fusce ligula nisl, bibendum vestibulum maximus et, semper ut arcu. Donec commodo metus mauris, quis blandit urna vulputate sed. In id lacus ut odio eleifend efficitur.
                  </p>
                </article>
                <aside>
                  <img src={imageUrl} alt="palm trees" />
                </aside>
              </div>
            )
          }
        </div>
        <div /*ref={sidebarRef}*/ id="sidebar">

        </div>

      </div>
    </section>

  </div>
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

