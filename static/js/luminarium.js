$(function(){
    worldClockZone();
    setupProfileLinks();
    $(".jackbox[data-group]").jackBox("init", {preloadGraphics: false, thumbsStartHidden: true});
});

function updateHeader(exhibit){
    $('#exhibit-title').empty().text("The Luminarium Presents: " + exhibit.title);
    $('#exhibit-release-date').empty().text("Exhibit Released: " + prettyDate(exhibit.release_date));
    $('#exhibit-description').empty().text(exhibit.description);
}

function showExhibit(exhibit){   
    updateHeader(exhibit);
     
    var container = $('#top-content .container').empty().addClass('bottom');
    $('<h2>').text(exhibit.title).appendTo(container);
    $('<p>').text(exhibit.description).appendTo(container).wrap($('<blockquote>'));

    addGallery(exhibit.artwork,$('#exhibit'));
}

function addGallery(artwork, parent){
    var gallery = $('<div class="gallery">');
    gallery.appendTo(parent);
    
    $.jackBox.available(function(){
        artwork.forEach(function(piece){
            var thumb = $('<a class="thumb jackbox">').appendTo(gallery);
            var uid = UID();
            
            $('<div class="jackbox-hover jackbox-hover-black jackbox-hover-play">').html(getHover(piece)).appendTo(thumb);
            $('<img>').attr('src',piece.thumbnail).appendTo(thumb);
            $('<div class="jackbox-description">').attr('id',uid).html(getDescription(piece)).appendTo(thumb);

            thumb.jackBox('newItem', {
                group: 'artwork',
                title: piece.title + " | " + getArtists(piece),
                description: '#' + uid,
                href: piece.url
            });
        });
        
        // now if someone navigated here through a deep-link, trigger the jackbox for that piece
        $.address.update();
    });
}

function getHover(piece){ 
    return "<p>" + piece.title + "</p><p>By: " + getArtists(piece) + "</p>";    
}

function getDescription(piece){ 
    return "<h3>" + piece.title + " | " + getArtists(piece) + "</h3><p>" + piece.description + "</p>";    
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

function setBackground(img){
    var container = $('#top-content');
    var old_images = $('img.bg',container);
    $('<img>').attr('src',img.url).addClass('bg').appendTo(container).imagesLoaded(function(){
        $(this).fadeIn(1000, function(){
            // remove old BG from the DOM once the new one is loaded and displayed
            old_images.remove();
        });
    });
}

function setupProfileLinks(){
    // Tell the forum's signout script to return to this page after signout
    $('#signout-link').attr('href',$('#signout-link').attr('href') + '&return=' + window.location.href);
    
    // wire up sign in link to click event
    $('#signin_link').click(function(e){
        e.preventDefault();
        
        // set referrer on login form
        $('#login input[name=referer]').val(window.location.href);
        
        // show login form
        $('#inline_login_form').modal().on('shown',function(){
            // select username field to make it easier for user
            $('#ips_username').focus();
        });
    });
}

function prettyDate(date_str){
    var result = "";
    var date_parts = date_str.split('-');
    
    if (date_parts.length != 3)
        return "Unknown";
        
    switch(parseInt(date_parts[1])){
        case 1: result = "January"; break;
        case 2: result = "February"; break;
        case 3: result = "March"; break;
        case 4: result = "April"; break;
        case 5: result = "May"; break;
        case 6: result = "June"; break;
        case 7: result = "July"; break;
        case 8: result = "August"; break;
        case 9: result = "September"; break;
        case 10: result = "October"; break;
        case 11: result = "November"; break;
        case 12: result = "December"; break;
        default: return "Unknown";
    }
    
    return result + " " + date_parts[2] + ", " + date_parts[0];
}

function UID(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
}

function get(url, callback){
    $.getJSON(url + "?callback=?",callback);
}
