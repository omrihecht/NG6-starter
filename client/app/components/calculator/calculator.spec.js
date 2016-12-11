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
      controller.onNumberClick("5");
      controller.onFnClick('+');
      expect(controller).displayVal == '10';
    });

    it('10 - 5 equals 5', () => {
      controller.onNumberClick("10");
      controller.onNumberClick("5");
      controller.onFnClick('-');
      expect(controller).displayVal == '5';
    });

    it('5 * 5 equals 25', () => {
      controller.onNumberClick("5");
      controller.onNumberClick("5");
      controller.onFnClick('x');
      expect(controller).displayVal == '25';
    });

  });

  /*describe('Controller', () => {
    // controller specs
    let controller;
    beforeEach(() => {
      controller = $componentController('about', {
        $scope: $rootScope.$new()
      });
    });

    it('has a name property', () => { // erase if removing this.name from the controller
      expect(controller).to.have.property('name');
    });
  });

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

  });*/



});
