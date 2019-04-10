use car_show_tracker;

CREATE TABLE show_log (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NULL,
    description VARCHAR(255) NULL,
    event_date VARCHAR(255) NULL,
    location VARCHAR(255) NULL,
    parking VARCHAR(255) NULL,
    entry_fees VARCHAR(100) NULL,
    spectator_fees VARCHAR(100) NULL,
    other_detail VARCHAR(255) NULL,
    date TIMESTAMP
);