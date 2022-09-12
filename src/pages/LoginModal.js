import Modal from "@mui/material/Modal";
import Form from "../components/Form";
import { useNavigate, useParams } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import JobModal from "../pages/JobModal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  border: "none",
};

function LoginModal() {
  const navigate = useNavigate();
  const { id } = JobModal;
  function handleClose(event) {
    event.preventDefault();
    navigate(-1);
    console.log(id);
  }

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}

export default LoginModal;
