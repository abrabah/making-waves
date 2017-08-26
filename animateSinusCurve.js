const range = (size) => [...Array(size).keys()];
const LUMIOSITY_VALUE = [...range(40).map(i => i + 40), ...range(40).map(i => 80 - i)];

const MAX_TIME_STEP = 100;

class SinusCurve {
    constructor(canvasWidth, canvasHeight, offset, wavelength, amplitude) {
        this.canvasWidth = canvasWidth;
        this.scale = canvasHeight / 2;
        this.offset = offset;
        this.amplitude = amplitude;
        this.wavelength = wavelength;
        this.smoothing = 1;

        this.HSL_H = Math.random() * 360;
        this.HSL_S = 80;
        this.HSL_L = 40;
    }

    height(timestep, x) {
        return this.scale + this.amplitude * Math.sin(timestep + x + this.offset);
    }

    draw(ctx, timestep) {


        this.HSL_L = LUMIOSITY_VALUE[Math.floor((this.offset +timestep)* 10 ) % LUMIOSITY_VALUE.length];
        ctx.strokeStyle = `hsl(${this.HSL_H}, ${this.HSL_S}%, ${this.HSL_L}%)`;

        ctx.beginPath();
        ctx.moveTo(0, this.height(timestep, 0));

        for (let x = 0; x < (this.canvasWidth + this.wavelength); x++) {
            ctx.lineTo(x, this.height(timestep, x / this.wavelength));
        }
        ctx.stroke();
        ctx.closePath();
    }
};

function animateSinusCurve(timestep, speed, ctx, width, height, sineCurves) {
    ctx.clearRect(0, 0, width, height);
    sineCurves.forEach(sineCurve => sineCurve.draw(ctx, timestep));
    requestAnimationFrame(animateSinusCurve.bind(null, timestep > MAX_TIME_STEP ? 0 : timestep + speed, speed, ctx, width, height, sineCurves));
};