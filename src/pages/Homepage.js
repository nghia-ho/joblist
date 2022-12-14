import React, { useEffect, useState } from "react";
import apiService from "../app/apiService";
import JobCard from "../components/JobCard";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useSearchParams } from "react-router-dom";
function HomePage() {
  let [searchParams] = useSearchParams();

  const [jobs, setJob] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const job = await apiService.get("/jobs");
        setJob(job.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  if (!jobs) return null;
  return (
    <Container>
      <Grid container spacing={5} sx={{ mt: 1 }}>
        {jobs
          .slice(0, 6)
          .filter((job) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = job.title.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })

          .map((job) => (
            <Grid key={job.id} item xs={12} md={6} lg={4}>
              <JobCard job={job} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
