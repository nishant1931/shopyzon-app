import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";

const Message = ({ variant, children }) => {
  const [show, setShow] = useState(true);
  if (show) {
    return (
      <Alert variant={variant} onClose={() => setShow(false)} dismissible>
        <h4>{children}</h4>
      </Alert>
    );
  }
  return (
    <Button hidden onClick={() => setShow(true)}>
      Show Alert
    </Button>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
