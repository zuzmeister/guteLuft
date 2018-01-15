# guteLuft
Mockup einer besseren Visualisierung aller Rauchfreien Lokale in Österreich unter Zuhilfenahme der API von [da.stinkts.net](https://da.stinkts.net).

## Demo
https://tommachtalles.net/guteluft

## Installation / Ausführung
### Auf **Webserver**:
PHP 5.6 oder höher. Ändere in den ersten 5 Zeilen von `script.js`:

~~~javascript
// Javascript den Pfad zu API übergeben. Entkommentiere jeweilige Zeile, wenn...

var json_start = './json_start.php?'; // ..."guteluft" auf eigenem Webserver mit php läuft

//var json_start = 'https://tommachtalles.net/guteluft/json_start.php?'; // ...  die api auf tommachtalles.net verwendet werden soll
~~~
### Auf **Desktop**:  
Aktuelle Version [herunterladen](https://github.com/zuzmeister/guteLuft/archive/master.zip), entzippen, "index.html" ausführen.
 
## Um eigenen Google API Key hinzuzufügen
in `index.php` ändere...

~~~html
<script src="https://maps.google.com/maps/api/js?v=3.exp&sensor=true"></script>
~~~  
auf...

~~~html
<script src="https://maps.google.com/maps/api/js?v=3.exp&key=__YOUR_API_KEY_HERE__&sensor=true"></script>
~~~
