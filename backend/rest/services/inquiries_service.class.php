<?php
require_once __DIR__ . '/../dao/InquiryDao.class.php';

class InquiryService
{
    private $inquiries_dao;
    public function __construct()
    {
        $this->inquiries_dao = new InquiryDao();
    }

    public function add_inquiries($payload)
    {
        return $this->inquiries_dao->add_inquiries($payload);
    }
}
