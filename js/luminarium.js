$(function(){
    $(".jackbox[data-group]").jackBox("init", {preloadGraphics: false});
    
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

function showExhibit(exhibit){        
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
                title: piece.title,
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
    return "<h3>" + piece.title + "</h3><p>" + piece.description + "</p>";    
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
        
        $('<p>').text('Title: ' + piece.title).appendTo(container);
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

function buildProfile(user){
    var container = $('#corner_profile').empty();
    if(user.is_logged_in){
        // display user's profile
        var profile_link = 'http://theluminarium.net/v4/forum/index.php?showuser=' + user.id;
        var signout_link = 'http://theluminarium.net/v4/forum/index.php?app=core&module=global&section=login&do=logout&k=' + user.k + '&return=' + window.location.href;
        $('<li class="left_img">').append(
            $('<a>').attr('href',profile_link).append(
                $('<img>').attr('src',user.thumbnail)
            )
        ).appendTo(container);
        $('<li>').append(
            $('<a class="register_link2">').attr('href',profile_link).text(user.name)
        ).appendTo(container);
        $('<li>').append(
            $('<a class="register_link2">').attr('href',signout_link).text("Sign Out")
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
            $('<a id="signin_link" class="register_link2">')
                .attr('href','http://theluminarium.net/v4/forum/index.php?app=core&module=global&section=login')
                .text('Sign In')
        ).appendTo(container);
        $('<li>').append(
            $('<a class="register_link2">')
                .attr('href','http://theluminarium.net/v4/forum/index.php?app=core&module=global&section=register')
                .text("Create Account")
        ).appendTo(container);
        
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
