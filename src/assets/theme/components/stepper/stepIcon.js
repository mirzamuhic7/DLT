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
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Vision UI Dashboard React helper functions
import pxToRem from "assets/theme/functions/pxToRem";
import boxShadow from "assets/theme/functions/boxShadow";

const { dark, info, white } = colors;
const { borderWidth, borderColor } = borders;

export default {
  styleOverrides: {
    root: {
      background: white.main,
      fill: white.main,
      stroke: white.main,
      strokeWidth: pxToRem(10),
      width: pxToRem(20),
      height: pxToRem(20),
      border: `${borderWidth[2]} solid ${white.main}`,
      borderRadius: "50%",
      zIndex: 99,
      transition: "all 200ms linear",

      "&.Mui-active": {
        background: info.main,
        fill: info.main,
        stroke: info.main,
        borderColor: info.main,
        boxShadow: boxShadow([0, 0], [0, 2], info.main, 1),
      },

      "&.Mui-completed": {
        background: info.main,
        fill: info.main,
        stroke: info.main,
        borderColor: info.main,
        boxShadow: boxShadow([0, 0], [0, 2], info.main, 1),
      },
    },
  },
};
