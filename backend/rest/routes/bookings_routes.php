<?php
    require_once __DIR__ . '/../services/bookings_service.class.php';
    
    Flight::set('bookings_service', new BookingService());

    /**
     * @OA\Post(
     *      path="/bookings",
     *      tags={"bookings"},
     *      summary="Post a booking",
     *      security={
     *          {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Post a booking"
     *      ),
     *     @OA\RequestBody(
     *     description="Booking data payload",
     *     @OA\JsonContent(
     *         required={"name","email","message"},
     *         @OA\Property(property="name", type="string", example="John Doe"),
     *         @OA\Property(property="email", type="string", example="example@example.com"),
     *         @OA\Property(property="date", type="string", example="2024-01-01"),
     *         @OA\Property(property="service_id", type="number", example="1")
     * )
     * 
     * )
     * )
     */
    Flight::route('POST /bookings', function() {
        $data = Flight::request()->data->getData();
        $booking = Flight::get('bookings_service')->add_bookings($data);
        Flight::json(
            $booking
        );
    });