// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = { todos: [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
]};

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
   var item = req.query.q;
   console.log(item);
   var found = [];
   todos.todos.forEach(function(el){
     for(var key in el){
       if(el[key].toString().includes(item)){
         found.push(el);
       }
     }
   });
   console.log(found);
   res.json({todos: found});
});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
   res.json(200, todos);
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
   var newToDo = {
     _id: todos.todos.length + 1,
     task: req.body.task,
     description: req.body.description
   };
  //  console.log(newToDo);
  todos.todos.push(newToDo);
  res.send(200, newToDo);
});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
   var id = req.params.id - 1;
   res.send(200, todos.todos[id]);
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
  //  console.log("in test");
   var id = req.params.id - 1;
  //  console.log(todos.todos[id]);
   var update = {
     _id: parseInt(req.params.id),
     task: req.body.task,
     description: req.body.description
   };
   todos.todos[id] = update;
  //  console.log(update);
   res.send(200, todos.todos[id]);
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
   var id = req.params.id - 1;
   todos.todos.splice(id,1);
   res.send(200,todos.todos);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
