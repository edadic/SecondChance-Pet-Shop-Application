<?php

require __DIR__ . '/../../../vendor/autoload.php';

define('BASE_URL', 'http://localhost/Web_programming_2024_edadic/web-project/edadic-Web_programming_2024_edadic/backend/');

error_reporting(0);

$openapi = \OpenApi\Generator::scan(['../../../rest', './'], ['pattern' => '*.php']);
// $openapi = \OpenApi\Util::finder(['../../../rest/routes', './'], NULL, '*.php');
// $openapi = \OpenApi\scan(['../../../rest', './'], ['pattern' => '*.php']);

header('Content-Type: application/x-yaml');
echo $openapi->toYaml();
?>
