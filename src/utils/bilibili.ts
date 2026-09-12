/**
 * Utility to extract Bilibili BV ID and generate a clean embed iframe URL.
 * Supports full URLs, URLs with query parameters (e.g. spm_id_from), or direct BV IDs.
 */
export function extractBilibiliBvid(urlOrBvid?: string): string | null {
  if (!urlOrBvid) return null;
  
  // Match BV followed by 10 alphanumeric characters (e.g. BV1Lk1yBaELo)
  const match = urlOrBvid.match(/BV[a-zA-Z0-9]{10}/i);
  if (match) {
    return match[0];
  }
  
  // Check for av numbers as fallback (e.g. av12345678)
  const avMatch = urlOrBvid.match(/av\d+/i);
  if (avMatch) {
    return avMatch[0];
  }
  
  return null;
}

export function getBilibiliEmbedUrl(urlOrBvid?: string, autoplay: boolean = true): string | null {
  const bvid = extractBilibiliBvid(urlOrBvid);
  if (!bvid) return null;

  const autoplayParam = autoplay ? '1' : '0';
  // danmaku=0 disables bullet barrage for clean cinematic viewing
  // high_quality=1 enables highest available resolution
  return `https://player.bilibili.com/player.html?bvid=${bvid}&page=1&autoplay=${autoplayParam}&danmaku=0&high_quality=1&as_wide=1`;
}
