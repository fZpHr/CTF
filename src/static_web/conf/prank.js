/* Datalys, module de la console d'administration.
   - avec { endpoint } : vrai login (POST). 200 => acces accorde (flag renvoye par
     le backend) ; sinon => crescendo d'echecs puis verrouillage glitche (troll).
   - sans endpoint : decoy pur (chaque tentative echoue -> troll).
   Injecte les overlays (succes + verrouillage). Le plein ecran part du clic. */
(function () {
    var overlays =
        '<div id="granted" aria-hidden="true"><canvas id="fwCanvas" class="fw"></canvas><div class="g-box">' +
        '<img class="g-meme" src="image.png" alt="Mais oui c\'est clair">' +
        '<h2>Accès administrateur accordé</h2>' +
        '<p class="g-sub" id="gUser">Bienvenue.</p>' +
        '<div class="g-card"><code class="g-flag" id="gFlag"></code></div>' +
        '<p class="g-note">Session administrateur ouverte · Datalys Console</p>' +
        '</div></div>' +
        '<div id="lock" aria-hidden="true">' +
        '<canvas id="lockCanvas"></canvas><div class="vig"></div><div class="crt"></div><div class="flick"></div>' +
        '<div class="wrap">' +
        '<h1 class="alert glitch" id="lockTitle" data-text="⚠ INTRUSION DÉTECTÉE">⚠ INTRUSION DÉTECTÉE</h1>' +
        '<p class="sub" id="lockSub">Verrouillage du poste en cours</p>' +
        '<div class="bar"><i id="lockBar"></i></div>' +
        '<div class="lock-body">' +
        '<pre id="lockOut"></pre>' +
        '<div class="cam-shot" id="camShot">' +
        '<div class="cam-head"><span class="rec">● REC</span><span id="camTs">CAM-42 · 00:00:00</span></div>' +
        '<img src="intrus.webp" alt="capture webcam de l\'intrus">' +
        '<div class="cam-cap">SUJET IDENTIFIÉ · poste 42-angouleme</div>' +
        '</div>' +
        '</div>' +
        '<button id="lockClose" class="btn btn-light">Fermer et retourner énumérer</button>' +
        '</div><div class="hint">Échap pour quitter</div></div>';

    var ready = false, rainTimer = null;

    function inject() {
        if (ready) return;
        document.body.insertAdjacentHTML('beforeend', overlays);
        document.getElementById('lockClose').addEventListener('click', closeLock);
        window.addEventListener('resize', function () {
            if (document.getElementById('lock').classList.contains('show')) matrix();
        });
        ready = true;
    }

    function goFull() {
        if (document.fullscreenElement) return;
        var el = document.documentElement;
        var r = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
        if (r) { try { var p = r.call(el); if (p && p.catch) p.catch(function () {}); } catch (e) {} }
    }

    function profile() {
        var ua = navigator.userAgent;
        var os = /Windows NT 10/.test(ua) ? 'Windows 10/11'
               : /Windows/.test(ua) ? 'Windows'
               : /Mac OS X/.test(ua) ? 'macOS'
               : /Linux/.test(ua) ? 'Linux'
               : (navigator.platform || 'inconnu');
        var br = /Edg\//.test(ua) ? 'Edge'
               : /OPR\//.test(ua) ? 'Opera'
               : /Firefox\//.test(ua) ? 'Firefox'
               : /Chrome\//.test(ua) ? 'Chrome'
               : /Safari\//.test(ua) ? 'Safari' : 'navigateur';
        return {
            os: os, br: br, res: screen.width + 'x' + screen.height,
            lang: navigator.language || '??', cores: navigator.hardwareConcurrency || '?',
            mem: navigator.deviceMemory ? navigator.deviceMemory + ' Go' : 'n/c',
            t: new Date().toLocaleString('fr-FR')
        };
    }

    function matrix() {
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        var c = document.getElementById('lockCanvas');
        var ctx = c.getContext('2d');
        c.width = window.innerWidth; c.height = window.innerHeight;
        var chars = 'アカサタナハマ0123456789ABCDEF$#%&*{}<>/';
        var fs = 16, cols = Math.floor(c.width / fs);
        var y = new Array(cols).fill(0).map(function () { return Math.random() * c.height; });
        if (rainTimer) clearInterval(rainTimer);
        rainTimer = setInterval(function () {
            ctx.fillStyle = 'rgba(0,0,0,0.12)'; ctx.fillRect(0, 0, c.width, c.height);
            ctx.fillStyle = '#39ff8a'; ctx.font = fs + 'px monospace';
            for (var i = 0; i < cols; i++) {
                ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, y[i]);
                y[i] = (y[i] > c.height && Math.random() > 0.975) ? 0 : y[i] + fs;
            }
        }, 55);
    }

    function launchLock() {
        var p = profile();
        var scary = [
            "> moniteur de securite datalys : evenement critique",
            "",
            "[AUTH]  Echecs d'authentification repetes   endpoint=/admin  src=127.0.0.1",
            "[IDS]   Correspondance signature : brute-force/console  (regle 4280)",
            "[IDS]   Reponse active declenchee.",
            "[NET]   Tracage de l'origine ...................... 127.0.0.1",
            "[NET]   Saut 1: lo0    Saut 2: ???    Saut 3: toujours toi",
            "[SYS]   Capture de l'environnement du poste ...",
            "[SYS]   OS=" + p.os + "   navigateur=" + p.br + "   coeurs=" + p.cores + "   RAM=" + p.mem,
            "[SYS]   Resolution=" + p.res + "   langue=" + p.lang,
            "[SYS]   Horodatage=" + p.t,
            "[CAM]   Acces a la webcam du poste ............ OK",
            "[CAM]   Capture de l'intrus en cours ...",
            "[CAM]   Photo enregistree. Sujet identifie.",
            "[SEC]   Deploiement de la contre-mesure ultime ..."
        ];
        var reveal = [
            "",
            "[SEC]   Contre-mesure deployee : ce message.",
            "[INFO]  La force brute ne passera pas ici.",
            "[INFO]  Les vrais identifiants ne se devinent pas, ils se trouvent."
        ];

        var lock = document.getElementById('lock');
        var out = document.getElementById('lockOut');
        var wrap = lock.querySelector('.wrap');
        lock.classList.remove('done');
        lock.classList.add('show', 'shake');
        lock.setAttribute('aria-hidden', 'false');
        out.textContent = '';
        document.getElementById('camShot').classList.remove('show');
        document.getElementById('lockTitle').textContent = '⚠ INTRUSION DÉTECTÉE';
        document.getElementById('lockTitle').setAttribute('data-text', '⚠ INTRUSION DÉTECTÉE');
        document.getElementById('lockSub').textContent = 'Verrouillage du poste en cours';
        document.getElementById('lockBar').style.width = '0';
        matrix();
        goFull();
        setTimeout(function () { document.getElementById('lockBar').style.width = '100%'; }, 60);

        function scrollEnd() { wrap.scrollTop = wrap.scrollHeight; }
        function showCam() {
            document.getElementById('camTs').textContent = 'CAM-42 · ' + new Date().toLocaleTimeString('fr-FR');
            document.getElementById('camShot').classList.add('show');
            scrollEnd();
        }

        var i = 0;
        (function type() {
            if (i < scary.length) {
                var line = scary[i];
                out.textContent += (i ? '\n' : '') + line;
                i++;
                scrollEnd();
                if (line.indexOf("Capture de l'intrus") !== -1) {
                    setTimeout(showCam, 450);
                    setTimeout(type, 1400);
                } else {
                    setTimeout(type, 300 + Math.random() * 160);
                }
            } else {
                setTimeout(finish, 800);
            }
        })();

        function finish() {
            lock.classList.remove('shake');
            lock.classList.add('done');
            var title = document.getElementById('lockTitle');
            title.textContent = 'ACCÈS REFUSÉ. Bien tente.';
            title.setAttribute('data-text', 'ACCÈS REFUSÉ. Bien tente.');
            document.getElementById('lockSub').textContent = 'Tentative journalisee.';
            var j = 0;
            (function typeR() {
                if (j < reveal.length) {
                    out.textContent += '\n' + reveal[j];
                    j++;
                    scrollEnd();
                    setTimeout(typeR, 260);
                }
            })();
        }
    }

    function closeLock() {
        if (rainTimer) { clearInterval(rainTimer); rainTimer = null; }
        try { if (document.fullscreenElement) document.exitFullscreen(); } catch (e) {}
        window.location.href = 'index';
    }

    function showGranted(data) {
        document.getElementById('gUser').textContent = (data && data.message) || 'Bienvenue.';
        document.getElementById('gFlag').textContent = (data && data.flag) || '';
        document.getElementById('granted').classList.add('show');
        fireworks();
    }

    function fireworks() {
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        var granted = document.getElementById('granted');
        var c = document.getElementById('fwCanvas');
        var ctx = c.getContext('2d');
        var colors = ['#ffd24a', '#ff6b6b', '#4ade80', '#38bdf8', '#c084fc', '#f472b6', '#ffffff'];
        var parts = [];

        function resize() { c.width = c.clientWidth || window.innerWidth; c.height = c.clientHeight || window.innerHeight; }
        resize();
        window.addEventListener('resize', resize);

        function burst(x, y) {
            var n = 30 + Math.floor(Math.random() * 22);
            var base = colors[Math.floor(Math.random() * colors.length)];
            for (var i = 0; i < n; i++) {
                var a = (Math.PI * 2) * (i / n) + Math.random() * 0.2;
                var sp = 1.4 + Math.random() * 3.6;
                parts.push({
                    x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
                    life: 1, col: Math.random() < 0.25 ? colors[Math.floor(Math.random() * colors.length)] : base
                });
            }
        }

        var last = 0;
        function frame(t) {
            if (!granted.classList.contains('show')) { ctx.clearRect(0, 0, c.width, c.height); return; }
            ctx.clearRect(0, 0, c.width, c.height);
            for (var i = parts.length - 1; i >= 0; i--) {
                var p = parts[i];
                p.x += p.vx; p.y += p.vy; p.vy += 0.045; p.vx *= 0.99; p.life -= 0.012;
                if (p.life <= 0) { parts.splice(i, 1); continue; }
                ctx.globalAlpha = Math.max(0, p.life);
                ctx.fillStyle = p.col;
                ctx.fillRect(p.x, p.y, 3, 3);
            }
            ctx.globalAlpha = 1;
            if (t - last > 650) { last = t; burst(c.width * (0.15 + Math.random() * 0.7), c.height * (0.12 + Math.random() * 0.4)); }
            requestAnimationFrame(frame);
        }
        burst(c.width * 0.5, c.height * 0.3);
        requestAnimationFrame(frame);
    }

    function attach(form, cfg) {
        if (!form) return;
        inject();
        cfg = cfg || {};
        var endpoint = cfg.endpoint || null;
        var msg = cfg.msgSel ? document.querySelector(cfg.msgSel) : null;
        var userEl = cfg.userSel ? document.querySelector(cfg.userSel) : null;
        var passEl = cfg.passSel ? document.querySelector(cfg.passSel) : null;
        var btn = form.querySelector('[type=submit]');
        var tries = 0, cooling = false, fired = false;

        function setMsg(kind, text) { if (!msg) return; msg.textContent = text; msg.className = 'msg ' + kind; }

        function cooldown() {
            cooling = true; if (btn) btn.disabled = true;
            var n = 5;
            setMsg('warn', "🔒 Trop de tentatives. Acces temporairement limite, deblocage dans " + n + " s…");
            var iv = setInterval(function () {
                n--;
                if (n > 0) { setMsg('warn', "🔒 Acces limite, deblocage dans " + n + " s…"); }
                else {
                    clearInterval(iv);
                    cooling = false; if (btn) btn.disabled = false;
                    setMsg('err', "Acces retabli. Identifiants invalides.");
                }
            }, 1000);
        }

        function onFail() {
            if (passEl) passEl.value = '';
            if (tries === 0) setMsg('err', "Identifiants invalides. Verifiez votre saisie.");
            else if (tries === 1) setMsg('err', "Identifiants invalides. 2 echecs, l'acces sera limite a la prochaine tentative.");
            else if (tries === 2) cooldown();
            else if (tries === 3) setMsg('warn', "⚠ Derniere tentative autorisee avant verrouillage du compte.");
            else { fired = true; launchLock(); }
            tries++;
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (fired || cooling) return;

            if (!endpoint) { onFail(); return; }

            var body = 'username=' + encodeURIComponent(userEl ? userEl.value : '') +
                       '&password=' + encodeURIComponent(passEl ? passEl.value : '');
            fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: body
            }).then(function (r) {
                return r.json().then(function (j) { return { s: r.status, j: j }; });
            }).then(function (res) {
                if (res.s === 200 && res.j && res.j.ok) { fired = true; showGranted(res.j); }
                else { onFail(); }
            }).catch(function () { onFail(); });
        });
    }

    window.DatalysPrank = { attach: attach };
})();
