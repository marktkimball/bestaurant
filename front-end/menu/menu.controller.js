(function() {
  'use strict';
  angular
    .module('menu')
    .controller('MenuController', function($scope, MenuService, $routeParams){

      $scope.updatedItem ={};

      MenuService.getMenu($routeParams.restaurantId).success(function(items){
        $scope.items = items;
      });

      if($routeParams.itemId){
        MenuService.getItem($routeParams.itemId).success(function(item){
          $scope.item = item;
          $scope.updatedItem = item;
        });
      };

      $scope.newItem = {};

      $scope.addItem = function(newItem){
        $('.alertItem').fadeIn('slow').fadeOut('slow');
        MenuService.addItem(newItem);
        $scope.newItem = {};
      };

      $scope.deleteItem = function(id){
        MenuService.deleteItem(id);
      };


      $scope.editItem = function(id, updatedItem){
        $('.alertItem').fadeIn('slow').fadeOut('slow');
        MenuService.editItem(id, updatedItem);
      };

      $scope.sortName = 'id';

      $scope.selectSort = function(sortSelected, $event){
        var el = $event.target;
        $(el).parent().siblings().children().css('text-decoration', 'none');
        $(el).css('text-decoration', 'underline');
        $scope.sortName = sortSelected;
      };


      var watchCallback = function () {
          MenuService.getMenu().success(function (items) {
            $scope.items = items;
          });
        };

      $scope.$on('item:deleted', watchCallback);
      $scope.$on('item:added', watchCallback);
      $scope.$on('item:edited', watchCallback);

    });
})();
