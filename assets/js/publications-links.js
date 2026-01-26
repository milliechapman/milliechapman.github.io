(async function(){
  const RAW = 'https://raw.githubusercontent.com/milliechapman/academic-kickstart/master/content/publications.md';
  try{
    const res = await fetch(RAW);
    if(!res.ok) return;
    const text = await res.text();
    // Extract PDF links in order
    const pdfs = Array.from(text.matchAll(/\[PDF\]\(([^)]+)\)/g)).map(m => m[1]);
    if(!pdfs.length) return;

    // Normalize DOIs that start with 'doi:'
    const normalize = (u) => u.startsWith('doi:') ? ('https://doi.org/' + u.slice(4)) : u;
    const pdfsNorm = pdfs.map(normalize);

    // Find all anchors inside publications section that point to the publications page
    const container = document.getElementById('publications');
    if(!container) return;
    const anchors = Array.from(container.querySelectorAll('a[href="https://milliechapman.info/publications/"]'));
    if(!anchors.length) return;

    // The source list is ascending (1..N), but the page lists reversed (N..1), so reverse the pdfs to match DOM order
    const pdfsForPage = pdfsNorm.slice().reverse();

    anchors.forEach((a, i) => {
      const link = pdfsForPage[i] || pdfsForPage[pdfsForPage.length-1];
      a.setAttribute('href', link);
      a.setAttribute('target','_blank');
      a.setAttribute('rel','noopener');
      a.textContent = 'PDF';
    });
  }catch(e){
    console.error('Failed to load publication PDF links', e);
  }
})();
