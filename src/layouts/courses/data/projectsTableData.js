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

/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";


function Completion({ value, color }) {
  return (
    <VuiBox display="flex" flexDirection="column" alignItems="flex-start">
      <VuiTypography variant="button" color="white" fontWeight="medium" mb="4px">
        {value}%&nbsp;
      </VuiTypography>
      <VuiBox width="8rem">
        <VuiProgress value={value} color={color} sx={{ background: "#2D2E5F" }} label={false} />
      </VuiBox>
    </VuiBox>
  );
}

const action = (
  <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
    more_vert
  </Icon>
);

export default {
  columns: [
    { name: "project", align: "left" },
    { name: "budget", align: "left" },
    { name: "status", align: "left" },
    { name: "completion", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      project: (
        <VuiBox display="flex" alignItems="center">
          <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            Chakra Vision UI Version
          </VuiTypography>
        </VuiBox>
      ),
      budget: (
        <VuiTypography variant="button" color="white" fontWeight="medium">
          $14,000
        </VuiTypography>
      ),
      status: (
        <VuiTypography variant="button" color="white" fontWeight="medium">
          Working
        </VuiTypography>
      ),
      completion: <Completion value={60} color="info" />,
      action,
    },
    {
      project: (
        <VuiBox display="flex" alignItems="center">
          <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            Add Progress Track
          </VuiTypography>
        </VuiBox>
      ),
      budget: (
        <VuiTypography variant="button" color="white" fontWeight="medium">
          $3,000
        </VuiTypography>
      ),
      status: (
        <VuiTypography variant="button" color="white" fontWeight="medium">
          Done
        </VuiTypography>
      ),
      completion: <Completion value={100} color="info" />,
      action,
    },
    {
      project: (
        <VuiBox display="flex" alignItems="center">
          <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            Fix Platform Errors
          </VuiTypography>
        </VuiBox>
      ),
      budget: (
        <VuiTypography variant="button" color="white" fontWeight="medium">
          Not set
        </VuiTypography>
      ),
      status: (
        <VuiTypography variant="button" color="white" fontWeight="medium">
          Canceled
        </VuiTypography>
      ),
      completion: <Completion value={30} color="info" />,
      action,
    },
    {
      project: (
        <VuiBox display="flex" alignItems="center">
          test
        </VuiBox>
      ),
      budget: (
        <VuiTypography variant="button" color="white" fontWeight="medium">
          $32,000
        </VuiTypography>
      ),
      status: (
        <VuiTypography variant="button" color="white" fontWeight="medium">
          Canceled
        </VuiTypography>
      ),
      completion: <Completion value={0} color="info" />,
      action,
    },
    {
      project: (
        <VuiBox display="flex" alignItems="center">
          <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            Add the New Pricing Page
          </VuiTypography>
        </VuiBox>
      ),
      budget: (
        <VuiTypography variant="button" color="white" fontWeight="medium">
          $2,300
        </VuiTypography>
      ),
      status: (
        <VuiTypography variant="button" color="white" fontWeight="medium">
          Done
        </VuiTypography>
      ),
      completion: <Completion value={100} color="info" />,
      action,
    },
  ],
};
