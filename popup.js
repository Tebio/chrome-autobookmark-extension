// AutoBookmark - Popup Logic

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const enableToggle = document.getElementById('enableToggle');
  const triggerHeight = document.getElementById('triggerHeight');
  const valTrigger = document.getElementById('valTrigger');
  const hideDelay = document.getElementById('hideDelay');
  const valDelay = document.getElementById('valDelay');
  const openInNewTab = document.getElementById('openInNewTab');
  const showFavicons = document.getElementById('showFavicons');
  const showBookmarkUrl = document.getElementById('showBookmarkUrl');
  const pinToggleBtn = document.getElementById('pinToggleBtn');
  const segmentBtns = document.querySelectorAll('.segment-btn');
  const resetDefaultsBtn = document.getElementById('resetDefaultsBtn');
  const statusDot = document.querySelector('.status-dot');
  const statusText = document.getElementById('statusText');

  // Search elements
  const popupSearchInput = document.getElementById('popupSearchInput');
  const popupSearchResults = document.getElementById('popupSearchResults');

  let currentSettings = {};

  const DEFAULT_SETTINGS = {
    enabled: true,
    triggerHeight: 8,
    hideDelay: 450,
    theme: 'edge',
    openInNewTab: false,
    showFavicons: true,
    showBookmarkUrl: false,
    hideTooltips: true,
    barPosition: 'top',
    pinned: false
  };

  // Helper: Favicon URL
  function getFaviconUrl(url) {
    if (!url) return '';
    try {
      const extId = chrome.runtime.id;
      return `chrome-extension://${extId}/_favicon/?pageUrl=${encodeURIComponent(url)}&size=32`;
    } catch {
      return `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(url)}&sz=32`;
    }
  }

  function getCleanDisplayUrl(rawUrl, maxLen = 75) {
    if (!rawUrl) return '';
    try {
      const u = new URL(rawUrl);
      const trackingParams = [
        'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
        'gclid', 'gbraid', 'wbraid', 'gad_source', 'gclsrc', 'fbclid', 'msclkid',
        'is_sa', 'android-min-version', 'ios-min-version', 'campaign_id', 'pt', 'mt', 'ct',
        'gad_campaignid', 'mc_cid', 'mc_eid', 'ref_src'
      ];
      trackingParams.forEach(p => u.searchParams.delete(p));
      Array.from(u.searchParams.keys()).forEach(key => {
        if (key.toLowerCase().startsWith('utm_')) u.searchParams.delete(key);
      });

      let display = u.origin + (u.pathname === '/' ? '' : u.pathname);
      const cleanSearch = u.search;
      if (cleanSearch && cleanSearch.length > 1) {
        if (cleanSearch.length > 32) {
          display += cleanSearch.substring(0, 29) + '...';
        } else {
          display += cleanSearch;
        }
      }

      if (display.length > maxLen) {
        return display.substring(0, maxLen - 3) + '...';
      }
      return display;
    } catch {
      if (rawUrl.length > maxLen) {
        return rawUrl.substring(0, maxLen - 3) + '...';
      }
      return rawUrl;
    }
  }

  function formatBookmarkTooltip(title, url) {
    const cleanUrl = getCleanDisplayUrl(url);
    if (!title || title.trim() === 'Untitled' || title.trim() === '') {
      return cleanUrl;
    }
    return `${title.trim()}\n${cleanUrl}`;
  }

  // Load Settings directly from chrome.storage
  chrome.storage.sync.get('settings', (data) => {
    if (chrome.runtime.lastError) {
      console.warn('AutoBookmark storage load warning:', chrome.runtime.lastError.message);
      currentSettings = Object.assign({}, DEFAULT_SETTINGS);
    } else {
      currentSettings = Object.assign({}, DEFAULT_SETTINGS, data?.settings || {});
    }
    renderSettings(currentSettings);
  });

  function renderSettings(s) {
    enableToggle.checked = !!s.enabled;
    updateStatus(s.enabled);

    triggerHeight.value = s.triggerHeight || 8;
    valTrigger.textContent = `${s.triggerHeight || 8}px`;

    hideDelay.value = s.hideDelay || 450;
    valDelay.textContent = `${s.hideDelay || 450}ms`;

    openInNewTab.checked = !!s.openInNewTab;
    showFavicons.checked = s.showFavicons !== false;
    const shouldShowUrl = s.showBookmarkUrl !== undefined ? !!s.showBookmarkUrl : (s.hideTooltips === false);
    if (showBookmarkUrl) showBookmarkUrl.checked = shouldShowUrl;

    // Theme radio & apply to popup UI
    applyPopupTheme(s.theme || 'edge');
    const themeRadio = document.querySelector(`input[name="theme"][value="${s.theme || 'edge'}"]`);
    if (themeRadio) themeRadio.checked = true;

    // Position
    segmentBtns.forEach(btn => {
      if (btn.dataset.pos === (s.barPosition || 'top')) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    updateAccordionSummaries(s);
  }

  // Accordion Summary Updates
  const sumTiming = document.getElementById('sumTiming');
  const sumAppearance = document.getElementById('sumAppearance');
  const sumBehavior = document.getElementById('sumBehavior');

  function updateAccordionSummaries(s) {
    if (sumTiming) {
      sumTiming.textContent = `${s.triggerHeight || 8}px • ${s.hideDelay || 450}ms`;
    }
    if (sumAppearance) {
      const themeLabels = {
        'edge': 'Edge 原生',
        'dark-glass': '深色玻璃',
        'modern-light': '浅色',
        'amoled': 'AMOLED',
        'chrome': '经典'
      };
      const themeName = themeLabels[s.theme || 'edge'] || 'Edge 原生';
      const posLabels = { 'top': '顶部', 'bottom': '底部', 'left': '左侧', 'right': '右侧' };
      const posName = posLabels[s.barPosition || 'top'] || '顶部';
      sumAppearance.textContent = `${themeName} • ${posName}`;
    }
    if (sumBehavior) {
      const activeOptions = [];
      if (s.openInNewTab) activeOptions.push('新标签页');
      if (s.showFavicons !== false) activeOptions.push('显示图标');
      if (s.showBookmarkUrl) activeOptions.push('悬停地址');
      sumBehavior.textContent = activeOptions.length > 0 ? activeOptions.join(' • ') : '默认';
    }
  }

  // Apply Theme directly to the popup window
  function applyPopupTheme(themeName) {
    const validThemes = ['edge', 'dark-glass', 'modern-light', 'amoled', 'chrome'];
    const theme = validThemes.includes(themeName) ? themeName : 'edge';
    document.body.classList.remove('theme-dark-glass', 'theme-modern-light', 'theme-amoled', 'theme-chrome', 'theme-edge');
    document.body.classList.add(`theme-${theme}`);
  }

  function updateStatus(enabled) {
    if (enabled) {
      statusDot.classList.remove('inactive');
      statusText.textContent = '已在所有网页启用';
    } else {
      statusDot.classList.add('inactive');
      statusText.textContent = 'AutoBookmark 已禁用';
    }
  }

  // Save Settings directly into chrome.storage
  function save() {
    const theme = document.querySelector('input[name="theme"]:checked')?.value || 'edge';
    const activePosBtn = document.querySelector('.segment-btn.active');
    const barPosition = activePosBtn ? activePosBtn.dataset.pos : 'top';

    currentSettings = {
      enabled: enableToggle.checked,
      triggerHeight: parseInt(triggerHeight.value, 10) || 8,
      hideDelay: parseInt(hideDelay.value, 10) || 450,
      theme: theme,
      barPosition: barPosition,
      openInNewTab: openInNewTab.checked,
      showFavicons: showFavicons.checked,
      showBookmarkUrl: showBookmarkUrl ? showBookmarkUrl.checked : false,
      hideTooltips: showBookmarkUrl ? !showBookmarkUrl.checked : true
    };

    updateStatus(currentSettings.enabled);
    applyPopupTheme(theme);
    updateAccordionSummaries(currentSettings);

    chrome.storage.sync.set({ settings: currentSettings }, () => {
      if (chrome.runtime.lastError) {
        console.warn('AutoBookmark storage save warning:', chrome.runtime.lastError.message);
      }
    });
  }

  // Accordion Expand/Collapse Interaction
  const accordionItems = document.querySelectorAll('.accordion-item');
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', (e) => {
      e.preventDefault();
      const currentItem = header.closest('.accordion-item');
      if (!currentItem) return;
      const isOpen = currentItem.classList.contains('open');

      accordionItems.forEach(item => {
        if (item !== currentItem) item.classList.remove('open');
      });

      currentItem.classList.toggle('open', !isOpen);
    });
  });

  // Input Listeners
  enableToggle.addEventListener('change', save);

  triggerHeight.addEventListener('input', () => {
    valTrigger.textContent = `${triggerHeight.value}px`;
    if (sumTiming) sumTiming.textContent = `${triggerHeight.value}px • ${hideDelay.value}ms`;
  });
  triggerHeight.addEventListener('change', save);

  hideDelay.addEventListener('input', () => {
    valDelay.textContent = `${hideDelay.value}ms`;
    if (sumTiming) sumTiming.textContent = `${triggerHeight.value}px • ${hideDelay.value}ms`;
  });
  hideDelay.addEventListener('change', save);

  openInNewTab.addEventListener('change', save);
  showFavicons.addEventListener('change', save);
  if (showBookmarkUrl) showBookmarkUrl.addEventListener('change', save);

  document.querySelectorAll('input[name="theme"]').forEach(radio => {
    radio.addEventListener('change', () => {
      applyPopupTheme(radio.value);
      save();
    });
  });

  segmentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      segmentBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      save();
    });
  });

  // Pin Toggle Button
  pinToggleBtn.addEventListener('click', async () => {
    try {
      const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (activeTab && activeTab.id && activeTab.url && !activeTab.url.startsWith('chrome://') && !activeTab.url.startsWith('edge://')) {
        await chrome.tabs.sendMessage(activeTab.id, { type: 'TOGGLE_PIN' }).catch(() => {});
      }
    } catch (e) {}
    window.close();
  });

  // Reset Defaults
  resetDefaultsBtn.addEventListener('click', () => {
    currentSettings = Object.assign({}, DEFAULT_SETTINGS);
    renderSettings(currentSettings);
    applyPopupTheme(currentSettings.theme);
    save();
  });

  // Popup Search using chrome.bookmarks directly
  popupSearchInput.addEventListener('input', () => {
    const q = popupSearchInput.value.trim().toLowerCase();
    if (!q) {
      popupSearchResults.classList.remove('active');
      popupSearchResults.innerHTML = '';
      return;
    }

    try {
      chrome.bookmarks.search(q, (results) => {
        if (chrome.runtime.lastError) {
          popupSearchResults.innerHTML = '<div style="padding:8px;font-size:11px;color:#64748b;text-align:center;">搜索出错</div>';
          popupSearchResults.classList.add('active');
          return;
        }

        const links = (results || []).filter(item => item.url).slice(0, 10);
        if (links.length === 0) {
          popupSearchResults.innerHTML = '<div style="padding:8px;font-size:11px;color:#64748b;text-align:center;">未找到书签</div>';
          popupSearchResults.classList.add('active');
          return;
        }

        popupSearchResults.innerHTML = '';
        links.forEach(item => {
          const a = document.createElement('a');
          a.className = 'search-item';
          a.href = item.url;
          const isShowUrl = currentSettings.showBookmarkUrl !== undefined
            ? currentSettings.showBookmarkUrl
            : (currentSettings.hideTooltips === false);
          if (isShowUrl) {
            a.title = formatBookmarkTooltip(item.title, item.url);
          }

          const img = document.createElement('img');
          img.src = getFaviconUrl(item.url);
          img.onerror = () => {
            img.src = `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(item.url)}&sz=32`;
          };
          a.appendChild(img);

          const title = document.createElement('span');
          title.className = 'search-item-title';
          title.textContent = item.title || item.url;
          a.appendChild(title);

          a.addEventListener('click', (e) => {
            e.preventDefault();
            chrome.tabs.create({ url: item.url });
            window.close();
          });

          popupSearchResults.appendChild(a);
        });
        popupSearchResults.classList.add('active');
      });
    } catch (err) {
      console.warn('Bookmarks search error:', err);
    }
  });

  // GitHub Release Version & Update Checker
  function initVersionChecker() {
    const manifestVersion = chrome.runtime.getManifest()?.version || '';
    const currentV = manifestVersion ? `v${manifestVersion}` : '';

    const headerBadge = document.getElementById('headerVersionBadge');
    const currentPill = document.getElementById('currentVersionPill');
    const statusText = document.getElementById('versionStatusText');
    const actionBtn = document.getElementById('versionActionBtn');

    const sumAbout = document.getElementById('sumAbout');
    if (headerBadge) headerBadge.textContent = currentV;
    if (currentPill) currentPill.textContent = currentV;
    if (sumAbout) sumAbout.textContent = currentV;

    function compareSemVer(vA, vB) {
      const cleanA = (vA || '').replace(/^v/, '').split('.').map(n => parseInt(n, 10) || 0);
      const cleanB = (vB || '').replace(/^v/, '').split('.').map(n => parseInt(n, 10) || 0);
      const len = Math.max(cleanA.length, cleanB.length);
      for (let i = 0; i < len; i++) {
        const a = cleanA[i] || 0;
        const b = cleanB[i] || 0;
        if (a > b) return 1;
        if (a < b) return -1;
      }
      return 0;
    }

    async function checkLatestRelease() {
      try {
        const res = await fetch('https://api.github.com/repos/Tebio/chrome-autobookmark-extension/releases/latest', {
          headers: { 'Accept': 'application/vnd.github.v3+json' }
        });

        if (!res.ok) {
          if (statusText) statusText.textContent = '已同步至 GitHub 最新版';
          return;
        }

        const data = await res.json();
        const latestTag = data.tag_name || currentV;
        const releaseUrl = data.html_url || 'https://github.com/Tebio/chrome-autobookmark-extension/releases';

        if (actionBtn) actionBtn.href = releaseUrl;

        const cmp = compareSemVer(latestTag, currentV);
        if (cmp > 0) {
          if (statusText) {
            statusText.textContent = `🚀 新版本 ${latestTag} 可用`;
            statusText.className = 'version-status update-available';
          }
          if (actionBtn) {
            actionBtn.textContent = '更新 ↗';
            actionBtn.classList.add('has-update');
            actionBtn.title = `从 GitHub Releases 获取 ${latestTag}`;
          }
        } else {
          if (statusText) {
            statusText.textContent = '🟢 已是最新版本';
            statusText.className = 'version-status up-to-date';
          }
          if (actionBtn) {
            actionBtn.textContent = '发布 ↗';
            actionBtn.classList.remove('has-update');
            actionBtn.title = '在 GitHub 查看发布说明';
          }
        }
      } catch (err) {
        if (statusText) statusText.textContent = `GitHub 版本 ${currentV}`;
      }
    }

    checkLatestRelease();
  }

  initVersionChecker();

});
