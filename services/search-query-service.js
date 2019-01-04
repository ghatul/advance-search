const infixToPostfix = require("./infix-to-postfix-service.js");
const validate = require("./validation-service.js");

class SearchQueryService {

  constructor() { }

  //Method used to create mongo query from postfix expression.
  query(expression, fieldName, fieldType) {

    let _type = ['array', 'string'];

    if (!expression)
      return { message: "Please provide expression to evaluate", code: 400, query: {} }

    if (!fieldName)
      return { message: "Missing collection's attribute name", code: 400, query: {} }

    if (!validate.validateInfix(expression))
      return { message: "Invalid expression", code: 400, query: {} }

    if (!fieldType) {
      return { message: "Please provide collection field type", code: 400, query: {} }
    }

    if (_type.indexOf(fieldType) == -1) {
      return { message: "Please provide valid collection field type(array/string)", code: 400, query: {} }
    }

    //let infixToPostfix = new InfixToPostfix();
    let stack = [];
    let regPostFixExpressionArray = [];
    regPostFixExpressionArray = infixToPostfix.postFix(expression);
    for (let i = 0; i < regPostFixExpressionArray.length; i++) {
      let validateExpForPlusSign = regPostFixExpressionArray[i].replace(/Acanthospermum/g, '\\+');
      let validateExpForMinusSign = validateExpForPlusSign.replace(/Adenocalymma/g, '\\-');
      regPostFixExpressionArray[i] = validateExpForMinusSign;
    }

    for (let i = 0; i < regPostFixExpressionArray.length; i++) {

      if (regPostFixExpressionArray[i] === '+' || regPostFixExpressionArray[i] === '-') {
        let topElement = stack.pop();
        let secondTopelement = stack.pop();
        if (regPostFixExpressionArray[i] === '+') {
          stack.push(this.queryElement('$or', topElement, secondTopelement));
        } else {
          stack.push(this.queryElement('$and', topElement, secondTopelement));
        }
      } else {
        let keySkill;
        let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;
        if (format.test(regPostFixExpressionArray[i])) {
          keySkill = new RegExp(regPostFixExpressionArray[i], 'i');
        } else {
          keySkill = new RegExp('\\b(' + regPostFixExpressionArray[i] + '[0-9]?)\\b', 'i');
        }
        stack.push(this.querySelection(keySkill, fieldName, fieldType));
      }
    }

    if (stack.length > 1)
      return { message: "Invalid expression", code: 400, query: {} }

    return { message: "success", code: 200, query: stack[0] }
    //return stack;
  }

  querySelection(keySkill, fieldName, fieldType) {
    let searchElement = {};
    searchElement[fieldName] = {};
    if (fieldType == 'array') {
      searchElement[fieldName] = { $in: [keySkill] };
      return searchElement;
    } else {
      searchElement[fieldName] = keySkill;
      return searchElement;
    }
  }

  //Method is used to create and or elements.
  queryElement(operator, topElement, secondTopelement) {
    let query = {};
    query[operator] = [];
    query[operator].push(topElement);
    query[operator].push(secondTopelement);
    return query;
  }

  //Method used to add advance query in main search crietria.
  addQuery(criteria, query) {

    let booleanSearchQuery = this.query(query);

    if (booleanSearchQuery[0]['$and']) {
      criteria['$and'] = booleanSearchQuery[0]['$and'];
    }
    if (booleanSearchQuery[0]['$or']) {
      criteria['$or'] = booleanSearchQuery[0]['$or'];
    }
    return criteria;
  }
}

module.exports = new SearchQueryService();
