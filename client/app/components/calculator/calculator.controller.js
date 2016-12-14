
class CalculatorController {
  constructor( $scope, $timeout, calculatorService ) {
    this.$scope = $scope;
    this.$timeout = $timeout;
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

    this.keys = {
      '+'         : { symbol : '+', action : this.onFnClick },
      '-'         : { symbol : '-', action : this.onFnClick },
      '*'         : { symbol : 'x', action : this.onFnClick },
      '/'         : { symbol : '÷', action : this.onFnClick },
      'Enter'     : { symbol : 'equals', action : this.equals },
      '='         : { symbol : 'equals', action : this.equals },
      'Backspace' : { symbol : 'reset', action : this.reset },
      'Delete'    : { symbol : 'reset', action : this.reset },
      'Space'     : { symbol : 'reset', action : this.reset },
      'c'         : { symbol : 'reset', action : this.reset }
    }
    for(var i=0; i<this.numbers.length; i++){
      this.keys[ this.numbers[i].toString() ] = { symbol:this.numbers[i].toString(), action: this.onNumberClick }
    }

    this.displayVal = this.remVal = '0';
    this.memVal = '';
    this.displayValChange = this.fnCalled = false;
    this.activeFn = null;
    this.activeBtn = this.selectedFn = null;
  }

  onKeyDown(e){
    var keyObj = this.keys[e.key];
    if( !keyObj ) return;
    keyObj.action.call(this, keyObj.symbol );
    this.activeBtn = keyObj.symbol;
  }

  onKeyUp(){
    this.activeBtn = null;
  }

  onNumberClick( numVal ){
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

  onFnClick( calcFnSymbol ){
    this.equals();
    this.selectedFn = calcFnSymbol;
    var calcFn = this.calcFuncs[calcFnSymbol];
    this.memVal = this.displayVal + ' ' + calcFnSymbol;
    this.activeFn = calcFn;
    calcFn.activated = true;
    this.fnCalled = true;
    this.displayValChange = false;
  }

  equals(){
    this.selectedFn = null;
    if( !this.displayValChange || !this.activeFn ) return;
    this.displayVal = this.activeFn.action( parseFloat(this.remVal) , parseFloat(this.displayVal) );
    this.remVal = this.displayVal;
    this.activeFn = null;
    this.memVal = '';
  }

  reset(){
    this.displayVal = this.remVal = '0';
    this.memVal = '';
    this.displayValChange = this.fnCalled = false;
    this.activeFn = null;
    this.equals();
  }
}
CalculatorController.$inject = ['$scope','$timeout','calculatorService']
export default CalculatorController;
