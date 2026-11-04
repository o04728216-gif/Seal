/**
 * Luxury Invitation Gate Engine
 * Fully mobile-responsive, dynamic viewport scaling, high-DPI canvas "binging" indicators,
 * acoustic crystal chimes, particle fireworks, and seamless transition to actual RSVP page.
 */

document.addEventListener('DOMContentLoaded', () => {
  const stage = document.getElementById('artworkStage');
  const sealAnchor = document.getElementById('sealAnchor');
  const canvas = document.getElementById('bingCanvas');
  const instruction = document.getElementById('gateInstructionText');

  if (!sealAnchor || !canvas) return;

  const ctx = canvas.getContext('2d');
  const HOLD_DURATION = 3000; // Exactly 3000ms
  const BING_INTERVAL = 750;  // Harmonic ping cadence (0s, 0.75s, 1.5s, 2.25s)
  const bingNotes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 crystalline triad

  let dpr = window.devicePixelRatio || 1;
  let canvasWidth = 340;
  let canvasHeight = 340;
  let sealRadius = 42;
  let isHolding = false;
  let startTime = 0;
  let elapsed = 0;
  let holdRafId = null;
  let nextBingTime = 0;
  let bingIndex = 0;
  let isUnlocked = false;

  // Particle and Ripple pools
  const ripples = [];
  const particles = [];

  // Setup Canvas DPI & Dynamic Scaled Metrics for Mobile & Desktop
  function updateCanvasDimensions() {
    dpr = window.devicePixelRatio || 1;
    const rect = sealAnchor.getBoundingClientRect();
    const sealDiameter = rect.width || 74;

    // Dynamically scale canvas area relative to seal size
    canvasWidth = Math.max(220, Math.round(sealDiameter * 4.4));
    canvasHeight = canvasWidth;
    sealRadius = Math.round(sealDiameter / 2) + 2.5;

    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    canvas.width = Math.round(canvasWidth * dpr);
    canvas.height = Math.round(canvasHeight * dpr);

    ctx.resetTransform?.();
    ctx.scale(dpr, dpr);
  }

  updateCanvasDimensions();
  window.addEventListener('resize', updateCanvasDimensions);
  window.addEventListener('orientationchange', () => {
    setTimeout(updateCanvasDimensions, 100);
  });

  // Mobile & Pointer Touch Events
  sealAnchor.addEventListener('pointerdown', handlePointerDown);
  window.addEventListener('pointerup', handlePointerUp);
  window.addEventListener('pointercancel', handlePointerUp);

  // Prevent default context menus and long-press callouts on mobile
  sealAnchor.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) return;
    window.luxuryAudio.resume();
  }, { passive: false });

  function handlePointerDown(e) {
    if (isUnlocked) return;
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();

    isHolding = true;
    startTime = performance.now();
    elapsed = 0;
    bingIndex = 0;
    nextBingTime = startTime;

    sealAnchor.classList.add('pressed');
    if (instruction) {
      instruction.classList.add('holding');
      instruction.textContent = '✦ UNSEALING... 3s ✦';
    }

    // Start acoustic resonance (AudioContext resumes automatically)
    window.luxuryAudio.startHoldShimmer();

    // Trigger first bing immediately
    triggerBing(bingNotes[0]);
    bingIndex = 1;
    nextBingTime = startTime + BING_INTERVAL;

    // Start animation loop
    if (!holdRafId) {
      holdRafId = requestAnimationFrame(renderLoop);
    }
  }

  function handlePointerUp() {
    if (!isHolding) return;
    isHolding = false;
    sealAnchor.classList.remove('pressed');
    window.luxuryAudio.stopHoldShimmer();

    if (isUnlocked) return;

    // If released before 3 seconds
    if (instruction) {
      instruction.classList.remove('holding');
      instruction.classList.add('warn');
      instruction.textContent = '✦ PRESS AND HOLD FOR 3 SECONDS ✦';

      setTimeout(() => {
        instruction.classList.remove('warn');
        if (!isUnlocked) {
          instruction.textContent = '+ PRESS THE SEAL TO OPEN +';
        }
      }, 1800);
    }
  }

  /**
   * "Binging" Trigger: Acoustic ping + Luminous Shockwave Ripple + Haptic
   */
  function triggerBing(freq) {
    // 1. Crystal chime sound (Not muted, fully active!)
    window.luxuryAudio.playPing(freq, 0.42);

    // 2. Haptic vibration on mobile
    if (navigator.vibrate) {
      try { navigator.vibrate(35); } catch (e) {}
    }

    // 3. Shockwave object for canvas
    const center = canvasWidth / 2;
    ripples.push({
      x: center,
      y: center,
      radius: sealRadius - 2,
      maxRadius: canvasWidth * 0.46,
      alpha: 1.0,
      speed: 1.8,
      lineWidth: 2.2
    });

    // 4. Gold sparkles
    emitEmberCluster(center, center, 14);
  }

  function emitEmberCluster(cx, cy, count) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.8 + Math.random() * 2.2;
      const r = sealRadius * (0.85 + Math.random() * 0.3);
      particles.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1.2 + Math.random() * 2.5,
        alpha: 1.0,
        decay: 0.015 + Math.random() * 0.02,
        color: Math.random() > 0.3 ? '#ffe79a' : '#ffffff'
      });
    }
  }

  /**
   * High-Performance Canvas Render Loop
   */
  function renderLoop(now) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    const center = canvasWidth / 2;

    if (isHolding && !isUnlocked) {
      elapsed = now - startTime;
      const progress = Math.min(elapsed / HOLD_DURATION, 1.0);

      // Check cadence for rhythmic "bings"
      if (now >= nextBingTime && bingIndex < bingNotes.length) {
        triggerBing(bingNotes[bingIndex]);
        bingIndex++;
        nextBingTime = startTime + (bingIndex * BING_INTERVAL);
      }

      // Update countdown text
      const remaining = Math.max(0, Math.ceil((HOLD_DURATION - elapsed) / 1000));
      if (instruction) {
        instruction.textContent = `✦ UNSEALING... ${remaining}s ✦`;
      }

      // DRAW MOLTEN LIQUID GOLD PROGRESS RING
      const startAngle = -Math.PI / 2;
      const currentAngle = startAngle + (Math.PI * 2 * progress);

      // 1. Ambient outer glow track
      ctx.save();
      ctx.beginPath();
      ctx.arc(center, center, sealRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(235, 190, 90, 0.2)';
      ctx.lineWidth = Math.max(3, sealRadius * 0.09);
      ctx.stroke();

      // 2. Liquid gold progress arc
      ctx.beginPath();
      ctx.arc(center, center, sealRadius, startAngle, currentAngle);
      ctx.strokeStyle = '#ffe494';
      ctx.lineWidth = Math.max(3, sealRadius * 0.09);
      ctx.lineCap = 'round';
      ctx.shadowColor = '#ffcb52';
      ctx.shadowBlur = 18;
      ctx.stroke();

      // 3. Hot white-gold leading tracer head
      if (progress > 0) {
        const headX = center + Math.cos(currentAngle) * sealRadius;
        const headY = center + Math.sin(currentAngle) * sealRadius;
        ctx.beginPath();
        ctx.arc(headX, headY, Math.max(2.5, sealRadius * 0.08), 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#fff5d6';
        ctx.shadowBlur = 14;
        ctx.fill();

        // Emit trace sparks
        if (Math.random() < 0.6) {
          particles.push({
            x: headX,
            y: headY,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            size: 1 + Math.random() * 2,
            alpha: 1.0,
            decay: 0.03,
            color: '#ffea9f'
          });
        }
      }
      ctx.restore();

      // 4. Completed full 3 seconds!
      if (progress >= 1.0) {
        completeUnseal(center);
      }
    } else if (!isHolding && elapsed > 0 && !isUnlocked) {
      // Smooth decay of progress when user releases early
      elapsed = Math.max(0, elapsed - 60);
      const progress = elapsed / HOLD_DURATION;
      if (progress > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(center, center, sealRadius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
        ctx.strokeStyle = 'rgba(255, 210, 100, 0.5)';
        ctx.lineWidth = Math.max(2.5, sealRadius * 0.08);
        ctx.stroke();
        ctx.restore();
      }
    }

    // DRAW SHOCKWAVE RIPPLES ("BINGS")
    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      r.radius += r.speed;
      r.alpha -= 0.018;

      if (r.alpha <= 0 || r.radius >= r.maxRadius) {
        ripples.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(245, 205, 100, ${r.alpha})`;
      ctx.lineWidth = r.lineWidth;
      ctx.shadowColor = 'rgba(255, 215, 110, 0.6)';
      ctx.shadowBlur = 10;
      ctx.stroke();

      // Faint inner secondary echo ring
      ctx.beginPath();
      ctx.arc(r.x, r.y, Math.max(0, r.radius - 8), 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 230, 140, ${r.alpha * 0.5})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }

    // DRAW SPARK PARTICLES
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.shadowColor = '#ffd269';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    }

    // Continue loop if active
    if (isHolding || ripples.length > 0 || particles.length > 0 || elapsed > 0) {
      holdRafId = requestAnimationFrame(renderLoop);
    } else {
      holdRafId = null;
    }
  }

  /**
   * 3.0s Hold Reached: Unseal Envelope, Trigger Fireworks & Transition to Invitation
   */
  function completeUnseal(center) {
    isUnlocked = true;
    isHolding = false;

    // Fanfare & Fracture Sound
    window.luxuryAudio.playGrandReveal();

    if (navigator.vibrate) {
      try { navigator.vibrate([70, 50, 120]); } catch (e) {}
    }

    // Massive golden firework explosion (70 particles)
    for (let i = 0; i < 70; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.0 + Math.random() * 5.5;
      particles.push({
        x: center,
        y: center,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1.5 + Math.random() * 3.5,
        alpha: 1.0,
        decay: 0.012 + Math.random() * 0.015,
        color: Math.random() > 0.4 ? '#fff2b8' : '#ffffff'
      });
    }

    // Add extra expanding gold blast ripples
    ripples.push({
      x: center,
      y: center,
      radius: sealRadius,
      maxRadius: canvasWidth * 0.55,
      alpha: 1.0,
      speed: 3.5,
      lineWidth: 3.5
    });

    sealAnchor.classList.add('unsealed');
    if (instruction) {
      instruction.textContent = '✦ UNSEALED ✦';
      instruction.classList.add('unsealed');
    }

    // Transition to the actual invitation page
    transitionToInvitation();
  }

  /**
   * Unlocks the backend PHP session and smoothly navigates to invitation.php
   */
  function transitionToInvitation() {
    const gateToken = document.querySelector('meta[name="gate-token"]')?.content || '';

    // Notify backend to unlock session
    fetch('unlock.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        action: 'unlock_gate',
        gate_token: gateToken
      })
    })
    .catch(() => {
      // Ignore network errors, proceed with transition
    })
    .finally(() => {
      // Allow user to see the golden fireworks and hear the fanfare (750ms), then transition
      setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '0';
        setTimeout(() => {
          window.location.href = 'invitation.php';
        }, 500);
      }, 750);
    });
  }
});
