document.addEventListener("DOMContentLoaded", function(event) {

    let time = prompt("How much time We have got ? (min)");

    var canvas = document.createElement('canvas');
    const CanvWidth = 175;
    const CanvHeight = 175;
    canvas.width = CanvWidth;
    canvas.height = CanvHeight;
    var context = canvas.getContext('2d');

    var canvasHolder = document.querySelector('.progressCircle');
    canvasHolder.appendChild(canvas);


    var ctx = document.querySelector('canvas').getContext('2d');
    var start = 1.5 * Math.PI;
    var cw = ctx.canvas.width;
    var ch = ctx.canvas.height;

    var startDate = Date.now() + (time * 60 * 1000);


    function draw() {

        ctx.lineWidth = 16;
        ctx.strokeStyle = "#232c39";
        ctx.beginPath();
        ctx.arc((ctx.canvas.width / 2), (ctx.canvas.height / 2), ((ctx.canvas.width / 2) - 12), 0, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.shadowColor = 'rgba(0,0,0,.1)';
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.arc((ctx.canvas.width / 2), (ctx.canvas.height / 2), ((ctx.canvas.width / 2) - 4), 0, 2 * Math.PI);
        ctx.stroke();
    }

    function RenderProgress(ct, proc) {

        ct.beginPath();
        ct.arc((ctx.canvas.width / 2), (ctx.canvas.height / 2), ((ctx.canvas.width / 2) - 12), start, 2 * Math.PI * (-proc) + start, false);
        ct.stroke();
    }

    function progressRound() {

        ctx.clearRect(0, 0, cw, ch);
        draw();

        ctx.lineWidth = 18;
        ctx.fillStyle = 'white';
        ctx.strokeStyle = "#1076a0";
        ctx.textAlign = 'center';



        var milliseconds = startDate - Date.now();
        var diffDate = new Date(milliseconds);
        var minutes = "00" + diffDate.getMinutes();
        var seconds = "00" + diffDate.getSeconds();
        ctx.font = "19px Montserrat";
        ctx.fillText(minutes.substr(minutes.length - 2) + " min", (cw / 2), (cw / 2) - 10, cw);
        ctx.fillText(seconds.substr(seconds.length - 2) + " sec", (cw / 2), (cw / 2) + 10, cw);

        var proc = milliseconds / (time * 60 * 1000);

        RenderProgress(ctx, proc);

        if (proc <= 0) {
            clearTimeout(drawing);
            ctx.clearRect(0, 0, cw, ch);
            ctx.lineWidth = 18;
            ctx.fillStyle = 'white';
            ctx.strokeStyle = "#1076a0";
            ctx.textAlign = 'center';
            ctx.fillText('Wyniki!', (cw / 2), (ch / 2) + 2, cw);
            ctx.beginPath();
            ctx.arc((ctx.canvas.width / 2), (ctx.canvas.height / 2), ((ctx.canvas.width / 2) - 12), start, 2 * Math.PI * proc + start);
            ctx.stroke();
        }

    }


    var drawing = setInterval(progressRound, 50);
});