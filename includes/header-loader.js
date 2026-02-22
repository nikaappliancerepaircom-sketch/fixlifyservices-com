// Fixlify Header Loader
(function() {
  var el = document.getElementById('header-placeholder');
  if (!el) return;
  fetch('/includes/header.html')
    .then(function(r) { return r.text(); })
    .then(function(html) { el.outerHTML = html; })
    .catch(function() { el.style.display = 'none'; });
})();
