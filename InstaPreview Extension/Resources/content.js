(() => {
  const insert = (type, result) => {
    const rows = document.querySelectorAll("div._ac7v");
    let images;
    let clone = document.querySelector("div._ac7v > div._aabd").cloneNode();
    update(type, result, clone);
    for (let row of rows) {
      row.prepend(clone);
      images = row.querySelectorAll("div._aabd");
      clone = images[images.length - 1];
      clone.remove();
    }
    hasPreview = true;
  };

  const update = (
    type,
    result,
    elem = document.querySelector("div._ac7v > div._aabd")
  ) => {
    const base64 = `data:${type};base64,${btoa(result)}`;
    elem.innerHTML = "";
    elem.style.background = `url(${base64})`;
    elem.style.backgroundPosition = "center center";
    elem.style.backgroundSize = "cover";
  };

  const handler = (event) => {
    const { files } = event.srcElement;
    const file = files[0];
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) =>
      hasPreview
        ? update(file.type, event.target.result)
        : insert(file.type, event.target.result);
  };

  const load = () => {
    const menu = document.querySelector("div._aa-g._ac_s");
    if (menu) {
      const tab = document.createElement("input");
      tab.setAttribute("type", "file");
      tab.onchange = handler;
      menu.appendChild(tab);
      loaded = true;
    }
    if (attempts === 10 || loaded) {
      clearInterval(interval);
    } else {
      attempts++;
    }
  };

  let loaded = false;
  let attempts = 0;
  let hasPreview = false;
  const interval = setInterval(load, 500);
})();
