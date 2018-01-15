<?php
include_once('./simple_html_dom.php');
$dastinktsnet_url = 'http://da.stinkts.net';

$html = file_get_html('https://da.stinkts.net/restaurants/in_bounds/-90,-180/90,180.posh');
//$html = file_get_html('test.xml');

$title_count=0;
$output = null;
// foreach($html->find('h3[class=title]') as $title_first) 
foreach($html->find('#restaurant_table li ul') as $restaurant) 
{
	++$title_count;
	//$rest_array[$title_count]['title'] = $restaurant->find('h3[class=title]')[0]->plaintext;
	$h3_a = $restaurant->find('h3[class=title]',0)->first_child();
	if($h3_a->tag=='a')
			$rest_array[$title_count]['url']= $dastinktsnet_url.$h3_a->href;
	$rest_array[$title_count]['title'] = $h3_a->plaintext;

	foreach ($restaurant->find('span') as $span) {
		$rest_array[$title_count][$span->class] = $span->plaintext;
	}
}
?>
<?php 
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo str_replace('\t', '', json_encode($rest_array));
?>