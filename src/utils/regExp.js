export const regExpValidationCharactersFromAToZ = value => /^[^\d]+$/gi.test(value)

export const regExpValidationBRZip = zip => /^[0-9]{5}-[0-9]{3}$/.test(zip);
