"use strict";Object.defineProperty(exports, "__esModule", {value: true}); const regExpValidationCharactersFromAToZ = value => /^[^\d]+$/gi.test(value); exports.regExpValidationCharactersFromAToZ = regExpValidationCharactersFromAToZ

 const regExpValidationBRZip = zip => /^[0-9]{5}-[0-9]{3}$/.test(zip); exports.regExpValidationBRZip = regExpValidationBRZip;
