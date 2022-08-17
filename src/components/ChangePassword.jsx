import { Container, Form } from "react-bootstrap";

const ChangePasswordForm = () => {
  return (
    <Container className="cardFormWrapper">
      <div className="cardForm">
        <Form>
          <Form.Label style={{ fontSize: 20, color: "#878a91" }}>
            Change Password
          </Form.Label>
          <Form.Group className="mb-3">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter current password"
              required
              // className={inputTheme}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new password"
              required
              // className={inputTheme}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Re-type password"
              required
              // className={inputTheme}
            />
          </Form.Group>

          <button type="submit" className="createGoalButton">
            Apply
          </button>
        </Form>
      </div>
    </Container>
  );
};

export default ChangePasswordForm;
