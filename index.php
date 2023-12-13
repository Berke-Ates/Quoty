<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <meta charset="utf-8" />
  </head>
  <body>
    <div id="qDiv">
      <h1 id="q" class="animate__animated"></h1>
      <i><h2 id="a" class="animate__animated"></h2></i>
    </div>
		<div class="overlay">
				Click / Tap: Random Quote, Left/Right Arrow Keys: Prev/Next Quote
		</div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.2.0/p5.min.js"></script>
		<script type="text/javascript" src="quotes.json"></script>
    <script>
      let id = <?php
        if(isset($_GET['id'])){
          echo $_GET['id'];
        } else {
          echo "-1";
        }
      ?>
    </script>
    <script src="main.js"></script>
  </body>
</html>
