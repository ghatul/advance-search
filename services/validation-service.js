class ValidateInfixExpressionService {
    validateInfix(infix) {
      var balance = 0;
      // remove white spaces to simplify regex
      infix = infix.replace(/ /g, '');
      var regex = /[\+\-]?\w+(([\+\-\*\/\&\|\!]|(\<\=?|\>\=?|\=\=|\!=))[\+\-]?\w+)*/;
  
      // if it has empty parenthesis then is not valid
      if (infix.match(/\(\)/)) {
        return false;
      }
  
      // validate parenthesis balance
      for (var i = 0; i < infix.length; i++) {
        if (infix[i] === '(') {
          balance++;
        } else if (infix[i] === ')') {
          balance--;
        }
  
        if (balance < 0) {
          return false;
        }
      }
  
      if (balance > 0) {
        return false;
      }
      return true;
    }
  
    validate(infix) {
  
      var exp = infix;
      var newExp = '';
      var operatorCount = 0;
      var operandCount = 0;
  
      if (exp == "" || exp == undefined) {
        return true;
      }
  
      if (exp && (exp.indexOf('[') !== -1 || exp.indexOf(']') !== -1)) {
        return false;
      }
  
      for (var i = 0; i < exp.length; i++) {
  
        if (exp[i] == '(') {
          if (i == 0) {
            newExp += "( ";
          } else {
            newExp += " ( ";
          }
        } else if (exp[i] == ')') {
          if (i == exp.length - 1) {
            newExp += " )";
          } else {
            newExp += " ) ";
          }
        } else {
          newExp += exp[i];
        }
      }
      var newExp2 = newExp.split(' ');
      for (var j = 0; j < newExp2.length; j++) {
        if (newExp2[j].toLowerCase() === 'and' || newExp2[j].toLowerCase() === 'or') {
          operatorCount++;
        } else if (newExp2[j] === '(' || newExp2[j] === ')' || newExp2[j].trim() === '') {
  
        } else {
          operandCount++;
        }
      }
      var newExp3 = new Array();
      for (var j = 0; j < newExp2.length; j++) {
        if (newExp2[j].trim() !== '') {
          newExp3.push(newExp2[j]);
        }
      }
      for (var k = 0; k < newExp3.length; k++) {
        if (newExp3[k] && newExp3[k] !== '(' && newExp3[k] !== ')'
          && newExp3[k].toLowerCase() !== 'and' && newExp3[k].toLowerCase() !== 'or') {
          if (newExp3[k + 1] && newExp3[k + 1].toLowerCase() !== 'and' && newExp3[k + 1].toLowerCase() !== 'or'
            && newExp3[k + 1] !== '(' && newExp3[k + 1] !== ')' && newExp3[k + 1] !== undefined) {
            operandCount--;
          }
        }
      }
      for (var j = 0; j < newExp3.length; j++) {
        if ((( newExp3[j] && (newExp3[j].toLowerCase() === 'and'
          || newExp3[j].toLowerCase() === 'or')) && ((newExp3[j - 1] && newExp3[j - 1].toLowerCase() === 'and')
          || (newExp3[j + 1] && newExp3[j + 1].toLowerCase() === 'and')
          || (newExp3[j - 1] && newExp3[j - 1].toLowerCase() === 'or' ) || (newExp3[j + 1]
          && newExp3[j + 1].toLowerCase() === 'or') || (newExp3[j + 1] && newExp3[j + 1] === ')')))) {
          return false;
        }
      }
      if (operandCount - 1 == operatorCount && operatorCount !== 0) {
        return this.validateInfix(exp);
      }
      return false;
    }
  }
  
  module.exports = new ValidateInfixExpressionService();