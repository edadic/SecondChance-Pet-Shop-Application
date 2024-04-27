<?php

require_once __DIR__ . '/BaseDao.class.php';

class TestimonialDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct('testimonials');
    }

    public function get_testimonials()
    {
        return $this->query("SELECT * FROM testimonials", []);
    }
}
