// Fixlify Footer Loader
(function() {
  var el = document.getElementById('footer-placeholder');
  if (!el) return;
  fetch('/includes/footer.html')
    .then(function(r) { return r.text(); })
    .then(function(html) { el.outerHTML = html; })
    .catch(function() { el.style.display = 'none'; });
})();
