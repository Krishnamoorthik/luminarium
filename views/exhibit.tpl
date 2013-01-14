%def content():
    <div id="exhibit"></div>
%end

%def custom_scripts():
    <script type="text/javascript">
        $(function(){
            get("http://api.theluminarium.net/exhibit/{{exhibit}}",updateHeader);
            get("http://api.theluminarium.net/exhibit/{{exhibit}}",showExhibit);
        });
    </script>
%end

%rebase base content=content, custom_scripts=custom_scripts, title='Exhibit ' + str(exhibit)