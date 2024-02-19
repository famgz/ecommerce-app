export function getId(req) {
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);
  return params.get('_id');
}
