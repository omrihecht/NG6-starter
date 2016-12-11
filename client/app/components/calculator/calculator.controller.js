
class CalculatorController {
  constructor( $scope, $timeout ) {
    this.numbers = [9,8,7,6,5,4,3,2,1,0,'.'];
    this.name = 'calculator';
    this.calcFn = {
      buttons: [
        {
          name      : 'add',
          activated : false,
          action    : this.add,
          symbol    : '+'
        },
        {
          name      : 'subtract',
          activated : false,
          action    : this.subtract,
          symbol    : '-'
        },
        {
          name      : 'multiply',
          activated : false,
          action    : this.multiply,
          symbol    : 'x'
        },
        {
          name      : 'devide',
          activated : false,
          action    : this.devide,
          symbol    : '÷'
        },
      ],
      activeFn      : null
    };
    this.displayVal = this.remVal = '0';
    this.memVal = '';
    this.displayValChange = this.fnCalled = false;
    this.$scope = $scope;

    document.getElementsByClassName('calculator-holder')[0].focus();
  }

  onKeyDown(e){
    console.log('e.keyCode 2 :: ' + e.keyCode + ', e.key 1 :: ' + e.key);
    if( e.key >= 0 && e.key <=9 || e.key == '.' ){
      this.onNumberClick(e.key);
      this.indicateBtn( 'num-' + e.key );
    }
    if( e.key == '+' ){
      this.onFnClick(this.calcFn.buttons[0]);
      this.indicateBtn( this.calcFn.buttons[0].name );
    }
    if( e.key == '-' ){
      this.onFnClick(this.calcFn.buttons[1]);
      this.indicateBtn( this.calcFn.buttons[1].name );
    }
    if( e.key == '*' ){
      this.onFnClick(this.calcFn.buttons[2]);
      this.indicateBtn( this.calcFn.buttons[2].name );
    }
    if( e.key == '/' ){
      this.onFnClick(this.calcFn.buttons[3]);
      this.indicateBtn( this.calcFn.buttons[3].name );
    }
    if( e.key == 'Enter' || e.key == '=' ){
      this.equals();
      this.indicateBtn( 'equals' );
    }
    if( e.key == 'Backspace' || e.key == 'Delete' || e.keyCode == 2 ){
      this.reset();
      this.indicateBtn( 'reset' );
    }
  }

  indicateBtn( className ){
    var el = document.getElementsByClassName(className);
    el[0].classList.add('active');
    setTimeout(function(){
      el[0].classList.remove('active');
    }.bind(el),150);
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

  onFnClick( calcFn ){
    this.equals();
    this.memVal = this.displayVal;
    this.calcFn.activeFn = calcFn;
    calcFn.activated = true;
    this.fnCalled = true;
    this.displayValChange = false;
  }

  add(a,b){
    console.log('add');
    return a + b;
  }
  subtract(a,b){
    console.log('subtract');
    return a - b;
  }
  multiply(a,b){
    console.log('multiply');
    return a * b;
  }
  devide(a,b){
    console.log('devide');
    return a / b;
  }
  equals(){
    console.log('equals');
    this.calcFn.buttons.forEach(function(obj){
      obj.activated = false;
    });
    if( !this.displayValChange || !this.calcFn.activeFn ) return;
    this.displayVal = this.calcFn.activeFn.action( parseFloat(this.remVal) , parseFloat(this.displayVal) );
    this.remVal = this.displayVal;
    this.calcFn.activeFn = null;
    this.memVal = '';
  }
  reset(){
    console.log('reset');
    this.displayVal = this.remVal = '0';
    this.memVal = '';
    this.displayValChange = this.fnCalled = false;
    this.calcFn.activeFn = null;
    this.equals();
  }
}
CalculatorController.$inject = ['$scope','$timeout']
export default CalculatorController;
