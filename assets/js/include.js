/* ============================================================
   Sauna Research Studies - Include Components & Mobile Menu
   ============================================================ */

(function() {
  'use strict';

  // --- Components base path ---
  var basePath = '';
  var imgPath = 'assets/images/';
  // All pages are at root level, no subfolder adjustment needed

  // --- Load Header ---
  var headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    var xhrHeader = new XMLHttpRequest();
    xhrHeader.open('GET', basePath + 'components/header.html', true);
    xhrHeader.onreadystatechange = function() {
      if (xhrHeader.readyState === 4 && xhrHeader.status === 200) {
        headerPlaceholder.innerHTML = xhrHeader.responseText;
        // Set logo src dynamically based on page location
        var logoImg = document.getElementById('site-logo');
        if (logoImg) {
          logoImg.src = imgPath + 'saunazilla-logo.webp';
        }
        // Initialize mobile menu after header loads
        initMobileMenu();
        // Set active nav link
        setActiveNavLink();
      }
    };
    xhrHeader.send();
  }

  // --- Load Footer ---
  var footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    var xhrFooter = new XMLHttpRequest();
    xhrFooter.open('GET', basePath + 'components/footer.html', true);
    xhrFooter.onreadystatechange = function() {
      if (xhrFooter.readyState === 4 && xhrFooter.status === 200) {
        footerPlaceholder.innerHTML = xhrFooter.responseText;
      }
    };
    xhrFooter.send();
  }

  // --- Mobile Menu Toggle ---
  function initMobileMenu() {
    var toggle = document.getElementById('mobileToggle');
    var nav = document.getElementById('mainNav');
    if (toggle && nav) {
      toggle.addEventListener('click', function() {
        nav.classList.toggle('open');
        toggle.classList.toggle('active');
      });

      // Close menu when clicking a link (mobile)
      var links = nav.querySelectorAll('a');
      links.forEach(function(link) {
        link.addEventListener('click', function() {
          nav.classList.remove('open');
          toggle.classList.remove('active');
        });
      });

      // Handle dropdown toggle on mobile
      var dropdownToggles = document.querySelectorAll('.dropdown-toggle');
      dropdownToggles.forEach(function(dropToggle) {
        dropToggle.addEventListener('click', function(e) {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            var dropdown = this.closest('.dropdown');
            if (dropdown) {
              dropdown.classList.toggle('active');
            }
          }
        });
      });
    }
  }

  // --- Set Active Navigation Link ---
  function setActiveNavLink() {
    var currentPage = window.location.pathname.split('/').pop();
    var links = document.querySelectorAll('.main-nav a');
    links.forEach(function(link) {
      var href = link.getAttribute('href');
      if (href && href.indexOf(currentPage) !== -1 && currentPage !== '') {
        link.classList.add('active');
      }
    });
  }

})();