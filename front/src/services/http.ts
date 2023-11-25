import { NewsItemProps } from "../components/News/Item/NewsItem";

export type HTTPResponse =
  | {
      token?: string;
      error?: string | number;
      login?: { id: string; login: string; name: string; avatar: string };
      news?: NewsItemProps[];
    }
  | undefined;

export default async function http(
  url: string,
  options: {
    method: "GET" | "POST";
    headers: Record<string, string>;
    body?: string;
  }
): Promise<HTTPResponse> {
  let response;
  try {
    response = await fetch(url, options);

    if (!(response.status >= 200 && response.status < 300)) {
      return { error: response.status };
    }
    const json = await response.json();
    if (!json) {
      return { error: "Error of responseType" };
    }
    if (json.login) {
      return { login: json };
    }
    if (json[0]) {
      return { news: json };
    }

    return json;
  } catch (e) {
    console.error(e);
  }
}
