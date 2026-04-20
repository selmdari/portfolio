// On mobile, move the TOC to appear right after the At A Glance box.
// On desktop it lives inside .content-layout as a flex sibling of .prose.
const mq = window.matchMedia('(max-width: 700px)');

function positionToc() {
  const toc = document.getElementById('toc-aside');
  const atAGlance = document.querySelector('.at-a-glance');
  const contentLayout = document.querySelector('.content-layout');
  if (!toc || !atAGlance || !contentLayout) return;

  if (mq.matches) {
    atAGlance.insertAdjacentElement('afterend', toc);
  } else if (toc.parentElement !== contentLayout) {
    contentLayout.appendChild(toc);
  }
}

positionToc();
mq.addEventListener('change', positionToc);
