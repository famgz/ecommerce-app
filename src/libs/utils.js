export function getId(req) {
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);
  const _id = params.get('_id');
  return _id
}