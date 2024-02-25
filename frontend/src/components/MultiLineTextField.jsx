import React from 'react'
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const StyledForm = styled("div")(({ theme }) => ({
  "& .MuiTextField-root": {
    // margin: theme.spacing(1)
  }
}));
const StyledTextField = styled(TextField)`
  textarea {
    resize: both;
  }
`;

const MultiLineTextField = ({handleText}) => {
  return (
    <StyledForm>
      <div>
        <StyledTextField sx={{width: "300px"}} onChange={handleText} id="text" placeholder="What's on your mind?" multiline variant="outlined"></StyledTextField>
      </div>
    </StyledForm>
  )
}

export default MultiLineTextField