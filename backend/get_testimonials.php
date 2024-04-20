<?php
require_once __DIR__ . '/rest/services/testimonials_service.class.php';

$testimonials_service = new TestimonialService();
$data = $testimonials_service->get_testimonials();
header('Content-Type: application/json');
echo json_encode($data);
