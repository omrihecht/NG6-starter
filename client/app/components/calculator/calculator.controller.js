
class CalculatorController {
  constructor( $scope, $timeout, calculatorService ) {
    this.numbers = [9,8,7,6,5,4,3,2,1,0,'.'];
    this.name = 'calculator';
    this.fnButtons = ['+', '-', 'x', '÷'];
    this.calcFuncs = {
      '+' : {
        name      : 'add',
        activated : false,
        action    : calculatorService.add,
        symbol    : '+'
      },
      '-' : {
        name      : 'subtract',
        activated : false,
        action    : calculatorService.subtract,
        symbol    : '-'
      },
      'x' : {
        name      : 'multiply',
        activated : false,
        action    : calculatorService.multiply,
        symbol    : 'x'
      },
      '÷' : {
        name      : 'devide',
        activated : false,
        action    : calculatorService.devide,
        symbol    : '÷'
      }
    }

    this.keyObj = (eKey) => {
      var keys = {
        '+'         : { symbol : '+', action : this.onFnClick },
        '-'         : { symbol : '-', action : this.onFnClick },
        '*'         : { symbol : 'x', action : this.onFnClick },
        '/'         : { symbol : '÷', action : this.onFnClick },
        'Enter'     : { symbol : 'equals', action : this.equals },
        '='         : { symbol : 'equals', action : this.equals },
        'Backspace' : { symbol : 'reset', action : this.reset },
        'Delete'    : { symbol : 'reset', action : this.reset },
        'Space'     : { symbol : 'reset', action : this.reset },
        'c'         : { symbol : 'reset', action : this.reset },
        'default'   : { symbol : '', action : null }
      }
      var funcKey = (  keys[eKey]) ? keys[eKey] : keys['default'];
      var isNumber = ( ( eKey >= 0 && eKey <=9 && eKey != ' ' ) || eKey == '.' );
      var calc = this;
      return {
        key   : isNumber ? eKey : funcKey.symbol,
        func  : isNumber ? this.onNumberClick : funcKey.action,
        calc  : calc
      };
    }

    this.displayVal = this.remVal = '0';
    this.memVal = '';
    this.displayValChange = this.fnCalled = false;
    this.activeFn = null;
    this.activeBtn = null;
    this.$scope = $scope;
    this.$timeout = $timeout;

    //document.getElementsByClassName('calculator-holder')[0].focus();
  }

  onKeyDown(e){
    console.log('e.keyCode :: ' + e.keyCode + ', e.key :: ' + e.key);

    var keyObj = this.keyObj(e.key);
    console.dir( keyObj );
    if( keyObj.key != '' && keyObj.func != null ){
      keyObj.func( keyObj.key );
      this.indicateBtn( keyObj.key )
    }
  }

  indicateBtn( keyVal ){
    this.activeBtn = keyVal;
    this.$timeout( () => {
      this.activeBtn = null;
    }, 150);
  }

  onNumberClick( numVal ){
    debugger
    //this = (this.calc) ? this.calc : this;
    this.displayValChange = true;
    if( this.fnCalled ){
      this.remVal = this.displayVal;
      this.displayVal = '';
      this.fnCalled = false;
    }
    this.displayVal = ( this.displayVal == '0' ) ? '' : this.displayVal;
    if( numVal === '.' && this.displayVal.toString().indexOf('.') !== -1 ) return;
    this.displayVal = this.displayVal.toString() + numVal.toString();
  }

  onFnClick( calcFnBtn ){
    this.equals();
    var calcFn = this.calcFuncs[calcFnBtn]
    this.memVal = this.displayVal + ' ' + calcFnBtn;
    this.activeFn = calcFn;
    calcFn.activated = true;
    this.fnCalled = true;
    this.displayValChange = false;
  }

  equals(){
    console.log('equals');
    /*this.fnButtons.forEach(function(obj){
      obj.activated = false;
    });*/
    if( !this.displayValChange || !this.activeFn ) return;
    this.displayVal = this.activeFn.action( parseFloat(this.remVal) , parseFloat(this.displayVal) );
    this.remVal = this.displayVal;
    this.activeFn = null;
    this.memVal = '';
  }

  reset(){
    console.log('reset');
    this.displayVal = this.remVal = '0';
    this.memVal = '';
    this.displayValChange = this.fnCalled = false;
    this.activeFn = null;
    this.equals();
  }
}
CalculatorController.$inject = ['$scope','$timeout','calculatorService']
export default CalculatorController;
