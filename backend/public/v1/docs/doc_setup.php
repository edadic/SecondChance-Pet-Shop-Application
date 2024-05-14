<?php

/**
 * @OA\Info(
 *   title="API",
 *   description="SecondChance API",
 *   version="1.0",
 *   @OA\Contact(
 *     email="eldar.dadic@stu.ibu.edu.ba",
 *     name="Eldar Dadic"
 *   )
 * ),
 * @OA\OpenApi(
 *   @OA\Server(
 *       url=BASE_URL
 *   )
 * )
 * @OA\SecurityScheme(
 *     securityScheme="ApiKey",
 *     type="apiKey",
 *     in="header",
 *     name="Authentication"
 * )
 */
