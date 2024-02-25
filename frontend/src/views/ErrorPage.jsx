import { useRouteError } from "react-router-dom";
import { Container, Grid, Stack } from "@mui/material";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Grid
      container
      sx={{ mt: 7 }}
      id="error-page"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={12} textAlign="center">
        <h1>Oops!</h1>
      </Grid>
      <Grid item>
        <p>Sorry, an unexpected error has occured.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </Grid>
    </Grid>
  );
};

export default ErrorPage;
