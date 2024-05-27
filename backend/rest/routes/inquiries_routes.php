<?php
    require_once __DIR__ . '/../services/inquiries_service.class.php';
    
    Flight::set('inquiries_service', new InquiryService());
/**
     * @OA\Post(
     *      path="/inquiry",
     *      tags={"inquiries"},
     *      summary="Post an inquiry",
     *      security={
     *          {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Post an inquiry"
     *      ),
     *     @OA\RequestBody(
     *     description="Inquiry data payload",
     *     @OA\JsonContent(
     *         required={"name","email","message"},
     *         @OA\Property(property="name", type="string", example="John Doe"),
     *         @OA\Property(property="email", type="string", example="example@example.com"),
     *         @OA\Property(property="subject", type="string", example="subject"),
     *         @OA\Property(property="message", type="string", example="message")
     * )
     * 
     * )
     * )
     */
    Flight::route('POST /inquiry', function() { 
        $data = Flight::request()->data->getData();
        $inquiry = Flight::get('inquiries_service')->add_inquiries($data);
        Flight::json(
            $inquiry
        );
    });