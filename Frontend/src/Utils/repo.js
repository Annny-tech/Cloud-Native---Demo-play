export function hashRepo(str) {
  let h = 0;

  for (let i = 0; i < str.length; i++) {
    h =
      (h * 31 + str.charCodeAt(i)) >>>
      0;
  }

  return h;
}

export function pickLang(url, langs) {
  const hash = hashRepo(
    url.trim().toLowerCase()
  );

  return langs[hash % langs.length];
}

export function repoName(url) {
  try {
    const parts = url
      .replace(/\/+$/, "")
      .split("/");

    return (
      parts[parts.length - 2] +
      "/" +
      parts[parts.length - 1]
    ).replace(".git", "");

  } catch {
    return "app/service";
  }
}

export function shortName(url) {
  const name = repoName(url);

  return name.split("/").pop();
}