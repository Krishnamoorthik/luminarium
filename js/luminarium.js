$(function(){
    get("http://api.theluminarium.net/exhibit/latest",updateHeader);
    get("http://api.theluminarium.net/me",buildProfile);
    get("http://api.theluminarium.net/utils/background",setBackground);
});

function updateHeader(exhibit){
    $('#exhibit-title').empty().text("Latest Exhibit: " + exhibit.title);
    $('#exhibit-release-date').empty().text("Exhibit released: " + prettyDate(exhibit.release_date));
    $('#exhibit-description').empty().text(exhibit.description);
    
    // now let's view this exhibit in the gallery
    get(exhibit.url,showExhibit);
}

function buildProfile(user){
    var container = $('#corner_profile').empty();
    if(user.is_logged_in){
        // display user's profile
        var profile_link = 'http://theluminarium.net/v4/forum/index.php?showuser=' + user.id;
        var signout_link = 'http://theluminarium.net/v4/forum/index.php?app=core&module=global&section=login&do=logout&k=' + user.k;
        $('<li class="left_img">').append(
            $('<a>').attr('href',profile_link).append(
                $('<img>').attr('src',user.thumbnail)
            )
        ).appendTo(container);
        $('<li>').append(
            $('<a>').attr('href',profile_link).text(user.name)
        ).appendTo(container);
        $('<li>').append(
            $('<a>').attr('href',signout_link).text("Sign Out")
        ).appendTo(container);
        
        if(user.is_admin) {
            $('<ul class="ipsList_inline right" id="admin_bar">').append(
                $('<li>').append(
                    $('<a class="register_link2">').attr('href','http://theluminarium.net/v4/forum/admin').text("Admin CP")
                )
            ).append(
                $('<li>').append(
                    $('<a class="register_link2">').attr('href','http://theluminarium.net/v4/forum/index.php?app=core&amp;module=modcp').text("Moderator CP")
                )
            ).appendTo(container);
        }
    } else {
        // display login box
        $('<li class="left_img">').append(
            $('<a>').attr('href',profile_link).append(
                $('<img>').attr('src',user.thumbnail)
            )
        ).appendTo(container);
        $('<li>').append(
            $('<a class="register_link2">').attr('href','http://theluminarium.net/v4/forum/index.php?app=core&module=global&section=login').text('Sign In')
        ).appendTo(container);
        $('<li>').append(
            $('<a class="register_link2">').attr('href','http://theluminarium.net/v4/forum/index.php?app=core&module=global&section=register').text("Create Account")
        ).appendTo(container);
    }
}

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
        
        if(piece.type === 'image') {
            var img = $('<img>').attr('src',piece.url);
            img.appendTo(container);
        } else if(piece.type === 'music') {
           $('<p>').text('Music piece... audio coming soon').appendTo(container); 
        } else if(piece.type === 'video') {
           $('<p>').text('Video piece... video coming soon').appendTo(container); 
        }
        
        $('<p>').text('Title: ' + piece.name).appendTo(container);
        $('<p>').text('Description: ' + piece.description).appendTo(container);
        $('<p>').text('By: ' + getArtists(piece)).appendTo(container);
        
        $('<a>').attr({
            href:'javascript:void(0)',
            onclick:'hidePiece(this);'
        }).text('Back').appendTo(container).wrap($('<p>'));
        
        container.imagesLoaded(function(){
            // after the new piece is loaded, show the container
            container.slideDown(1000, function(){
                $('body').scrollTo(container, 400);
            });
        });
        
    });
}

function hidePiece(parent){
    $(parent).closest('.gallery').children('#view-piece').slideUp(1000);
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

function prettyDate(date_str){
    var result = "";
    var date_parts = date_str.split('-');
    
    if (date_parts.length != 3)
        return "Unknown";
        
    switch(parseInt(date_parts[1])){
        case 0: result = "January"; break;
        case 1: result = "February"; break;
        case 2: result = "March"; break;
        case 3: result = "April"; break;
        case 4: result = "May"; break;
        case 5: result = "June"; break;
        case 6: result = "July"; break;
        case 7: result = "August"; break;
        case 8: result = "September"; break;
        case 9: result = "October"; break;
        case 10: result = "November"; break;
        case 11: result = "December"; break;
        default: return "Unknown";
    }
    
    return result + " " + date_parts[2] + ", " + date_parts[0];
}

function get(url, callback){
    $.ajax({
        url: url,
        xhrFields: {
          withCredentials: true
        }
    },callback);
}
