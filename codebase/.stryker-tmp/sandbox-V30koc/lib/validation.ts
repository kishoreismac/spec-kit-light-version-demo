// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import { Product } from "@/models/product";
type ValidationResult = {
  valid: boolean;
  errors: string[];
};
export function validateProducts(items: Product[]): ValidationResult {
  if (stryMutAct_9fa48("11")) {
    {}
  } else {
    stryCov_9fa48("11");
    const errors: string[] = stryMutAct_9fa48("12") ? ["Stryker was here"] : (stryCov_9fa48("12"), []);
    if (stryMutAct_9fa48("15") ? items.length !== 0 : stryMutAct_9fa48("14") ? false : stryMutAct_9fa48("13") ? true : (stryCov_9fa48("13", "14", "15"), items.length === 0)) {
      if (stryMutAct_9fa48("16")) {
        {}
      } else {
        stryCov_9fa48("16");
        errors.push(stryMutAct_9fa48("17") ? "" : (stryCov_9fa48("17"), "The catalog dataset is empty."));
      }
    }
    for (const item of items) {
      if (stryMutAct_9fa48("18")) {
        {}
      } else {
        stryCov_9fa48("18");
        if (stryMutAct_9fa48("21") ? (!item.id || !item.name) && !item.category : stryMutAct_9fa48("20") ? false : stryMutAct_9fa48("19") ? true : (stryCov_9fa48("19", "20", "21"), (stryMutAct_9fa48("23") ? !item.id && !item.name : stryMutAct_9fa48("22") ? false : (stryCov_9fa48("22", "23"), (stryMutAct_9fa48("24") ? item.id : (stryCov_9fa48("24"), !item.id)) || (stryMutAct_9fa48("25") ? item.name : (stryCov_9fa48("25"), !item.name)))) || (stryMutAct_9fa48("26") ? item.category : (stryCov_9fa48("26"), !item.category)))) {
          if (stryMutAct_9fa48("27")) {
            {}
          } else {
            stryCov_9fa48("27");
            errors.push(stryMutAct_9fa48("28") ? `` : (stryCov_9fa48("28"), `Product ${stryMutAct_9fa48("31") ? item.id && "<missing-id>" : stryMutAct_9fa48("30") ? false : stryMutAct_9fa48("29") ? true : (stryCov_9fa48("29", "30", "31"), item.id || (stryMutAct_9fa48("32") ? "" : (stryCov_9fa48("32"), "<missing-id>")))} is missing required fields.`));
          }
        }
        if (stryMutAct_9fa48("35") ? (!item.shortDescription || !item.fullDescription) && !item.imageUrl : stryMutAct_9fa48("34") ? false : stryMutAct_9fa48("33") ? true : (stryCov_9fa48("33", "34", "35"), (stryMutAct_9fa48("37") ? !item.shortDescription && !item.fullDescription : stryMutAct_9fa48("36") ? false : (stryCov_9fa48("36", "37"), (stryMutAct_9fa48("38") ? item.shortDescription : (stryCov_9fa48("38"), !item.shortDescription)) || (stryMutAct_9fa48("39") ? item.fullDescription : (stryCov_9fa48("39"), !item.fullDescription)))) || (stryMutAct_9fa48("40") ? item.imageUrl : (stryCov_9fa48("40"), !item.imageUrl)))) {
          if (stryMutAct_9fa48("41")) {
            {}
          } else {
            stryCov_9fa48("41");
            errors.push(stryMutAct_9fa48("42") ? `` : (stryCov_9fa48("42"), `Product ${item.id} has incomplete content.`));
          }
        }
      }
    }
    return stryMutAct_9fa48("43") ? {} : (stryCov_9fa48("43"), {
      valid: stryMutAct_9fa48("46") ? errors.length !== 0 : stryMutAct_9fa48("45") ? false : stryMutAct_9fa48("44") ? true : (stryCov_9fa48("44", "45", "46"), errors.length === 0),
      errors
    });
  }
}