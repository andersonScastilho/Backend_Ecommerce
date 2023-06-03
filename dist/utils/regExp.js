"use strict";Object.defineProperty(exports, "__esModule", {value: true}); const regExpIsValidText = value => /^[^\d]+$/gi.test(value); exports.regExpIsValidText = regExpIsValidText

 const isValidBRZip = zip => /^[0-9]{5}-[0-9]{3}$/.test(zip); exports.isValidBRZip = isValidBRZip;
