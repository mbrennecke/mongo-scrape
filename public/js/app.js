$(document).ready(function() {
	$.get("/articles")
	.then(function(data){
		if(data.length != 0){
			$(".no-articles").empty();
		}
		data.forEach(function(item){
			$(".articles").prepend(
			`<div class="card" >
				<h5 class="card-header "><a href="${item.link}" class="headline">${item.title}</a><button type="button" class="btn btn-secondary float-right note"  id="${item._id}" data-toggle="modal" data-target="#articleModal">Note</button></h5>
				
			  <div class="card-body">
			  <p class="card-text">${item.summary}</p>
			  </div>
			</div>`
		)})
	})
})


$(".scrape").on("click", function(event){
	event.preventDefault();
	$.get("/scrape")
	.then(function(){
		location.reload();
	})
})

$(document).on("click", ".note", function(event){
	$("#articleNote").val("");
	var thisId = $(this).attr("id");
	$.ajax({
		method: "GET",
		url: "/articles/" + thisId
	}).then(function(data){
		$("#articleModalCenter").text(data.title);
		$("#articleNote").removeAttr("data-id");
		$("#articleNote").attr("data-id", thisId);
		if (data.note) {
        // Place the body of the note in the body textarea
        $("#articleNote").val(data.note.note);
      }

	})

});

$("#modalNote").on("click", function(){
	var thisId = $("#articleNote").attr("data-id");
	console.log(thisId);
	$.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from note textarea
      note: $("#articleNote").val()
    }
  }).then(function(data){
	  $("#articleNote").val("");
	  console.log(data);
  })

})