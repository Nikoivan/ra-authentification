export default async function http(
  url: string,
  options?: { method: string; body: Record<string, unknown> }
) {
  let response;
  console.log(options);
  try {
    if (options) {
      response = await fetch(url, {
        method: options.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options.body),
      });
    }
    response = await fetch(url);

    if (!(response.status >= 200 && response.status < 300)) {
      return { error: "Error of response" };
    }
    const json = await response.json();
    if (!json) {
      return { error: "Error of responseType" };
    }
    return { response: json };
  } catch (e) {
    console.error(e);
  }
}
