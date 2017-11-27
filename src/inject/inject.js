// chrome extension setup
chrome.extension.sendMessage({}, function (response) {
	// wait until document is ready
	var readyStateCheckInterval = setInterval(function () {
		if (document.readyState === 'complete') {
			// clear loop once page is loaded
			clearInterval(readyStateCheckInterval);
			// cache build elements
			const postContainerElem = document.querySelector('._cmdpi'),
				postElems = document.getElementsByClassName('_4rbun'),
				btnContainerElem = document.querySelector('._2e96w');
			// cache build vars 
			let postImages = [],
				previewImgSrc = '';
			// get all existing post images
			for (let post of postElems) {
				imgSrc = post.childNodes[0].getAttribute('src');
				postImages.push(imgSrc);
			}
			// add preview btn
			previewBtnHTML = '<a class="_t7nuu" id="preview-btn"><div class="">PREVIEW</div></a>';
			btnContainerElem.innerHTML += previewBtnHTML;
			// event listener for preview btn 
			document.getElementById('preview-btn').addEventListener('click', () => {
				previewImgSrc = window.prompt('Enter image link:');
				insertImage();
			});
			// place image into current layout
			function insertImage() {
				// loop over each post in feed
				for (let x = 0, max = postElems.length; x < max; x++) {
					if (!x) { // insert user image into first post
						postElems[x].childNodes[0].setAttribute('src', previewImgSrc);
						postElems[x].childNodes[0].setAttribute('srcset', previewImgSrc);
					} else { // shift over the rest of images
						postElems[x].childNodes[0].setAttribute('src', postImages[x - 1]);
						postElems[x].childNodes[0].setAttribute('srcset', postImages[x - 1]);
					}
				}
			}
		}
	}, 10);
});