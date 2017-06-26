var template = Handlebars.compile($('#tracks-template').html());
$('img.loading').hide();
$('.not-found').hide();
$('#input').on('keypress', function(e) {
  if (e.which == 13) {
    $.ajax({
    	url: 'https://api.spotify.com/v1/search?q=' + $(this).val() + '&type=track',
    	type: 'GET',
    	dataType: 'json',
    	headers: {'Authorization': 'Bearer BQBuJG3saC1NXahVHJAX6ipbI7hI1Tw-AN2Oq-sbz-lQif4a5oBHBXisAFS59w9F_K3O-B_cgUVQuPKt1970cIpgqe3zAxm8Dty_ywwNLLjlBuqL0layr8j2zGGp5_D4Xzi1SEMFLUwm'},
        beforeSend: function(){
            $('.tracks').empty();
            $('.not-found').empty().hide();
            $('img.loading').show();
        }
    })
    .done(function(data) {
        if (data.tracks.total == 0) {
          $('.not-found').text('No results found!').show();
        } else {
          var html = template({preview: data.tracks.items});
          $('.tracks').html(html);
        }
    })
    .fail(function() {
    	console.log('error');
    })
    .always(function() {
    	$(this).val('');
        $('img.loading').hide();
    });   
  }
});