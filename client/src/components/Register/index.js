import React, {useState} from "react";
import { CentralBlock, Input } from "../common";
import { Button, Form } from "react-bootstrap";

const Register = () => {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");

  const onChange = event => {
    console.log(event.target.name)
    switch (event.target.name) {
      case "text":
        setText(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // props.register(text, password)
  };

  return (
    <CentralBlock title="Register" close={true}>
      <Form className="register" onSubmit={onSubmit}>
        <Input title="Player name" type="text" value={text} onChange={onChange} name="text" />
        <Input title="Password" type="password" value={password} onChange={onChange} name="password" />
        <div className="buttons justify-content-center">
          <Button disabled={!text || !password} type="submit">Register</Button>
        </div>
      </Form>
    </CentralBlock>
  )
}

export default Register;
