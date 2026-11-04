<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Mark session as legitimately unlocked through 3-second hold
$_SESSION['gate_unlocked'] = true;
$_SESSION['unlocked_at'] = time();

// If accessed directly via browser GET, redirect to invitation.php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Location: invitation.php');
    exit;
}

// Return JSON response for AJAX
header('Content-Type: application/json; charset=utf-8');
echo json_encode([
    'success' => true,
    'redirect' => 'invitation.php'
]);
exit;
