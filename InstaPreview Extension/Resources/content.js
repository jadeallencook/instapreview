/*
 InstaPreview (Copyright 2020-2022)
 Developed by @jadeallencook
*/

function isProfile() {
    const profile = window.location.href.split('/')[3];
    const array = ['explore', 'direct', 'p'];
    return (profile && array.indexOf(profile) === -1);
}

function render(file) {
    if (isProfile()) {
        const article = document.querySelector('article');
        const rows = document.querySelectorAll('article > div > div > div');
        const posts = document.querySelectorAll('article > div > div > div > div');
        const preview = posts[0].cloneNode(true);
        const element = document.getElementById('insta-preview');
        const image = element ? element : preview.querySelector('img');
        let last;
        image.setAttribute('src', file);
        image.setAttribute('srcset', file);
        if (!element) {
            image.id = 'insta-preview';
            rows[0].prepend(preview);
            for (let row of [...rows]) {
                if (last) row.prepend(last);
                const node = row.children[3];
                node.remove();
                last = node.cloneNode(true);
            }
        }
    } else {
        alert('You must be on a profile to preview a post.');
    }
}

function handler(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => render(reader.result);
    if (file) reader.readAsDataURL(file);
}

(function() {
    const file = document.createElement('input');
    const label = document.createElement('label');
    file.type = 'file';
    file.id = 'insta-file';
    file.addEventListener('change', handler);
    label.id = 'insta-label';
    label.innerText = '📸';
    label.setAttribute('for', 'insta-file');
    document.body.appendChild(file);
    document.body.appendChild(label);
})();
