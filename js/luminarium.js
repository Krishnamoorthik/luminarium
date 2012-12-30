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
    $('<div id="view-piece">').appendTo(gallery);
    
    artwork.forEach(function(piece){
        var thumb = $('<a class="thumb">').attr({
            href:'javascript:void(0)',
            onclick:'viewPiece(this);'
        }).data('piece',piece);
        
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
    return piece.name + "<br/>By: " + getArtists(piece);    
}

function getArtists(piece){
    var str = '';
    for(var i = 0; i < piece.artists.length; i++){
        if(i > 0)
            str += ", ";
        str += piece.artists[i].username;
    }
    return str;  
}

function viewPiece(parent){
    var piece = $(parent).data('piece');
    var container = $(parent).closest('.gallery').children('#view-piece');
    
    // hide container if it is already showing
    container.slideUp(1000, function(){
        // once hidden, empty it and populate with the new piece
        container.empty();
        
        var img = $('<img>').attr('src',piece.url);
        img.appendTo(container).imagesLoaded(function(){
            // after the new piece is loaded, show the container
            container.slideDown(1000);
        });
        
        $('<p>').text('Title: ' + piece.name).appendTo(container);
        $('<p>').text('Description: ' + piece.description).appendTo(container);
        $('<p>').text('By: ' + getArtists(piece)).appendTo(container);
        
        $('<a>').attr({
            href:'javascript:void(0)',
            onclick:'hidePiece(this);'
        }).text('Back').appendTo(container).wrap($('<p>'));
        
    });
}

function hidePiece(parent){
    $(parent).closest('.gallery').children('#view-piece').slideUp(1000);
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
