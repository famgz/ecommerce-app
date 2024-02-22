export function convertToPlainObject(obj) {
  return JSON.parse(JSON.stringify(obj));
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
