// chrome extension setup
chrome.extension.sendMessage({}, function (response) {
	// wait until document is ready
	var readyStateCheckInterval = setInterval(function () {
		if (document.readyState === 'complete') {
			// clear loop once page is loaded
			clearInterval(readyStateCheckInterval);
			// cache build elements
			const postElems = document.getElementsByClassName('KL4Bh');
			let btnContainerElem = document.querySelector('.fx7hk');
			// cache build vars 
			let postImages = [];
			// get all existing post images
			for (let post of postElems) {
				imgSrc = post.childNodes[0].getAttribute('src');
				postImages.push(imgSrc);
			}
			// attach btn to insta ui
			function attachBtn() {
				// add preview btn
				btnContainerElem.innerHTML += `
					<a class="_9VEo1" id="preview-btn">
						<input type="file" id="preview-image" style="display: none">
						<label for="preview-image" style="cursor: pointer; margin-left: 5px; color: #6dc993;">PREVIEW</label>
					</a>
				`;
				// event listener for preview btn 
				document.getElementById('preview-image').addEventListener('change', function () {
					var file = this.files[0];
					var reader = new FileReader();
					reader.onloadend = function () {
						insertImage(reader.result);
					}
					if (file) reader.readAsDataURL(file);
				});
			}
			if (btnContainerElem) attachBtn();
			document.onclick = function () {
				btnContainerElem = document.querySelector('.fx7hk');
				let previewImageBtn = document.getElementById('preview-image');
				if (btnContainerElem && !previewImageBtn) {
					attachBtn();
				} else {
					let x = 0;
					let retry = setInterval(function () {
						x++;
						btnContainerElem = document.querySelector('.fx7hk');
						let previewImageBtn = document.getElementById('preview-image');
						if (x === 30 || previewImageBtn) clearInterval(retry);
						else if (btnContainerElem && !previewImageBtn) attachBtn();
					}, 50);
				}
			}
			// place image into current layout
			function insertImage(image) {
				// loop over each post in feed
				for (let x = 0, max = postElems.length; x < max; x++) {
					var elem = postElems[x].childNodes[0];
					if (!x) { // insert user image into first post
						elem.setAttribute('src', image);
						elem.setAttribute('srcset', image);
					} else { // shift over the rest of images
						elem.setAttribute('src', postImages[x - 1]);
						elem.setAttribute('srcset', postImages[x - 1]);
					}
				}
				// resize
				var tmp = new Image();
				tmp.onload = function () {
					var height = tmp.height,
						width = tmp.width,
						elem = postElems[0].childNodes[0],
						container = postElems[0];
					elem.style.marginLeft = '0px';
					elem.style.marginTop = '0px';
					if (height > width) {
						elem.style.width = '100%';
						elem.style.height = 'auto';
						var margin = (elem.offsetHeight - container.offsetHeight) / 2;
						elem.style.marginTop = '-' + margin + 'px';
					} else {
						elem.style.width = 'auto';
						elem.style.height = '100%';
						var margin = (elem.offsetWidth - container.offsetWidth) / 2;
						elem.style.marginLeft = '-' + margin + 'px';
					}
				}
				tmp.src = image;
			}
		}
	}, 10);
});