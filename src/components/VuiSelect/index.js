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

import { forwardRef } from "react";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import StyledSelect from "./VuiSelectRoot";


const VuiSelect = forwardRef(({ variant, color, value, label, onChange, options, ...rest }, ref) => (
    <FormControl fullWidth>
        {/* Use dynamic label */}
        <StyledSelect
            labelId="vui-select-label"
            id="vui-select"
            value={value}
            label={label}
            onChange={onChange}
            {...rest}
            ownerState={{
                size: "medium",
                error: false,
                success: false,
                direction: "ltr",
                iconDirection: "right",
            }}
        >
            {options.map((value, index) => (
                <MenuItem key={index} value={value}>
                    {value}
                </MenuItem>
            ))}
        </StyledSelect>
    </FormControl>
));


export default VuiSelect;
