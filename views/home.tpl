%def content():
    <h2>Welcome to the new Luminarium V4!</h2>
    <p>View our exhibits:</p>
    <ul id="exhibit-list"></ul>
%end

%def custom_scripts():
    <script type="text/javascript">
        $(function(){
            get("http://api.theluminarium.net/exhibit/latest",updateHeader);
            get("http://api.theluminarium.net/exhibits",listExhibits);
        });
        
        function listExhibits(result){
            var list = $('#exhibit-list');
            result.exhibits.forEach(function(exhibit){
                $('<a>').attr('href','/exhibit/' + exhibit.id).text(exhibit.title).appendTo(list).wrap('<li>');
            });
        }
    </script>
%end

%rebase base content=content, custom_scripts=custom_scripts