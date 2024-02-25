import { useState } from "react";
import {
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Password = ({passwordFunc, id}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const PWD = id === "password" ? "Password" : "Confirm Password"

  return (
    <FormControl sx={{ width: 300 }} variant="outlined" size="small" color="accent" >
      <InputLabel htmlFor={id}>{id}</InputLabel>
      <OutlinedInput
        id={id}
        onChange={(e) => passwordFunc(e)}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={id}
      />
    </FormControl>
  );
};

export default Password;
