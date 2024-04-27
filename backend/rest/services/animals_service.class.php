<?php
require_once __DIR__ . '/../dao/AnimalDao.class.php';

class AnimalService
{
    private $animals_dao;
    public function __construct()
    {
        $this->animals_dao = new AnimalDao();
    }

    public function get_animals()
    {
        return $this->animals_dao->get_animals();
    }
}
