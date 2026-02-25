// Mini-gallery for living card on catalog (like living-nou2.html)
document.addEventListener('DOMContentLoaded', function() {
	var gallery = document.querySelector('.living-mini-gallery');
	if (gallery) {
		var images = gallery.querySelectorAll('.living-gallery-thumb img');
		var thumbs = gallery.querySelectorAll('.mini-thumb');
		var prevBtn = gallery.querySelector('.gallery-nav.prev');
		var nextBtn = gallery.querySelector('.gallery-nav.next');
		var current = 0;
		function show(idx) {
			images.forEach(function(img, i) {
				img.style.display = (i === idx) ? '' : 'none';
			});
			thumbs.forEach(function(t, i) {
				t.classList.toggle('active', i === idx);
			});
			current = idx;
		}
		thumbs.forEach(function(thumb, idx) {
			thumb.addEventListener('click', function(e) {
				show(idx);
			});
		});
		if (prevBtn && nextBtn) {
			prevBtn.addEventListener('click', function() {
				show((current - 1 + images.length) % images.length);
			});
			nextBtn.addEventListener('click', function() {
				show((current + 1) % images.length);
			});
		}
		gallery.addEventListener('keydown', function(e) {
			if (e.key === 'ArrowLeft') show((current - 1 + images.length) % images.length);
			if (e.key === 'ArrowRight') show((current + 1) % images.length);
		});
		show(0);
	}
});
// Mini-gallery for living card on catalog (match living-nou2.html style)
document.addEventListener('DOMContentLoaded', function() {
	var gallery = document.querySelector('.living-mini-gallery');
	if (gallery) {
		var images = gallery.querySelectorAll('.living-gallery-thumb img');
		var thumbs = gallery.querySelectorAll('.mini-thumb');
		var prevBtn = gallery.querySelector('.gallery-nav.prev');
		var nextBtn = gallery.querySelector('.gallery-nav.next');
		var current = 0;
		function show(idx) {
			images.forEach(function(img, i) {
				img.style.display = (i === idx) ? '' : 'none';
			});
			thumbs.forEach(function(t, i) {
				t.classList.toggle('active', i === idx);
			});
			current = idx;
		}
		thumbs.forEach(function(thumb, idx) {
			thumb.addEventListener('click', function(e) {
				show(idx);
			});
		});
		if (prevBtn && nextBtn) {
			prevBtn.addEventListener('click', function() {
				show((current - 1 + images.length) % images.length);
			});
			nextBtn.addEventListener('click', function() {
				show((current + 1) % images.length);
			});
		}
		gallery.addEventListener('keydown', function(e) {
			if (e.key === 'ArrowLeft') show((current - 1 + images.length) % images.length);
			if (e.key === 'ArrowRight') show((current + 1) % images.length);
		});
		show(0);
	}
});
const whatsappConfig = {
	number: '40712345678',
	message: 'Salut, sunt interesat de mobilierul LA-Tâmplar. Aș vrea mai multe detalii.'
};

const whatsappButtons = document.querySelectorAll('[data-whatsapp]');

const openWhatsApp = () => {
	const url = `https://wa.me/${whatsappConfig.number}?text=${encodeURIComponent(whatsappConfig.message)}`;
	window.open(url, '_blank');
};

whatsappButtons.forEach((button) => {
	button.addEventListener('click', openWhatsApp);
});

const menuToggle = document.querySelector('#menuToggle');
const navLinks = document.querySelector('#nav-links');

if (menuToggle && navLinks) {
	menuToggle.addEventListener('click', () => {
		const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
		menuToggle.setAttribute('aria-expanded', (!expanded).toString());
		navLinks.classList.toggle('open');
	});

	navLinks.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', () => {
			navLinks.classList.remove('open');
			menuToggle.setAttribute('aria-expanded', 'false');
		});
	});
}

const contactForms = document.querySelectorAll('.contact-form');

