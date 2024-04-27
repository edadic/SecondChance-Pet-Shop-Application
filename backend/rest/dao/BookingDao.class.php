<?php

require_once __DIR__ . '/BaseDao.class.php';

class BookingDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct('bookings');
    }

    public function add_bookings($payload)
    {
        return $this->insert("bookings", $payload);
    }
}
