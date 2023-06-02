export const regExpIsValidText = value => /^[^\d]+$/gi.test(value)

export const isValidBRZip = zip => /^[0-9]{5}-[0-9]{3}$/.test(zip);
