<?php
    require_once __DIR__ . '/../services/team_members_service.class.php';

    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    Flight::set('team_members_service', new TeamMemberService());

    /**
     * @OA\Get(
     *      path="/team_member",
     *      tags={"users"},
     *      summary="Get all team members",
     *      @OA\Response(
     *           response=200,
     *           description="Get all team members"
     *      )
     * )
     */
    Flight::route('GET /team_member', function() {

        $data = Flight::get('team_members_service')->get_team_members();

        Flight::json(
            $data
        );
    });
    ;

