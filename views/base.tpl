<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{{get('title','The Luminarium V4')}}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Le styles -->
    <link href="http://fonts.googleapis.com/css?family=Raleway:100,800" rel="stylesheet" type="text/css">
    <link href='http://fonts.googleapis.com/css?family=Mako' rel='stylesheet' type='text/css'>
    
    <link href="/v4/static/css/bootstrap.css" rel="stylesheet">
	<link href='/v4/static/css/headerstyle.css' rel='stylesheet' type='text/css'>
    <link href="/v4/static/css/bootstrap-responsive.css" rel="stylesheet">
    
    <!--[if lt IE 9]>
        <link href="/v4/static/jackbox/css/jackbox-ie8.css" rel="stylesheet" type="text/css" />
        <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    
    <!--[if gt IE 8]><link href="/v4/static/jackbox/css/jackbox-ie9.css" rel="stylesheet" type="text/css" /><![endif]-->
    <link href="/v4/static/jackbox/css/jackbox.min.css" rel="stylesheet" type="text/css" />
 
    <link href="/v4/static/css/luminarium.css" rel="stylesheet">
  </head>

  <body>
	<div id="mainlogo"><img src='http://theluminarium.net/v4/forum/public/style_images/master/mainlogo.png' /></div>
<div id='branding'>
<!-- ::: TOP BAR: Sign in / register or user drop down and notification alerts ::: -->
	<div id='header_bar'>
		<div class='width_right'>					
			<div id='user_navigation'>
				<ul id='corner_profile' class='ipsList_inline right2'></ul>
			</div>
		</div>
	</div>	
</div>


<div id='inline_login_form' class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <form action="http://theluminarium.net/v4/forum/index.php?app=core&amp;module=global&amp;section=login&amp;do=process" method="post" id='login' class="form-horizontal">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h3 id="myModalLabel">Sign In</h3>
        </div>
        <div class="modal-body">
            <input type='hidden' name='auth_key' value='880ea6a14ea49e853634fbdc5015a024' />
            <input type="hidden" name="referer" value="" />
            <div class="control-group">
                <div class="controls">
                     Need an account? <a href="http://theluminarium.net/v4/forum/index.php?app=core&amp;module=global&amp;section=register" title='Register now!'>Register now!</a>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="ips_username">Username</label>
                <div class="controls">
                    <input id='ips_username' type='text' name='ips_username' size='30' tabindex='1' placeholder='Username' />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="ips_password">Password</label>
                <div class="controls">
                    <input id='ips_password' type='password' name='ips_password' size='30' tabindex='2' placeholder='Password' /><br />
                    <a href='http://theluminarium.net/v4/forum/index.php?app=core&amp;module=global&amp;section=lostpass' title='Retrieve password' placeholder='password'>I've forgotten my password</a>
                </div>
            </div>
            <div class="control-group">
                <div class="controls">
                    <input type='checkbox' id='inline_remember' checked='checked' name='rememberMe' value='1' class='input_check' />
                    <div class='ipsField_content'>
                        <label for='inline_remember'>
                            <strong>Remember me</strong><br />
                            <span class='desc lighter'>This is not recommended for shared computers</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="control-group">
                <div class="controls">
                    <input type='checkbox' id='inline_invisible' name='anonymous' value='1' class='input_check' />
                    <div class='ipsField_content'>
                        <label for='inline_invisible'>
                            <strong>Sign in anonymously</strong><br />
                            <span class='desc lighter'>Don't add me to the active users list</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" type="submit">Sign In</button>
            <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
        </div>
    </form>
</div>

	
	<!-- ::: APPLICATION TABS ::: -->
<div id='top-content' class='clearfix'>
	<div id="exhibit-title" class='raleway-font'></div>
	<!-- #whitebar -->
	<div id='exhibit-release-date' class='whitebar'></div> 
	<div id='menu_head'>
	<!-- text_des -->
        <div class="text_des">
            <div class="text_des_inner">
                <img src="http://www.theluminarium.net/v4/forum/public/style_images/master/exhibit_logo.png" />
            </div> 
        </div> 
