import { ChangeEvent, useState } from "react";
import NetoHeader from "../NetoHeader/NetoHeader";
import http from "../../services/http";
import AuthForm from "../AuthForm/AuthForm";

export default function NetoSocial({ baseUrl }: { baseUrl: string }) {
  const [formState, setFormState] = useState<{
    login: string;
    password: string;
  }>({ login: "", password: "" });
  const [login, setLogin] = useState<string>();

  const onChangeHandeler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitHadler = async () => {
    if (!formState.login || !formState.password) {
      return;
    }
    const test = await http(baseUrl + "auth", {
      method: "POST",
      body: formState,
    });
    console.log(test);
  };

  return (
    <NetoHeader
      children={
        !login ? (
          <AuthForm
            formState={formState}
            onChangeHandler={onChangeHandeler}
            onSubmitHandler={onSubmitHadler}
          />
        ) : null
      }
    />
  );
}
