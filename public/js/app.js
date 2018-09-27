
$(".scrape").on("click", function(event){
	event.preventDefault();
	$.get("/scrape")
	.then(function(){
		location.reload();
	})
})

