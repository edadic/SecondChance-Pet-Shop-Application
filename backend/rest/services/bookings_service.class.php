<?php
require_once __DIR__ . '/../dao/BookingDao.class.php';

class BookingService
{
    private $bookings_dao;
    public function __construct()
    {
        $this->bookings_dao = new BookingDao();
    }

    public function add_bookings($payload)
    {
        return $this->bookings_dao->add_bookings($payload);
    }
}
