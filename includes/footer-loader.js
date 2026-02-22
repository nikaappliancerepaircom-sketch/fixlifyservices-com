// Fixlify Footer Loader
(function() {
  var el = document.getElementById('footer-placeholder');
  if (!el) return;
  fetch('/includes/footer.html')
    .then(function(r) { return r.text(); })
    .then(function(html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var nodes = doc.body.childNodes;
      var scripts = [];
      while (nodes.length > 0) {
        var node = document.adoptNode(nodes[0]);
        if (node.nodeName === 'SCRIPT') {
          scripts.push(node.textContent);
        } else {
          el.parentNode.insertBefore(node, el);
        }
      }
      el.parentNode.removeChild(el);
      scripts.forEach(function(code) {
        var s = document.createElement('script');
        s.textContent = code;
        document.body.appendChild(s);
      });
    })
    .catch(function() { el.style.display = 'none'; });
})();
