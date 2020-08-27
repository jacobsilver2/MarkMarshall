import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

const GlobalStyle = createGlobalStyle`
    ${reset}
    *, *:before, *:after {
      box-sizing: border-box;
    }

  :root {
    --yellow: #ffc600;
    --light: #ffffff;
    --dark: #000000;
    --lightGrey: #d8d8d8;
    --lightGray: var(--lightGrey);
    --imGoingToFaint: #fbfbfb;
    --maxWidth: 1200px;
  }
  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    box-sizing: border-box;
    font-size: 10px;
    font-family: 'HCo Operator Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    position: relative;
    color: var(--dark);

  }
  body {
    min-height: calc(100vh - 40px);
    font-size: 2rem;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  h1,h2,h3,h4,h5,h6 {
    font-family: 'radnika', sans-serif;
    font-weight: normal;
    line-height: 1.5;
  }
  a {
    color: var(--dark);
  }
  p, ul, ol {
    line-height: 1.77777777777777776777777777;
    font-weight: 400;
  }
  ul {
    list-style-type: square;
  }
  p a, li a {
    --rotate: -2deg;
    --scaleX: 1;
    /* display: inline-flex; */
    position: relative;
    &:before {
      /* display: inline-block; */
      height: 5px;
      position: absolute;
      background: var(--yellow);
      content: '';
      width: 100%;
      bottom: -2px;
      z-index: -1;
      transition: transform 0.1s;
      transform: skew(-20deg) rotate(var(--rotate)) scaleX(var(--scaleX));
    }
    &:hover {
      --scaleX: 1.03;
    }
  }
  p a:nth-child(4n+1) { --rotate: -2deg; }
  p a:nth-child(4n+2) { --rotate: 1.64deg; }
  p a:nth-child(4n+3) { --rotate: 0.6deg; }
  p a:nth-child(4n+4) { --rotate: -0.75deg; }
  video {
    max-width: 100%;
  }
  @media (min-width:2500px) {
    body:after {
      content: 'Wow you have a big monitor!';
      display: block;
      position: fixed;
      top: 0;
      bottom:0;
      right: 3rem;
      font-size: 6.5vh;
      pointer-events: none;
      transform: rotate(90deg);
      text-shadow: 3px 3px 0 white;
    }
  }
  img {
    max-width: 100%;
  }

  ::selection {
    background: var(--yellow);
  }
`

export default GlobalStyle
