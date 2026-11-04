<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, private');

function gateResponse($status, $body) {
    http_response_code($status);
    echo json_encode($body);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    gateResponse(405, ['success' => false, 'error' => 'method_not_allowed']);
}

$postedToken = $_POST['gate_token'] ?? '';
$sessionToken = $_SESSION['gate_token'] ?? '';
if (!is_string($postedToken) || !is_string($sessionToken) || $sessionToken === '' || !hash_equals($sessionToken, $postedToken)) {
    gateResponse(403, ['success' => false, 'error' => 'invalid_token']);
}

$action = $_POST['action'] ?? '';
if ($action === 'start_hold') {
    $_SESSION['gate_hold_started_at'] = microtime(true);
    gateResponse(200, ['success' => true]);
}

if ($action === 'cancel_hold') {
    unset($_SESSION['gate_hold_started_at']);
    gateResponse(200, ['success' => true]);
}

if ($action !== 'unlock_gate') {
    gateResponse(400, ['success' => false, 'error' => 'invalid_action']);
}

$startedAt = $_SESSION['gate_hold_started_at'] ?? null;
unset($_SESSION['gate_hold_started_at']);
$holdDuration = is_numeric($startedAt) ? microtime(true) - (float)$startedAt : 0;
if ($holdDuration < 2.75 || $holdDuration > 30) {
    gateResponse(403, ['success' => false, 'error' => 'hold_not_verified']);
}

session_regenerate_id(true);
$_SESSION['gate_unlocked'] = true;
$_SESSION['gate_unlock_version'] = 1;
$_SESSION['unlocked_at'] = time();
gateResponse(200, ['success' => true, 'redirect' => 'invitation.php']);
