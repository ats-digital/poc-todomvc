angular.module('app')

.controller('TodoCtrl', ['$scope', 'filterFilter', 'TodoProvider',
    function($scope, filterFilter, TodoProvider) {
    $scope.content = '';
    $scope.todos = TodoProvider.query(function() {
        checkAllComplete();
    });

    $scope.addTodo = function () {
        var newTodo = new TodoProvider();
            newTodo.content = $scope.content;
            newTodo.complete = false;

        if (!newTodo.content) {
            return;
        }

        newTodo.$save(function(todo) {
            $scope.todos.push(todo);
            $scope.content = '';
            $scope.allComplete = false;
        });
    };

    /**
     * Switch to edit mode.
     * 
     * @param {object} todo
     */
    $scope.editTodo = function (todo) {
        todo.edit = true;
    };

    /**
     * Save edited Todo.
     * 
     * @param {object} todo
     * @param {string} event
     */
    $scope.saveEdits = function (todo, event) {
        if (event === 'blur') {
            console.log('blur')
            todo.edit = false;
            return;
        }

        delete todo.edit;
        todo.$save(function() {
            todo.edit = false;
            checkAllComplete();
        });
    };

    $scope.removeTodo = function (todo, index) {
        TodoProvider.delete({id: todo.id}, function() {
            $scope.todos.splice(index, 1);
            checkAllComplete();
        });
    };

    $scope.switchComplete = function () {
        TodoProvider.switchComplete({allComplete: $scope.allComplete});
        for (var i = 0; i < $scope.todos.length; i++) {
            $scope.todos[i].complete = $scope.allComplete;
        }
    };

    $scope.toggleStatus = function (status) {
        $scope.statusFilter = (status === 'active') ?
            { complete: false } : (status === 'completed') ?
            { complete: true } : {};
    };

    $scope.clearComplete = function() {
        TodoProvider.clearComplete(function() {
            $scope.todos = filterFilter($scope.todos, {complete: false});
        });
    };

    /**
     * Check if all todo's are complete.
     */
    function checkAllComplete() {
        $scope.allComplete = filterFilter($scope.todos, {complete: false}).length === 0;
    }
}]);