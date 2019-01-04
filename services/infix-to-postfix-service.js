class InfixToPostfix {

    //Method used to create infix to postfix expression.
    postFix(expresion) {
      let operatorStack = [];
      let postFixStack = [];
  
      let regInfixExpressionArray = this.givenExpression(expresion);
      for (let i = 0; i < regInfixExpressionArray.length; i++) {
        if (regInfixExpressionArray[i] === '+' || regInfixExpressionArray[i] === '-' ||
          regInfixExpressionArray[i] === ')' || regInfixExpressionArray[i] === '(') {
  
          if (regInfixExpressionArray[i] === '+') {
            if (operatorStack.length) {
              let topElement = operatorStack.pop();
  
              if (topElement === '+' || topElement === '-') {
                postFixStack.push(topElement);
                operatorStack.push(regInfixExpressionArray[i]);
              } else {
                operatorStack.push(topElement);
                operatorStack.push(regInfixExpressionArray[i]);
              }
            } else {
              operatorStack.push(regInfixExpressionArray[i]);
            }
  
          } else if (regInfixExpressionArray[i] === '-') {
  
            if (operatorStack.length) {
              let topElement = operatorStack.pop();
              if (topElement === '+' || topElement === '-') {
                postFixStack.push(topElement);
                operatorStack.push(regInfixExpressionArray[i]);
              } else {
                operatorStack.push(topElement);
                operatorStack.push(regInfixExpressionArray[i]);
              }
            } else {
              operatorStack.push(regInfixExpressionArray[i]);
            }
  
          } else if (regInfixExpressionArray[i] === ')') {
  
            let topElement = operatorStack.pop();
            if(topElement !== '(') {
              postFixStack.push(topElement);
            }
  
          } else if (regInfixExpressionArray[i] === '(') {
            operatorStack.push(regInfixExpressionArray[i]);
          }
        } else {
          postFixStack.push(regInfixExpressionArray[i]);
        }
      }
  
      for (let j = 0; j < operatorStack.length; j++) {
        if (operatorStack[operatorStack.length - (j + 1)] === '+' || operatorStack[operatorStack.length - (j + 1)] === '-') {
          postFixStack.push(operatorStack[operatorStack.length - (j + 1)]);
        }
      }
      return postFixStack;
    }
  
    //Method used to create proper infix expression.
    givenExpression(expresion) {
      let expressionStack = [];
      let operand = '';
      let regExp = this.manipulatingRegularExpression(expresion);
  
      for (let k = 0; k < regExp.length; k++) {
  
        switch (regExp[k]) {
  
          case '+':
            expressionStack.push(regExp[k]);
            break;
  
          case '-':
            expressionStack.push(regExp[k]);
            break;
  
          case '(':
            expressionStack.push(regExp[k]);
            break;
  
          case ')':
            expressionStack.push(regExp[k]);
            break;
  
          default :
            operand += regExp[k];
            if (regExp[k + 1] === '+' || regExp[k + 1] === '-' || regExp[k + 1] === ')' || regExp[k + 1] === '(' || regExp.length - 1 === k) {
              if(operand !=='')
              expressionStack.push(operand);
              operand ='';
            }
        }
      }
      return expressionStack;
    }
  
    //Method used to create proper infix expression(mainly spaces and bracket issues)
    manipulatingRegularExpression(expresion)  {
      let isContainOpeningBracket = '';
      let isContainingAND = '';
      let isContainingOR = '';
      var  expressionArray;
      var  expressionArray2=[];
      var validateExpression='';
      var newExp='';
      for (var i = 0; i < expresion.length; i++) {
  
        if (expresion[i] == '(') {
          if (i == 0) {
            newExp += "( ";
          } else {
            newExp += " ( ";
          }
        } else if (expresion[i] == ')') {
          if (i == expresion.length - 1) {
            newExp += " )";
          } else {
            newExp += " ) ";
          }
        } else {
          newExp += expresion[i];
        }
      }
      expressionArray =  newExp.trim().split(' ');
      for (var j = 0; j < expressionArray.length; j++) {
        if(isContainOpeningBracket==='('||isContainingAND==='and'||isContainingOR==='or') {
          if(expressionArray[j]==='') {
            //not adding spaces after '(' or 'and' or 'or'
          } else {
            expressionArray2.push(expressionArray[j])
            isContainOpeningBracket='';
            isContainingAND='';
            isContainingOR='';
          }
        }else {
          expressionArray2.push(expressionArray[j]);
        }
        if (expressionArray[j]==='(') {
          isContainOpeningBracket=isContainOpeningBracket+expressionArray[j];
        }
        if (expressionArray[j].toLowerCase()==='and') {
          isContainingAND=isContainingAND+expressionArray[j].toLowerCase();
        }
        if (expressionArray[j].toLowerCase()==='or') {
          isContainingOR=isContainingOR+expressionArray[j].toLowerCase();
        }
        //removing spaces before  )
        if(expressionArray[j].indexOf(')')===0) {
          for (var valueIndex=expressionArray2.length-2;valueIndex>=0;valueIndex--) {
            if(expressionArray2[valueIndex].trim()==='') {
              expressionArray2.splice(valueIndex,1);
            }else {
              valueIndex=-1;
            }
          }
        }
        //removing spaces before 'and'  'or'
        if( expressionArray[j] && (expressionArray[j].toLowerCase()==='and' ||expressionArray[j].toLowerCase()==='or')) {
          for (var expIndex=expressionArray2.length-2;expIndex>=0;expIndex--) {
            if(expressionArray2[expIndex].trim()==='') {
              expressionArray2.splice(expIndex,1);
            } else {
              expIndex=-1;
            }
          }
        }
      }
      expressionArray=[];
      expressionArray=expressionArray2;
      for (var k = 0; k < expressionArray.length; k++) {
        if (expressionArray[k].length>=0) {
          if((expressionArray[k].toLowerCase()!=='and' && expressionArray[k].toLowerCase()!=='or'
              && expressionArray[k]!=='('&& expressionArray[k]!==')'&& expressionArray[k]!=='') &&
            (expressionArray[k+1]!==undefined && expressionArray[k+1].length>=0 &&
              (expressionArray[k+1].toLowerCase()!=='and' && expressionArray[k+1].toLowerCase()!=='or'
              && expressionArray[k+1]!=='('&& expressionArray[k+1]!==')'))) {
            expressionArray[k]=expressionArray[k]+' ';
          }
          if (expressionArray[k].toLowerCase() === 'and') {
            expressionArray[k] = ' and ';
          }
          if (expressionArray[k].toLowerCase() === 'or') {
            expressionArray[k] = ' or ';
          }
          if (expressionArray[k].length==0) {
            expressionArray[k] = ' ';
          }
          validateExpression = validateExpression + expressionArray[k];
        }
      }
      expresion=validateExpression;
      let validateExpForPlusSign = expresion.replace(/\+/g, 'Acanthospermum');
      let validateExpForMinusSign = validateExpForPlusSign.replace(/\-/g, 'Adenocalymma');
      expresion=validateExpForMinusSign;
      let regExpAnd = expresion.replace(/ and /g, '-');
      let regExp = regExpAnd.replace(/ or /g, '+');
      return regExp;
  
    }
  
  }
  
  module.exports = new InfixToPostfix();
  