const handleFormSubmit = async (event) => {
	event.preventDefault();
	const form = event.currentTarget;
	const submitButton = form.querySelector('button[type="submit"]');
	const statusEl = form.querySelector('.form-status');
	if (!submitButton) {
		return;
	}
	const originalLabel = submitButton.innerHTML;
	submitButton.disabled = true;
	if (statusEl) {
		statusEl.textContent = 'Se trimite mesajul...';
		statusEl.classList.remove('error');
	}
	const formData = new FormData(form);
	try {
		const response = await fetch(form.action, {
			method: form.method || 'POST',
			body: formData,
			headers: {
				Accept: 'application/json'
			}
		});
		if (response.ok) {
			if (statusEl) {
				statusEl.textContent = 'Mesaj trimis! Îți răspundem în cel mai scurt timp.';
			}
			form.reset();
		} else {
			const data = await response.json().catch(() => null);
			const errorMessage = data?.errors?.[0]?.message || 'A apărut o eroare. Reîncearcă mai târziu.';
			if (statusEl) {
				statusEl.textContent = errorMessage;
				statusEl.classList.add('error');
			}
		}
	} catch (error) {
		if (statusEl) {
			statusEl.textContent = 'Nu am putut trimite mesajul. Verifică conexiunea.';
			statusEl.classList.add('error');
		}
	} finally {
		submitButton.disabled = false;
		submitButton.innerHTML = originalLabel;
	}
};

if (contactForms.length) {
	contactForms.forEach((form) => {
		form.addEventListener('submit', handleFormSubmit);
	});
}

const categoryCards = document.querySelectorAll('.category-card');
const productCards = document.querySelectorAll('.product-card');

let activeCategory = 'all';
let maxPrice = 75000;
let activeFinisaj = 'all';

const applyAllFilters = () => {
	if (!productCards.length) return;
	productCards.forEach((card) => {
		const catMatch = activeCategory === 'all' || card.dataset.category === activeCategory;
		const price = parseInt(card.dataset.price) || 0;
		const priceMatch = price <= maxPrice;
		const visible = catMatch && priceMatch;
		card.style.display = visible ? '' : 'none';
		card.setAttribute('aria-hidden', visible ? 'false' : 'true');
	});
};

const filterProducts = (category) => {
	activeCategory = category;
	applyAllFilters();
};

if (categoryCards.length) {
	categoryCards.forEach((card) => {
		card.addEventListener('click', () => {
			categoryCards.forEach((item) => item.classList.remove('active'));
			card.classList.add('active');
			const category = card.dataset.category || 'all';
			filterProducts(category);
		});
	});
	const initialCategory = document.querySelector('.category-card.active');
	filterProducts(initialCategory?.dataset.category || 'all');
} else {
	filterProducts('all');
}

// When a category card is clicked on small screens, smooth-scroll to the catalog
if (categoryCards.length) {
	categoryCards.forEach((card) => {
		card.addEventListener('click', () => {
			try {
				const catalogEl = document.querySelector('#catalog');
				if (catalogEl && window.innerWidth <= 860) {
					// Close mobile nav if open
					const navLinks = document.querySelector('#nav-links');
					const menuToggle = document.querySelector('#menuToggle');
					if (navLinks && menuToggle) {
						navLinks.classList.remove('open');
						menuToggle.setAttribute('aria-expanded', 'false');
					}
					catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}
			} catch (e) {
				// ignore
			}
		});
	});
}

// Filters UI removed — related JS also removed

// Generic detail-gallery handler: enables prev/next and thumbnail clicks
document.addEventListener('DOMContentLoaded', function() {
	var detailGalleries = document.querySelectorAll('.detail-gallery');
	detailGalleries.forEach(function(gallery) {
		var mainFigure = gallery.querySelector('figure img');
		var thumbs = gallery.querySelectorAll('.gallery-thumbs img');
		var prevBtn = gallery.querySelector('.gallery-nav.prev');
		var nextBtn = gallery.querySelector('.gallery-nav.next');
		if (!mainFigure || thumbs.length === 0) return;
		var current = 0;
		function show(i) {
			current = (i + thumbs.length) % thumbs.length;
			var src = thumbs[current].getAttribute('src');
			var alt = thumbs[current].getAttribute('alt') || mainFigure.getAttribute('alt') || '';
			mainFigure.setAttribute('src', src);
			mainFigure.setAttribute('alt', alt);
			thumbs.forEach(function(t, idx) { t.classList.toggle('active', idx === current); });
		}
		thumbs.forEach(function(t, idx) {
			t.addEventListener('click', function() { show(idx); });
		});
		if (prevBtn) prevBtn.addEventListener('click', function() { show(current - 1); });
		if (nextBtn) nextBtn.addEventListener('click', function() { show(current + 1); });
		// keyboard support when gallery focused
		gallery.setAttribute('tabindex', '0');
		gallery.addEventListener('keydown', function(e) {
			if (e.key === 'ArrowLeft') show(current - 1);
			if (e.key === 'ArrowRight') show(current + 1);
		});
		show(0);
	});
});
