export async function getSvgSrc(path) {
  const svgs = import.meta.glob('../icons/*/*', {
    import: 'default',
    as: 'raw'
  });
  const svg = await svgs[`../icons/${path}.svg`]();
  return svg.replace(
    '<svg',
    '<svg class="h-8 max-w-full pointer-events-none mb-3 self-start w-auto"'
  );
}
