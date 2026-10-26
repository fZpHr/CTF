/* Datalys, bascule de thème clair/sombre.
   Chargé dans le <head> pour appliquer le thème avant le premier rendu
   (pas de flash blanc), mémorisé dans localStorage, défaut = préférence OS. */
(function () {
    var KEY = 'datalys-theme';
    var t;
    try { t = localStorage.getItem(KEY); } catch (e) {}
    if (t !== 'light' && t !== 'dark') {
        t = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', t);

    window.DatalysTheme = {
        current: function () {
            return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        },
        set: function (mode) {
            mode = mode === 'dark' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', mode);
            try { localStorage.setItem(KEY, mode); } catch (e) {}
            document.dispatchEvent(new CustomEvent('datalys-theme-change', { detail: mode }));
            return mode;
        },
        toggle: function () {
            return this.set(this.current() === 'dark' ? 'light' : 'dark');
        }
    };
})();
