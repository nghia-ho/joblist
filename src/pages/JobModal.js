import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import apiService from "../app/apiService";

function JobModal(job) {
  let navigate = useNavigate();
  let { id } = useParams();
  let buttonRef = useRef(null);
  let jobDetail = getJob(id);
  function onDismiss() {
    navigate(-1);
  }
  const [jobs, setJob] = useState(null);
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

  function getJob(id) {
    jobs.find((job) => job.job.id === id);
  }

  return (
    <Dialog
      aria-labelledby="label"
      onDismiss={onDismiss}
      initialFocusRef={buttonRef}
    >
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          padding: "8px 8px",
        }}
      >
        <h1 id="label" style={{ margin: 0 }}>
          {jobDetail.title}
        </h1>

        <button
          style={{ display: "block" }}
          ref={buttonRef}
          onClick={onDismiss}
        >
          Close
        </button>
      </div>
    </Dialog>
  );
}

export default JobModal;
