export default async function (htmlRelativeUrl, baseUrl) {
  const htmlUrl = new URL(htmlRelativeUrl, baseUrl).href;
  return fetch(htmlUrl).then((response) => response.text());
}
