import { createGlobalStyle } from "styled-components"

// import OperatorMonoBookItalic_Web from "../assets/fonts/operator/OperatorMono-BookItalic_Web.woff2"
// import OperatorMonoBook_Web from "../assets/fonts/operator/OperatorMono-Book_Web.woff2"
// import OperatorMonoBoldItalic_Web from "../assets/fonts/operator/OperatorMono-BoldItalic_Web.woff2"
// import OperatorMonoBold_Web from "../assets/fonts/operator/OperatorMono-Bold_Web.woff2"

import DMSansBold from "../assets/fonts/DM_Sans/DMSans-Bold.ttf"
import DMSansBoldItalic from "../assets/fonts/DM_Sans/DMSans-BoldItalic.ttf"
import DMSansRegular from "../assets/fonts/DM_Sans/DMSans-Regular.ttf"
import DMSansItalic from "../assets/fonts/DM_Sans/DMSans-Italic.ttf"

const Fonts = createGlobalStyle`
  @font-face {
    font-family: 'DM Sans';
    src: url(${DMSansRegular}) format('ttf');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'DM Sans';
    src: url(${DMSansItalic}) format('ttf');
    font-weight: 400;
    font-style: italic;
  }

  @font-face {
    font-family: 'DM Sans';
    src: url(${DMSansBold}) format('ttf');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'DM Sans';
    src: url(${DMSansBoldItalic}) format('ttf');
    font-weight: 700;
    font-style: italic;
  }
`
export default Fonts
