const story = (path: string) => `https://node-hnapi.herokuapp.com/${path}`;
const user = (path: string) => `https://hacker-news.firebaseio.com/v0/${path}.json`;

export default async function fetchAPI(path: string) {
  const url = path.startsWith("user") ? user(path) : story(path);
  const headers = { "User-Agent": "chrome" };

  const hrstart = process.hrtime();
  let reshrend;
  let texthrend;

  try {
    let response = await fetch(url, { headers });
    reshrend = process.hrtime(hrstart);
    let text = await response.text();
    texthrend = process.hrtime(hrstart);
    try {
      if (text === null) {
        return { error: "Not found" };
      }
      return JSON.parse(text);
    } catch (e) {
      console.error(`Recevied from API: ${text}`);
      console.error(e);
      return { error: e };
    }
  } catch (error) {
    return { error };
  } finally {
    const jsonhrend = process.hrtime(hrstart);
    console.info('resp  Execution time (hr): %ds %dms', reshrend[0], reshrend[1] / 1000000);
    console.info('text  Execution time (hr): %ds %dms', texthrend[0], texthrend[1] / 1000000);
    console.info('json  Execution time (hr): %ds %dms', jsonhrend[0], jsonhrend[1] / 1000000);
  }
}
