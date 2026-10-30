// Link each feature in the legend to its matching point on the car.
(() => {
  const image = document.querySelector('.carro-detail-image');
  const tooltip = document.querySelector('.carro-hotspot-tooltip');
  if (!image || !tooltip) return;
  let selected = null;
  document.querySelectorAll('[data-detail]').forEach(button => {
    button.addEventListener('click', () => {
      const key = button.dataset.detail;
      const hotspot = image.querySelector(`[data-detail="${key}"]`);
      const legend = document.querySelector(`.carro-detail-legend [data-detail="${key}"]`);
      const open = selected !== key;
      selected = open ? key : null;
      document.querySelectorAll('[data-detail]').forEach(item => {
        const active = open && item.dataset.detail === key;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      tooltip.hidden = !open;
      if (open) {
        tooltip.textContent = legend.textContent.trim().slice(1).trim();
        tooltip.style.setProperty('--x', hotspot.style.getPropertyValue('--x'));
        tooltip.style.setProperty('--y', hotspot.style.getPropertyValue('--y'));
      }
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    selected = null;
    tooltip.hidden = true;
    document.querySelectorAll('[data-detail]').forEach(item => {
      item.classList.remove('is-active');
      item.setAttribute('aria-pressed', 'false');
    });
  });
})();
