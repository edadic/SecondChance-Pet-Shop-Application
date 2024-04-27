<?php
require_once __DIR__ . '/rest/services/animals_service.class.php';

$animals_service = new AnimalService();
$data = $animals_service->get_animals();
header('Content-Type: application/json');
echo json_encode($data);
