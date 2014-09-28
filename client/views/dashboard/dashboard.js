(function(){
  'use strict';

  angular.module('abode')
  .controller('DashboardCtrl', ['$scope', 'User', 'Goal', function($scope, User, Goal){
    $scope.oneAtATime = true;
    $scope.goals = [];
    $scope.goal = {};

    User.getCurrent().then(function(response){
      $scope.user = response.data.user;
    });

    Goal.index().then(function(response){
      $scope.goals = response.data.goals;
    });

    $scope.addGoal = function(){
      Goal.create($scope.goal).then(function(response){
        $scope.goals.push(response.data.goal);
        $scope.goal = {};
      });
    };

    $scope.sortableOptions = {
      stop: function(e, ui){
        var goal = ui.item.scope().$parent.$parent.goal;
        Goal.update(goal).then(function(){
        });
      }
    };

    $scope.addTask = function(goal){
      goal.task.goalId = goal._id;
      Goal.add(goal.task).then(function(response){
        if (response.status === 200) {
          goal.tasks.push(goal.task);
        }
        goal.task = {};
      });
    };

    $scope.goalComplete = function(goal){
      var goalId = goal._id,
      index = _.indexOf($scope.goals, goal);
      Goal.goalComplete(goalId).then(function(response){
        $scope.goals.splice(index, 1);
      });
    };

    $scope.taskComplete = function(goal){
      Goal.update(goal).then(function(){
      },
      function(err){
        alert('So sorry, there was an error or something.');
      });
    };

  }]);
})();

