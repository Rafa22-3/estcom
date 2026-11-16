<?php
require 'db.php';

$action = $_GET['action'] ?? '';
$data = json_decode(file_get_contents("php://input"), true);

// 1. REGISTER USER
if ($action === 'register') {
    $code = 'CUST-' . rand(1000, 9999);
    $name = $conn->real_escape_string($data['name']);
    $email = $conn->real_escape_string($data['email']);
    $phone = $conn->real_escape_string($data['phone']);
    $pass = password_hash($data['password'], PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (user_code, name, email, phone, password, role) 
            VALUES ('$code', '$name', '$email', '$phone', '$pass', 'customer')";
    if ($conn->query($sql)) {
        echo json_encode(["status" => "success", "name" => $name, "phone" => $phone]);
    } else {
        $errMsg = (strpos($conn->error, 'Duplicate') !== false)
            ? "Email already exists."
            : "Database error: " . $conn->error;
        echo json_encode(["status" => "error", "message" => $errMsg]);
    }
}

// 2. LOGIN USER / ADMIN
elseif ($action === 'login') {
    $email = $conn->real_escape_string($data['email']);
    $password = $data['password'];

    if ($email === 'admin@estcom.com' && $password === 'admin123') {
        echo json_encode(["status" => "success", "role" => "staff", "name" => "ADMIN"]);
        exit;
    }

    $res = $conn->query("SELECT * FROM users WHERE email='$email'");
    if ($res && $row = $res->fetch_assoc()) {
        if (password_verify($password, $row['password'])) {
            echo json_encode([
                "status" => "success",
                "role" => $row['role'],
                "name" => $row['name'],
                "phone" => $row['phone'],
                "email" => $row['email']
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "Incorrect password."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "No account found with that email."]);
    }
}

// 3. GET USERS (Admin Tab)
elseif ($action === 'get_users') {
    $res = $conn->query("SELECT id, user_code, name, email, phone, date_joined FROM users WHERE role='customer' ORDER BY id DESC");
    $list = [];
    if ($res) {
        while ($row = $res->fetch_assoc()) $list[] = $row;
    }
    echo json_encode($list);
}

// 4. DELETE USER
elseif ($action === 'delete_user') {
    $id = intval($data['id']);
    $conn->query("DELETE FROM users WHERE id=$id");
    echo json_encode(["status" => "success"]);
}

// 5. PLACE ORDER
elseif ($action === 'place_order') {
    $code = 'EST-' . rand(1000, 9999);
    $name = $conn->real_escape_string($data['name']);
    $phone = $conn->real_escape_string($data['phone']);
    $address = $conn->real_escape_string($data['address']);
    $type = $conn->real_escape_string($data['type']);
    $pay = $conn->real_escape_string($data['pay']);
    $items = $conn->real_escape_string(implode(" || ", $data['items']));
    $total = floatval($data['total']);

    $sql = "INSERT INTO orders (order_code, customer_name, phone, address, order_type, payment_method, items, total) 
            VALUES ('$code', '$name', '$phone', '$address', '$type', '$pay', '$items', $total)";
    if ($conn->query($sql)) {
        echo json_encode(["status" => "success", "order_code" => $code]);
    } else {
        echo json_encode(["status" => "error", "message" => $conn->error]);
    }
}

// 6. GET ORDERS
elseif ($action === 'get_orders') {
    $res = $conn->query("SELECT * FROM orders ORDER BY id DESC");
    $list = [];
    if ($res) {
        while ($row = $res->fetch_assoc()) {
            $list[] = [
                "db_id" => $row['id'],
                "id" => $row['order_code'],
                "name" => $row['customer_name'],
                "phone" => $row['phone'],
                "address" => $row['address'],
                "type" => $row['order_type'],
                "pay" => $row['payment_method'],
                "items" => explode(" || ", $row['items']),
                "total" => $row['total'],
                "status" => $row['status'],
                "date" => $row['created_at']
            ];
        }
    }
    echo json_encode($list);
}

// 7. UPDATE ORDER STATUS
elseif ($action === 'update_order_status') {
    $id = intval($data['db_id']);
    $status = $conn->real_escape_string($data['status']);
    $conn->query("UPDATE orders SET status='$status' WHERE id=$id");
    echo json_encode(["status" => "success"]);
}

// 8. DELETE ORDER
elseif ($action === 'delete_order') {
    $id = intval($data['db_id']);
    $conn->query("DELETE FROM orders WHERE id=$id");
    echo json_encode(["status" => "success"]);
}

// 9. PLACE RESERVATION
elseif ($action === 'place_reservation') {
    $code = 'RES-' . rand(1000, 9999);
    $name = $conn->real_escape_string($data['name']);
    $phone = $conn->real_escape_string($data['phone']);
    $type = $conn->real_escape_string($data['type']);
    $guests = $conn->real_escape_string($data['guests']);
    $date = $conn->real_escape_string($data['date']);
    $time = $conn->real_escape_string($data['time']);
    $notes = $conn->real_escape_string($data['notes']);

    $sql = "INSERT INTO reservations (res_code, customer_name, phone, res_type, guests, res_date, res_time, notes) 
            VALUES ('$code', '$name', '$phone', '$type', '$guests', '$date', '$time', '$notes')";
    if ($conn->query($sql)) {
        echo json_encode(["status" => "success", "res_code" => $code]);
    } else {
        echo json_encode(["status" => "error", "message" => $conn->error]);
    }
}

// 10. GET RESERVATIONS
elseif ($action === 'get_reservations') {
    $res = $conn->query("SELECT * FROM reservations ORDER BY id DESC");
    $list = [];
    if ($res) {
        while ($row = $res->fetch_assoc()) {
            $list[] = [
                "db_id" => $row['id'],
                "id" => $row['res_code'],
                "name" => $row['customer_name'],
                "phone" => $row['phone'],
                "type" => $row['res_type'],
                "guests" => $row['guests'],
                "date" => $row['res_date'],
                "time" => $row['res_time'],
                "notes" => $row['notes'],
                "status" => $row['status']
            ];
        }
    }
    echo json_encode($list);
}

// 11. UPDATE RESERVATION STATUS
elseif ($action === 'update_res_status') {
    $id = intval($data['db_id']);
    $status = $conn->real_escape_string($data['status']);
    $conn->query("UPDATE reservations SET status='$status' WHERE id=$id");
    echo json_encode(["status" => "success"]);
}

// 12. DELETE RESERVATION (Supports both delete_res & delete_reservation)
elseif ($action === 'delete_res' || $action === 'delete_reservation') {
    $id = intval($data['db_id']);
    $conn->query("DELETE FROM reservations WHERE id=$id");
    echo json_encode(["status" => "success"]);
}

// 13. ADD, GET & DELETE REVIEWS
elseif ($action === 'add_review') {
    $author = $conn->real_escape_string($data['author']);
    $role = $conn->real_escape_string($data['role']);
    $stars = intval($data['stars']);
    $quote = $conn->real_escape_string($data['quote']);
    $conn->query("INSERT INTO reviews (author, role, stars, quote) VALUES ('$author', '$role', $stars, '$quote')");
    echo json_encode(["status" => "success"]);
}
elseif ($action === 'get_reviews') {
    $res = $conn->query("SELECT * FROM reviews ORDER BY id DESC");
    $list = [];
    if ($res) {
        while ($row = $res->fetch_assoc()) {
            $list[] = [
                "db_id" => $row['id'],
                "author" => $row['author'],
                "role" => $row['role'],
                "stars" => $row['stars'],
                "quote" => $row['quote'],
                "created_at" => $row['created_at'] ?? ''
            ];
        }
    }
    echo json_encode($list);
}
elseif ($action === 'delete_review') {
    $id = intval($data['db_id']);
    $conn->query("DELETE FROM reviews WHERE id=$id");
    echo json_encode(["status" => "success"]);
}
?>