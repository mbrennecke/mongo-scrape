var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the burgers
  app.get("/", function(req, res) {
	db.Burger.findAll({}).then(function(dbBurger) {
		var hbsObject = {
		burger_name: dbBurger
		};
		console.log(hbsObject);
    res.render("index", hbsObject);
	});
  });

  // POST route for saving a new burger. You can create a burger using the data on req.body
  app.post("/api/burgers", function(req, res) {
	 db.Burger.create({
		 burger_name: req.body.name,
		 devoured: false
	  })
      .then(function(dbBurger) {
		  console.log(dbBurger);
        res.json(dbBurger);
      });
  });

  // PUT route for updating burgers. The updated burgers will be available in req.body
  app.put("/api/burgers/:id", function(req, res) {
	db.Burger.update(req.body
	,{
        where: {
          id: req.params.id
        }
      }).then(function(dbBurger) {
		  console.log(dbBurger);
		  res.json(dbBurger);
      });
  });
};
