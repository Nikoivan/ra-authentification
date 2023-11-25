import { ChangeEvent, useState, useContext, useEffect } from "react";
import http from "../../services/http";

import NetoHeader from "../NetoHeader/NetoHeader";
import AuthForm from "../AuthForm/AuthForm";
import Context, { ContextTypeProps } from "../../services/Context";
import Login from "../Login/Login";
import NetoMain from "../NetoMain/NetoMain";
import { NewsItemProps } from "../News/Item/NewsItem";
import NetoNews from "../News/List/NewsList";

export default function NetoSocial({ baseUrl }: { baseUrl: string }) {
  const [formState, setFormState] = useState<{
    login: string;
    password: string;
  }>({ login: "", password: "" });
  const [news, setNews] = useState<NewsItemProps[]>();

  const { login, setLogin, token, setToken } =
    useContext<ContextTypeProps>(Context);

  const getToken = () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  };

  const getNews = async (token: string) => {
    const response = await http(baseUrl + "private/news", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response?.error) {
      setLogin();
      setToken();
    }
    if (response?.news) {
      setNews(response.news);
    }
  };

  const onChangeHandeler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitHadler = async () => {
    if (!formState.login || !formState.password) {
      return;
    }
    const response = await http(baseUrl + "auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    });
    if (response?.token) {
      setToken(response.token);
      window.localStorage.setItem("token", response.token);
      getLogin(response.token);
      getNews(response.token);
      setFormState({ login: "", password: "" });
    }
  };

  const getLogin = async (token: string) => {
    const response = await http(baseUrl + "private/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response?.error) {
      setLogin();
      setToken();
    }

    setLogin(response?.login);
  };

  useEffect(getToken, []);

  useEffect(() => {
    if (token) {
      (async () => {
        getLogin(token);
        getNews(token);
      })();
    }
    setNews(undefined);
  }, [token]);

  return (
    <>
      <NetoHeader
        children={
          !login ? (
            <AuthForm
              formState={formState}
              onChangeHandler={onChangeHandeler}
              onSubmitHandler={onSubmitHadler}
            />
          ) : (
            <Login />
          )
        }
      />
      {news ? <NetoNews news={news} /> : <NetoMain />}
    </>
  );
}
