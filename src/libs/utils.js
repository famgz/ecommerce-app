export function getId(req) {
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);
  const id = params.get('id');
  return id
}