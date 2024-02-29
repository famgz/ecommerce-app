export function getId(req) {
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);
  return params.get('_id');
}

export function convertToPlainObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function clampId(id) {
  return id.slice(0, 4) + '...' + id.slice(-4);
}

export function copyToClipboard(string) {
  navigator.clipboard.writeText(string);
}

export function formatToReal(n) {
  n = Number(n);
  if (isNaN(n)) {
    return '-';
  }
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(n);
}

export function parseCheckoutForm(form) {
  if (!form || Object.keys(form).length === 0) {
    return false;
  }

  const requiredKeys = [
    'name',
    'email',
    'city',
    'postalCode',
    'streetAddress',
    'country',
  ];

  const parsedForm = {};
  for (const key of requiredKeys) {
    const value = form[key].trim();
    if (!value) {
      console.error(`Empty field: ${key}`);
      return false;
    }
    parsedForm[key] = value;
  }

  return parsedForm;
}
