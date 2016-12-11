import angular from 'angular';
import uiRouter from 'angular-ui-router';
import calculatorComponent from './calculator.component';
import onKeyDown from './keydown.directive.js';

let calculatorModule = angular.module('calculator', [uiRouter])


.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('calculator', {
      url: '/',
      component: 'calculator'
    });
})

.component('calculator', calculatorComponent)
.directive({
  //onKeyDown
})


.name;

export default calculatorModule;
