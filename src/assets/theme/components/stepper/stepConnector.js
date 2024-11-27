/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Vision UI Dashboard React base styles
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";

const { dark, info, white } = colors;
const { borderWidth, borderColor } = borders;

export default {
  styleOverrides: {
    root: {
      color: borderColor.white,
      transition: "all 200ms linear",

      "&.Mui-active": {
        color: info.main,
      },

      "&.Mui-completed": {
        color: info.main,
      },
    },

    alternativeLabel: {
      top: "10%",
      left: "-50%",
      right: "50%",
    },

    line: {
      borderWidth: `${borderWidth[4]} !important`,
      borderColor: "currentColor",
    },
  },
};
