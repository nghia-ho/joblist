import Modal from "@mui/material/Modal";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
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
  function handleClose(event) {
    event.preventDefault();
    navigate(-1);
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
