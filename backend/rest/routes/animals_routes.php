<?php
    require_once __DIR__ . '/../services/animals_service.class.php';

    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    Flight::set('animals_service', new AnimalService());

/**
     * @OA\Get(
     *      path="/animal",
     *      tags={"animals"},
     *      summary="Get all animals",
     *      security={
     *          {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Get all animals"
     *      )
     * )
     */

    Flight::route('GET /animal', function() {
        $data = Flight::get('animals_service')->get_animals();
        Flight::json(
            $data
        );
    });
    ;

