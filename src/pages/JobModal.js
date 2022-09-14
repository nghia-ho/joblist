import "@reach/dialog/styles.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiService from "../app/apiService";
import { Modal } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

function JobModal() {
  const id = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate(from, { replace: true });
    // navigate(-1);
  };
  const [jobs, setJob] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const job = await apiService.get("/jobs");
        const data = await job.data;
        const detailJob = data.find((item) => item.id === id.id);

        setJob(detailJob);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id.id]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        height="100%"
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            bgcolor: "#F6E7D8",
            borderRadius: "15px",
            border: "1px solid #874356",
          }}
          textAlign="center"
        >
          <Box sx={{ my: 3, mx: 2 }}>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  color="#874356"
                >
                  {jobs?.title}
                </Typography>
              </Grid>
              <Grid item></Grid>
            </Grid>
            <Divider variant="middle" />
            <Typography color="#874356" variant="body2">
              {jobs?.description?.length > 400
                ? `${jobs?.description?.slice(0, 200)}...`
                : jobs?.description}
            </Typography>
          </Box>

          <Box sx={{ m: 2 }}>
            <Typography gutterBottom variant="body1" color="#874356">
              Skills:
            </Typography>
            <Stack direction="row" spacing={1}>
              {jobs?.skills?.slice(0, 4).map((job, index) => (
                <Chip label={job} color="secondary" key={index} size="small" />
              ))}
            </Stack>
          </Box>
          <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
            <Typography gutterBottom variant="body1" color="#874356">
              City: {jobs?.city}
            </Typography>
            <Button onClick={handleClose} color="secondary" variant="contained">
              Back
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default JobModal;
