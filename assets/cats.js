// gifme
var url = "https://api.giphy.com/v1/gifs/search"


$('.add-category').on('click', function(){
	event.preventDefault();

	var category = $('.category-input').val().trim()
	
	if(category === ''){
		return
	}

	console.log(category)

	var new_button = $('<button>', {
		"class": "btn btn-secondary btn-category",
		"data-category": category
	}).text(category)

	$('#categories').append(new_button)

	$('.category-input').select()
})


$(document).on('click', '.btn-category', function(){
	console.log('clikked')
	$('.gifs').empty()

	var query = $(this).attr('data-category')
	var limit = 25
	var offset = 0
	var rating = "pg"
	var lang = "en"

	console.log(query)

	var search_params = {
		api_key: "4b47391ae84f4d4ba766ea48f24cbcd6",
		q: query,
		limit: limit,
		offset: offset,
		rating: rating,
		lang: lang
	}

	var req = $.ajax({
	  method: "GET",
	  url: url,
	  data: $.param(search_params)
	})

	req.done(function(resp){
		console.log(resp.data)
		var images = resp.data
		images.map(add_image)
	})

})


function add_image(obj){
	console.log(obj)
	var url = obj.images.fixed_height.url
	var img = $('<img>', {
		src: url
	})
	$('.gifs').append(img)
}

