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
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/search', function homepage(req, res) {
  res.sendFile(__dirname + '/views/search.html');
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
   var found = [];
   console.log("item is: "+item);
   todos.forEach(function(el){
     for(var key in el){
       if(el[key].toString().includes(item)){
         console.log(el);
         found.push(el);
         break;
       }
     }
   });
  //  console.log({todos: found});
   res.json({todos: found});
});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
   res.json(200, {todos: todos});
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
   var newToDo = {
     _id: todos.length + 1,
     task: req.body.task,
     description: req.body.description
   };
  todos.push(newToDo);
  res.send(200, newToDo);
});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
   var id = parseInt(req.params.id);
   var rightOne = null;
   todos.forEach(function(el){
     if(el._id === id){
       rightOne = el;
     }
    });
   res.send(200, rightOne);
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
   var id = req.params.id - 1;
   var update = {
     _id: parseInt(req.params.id),
     task: req.body.task,
     description: req.body.description
   };
   todos[id] = update;
   res.send(200, todos[id]);
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
   var id = parseInt(req.params.id);
   todos.forEach(function(el,i){
     if(el._id === id){
       todos.splice(i,1);
     }
    });
   res.send(200,todos);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
