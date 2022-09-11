import * as React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { Paper } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function MiddleDividers(job) {
  let location = useLocation();

  return (
    <CssBaseline>
      <Paper>
        <Box
          sx={{
            height: 300,
          }}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexDirection="column"
        >
          <Box sx={{ my: 2, mx: 1 }}>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="body1 "
                  align="center"
                  component="div"
                >
                  {job.job.title}
                </Typography>
              </Grid>
            </Grid>
            <Divider variant="middle" />
            <Box sx={{ m: 1 }}>
              <Stack direction="row" spacing={1}>
                {job.job.skills.slice(0, 4)?.map((job) => (
                  <Chip
                    key={job}
                    color="error"
                    size="small"
                    label={job}
                    style={{ fontSize: "0.7rem" }}
                  />
                ))}
              </Stack>
            </Box>
            <Typography
              color="text.secondary"
              variant="body2"
              sx={{ mt: 1, ml: 1, mb: 1 }}
            >
              {job.job.description.length > 300
                ? `${job.job.description.slice(0, 200)}...`
                : job.job.description}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Link
              to={`/jobs/${job.job.id}`}
              state={{ backgroundLocation: location }}
            >
              <Button color="warning" variant="contained">
                Learn more
              </Button>
            </Link>
          </Box>
        </Box>
      </Paper>
    </CssBaseline>
  );
}
