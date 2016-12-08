import angular from 'angular';
import Home from './home/home';
import Calculator from './calculator/calculator'
import About from './about/about';

let componentModule = angular.module('app.components', [
  Home,
  Calculator,
  About
])

.name;

export default componentModule;
