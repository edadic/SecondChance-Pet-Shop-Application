<?php
require_once __DIR__ . '/rest/services/bookings_service.class.php';
$payload = $_REQUEST;
$payload['date'] = date('Y-m-d', strtotime($payload['date']));
$payload['time'] = date('H:i:s', strtotime($payload['time']));

$bookings_service = new BookingService();
$data = $bookings_service->add_bookings($payload);
header('Content-Type: application/json');
echo json_encode($data);
