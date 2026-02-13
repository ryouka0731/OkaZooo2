const CACHE_VERSION = 'v1';
const STATIC_CACHE = `okazooo-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `okazooo-dynamic-${CACHE_VERSION}`;

// キャッシュするアプリのコアファイル
const STATIC_ASSETS = [
  '/',
  '/index.html',
];

// キャッシュしないURLのパターン（外部API・動画・Supabase）
const BYPASS_PATTERNS = [
  /supabase\.co/,
  /dmm\.co\.jp/,
  /litevideo/,
  /chrome-extension/,
  /newrelic/,
];

// ★ install: コアファイルをキャッシュして即座にアクティベート
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// ★ activate: 古いバージョンのキャッシュを削除
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map(key => {
            console.log('[SW] deleting old cache:', key);
            return caches.delete(key);
          })
      )
    )
  );
  clients.claim();
});

// ★ fetch: リクエストの種類によって戦略を使い分ける
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // 外部API・動画はキャッシュせずそのまま通す
  if (BYPASS_PATTERNS.some(pattern => pattern.test(request.url))) {
    return;
  }

  // GETリクエスト以外はそのまま通す
  if (request.method !== 'GET') {
    return;
  }

  // ナビゲーション（ページ遷移）: Network first → fallback to cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(STATIC_CACHE).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // 静的アセット（JS/CSS/画像）: Cache first → fallback to network
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => cache.put(request, clone));
        }
        return response;
      });
    })
  );
});