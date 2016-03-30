///////////////////// vvv SEARCHED vvv ////////////////////

var searchedToDo = [];

var $searchList = $('#searched-list');

// compile handlebars template
var sourceSearch = $('#search-template').html();
var templateSearch = Handlebars.compile(sourceSearch);

// helper function to render all todos to view
// note: we empty and re-render the collection each time our todo data changes
function renderSearched() {
  // empty existing todos from view
  $searchList.empty();

  // pass `allTodos` into the template function
  var searchHtml = templateSearch({ found: searchedToDo });
  console.log(searchHtml);

  // append html to the view
  $searchList.append(searchHtml);
};

///////////////////// ^^^ SEARCHED ^^^ ////////////////////

// GET all todos on page load
$("#search-todo").on('submit', function(event){
  event.preventDefault();
  $.ajax({
    method: "GET",
    url: "/api/todos/search",
    data: $('#search-todo').serialize(),
    success: function onSearchSuccess(json) {
      console.log(json.todos);

      // set `allTodos` to todo data (json.data) from API
      searchedToDo = json.todos;

      // render all todos to view
      renderSearched();

    }
  })
});
