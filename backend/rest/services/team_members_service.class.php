<?php
require_once __DIR__ . '/../dao/TeamMemberDao.class.php';

class TeamMemberService
{
    private $team_members_dao;
    public function __construct()
    {
        $this->team_members_dao = new TeamMemberDao();
    }

    public function get_team_members()
    {
        return $this->team_members_dao->get_team_members();
    }
}
