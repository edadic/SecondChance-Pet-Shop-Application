<?php
require_once __DIR__ . '/../dao/TestimonialDao.class.php';

class TestimonialService
{
    private $testimonials_dao;
    public function __construct()
    {
        $this->testimonials_dao = new TestimonialDao();
    }

    public function get_testimonials()
    {
        return $this->testimonials_dao->get_testimonials();
    }
}
