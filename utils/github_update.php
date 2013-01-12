<?php
/**
 * Hook GitHub Post-Receive 
 *
 * @copyright (c)2005-2011, WDT Media INC (http://wdtmedia.com)
 * @license http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link http://github.com/jadb/hook-github-post-receive
 * @author jadb
 *
 * Modified by John Keech for use with The Luminarium
 *
 */
 
if (!array_key_exists('payload', $_POST))
	return;

extract(json_decode(stripslashes($_POST['payload']), true));

if (!isset($repository) || !isset($repository['name']))
	return;

// perform the git pull
$loc = '~/www/v4';
$result = shell_exec('cd $loc && git pull');

// log results to file to later viewing and debugging
$filename = '~/logs/github_pull.log';
$fd = fopen($filename, 'a');
fwrite($fd, $result . '\n');
fclose($fd);
?>