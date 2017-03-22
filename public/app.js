angular.module("meanlab", [
  "ui.router",
  "ngResource"
])
.config ([
  "$stateProvider",
  Router
])
.factory("Todo", [
  "$resource",
  Todo
])
.controller("indexCtrl", [
  "$state",
  "Todo",
  indexController
])
.controller("showCtrl", [
  "$stateParams",
  "Todo",
  ShowController
])

function Router($stateProvider){
  $stateProvider
  .state("welcome", {
   url: "/",
   templateUrl: "js/ng-views/welcome.html"
  })
.state("show", {
  url:"/todos",
  templateUrl: "js/ng-views/show.html",
  controller: "indexCtrl",
  controllerAs: "vm"
})
}

function Todo ($resource) {
  return $resource("/api/todos/:title", {}, {
    update: {method: "PUT"}
  });
}

function indexController ($state, Todo) {
  this.Todos = Todo.query()
  this.create = function () {
    this.newTodo.$save().then(function(todo){
      $state.go("show", { title: todo.title})
    })
  }
}
function showController ($stateParams, Todo) {
  this.todo = Todo.get({title: $stateParams.title})
}
