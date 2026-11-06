// Brand directory only. Existing app authentication and API handlers stay authoritative.
export function mountProviders(container, providers, assetBase = new URL('./', import.meta.url)) {
  const fragment = document.createDocumentFragment();
  for (const p of providers) {
    if (!/^[a-z0-9]+$/.test(p.id) || p.logo !== `logos/${p.id}.svg`) throw new Error('Invalid provider asset');
    const url = new URL(p.website); if (url.protocol !== 'https:') throw new Error('HTTPS required');
    const card = document.createElement('a'); card.href = url.href; card.rel = 'noopener noreferrer'; card.target = '_blank';
    const img = document.createElement('img'); img.src = new URL(p.logo, assetBase).href; img.alt = ''; img.width = 24; img.height = 24;
    const label = document.createElement('span'); label.textContent = p.name;
    card.append(img, label); fragment.append(card);
  }
  container.replaceChildren(fragment);
}
