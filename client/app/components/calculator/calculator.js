import angular from 'angular';
import uiRouter from 'angular-ui-router';
import calculatorComponent from './calculator.component';

let calculatorModule = angular.module('calculator', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('calculator', {
      url: '/',
      component: 'calculator'
    });
})

.component('calculator', calculatorComponent)

.name;

export default calculatorModule;
