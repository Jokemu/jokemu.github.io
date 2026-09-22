(function(){
  const wrap = document.getElementById('canopy-wrap');
  const treeScene = document.getElementById('tree-scene');
  const revealScene = document.getElementById('reveal-scene');
  const paintScene = document.getElementById('paint-scene');
  const puzzleScene = document.getElementById('puzzle-scene');
  const quoteScene = document.getElementById('quote-scene');
  const gustBtn = document.getElementById('gust-btn');
  const skipTree = document.getElementById('skip-tree');
  const toGalleryBtn = document.getElementById('to-gallery-btn');
  const promptEl = document.querySelector('.prompt');

  let stage = 'tree'; // 'tree' | 'reveal' | 'paint' | 'puzzle' | 'quote'

  const LEAF_COUNT = 112;
  const LEAF_ASSETS = [
    { src:'leaf1.png', weight:0.34 },
    { src:'leaf2.png', weight:0.30 },
    { src:'leaf3.png', weight:0.20 },
    { src:'leaf4.png', weight:0.16 }
  ];
  const LEAF_BASE_SIZE = 52;
  const LEAF_SIZE_VARIANTS = [
    { multiplier:0.92, weight:0.17 },
    { multiplier:1.14, weight:0.33 },
    { multiplier:1.34, weight:0.30 },
    { multiplier:1.58, weight:0.20 }
  ];
  const CANOPY_ANCHORS = [
    { x:41.5, y:31, spreadX:15, spreadY:11, weight:0.22 },
    { x:58.5, y:30, spreadX:15, spreadY:11, weight:0.22 },
    { x:33.5, y:45, spreadX:13, spreadY:10, weight:0.17 },
    { x:67.5, y:43, spreadX:13, spreadY:10, weight:0.17 },
    { x:50, y:38, spreadX:18, spreadY:11, weight:0.16 },
    { x:50, y:26, spreadX:21, spreadY:9, weight:0.06 }
  ];
  let leaves = [];
  let leavesRemaining = LEAF_COUNT;
  let leafDone = false;

  function randomRange(min, max){
    return min + Math.random() * (max - min);
  }

  function clamp(value, min, max){
    return Math.max(min, Math.min(max, value));
  }

  function pickWeighted(items){
    let pick = Math.random();
    for(let i=0;i<items.length;i++){
      pick -= items[i].weight;
      if(pick <= 0) return items[i];
    }
    return items[items.length - 1];
  }

  function pickLeafAsset(){
    return pickWeighted(LEAF_ASSETS).src;
  }

  function randomLeafSize(){
    const variant = pickWeighted(LEAF_SIZE_VARIANTS);
    const jitter = randomRange(0.92, 1.08);
    return Math.round(LEAF_BASE_SIZE * variant.multiplier * jitter);
  }

  function randomCanopyPosition(){
    const anchor = pickWeighted(CANOPY_ANCHORS);

    // Use centered offsets so leaves gather near anchor points, not in a rectangle.
    const offsetX = (Math.random() - Math.random()) * anchor.spreadX;
    const offsetY = (Math.random() - Math.random()) * anchor.spreadY;
    const x = clamp(anchor.x + offsetX, 28, 74);
    const y = clamp(anchor.y + offsetY, 20, 53);
    return { x:x, y:y };
  }

  function randomLeafToneClass(){
    const roll = Math.random();
    if(roll < 0.2) return 'tint-rose';
    if(roll < 0.5) return 'tint-deep';
    return '';
  }

  function setLeafBaseTransform(el, rot, scale){
    el.style.transform = 'translate(-50%,-50%) rotate(' + rot + 'deg) scale(' + scale + ')';
    el.dataset.baseRot = String(rot);
    el.dataset.scale = String(scale);
  }

  function createLeaves(){
    for(let i=0;i<LEAF_COUNT;i++){
      const el = document.createElement('div');
      el.className = 'leaf';
      const toneClass = randomLeafToneClass();
      if(toneClass) el.classList.add(toneClass);
      const img = document.createElement('img');
      img.src = pickLeafAsset();
      img.alt = '';
      el.appendChild(img);
      const size = randomLeafSize();
      el.style.width = size + 'px';
      el.style.height = size + 'px';

      const pos = randomCanopyPosition();
      el.style.left = pos.x + '%';
      el.style.top = pos.y + '%';
      const rot = Math.random()*360;
      const scale = randomRange(0.9, 1.12);
      setLeafBaseTransform(el, rot, scale);

      el.addEventListener('click', function(){ blowLeaf(el); });
      wrap.appendChild(el);
      leaves.push(el);
    }
  }

  function blowLeaf(el, power){
    if(el.classList.contains('gone')) return;
    el.classList.add('gone');
    const strength = typeof power === 'number' ? power : 1;
    const angle = Math.random()*Math.PI*2;
    const distance = (150 + Math.random()*220) * strength;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    const rot = parseFloat(el.dataset.baseRot) + 220 + Math.random()*540;
    const scale = el.dataset.scale;
    el.style.transform = 'translate(calc(-50% + ' + dx + 'px), calc(-50% + ' + dy + 'px)) rotate(' + rot + 'deg) scale(' + scale + ')';
    leavesRemaining--;
    if(leavesRemaining <= 0 && !leafDone){
      leafDone = true;
      setTimeout(showReveal, 900);
    }
  }

  function leafGust(){
    const alive = leaves.filter(l => !l.classList.contains('gone'));
    const n = Math.min(alive.length, 8 + Math.floor(Math.random()*6));
    const gustPower = 1 + Math.random()*0.45;
    for(let i=0;i<n;i++){
      const idx = Math.floor(Math.random()*alive.length);
      const el = alive.splice(idx,1)[0];
      if(el) setTimeout(()=>blowLeaf(el, gustPower), i*90);
    }

    // Speed up the ending so users do not get stuck on the last few leaves.
    if(alive.length > 0 && alive.length <= 14){
      alive.forEach(function(el, i){
        setTimeout(function(){ blowLeaf(el, gustPower * 1.05); }, 220 + i * 40);
      });
    }
  }

  function showReveal(){
    stage = 'reveal';
    treeScene.style.opacity = '0';
    setTimeout(()=>{ treeScene.style.pointerEvents = 'none'; }, 1400);
    revealScene.classList.add('visible');
    spawnEmbers();
  }

  function spawnEmbers(){
    const emberPalette = ['#2f4a3a', '#3f6650', '#c98783', '#de6fa8'];
    for(let i=0;i<14;i++){
      const e = document.createElement('div');
      e.className = 'ember';
      const size = 7 + Math.random()*6;
      e.style.width = size+'px';
      e.style.height = size+'px';
      e.style.background = emberPalette[Math.floor(Math.random()*emberPalette.length)];
      e.style.left = (10 + Math.random()*80) + '%';
      e.style.bottom = (Math.random()*30) + '%';
      e.style.animationDelay = (Math.random()*4) + 's';
      e.style.animationDuration = (4.2 + Math.random()*2.8) + 's';
      revealScene.appendChild(e);
    }
  }

  function showPaint(){
    stage = 'paint';
    paintScene.classList.add('visible');
  }

  // ---------- painting ----------
  const canvas = document.getElementById('paint-canvas');
  const ctx = canvas.getContext('2d');
  const PALETTE = ['#28362f','#faf3e3','#c98783','#dba043','#6f8f6d','#7a8fc9','#e0c2df','#3a2a1f'];
  const CANVAS_BASE_COLOR = '#e3ecdd';
  let currentColor = PALETTE[0];
  let currentSize = 10;
  let drawing = false;
  let eraserMode = false;
  const eraserBtn = document.getElementById('eraser-btn');

  function fillCanvasBase(){
    ctx.fillStyle = CANVAS_BASE_COLOR;
    ctx.fillRect(0,0,canvas.width,canvas.height);
  }
  fillCanvasBase();

  function activePaintColor(){
    return eraserMode ? CANVAS_BASE_COLOR : currentColor;
  }

  function buildPalette(){
    const paletteEl = document.getElementById('palette');
    PALETTE.forEach(function(color, i){
      const sw = document.createElement('div');
      sw.className = 'swatch' + (i===0 ? ' active' : '');
      sw.style.background = color;
      sw.addEventListener('click', function(){
        currentColor = color;
        eraserMode = false;
        if(eraserBtn){
          eraserBtn.classList.remove('active');
          eraserBtn.setAttribute('aria-pressed', 'false');
        }
        document.querySelectorAll('.swatch').forEach(s=>s.classList.remove('active'));
        sw.classList.add('active');
      });
      paletteEl.appendChild(sw);
    });
  }
  buildPalette();

  const customColorInput = document.getElementById('custom-color');
  if(customColorInput){
    customColorInput.addEventListener('input', function(){
      currentColor = customColorInput.value;
      eraserMode = false;
      if(eraserBtn){
        eraserBtn.classList.remove('active');
        eraserBtn.setAttribute('aria-pressed', 'false');
      }
      document.querySelectorAll('.swatch').forEach(s=>s.classList.remove('active'));
    });
  }

  document.querySelectorAll('.brush-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      currentSize = parseInt(btn.dataset.size, 10);
      document.querySelectorAll('.brush-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  function canvasPoint(e){
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  }

  let lastPoint = null;
  function startDraw(e){
    drawing = true;
    lastPoint = canvasPoint(e);
    dot(lastPoint);
  }
  function moveDraw(e){
    if(!drawing) return;
    e.preventDefault();
    const p = canvasPoint(e);
    ctx.strokeStyle = activePaintColor();
    ctx.lineWidth = currentSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastPoint = p;
  }
  function dot(p){
    ctx.fillStyle = activePaintColor();
    ctx.beginPath();
    ctx.arc(p.x, p.y, currentSize/2, 0, Math.PI*2);
    ctx.fill();
  }
  function endDraw(){ drawing = false; lastPoint = null; }

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', moveDraw);
  window.addEventListener('mouseup', endDraw);
  canvas.addEventListener('touchstart', startDraw, { passive:true });
  canvas.addEventListener('touchmove', moveDraw, { passive:false });
  canvas.addEventListener('touchend', endDraw);

  if(eraserBtn){
    eraserBtn.addEventListener('click', function(){
      eraserMode = !eraserMode;
      eraserBtn.classList.toggle('active', eraserMode);
      eraserBtn.setAttribute('aria-pressed', eraserMode ? 'true' : 'false');
    });
  }
  document.getElementById('export-btn').addEventListener('click', function(){
    const link = document.createElement('a');
    link.download = 'schilderij.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
  document.getElementById('to-puzzle-btn').addEventListener('click', function(){
    buildPuzzle(canvas.toDataURL('image/png'));
    paintScene.style.opacity = '0';
    setTimeout(()=>{ paintScene.style.pointerEvents = 'none'; }, 1400);
    stage = 'puzzle';
    puzzleScene.classList.add('visible');
  });

  // ---------- puzzle ----------
  const GRID = 3;
  let selectedTile = null;

  function buildPuzzle(imageDataUrl){
    const grid = document.getElementById('puzzle-grid');
    grid.innerHTML = '';
    const total = GRID * GRID;
    let pieces = [];
    for(let i=0;i<total;i++) pieces.push(i);
    // shuffle, re-shuffle if it accidentally landed solved
    do{
      for(let i=pieces.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        [pieces[i],pieces[j]] = [pieces[j],pieces[i]];
      }
    } while(pieces.every(function(p,i){ return p===i; }));

    pieces.forEach(function(pieceIndex, slotIndex){
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.dataset.piece = pieceIndex;
      tile.dataset.slot = slotIndex;
      setTilePiece(tile, imageDataUrl, pieceIndex);
      tile.addEventListener('click', function(){ handleTileClick(tile); });
      grid.appendChild(tile);
    });
  }

  function setTilePiece(tile, imageDataUrl, pieceIndex){
    const row = Math.floor(pieceIndex / GRID);
    const col = pieceIndex % GRID;
    tile.style.backgroundImage = 'url(' + imageDataUrl + ')';
    tile.style.backgroundSize = (GRID*100) + '% ' + (GRID*100) + '%';
    tile.style.backgroundPosition = (col*50) + '% ' + (row*50) + '%';
    tile.dataset.piece = pieceIndex;
  }

  function handleTileClick(tile){
    if(!selectedTile){
      selectedTile = tile;
      tile.classList.add('selected');
      return;
    }
    if(selectedTile === tile){
      tile.classList.remove('selected');
      selectedTile = null;
      return;
    }
    // swap piece assignment between the two tiles
    const imgUrl = tile.style.backgroundImage.match(/url\((.*)\)/)[1];
    const pieceA = selectedTile.dataset.piece;
    const pieceB = tile.dataset.piece;
    setTilePiece(selectedTile, imgUrl.replace(/^["']|["']$/g,''), parseInt(pieceB,10));
    setTilePiece(tile, imgUrl.replace(/^["']|["']$/g,''), parseInt(pieceA,10));
    selectedTile.classList.remove('selected');
    selectedTile = null;
    checkPuzzleSolved();
  }

  function checkPuzzleSolved(){
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const solved = tiles.every(function(t){ return parseInt(t.dataset.piece,10) === parseInt(t.dataset.slot,10); });
    if(solved){
      setTimeout(showQuote, 700);
    }
  }

  function showQuote(){
    puzzleScene.style.opacity = '0';
    setTimeout(()=>{ puzzleScene.style.pointerEvents = 'none'; }, 1400);
    stage = 'quote';
    quoteScene.classList.add('visible');
  }

  function handleGust(){
    if(stage === 'tree') leafGust();
  }

  gustBtn.addEventListener('click', handleGust);
  skipTree.addEventListener('click', function(){ if(!leafDone){ leafDone = true; showReveal(); } });
  toGalleryBtn.addEventListener('click', showPaint);

  // Optional: microphone-based blowing with desktop-friendly detection.
  let micArmed = false;
  let micActive = false;
  let micCtx = null;

  function setMicHint(text){
    if(!promptEl || !text) return;
    if(promptEl.dataset.micHintShown === '1') return;
    promptEl.innerHTML += '<br><small>' + text + '</small>';
    promptEl.dataset.micHintShown = '1';
  }

  function computeRms(samples){
    let sum = 0;
    for(let i=0;i<samples.length;i++){
      const centered = (samples[i] - 128) / 128;
      sum += centered * centered;
    }
    return Math.sqrt(sum / samples.length);
  }

  function resumeMicContext(){
    if(!micCtx) return;
    if(micCtx.state === 'suspended'){
      micCtx.resume().catch(function(){ /* ignore */ });
    }
  }

  function armMic(){
    if(micArmed || micActive) return;
    micArmed = true;
    if(!window.isSecureContext){
      setMicHint('Microfoon werkt op desktop meestal alleen via https of localhost.');
      return;
    }
    if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
      setMicHint('Je browser ondersteunt geen microfoon-toegang voor deze pagina.');
      return;
    }
    navigator.mediaDevices.getUserMedia({ audio:true }).then(function(stream){
      try{
        micCtx = new (window.AudioContext || window.webkitAudioContext)();
        const source = micCtx.createMediaStreamSource(stream);
        const analyser = micCtx.createAnalyser();
        analyser.fftSize = 1024;
        source.connect(analyser);
        const data = new Uint8Array(analyser.fftSize);
        let ambientRms = 0;
        let calibratedFrames = 0;
        let cooldown = 0;
        micActive = true;
        (function poll(){
          analyser.getByteTimeDomainData(data);
          const rms = computeRms(data);

          // Build a short moving ambient baseline for better desktop mic behavior.
          if(calibratedFrames < 30){
            ambientRms = (ambientRms * calibratedFrames + rms) / (calibratedFrames + 1);
            calibratedFrames++;
          }else{
            ambientRms = ambientRms * 0.985 + rms * 0.015;
          }

          const dynamicThreshold = Math.max(0.025, ambientRms * 2.15);
          if(rms > dynamicThreshold && cooldown <= 0){
            handleGust();
            cooldown = 20;
          }
          if(cooldown > 0) cooldown--;
          requestAnimationFrame(poll);
        })();
      }catch(e){
        setMicHint('Microfoon kon niet opstarten. Klikken werkt altijd als fallback.');
      }
    }).catch(function(){
      setMicHint('Geen microfoon-toegang. Geef toestemming in je browser-instellingen.');
    });
  }

  createLeaves();
  document.body.addEventListener('click', armMic, { once:true });
  document.body.addEventListener('touchstart', armMic, { once:true, passive:true });
  document.body.addEventListener('keydown', armMic, { once:true });
  document.body.addEventListener('click', resumeMicContext);
  document.body.addEventListener('touchstart', resumeMicContext, { passive:true });
  document.body.addEventListener('keydown', resumeMicContext);
})();
