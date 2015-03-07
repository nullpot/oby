'use strict';

angular.module('obyApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    /*もでる*/
    $scope.tweet = {};
    $scope.books = [];
    $scope.book = {};
    $scope.amazonQuery = '';

/*
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });
*/
    $scope.searchBook = function() {
      if($scope.amazonQuery === '') {
        return;
      }
      $http.get('http://atogaki.net/book_search/json/' + $scope.amazonQuery ).
      success(function(data){
        $scope.books = data;
        $scope.amazonQuery = '';
        $scope.book = {};
        $scope.tweet = {};
      });
    };

    $scope.searchTweet = function(idx) {
      $scope.book = $scope.books[idx];
      if($scope.book.title === '') {
        return;
      }
      $http.get('http://api.aasha.co.jp/twitter/books.php?text=' + $scope.book.title).
      success(function(data){
        $scope.tweet = data;
        $scope.books = [];
      });
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
