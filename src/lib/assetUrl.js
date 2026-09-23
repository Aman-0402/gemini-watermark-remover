// Vite only rewrites asset paths inside index.html for the configured `base`
// (GitHub Pages subpath). Runtime <img src="/assets/..."> strings in JSX are
// NOT rewritten, so they 404 under a non-root base. Use this helper for any
// reference to a file in public/.
export function asset(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
