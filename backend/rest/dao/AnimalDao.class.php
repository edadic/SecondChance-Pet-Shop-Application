<?php

require_once __DIR__ . '/BaseDao.class.php';

class AnimalDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct('animals');
    }

    public function get_animals()
    {
        return $this->query(
            "SELECT animals.*, services.name AS service_name 
                             FROM animals LEFT JOIN services ON animals.service_ID = services.ID ",
            []
        );
    }
}
