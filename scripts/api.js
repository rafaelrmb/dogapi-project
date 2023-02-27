var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("x-api-key", "{{live_RfrjlgzlrYmq94o2mYXSJiZ3Y2yyxFYoCrDJ133z7YGulV6r3HEBp81NGZMrLpJW}}");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

export async function fetchJSON(url) {
  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error("ERROR! Status: " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}


