<?php

// If you're using Composer, require the autoloader.
require 'vendor/autoload.php';
// if you're not using Composer, load the framework directly
// require 'flight/Flight.php';

// Then define a route and assign a function to handle the request.
Flight::route('/', function () {
  //echo 'hello world!';
  echo password_hash("eldar123", PASSWORD_DEFAULT);
});

require 'rest/routes/middleware_routes.php';
require 'rest/routes/auth_routes.php';
require 'rest/routes/animals_routes.php';
require 'rest/routes/team_members_routes.php';
require 'rest/routes/testimonials_routes.php';
require 'rest/routes/bookings_routes.php';
require 'rest/routes/inquiries_routes.php';
require 'rest/routes/users_routes.php';

// Finally, start the framework.
Flight::start();