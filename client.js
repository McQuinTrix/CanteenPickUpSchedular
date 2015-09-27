
var app = angular.module("clientApp",['ngRoute','LocalStorageModule']);

app.factory('Data', function() {
  return {
    "placedOrder":[],
    "order":{},
    "total":"",
    "time":"",
    "name":"",
    "email":""
  };
});

app.config(function ($routeProvider) {
    $routeProvider
	.when('/', {
	    controller: 'cafeController',
        templateUrl: '/partials/main.html'
    })
	.when('/time', {
	    controller: 'timeController',
      templateUrl: '/partials/time.html'
    })
  .when('/pos',{
      controller: 'posController',
      templateUrl: '/partials/pos.html'
  })

});

app.controller("cafeController",function($scope,$http,$location,Data){
  $scope.orders = [];
  $scope.total = 0;
  $http.get("cafeteria.json").success(function(data){
    $scope.stores = data.cafeteria;
  });

  $scope.addToCart = function(name,price){
    Data.name = $scope.user;
    Data.email = $scope.email;
    $scope.orders.push({"name":name,"price":price});
    $scope.total += Number(price);
  }

  $scope.Cancel = function(ind){
    $scope.total = $scope.total - $scope.orders[ind].price;
    $scope.orders.splice(ind,1);
  }
  $scope.timeOrder = function(){
    Data.order = $scope.orders;
    Data.total = $scope.total;
    $location.path("/time");
  }
});

app.controller("timeController",function($scope,Data,$location,localStorageService){
  $scope.total = Data.total;
  $scope.placeOrder = function(){
    $scope.time = $scope.time.getTime();
    var arr = localStorageService.get("placed") || [];
    arr.push({
              "name" : Data.name,
              "order": Data.order,
              "time" : $scope.time,
              "email": Data.email,
              "total": Data.total
            });
    localStorageService.set("placed",arr);
  }
});

app.controller('posController', function($scope,localStorageService){
  $scope.orders = localStorageService.get("placed");
});
