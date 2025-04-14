// script.js atualizado

document.addEventListener('DOMContentLoaded', function () {
  // Navbar responsiva
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('toggle');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('toggle');
      });
    });
  }

  // Scroll do header
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('header-scrolled', window.scrollY > 100);
  });

  // Portfólio filtro
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      const filter = this.dataset.filter;
      portfolioItems.forEach(item => {
        item.style.display = (filter === 'all' || item.classList.contains(filter)) ? 'block' : 'none';
        item.style.opacity = (filter === 'all' || item.classList.contains(filter)) ? '1' : '0';
      });
    });
  });

  // Slider depoimentos
  const slider = document.querySelector('.depoimentos-slider');
  const track = document.querySelector('.depoimentos-track');
  const slides = document.querySelectorAll('.depoimento-card');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentSlide = 0;

  function moveToSlide(index) {
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;
    currentSlide = index;
    const slideWidth = slider.clientWidth;
    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
    prevBtn.disabled = (currentSlide === 0);
    nextBtn.disabled = (currentSlide === slides.length - 1);
  }

  function ajustarLarguraSlides() {
    const sliderWidth = slider.clientWidth;
    slides.forEach(slide => {
      slide.style.width = (window.innerWidth < 768) ? `${sliderWidth}px` : '';
    });
    moveToSlide(currentSlide);
  }

  if (slider && track && dots.length) {
    ajustarLarguraSlides();
    window.addEventListener('resize', ajustarLarguraSlides);
    prevBtn.addEventListener('click', () => moveToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => moveToSlide(currentSlide + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => moveToSlide(i)));
  }

  // Máscara telefone
  const telefoneInput = document.getElementById('telefone');
  if (telefoneInput) {
    telefoneInput.addEventListener('input', function () {
      let value = this.value.replace(/\D/g, '');
      if (value.length > 0) {
        if (value.length <= 2) value = `(${value}`;
        else if (value.length <= 7) value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
        else if (value.length <= 11) value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
        else value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
      }
      this.value = value;
    });
  }

  // Formulário WhatsApp e Email
  const whatsappForm = document.getElementById('whatsapp-form');
  const emailBtn = document.getElementById('email-btn');

  function validarCamposObrigatorios() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const servico = document.getElementById('servico').value;
    const mensagem = document.getElementById('mensagem').value.trim();
    return nome && email && servico && mensagem;
  }

  if (whatsappForm) {
    whatsappForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validarCamposObrigatorios()) {
        alert('Preencha todos os campos obrigatórios.');
        return;
      }
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const telefone = document.getElementById('telefone').value;
      const servico = document.getElementById('servico').value;
      const mensagem = document.getElementById('mensagem').value;
      const whatsappNumber = "5511987654321";
      const texto = encodeURIComponent(`Olá! Meu nome é ${nome}. Estou interessado(a) em ${servico}.
Email: ${email}
Telefone: ${telefone}
Mensagem: ${mensagem}`);
      window.open(`https://wa.me/${whatsappNumber}?text=${texto}`, '_blank');
    });
  }

  if (emailBtn) {
    emailBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (!validarCamposObrigatorios()) {
        alert('Preencha todos os campos obrigatórios.');
        return;
      }
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const telefone = document.getElementById('telefone').value;
      const servico = document.getElementById('servico').value;
      const mensagem = document.getElementById('mensagem').value;
      const assunto = encodeURIComponent(`Contato site - ${servico} - ${nome}`);
      const corpo = encodeURIComponent(`Olá, meu nome é ${nome}.\nEstou interessado(a) no serviço de ${servico}.\n\nContato:\nEmail: ${email}\nTelefone: ${telefone}\n\nMensagem:\n${mensagem}`);
      window.location.href = `mailto:contato@lucasmendonca.com.br?subject=${assunto}&body=${corpo}`;
    });
  }

  // Scroll suave para links âncora
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = document.querySelector('.header').offsetHeight;
        const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: position, behavior: 'smooth' });
      }
    });
  });

  // Botão voltar ao topo
  const backToTopBtn = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('show', window.pageYOffset > 300);
  });
});