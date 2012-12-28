$(function(){
    $.getJSON("http://api.theluminarium.net/exhibit/19",showExhibit);
    $.getJSON("http://api.theluminarium.net/utils/background",setBackground);
});

function showExhibit(exhibit){        
    var container = $('#top-content .container').empty().addClass('bottom');
    $('<h2>').text(exhibit.title).appendTo(container);
    $('<p>').text(exhibit.description).appendTo(container).wrap($('<blockquote>'));

    addGallery(exhibit.artwork,$('#exhibit'));
}

function addGallery(artwork, parent){
    var gallery = $('<div class="gallery">');
    gallery.appendTo(parent);
    
    artwork.forEach(function(piece){
        var thumb = $('<a class="thumb">').attr('href',piece.url);
        
        $('<img>').attr('src',piece.thumbnail).appendTo(thumb);
        $('<div class="thumb-desc">').html(getDescription(piece)).appendTo(thumb).wrap('<div class="hover">');
        
        thumb.hover(function(){
            $('div.hover',$(this)).fadeIn(200);
        },function(){
            $('div.hover',$(this)).fadeOut(200);
        });
        
        thumb.appendTo(gallery);
    });
}

function getDescription(piece){
    var desc = piece.name + "<br/>By: ";
    for(var i = 0; i < piece.artists.length; i++){
        if(i > 0)
            desc += ", ";
        desc += piece.artists[i].username;
    }
    return desc;    
}

function setBackground(img){
    var container = $('#top-content');
    var old_images = $('img',container);
    $('<img>').attr('src',img.url).addClass('bg').appendTo(container).imagesLoaded(function(){
        $(this).fadeIn(1000, function(){
            // remove old BG from the DOM once the new one is loaded and displayed
            old_images.remove();
        });
    });
}
