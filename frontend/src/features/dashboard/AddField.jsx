import { useState } from "react";
import FormRow from "../../ui/FormRow";
import { Modal } from "@mui/material";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

function AddField({ onSubmitFct, open, closeModal }) {
  const [name, setName] = useState();
  const handleOnChange = (e) => {
    setName(e.target.value);
  };
  function handleSubmit() {
    if (!name) return;
    onSubmitFct({ name });
    setName("");
    closeModal();
  }
  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Form onSubmit={handleSubmit} type="modal">
        <div className="text-4xl font-bold font-robotoMono">Add a Field</div>
        <FormRow label="New Field Name">
          <Input
            name="name"
            value={name}
            id="categoryName"
            autoComplete="off"
            onChange={handleOnChange}
          />
        </FormRow>

        <FormRow>
          <Button type="reset" variation="reset">
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </FormRow>
      </Form>
    </Modal>
  );
}

export default AddField;
