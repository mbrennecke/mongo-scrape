var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");



// Routes
// =============================================================
module.exports = function(app) {

	app.get("/", function(req, res) {
	  // First, we grab the body of the html with axios
	  axios.get("https://www.washingtonpost.com").then(function(response) {
		// Then, we load that into cheerio and save it to $ for a shorthand selector
		var $ = cheerio.load(response.data);

		// Now, we grab every h2 within an article tag, and do the following:
		$("div .headline").each(function(i, element) {
		  // Save an empty result object
		  var result = {};
			
		  // Add the text and href of every link, and save them as properties of the result object
		  result.title = $(this).children("a").text();
		  
		   result.link = $(this).children("a").attr("href");
			
			 result.summary = $(this).next().text();
			if (result.title && result.link && result.summary){
		  // Create a new Article using the `result` object built from scraping
		  db.Article.create(result)
			.then(function(dbArticle) {
			  // View the added result in the console
			  console.log(dbArticle);
			})
			.catch(function(err) {
			  // If an error occurred, send it to the client
			  return res.json(err);
			});
			}
		});

		// If we were able to successfully scrape and save an Article, send a message to the client
		res.send("Scrape Complete");
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
