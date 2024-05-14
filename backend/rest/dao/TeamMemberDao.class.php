<?php

require_once __DIR__ . '/BaseDao.class.php';

class TeamMemberDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct('team_members');
    }

    public function get_team_members()
    {
        return $this->query("SELECT u.name, u.image, u.`position` , u.facebook , u.twitter , u.instagram , u.linkedin
        FROM users u
        JOIN roles r  ON u.role_id = r.ID 
        WHERE r.name  = 'team member';", []);
    }
}
