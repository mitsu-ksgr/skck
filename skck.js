(() => {
  function shuffle(a) {
    let i = a.length;
    while (i != 0) {
      const k = Math.floor(Math.random() * i--);
      [a[i], a[k]] = [a[k], a[i]];
    }
    return a;
  }

  function tweet_url(s) {
    return `https://twitter.com/intent/tweet?text=${encodeURI(s)}`;
  }

  function draw(strs) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "600 120px Hiragino Kaku Gothic Pro";

    /*
            -webkit-linear-gradient(
              left,
              #2e4f8b 0%, #3e589d 35%,
              #8f619b 60%, #d0718f 70%);
            linear-gradient(
              90deg,
              #2e4f8b 0%,
              #3e589d 35%,
              #8f619b 60%,
              #d0718f 60%)
              */

    // Setup gradient.
    const grad = ctx.createLinearGradient(
      0, canvas.height / 2,
      canvas.width, canvas.height / 2);
    [
      [0.00, "rgb(46, 79, 139)"],
      [0.35, "rgb(62, 88, 157)"],
      [0.55, "rgb(143, 97, 155)"],
      [0.60, "rgb(208, 113, 143)"]
    ].forEach((gc) => {
      grad.addColorStop(gc[0], gc[1]);
    });
    ctx.fillStyle = grad;
    //ctx.translate(0.5, 0.5);

    // Draw
    strs.forEach((s, idx) => {
      const y = 150 * (idx + 1);
      const x = (canvas.width - ctx.measureText(s).width) / 2;
      ctx.fillText(s, x, y);
    });
  }

  document.getElementById("btn").addEventListener('click', () => {
    const skck = "スーパーキラキラカラフルクッキリ";
    const ret = shuffle(skck.split("")).join("");
    const strs = [ret.substring(0, 8), ret.substring(8), "ディスプレイ。"];

    document.getElementById("result").style.visibility = "visible";
    document.getElementById("result-text").innerHTML = strs.join("<br>");
    document.getElementById("btn-tweet").addEventListener('click', () => {
      window.open(tweet_url(strs.join("\n")), "_blank");
    });
    draw(strs);
  });
})();

