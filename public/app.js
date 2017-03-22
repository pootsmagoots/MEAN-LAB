angular
.module("Mean-Lab", [
  "ui.router",
  "ngResource"
])
.config ([
  "$stateProvider",
  Router
])
.controller("homeCtrl", [
  "Todo",
  "$stateParams",
  "$state",
  homeControllerFunction
])
.controller("showCtrl", [
  "$stateParams",
  "$state",
  showControllerFunction
])
.factory("Todo", [
  "$resource",
  Todo
])

function Router($stateProvider){
  $stateProvider
   .state("home", {
   url: "/todos",
   templateUrl: "js/ng-views/home.html",
   controller: "homeCtrl",
   controllerAs: "vm"
  })
.state("show", {
  url:"/todos/:title",
  templateUrl: "js/ng-views/show.html",
  controller: "showCtrl",
  controllerAs: "vm"
})
}

function Todo($resource) {
  return $resource("/api/todos/:title", {}, {
    update: {method: "PUT"}
  });
}

function homeControllerFunction(Todo, $stateParams, $state) {
  this.todos = Todo.query()

  this.create = function () {
    this.newTodo.$save().then(function(todo){
      $state.go("show", { title: todo.title})
    })
  }
}
function showControllerFunction ($stateParams, $state) {
  this.todo = Todo.get({title: $stateParams.title})
}
