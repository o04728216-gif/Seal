<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (empty($_SESSION['gate_token'])) {
    $_SESSION['gate_token'] = bin2hex(random_bytes(32));
}
$gateToken = $_SESSION['gate_token'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="gate-token" content="<?= htmlspecialchars($gateToken, ENT_QUOTES, 'UTF-8') ?>">
  <title>Save The Date | An Evening of Distinction</title>
  
  <link rel="stylesheet" href="assets/css/gate.css">
</head>
<body oncontextmenu="return false;">

  <!-- Cotton Paper Tactile Texture Overlay -->
  <div class="paper-texture-overlay" aria-hidden="true"></div>

  <!-- Master Gate Screen (Responsive Viewport: PC & Mobile) -->
  <main class="gate-screen">
    
    <!-- Central Stage: Pristine Background + Crystal-Clear Vector Typography -->
    <div class="artwork-stage" id="artworkStage">
      <!-- 3K Ultra-HD Background Artwork (Debossed flourishes, envelope & wax seal) -->
      <img src="assets/images/gate-artwork.jpg" alt="Save the Date Artwork" class="gate-base-img" draggable="false">

      <!-- Crystal-Clear Vector Typography (Never blurry, 100% sharp on PC & Mobile) -->
      <header class="gate-typography-header">
        <!-- Golden Constellation Kite Diagram -->
        <div class="constellation-box" aria-hidden="true">
          <svg class="constellation-svg" viewBox="0 0 100 52">
            <line x1="20" y1="38" x2="48" y2="10" />
            <line x1="48" y1="10" x2="82" y2="18" />
            <line x1="82" y1="18" x2="68" y2="44" />
            <line x1="68" y1="44" x2="20" y2="38" />
            <line x1="48" y1="10" x2="68" y2="44" />
            <line x1="82" y1="18" x2="96" y2="8" />
            <circle cx="20" cy="38" r="1.8" />
            <circle cx="48" cy="10" r="2.2" />
            <circle cx="82" cy="18" r="2.0" />
            <circle cx="68" cy="44" r="1.8" />
            <circle cx="96" cy="8" r="1.4" />
          </svg>
        </div>

        <!-- "✦ You're Cordially Invited ✦" Script -->
        <div class="script-invite">
          <span class="sparkle-diamond">✦</span>
          <span>You're Cordially Invited</span>
          <span class="sparkle-diamond">✦</span>
        </div>

        <!-- "SAVE THE DATE" Foil Serif Title -->
        <h1 class="main-title">SAVE THE DATE</h1>

        <!-- Fine Gold Hairline with Center Diamond -->
        <div class="ornament-divider" aria-hidden="true">
          <div class="center-dot"></div>
        </div>

        <!-- Elegant Italic Subtitle -->
        <p class="pleasure-line">The pleasure of your company is requested</p>
      </header>

      <!-- Interactive Wax Seal Anchor (Anchored to exact seal position: 50.0% X, 59.7% Y) -->
      <!-- The wax seal is rendered natively from the 3K artwork with zero cut/halo artifacts -->
      <div class="seal-interactive-anchor" id="sealAnchor" role="button" tabindex="0" aria-label="Press and hold the seal for 3 seconds to unseal the invitation">
        <span class="seal-idle-ring" aria-hidden="true"></span>
        <!-- High-DPI Canvas for Molten Gold Progress Arc, Shockwave Bings & Embers -->
        <canvas id="bingCanvas" class="bing-canvas"></canvas>
      </div>

      <!-- Dynamic Instruction Overlay -->
      <div class="instruction-overlay-box" aria-live="polite">
        <span class="gate-instruction-text" id="gateInstructionText">+ PRESS THE SEAL TO OPEN +</span>
      </div>
    </div>

  </main>

  <!-- Audio Synthesis & Gate Engine -->
  <script src="assets/js/audio.js"></script>
  <script src="assets/js/gate.js"></script>
</body>
</html>
