<?php
require_once __DIR__ . '/rest/services/team_members_service.class.php';

$team_members_service = new TeamMemberService();
$data = $team_members_service->get_team_members();
header('Content-Type: application/json');
echo json_encode($data);
