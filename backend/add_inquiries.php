<?php
require_once __DIR__ . '/rest/services/inquiries_service.class.php';
$payload = $_REQUEST;


$inquiries_service = new InquiryService();
$data = $inquiries_service->add_inquiries($payload);
header('Content-Type: application/json');
echo json_encode($data);
