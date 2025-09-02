// Elementos
const boton = document.getElementById('boton-inicio');
const inicio = document.getElementById('inicio');
const contenido = document.getElementById('contenido');
const musica = document.getElementById('musica');
const canvas = document.getElementById('grafico');
const ctx = canvas.getContext('2d');
const particulasContainer = document.getElementById('particulas');

canvas.width = 500;
canvas.height = 500;

// ======== Al presionar el botón ========
boton.addEventListener('click', () => {
    inicio.style.display = 'none';
    contenido.classList.remove('oculto');
    musica.play();
    iniciarParticulas();
    iniciarGrafico();
});

// === Partículas doradas flotantes sobre toda la pantalla ===
const numParticulas = 120;
const particulas = [];

function iniciarParticulas() {
    particulasContainer.innerHTML = ''; // Limpiar si hay partículas previas
    for (let i = 0; i < numParticulas; i++) {
        const div = document.createElement('div');
        div.classList.add('particle');
        div.style.left = `${Math.random() * window.innerWidth}px`;
        div.style.top = `${Math.random() * window.innerHeight}px`;
        const size = 2 + Math.random() * 6;
        div.style.width = `${size}px`;
        div.style.height = `${size}px`;
        div.velY = 0.5 + Math.random() * 2;       // velocidad vertical
        div.velX = -0.5 + Math.random();          // leve movimiento horizontal
        particulas.push(div);
        particulasContainer.appendChild(div);
    }
    requestAnimationFrame(animarParticulas);
}

function animarParticulas() {
    particulas.forEach(p => {
        let x = parseFloat(p.style.left);
        let y = parseFloat(p.style.top);

        x += p.velX;
        y += p.velY;

        // Reiniciar cuando salen de pantalla
        if (y > window.innerHeight) y = -10;
        if (x > window.innerWidth) x = 0;
        if (x < 0) x = window.innerWidth;

        p.style.top = y + 'px';
        p.style.left = x + 'px';
    });
    requestAnimationFrame(animarParticulas);
}

// Ajustar partículas si se cambia el tamaño de la ventana
window.addEventListener('resize', () => {
    particulas.forEach(p => {
        p.style.left = `${Math.random() * window.innerWidth}px`;
    });
});

// === Gráfico que proporcionaste ===
function iniciarGrafico() {
    with (Math) C = cos, S = sin, P = pow, R = random;
    let f = 500, h = -250;
    let m = [];
    function p(a, b, c) {
        if (c > 60) return [S(a * 7) * (13 + 5 / (.2 + P(b * 4, 4))) - S(b) * 50, b * f + 50, 625 + C(a * 7) * (13 + 5 / (.2 + P(b * 4, 4))) + b * 400, a * 1 - b / 2, a];
        let A = a * 2 - 1, B = b * 2 - 1;
        if (A * A + B * B < 1) {
            if (c > 37) {
                let n = (j = c & 1) ? 6 : 4;
                let o = .5 / (a + .01) + C(b * 125) * 3 - a * 300;
                let w = b * h;
                return [o * C(n) + w * S(n) + j * 610 - 390, o * S(n) - w * C(n) + 550 - j * 350, 1180 + C(B + A) * 99 - j * 300, .4 - a * .1 + P(1 - B * B, -h * 6) * .15 - a * b * .4 + C(a + b) / 5 + P(C((o * (a + 1) + (B > 0 ? w : -w)) / 25), 30) * .1 * (1 - B * B), o / 1e3 + .7 - o * w * 3e-6];
            }
            if (c > 32) {
                c = c * 1.16 - .15;
                let o = a * 45 - 20, w = b * b * h;
                let z = o * S(c) + w * C(c) + 620;
                return [o * C(c) - w * S(c), 28 + C(B * .5) * 99 - b * b * b * 60 - z / 2 - h, z, (b * b * .3 + P((1 - (A * A)), 7) * .15 + .3) * b, b * .7];
            }
            let o = A * (2 - b) * (80 - c * 2);
            let w = 99 - C(A) * 120 - C(b) * (-h - c * 4.9) + C(P(1 - b, 7)) * 50 + c * 2;
            let z = o * S(c) + w * C(c) + 700;
            return [o * C(c) - w * S(c), B * 99 - C(P(b, 7)) * 50 - c / 3 - z / 1.35 + 450, z, (1 - b / 1.2) * .9 + a * .1, P((1 - b), 20) / 4 + .05];
        }
    }
    setInterval(() => {
        for (let i = 0; i < 1000; i++) {
            let s = p(R(), R(), i % 46 / .74);
            if (!s) continue;
            let z = s[2];
            let x = ~~(s[0] * f / z - h);
            let y = ~~(s[1] * f / z - h);
            if (!m[y * f + x] || m[y * f + x] > z) {
                m[y * f + x] = z;
                ctx.fillStyle = `rgb(${~(s[3] * h)},${~(s[4] * h)},${~(s[3] * s[3] * -80)})`;
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }, 0);
}
