import CalculatorModule from './calculator'

describe('Calculator', () => {
  let $rootScope, $state, $location, $componentController, $compile;

  beforeEach(window.module(CalculatorModule));

  beforeEach(inject(($injector) => {
    $rootScope = $injector.get('$rootScope');
    $componentController = $injector.get('$componentController');
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $compile = $injector.get('$compile');
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
    it('Calculator component should be visible when navigates to /', () => {
      $location.url('/');
      $rootScope.$digest();
      expect($state.current.component).to.eq('calculator');
    });
  });

  describe('Controller', () => {
    // controller specs
    let controller;
    beforeEach(() => {
      controller = $componentController('calculator', {
        $scope: $rootScope.$new()
      });
    });

    it('5 + 5 equals 10', () => {
      controller.onNumberClick("5");
      controller.onFnClick('+');
      controller.onNumberClick("5");
      controller.equals();
      expect((controller).displayVal).to.equal(10);
    });

    it('10 - 5 equals 5', () => {
      controller.onNumberClick("10");
      controller.onFnClick('-');
      controller.onNumberClick("5");
      controller.equals();
      expect((controller).displayVal).to.equal(5);
    });

    it('5 * 5 equals 25', () => {
      controller.onNumberClick("5");
      controller.onFnClick('x');
      controller.onNumberClick("5");
      controller.equals();
      expect((controller).displayVal).to.equal(25);
    });

  });

  /*

  describe('View', () => {
    // view layer specs.
    let scope, template;

    beforeEach(() => {
      scope = $rootScope.$new();
      template = $compile('<about></about>')(scope);
      scope.$apply();
    });

    it('has name in template', () => {
      expect(template.find('h1').html()).to.eq('about');
    });

  });

  */



});
