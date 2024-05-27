<?php
    require_once __DIR__ . '/../services/testimonials_service.class.php';

    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    Flight::set('testimonials_service', new TestimonialService());
/**
     * @OA\Get(
     *      path="/testimonials",
     *      tags={"testimonials"},
     *      summary="Get all testimonials",
     *      security={
     *          {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Get all testomonials"
     *      )
     * )
     */
    Flight::route('GET /testimonials', function() {
        $data = Flight::get('testimonials_service')->get_testimonials();
        Flight::json(
            $data
        );
    });
    ;