<!-- text_des2 -->
        <div class="text_des2">
            <div id='exhibit-description' class="text_des2_inner"></div>
        </div> 
        <div id="menu_box">
            <div id="menu_box_inner">
            </div>
        </div>
    </div> 
	<!-- #menu_head -->					
		</div>
	<div id='header_bottom' class='clearfix'></div>
    <div id="bottom-content">
        <div class="container">
            %if defined('content'):
                %content()
            %end
        </div>
    </div>
    <div id='header_bottom' class='clearfix'></div>
    <div id="footer">
        <div class="container">
            <div id='board_statistics' class='footerbar clearfix'>
                <div id="footer-wrap">
                    <div class="footer-float">
                        <h2>HOME</h2>
                        <ul>
                            <li><a href="">News & Updates</a></li>
                            <li><a href="">Featured Artist</a></li>
                            <li><a href="">All Features</a></li>
                        </ul>
                    </div>
                    <div class="footer-float">
                        <h2>EXHIBITS</h2>
                        <ul>
                            <li><a href="">Latest Exhibit</a></li>
                            <li><a href="">Previous Exhibit</a></li>
                            <li><a href="">Show All Exhibits</a></li>
                        </ul>
                    </div>
                    <div class="footer-float">
                        <h2>FORUM</h2>
                        <ul>
                            <li><a href="">News</a></li>
                            <li><a href="">Resources</a></li>
                            <li><a href="">Tutorials</a></li>
                            <li><a href="">Brushs</a></li>
                        </ul>
                    </div>
                    <div class="footer-float">
                        <h2>ARTISTS</h2>
                        <ul>
                            <li><a href="">Our Crew</a></li>
                            <li><a href="">Portfolios</a></li>
                            <li><a href="">Interviews</a></li>
                            <li><a href="">Applications</a></li>
                        </ul>
                    </div>
                    <div class="footer-float">
                        <h2>OTHER</h2>
                        <ul>
                            <li><a href="">About Us</a></li>
                            <li><a href="">Contact</a></li>
                        </ul>
                    </div>				
                </div>
                <div align="center" class="timezone">
                    <span>WORLD CLOCK <img src="http://theluminarium.net/v4/forum/public/style_images/master/clock.png"></span>		
                    <span><img src="http://theluminarium.net/v4/forum/public/style_images/master/flags/us.png">
                        <a href="http://24timezones.com/world_directory/current_san_francisco_time.php" style="text-decoration: none" target="_BLANK" title="San Francisco">San Francisco</a>  <span id="clock_SanFrancisco" class="blue bold"></span>
                    </span> | <span><img src="http://theluminarium.net/v4/forum/public/style_images/master/flags/us.png">
                        <a href="http://24timezones.com/usa_time/ny_new_york/manhattan.htm" style="text-decoration: none" target="_BLANK" title="New York">New York</a>  <span id="clock_NewYork" class="blue bold"></span>
                    </span> | <span><img src="http://theluminarium.net/v4/forum/public/style_images/master/flags/uk.png">
                        <a href="http://24timezones.com/world_directory/current_london_time.php" style="text-decoration: none" target="_BLANK" title="London">London</a>  <span id="clock_London" class="blue bold"></span>
                    </span> | <span><img src="http://theluminarium.net/v4/forum/public/style_images/master/flags/am.png">
                        <a href="http://24timezones.com/world_directory/current_amsterdam_time.php" style="text-decoration: none" target="_BLANK" title="Amsterdam">Amsterdam</a>  <span id="clock_Amsterdam" class="blue bold"></span>
                    </span> | <span><img src="http://theluminarium.net/v4/forum/public/style_images/master/flags/sing.png">
                        <a href="http://24timezones.com/world_directory/current_singapore_time.php" style="text-decoration: none" target="_BLANK" title="Singapore">Singapore</a>  <span id="clock_Singapore" class="blue bold"></span>
                    </span> | <span><img src="http://theluminarium.net/v4/forum/public/style_images/master/flags/aus.png">
                        <a href="http://24timezones.com/world_directory/current_sydney_time.php" style="text-decoration: none" target="_BLANK" title="Sydney">Sydney</a>  <span id="clock_Sydney" class="blue bold"></span>
                    </span>
                </div>
            </div>
            <div id="copyright">
                &copy; 2013 The Luminarium - All Rights Reserved
            </div>
        </div>
    </div>
    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script type="text/javascript" src="/v4/static/js/jquery.imagesloaded.min.js"></script>
    <script type="text/javascript" src="/v4/static/js/jquery.animate-enhanced.min.js"></script>
    <script type="text/javascript" src="/v4/static/js/jquery.scroll-to.min.js"></script>
    <script type="text/javascript" src="/v4/static/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="/v4/static/jackbox/js/jackbox-packed.min.js"></script>
    <script type="text/javascript" src="/v4/static/js/worldclock.js"></script>
    <script type="text/javascript" src="/v4/static/js/luminarium.js"></script>
    
    %if defined('custom_scripts'):
        %custom_scripts()
    %end
    
  </body>
</html>
