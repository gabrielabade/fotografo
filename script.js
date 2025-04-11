// Aguardar o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function () {

  // Menu Responsivo
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('toggle');
    });

    // Fechar menu ao clicar em um link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
      item.addEventListener('click', function () {
        navLinks.classList.remove('active');
        hamburger.classList.remove('toggle');
      });
    });
  }

  // Header com scroll
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });

  // Filtro do Portfólio
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function () {
        // Remover classe ativa de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Adicionar classe ativa ao botão clicado
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        // Filtrar itens
        portfolioItems.forEach(item => {
          if (filterValue === 'all' || item.classList.contains(filterValue)) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
            }, 50);
          } else {
            item.style.opacity = '0';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Slider de Depoimentos
  const slider = document.querySelector('.depoimentos-slider');
  const track = document.querySelector('.depoimentos-track');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (slider && track && dots.length > 0 && prevBtn && nextBtn) {
    let currentSlide = 0;
    const slideWidth = slider.clientWidth;
    const slideCount = document.querySelectorAll('.depoimento-card').length;

    // Função para mover o slider
    function moveToSlide(index) {
      // Validar índice
      if (index < 0) index = 0;
      if (index >= slideCount) index = slideCount - 1;

      // Atualizar o slide atual
      currentSlide = index;

      // Mover o track
      track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

      // Atualizar dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });

      // Habilitar/desabilitar botões
      prevBtn.disabled = currentSlide === 0;
      nextBtn.disabled = currentSlide === slideCount - 1;
    }

    // Event listeners para os botões
    prevBtn.addEventListener('click', () => moveToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => moveToSlide(currentSlide + 1));

    // Event listeners para os dots
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => moveToSlide(i));
    });

    // Inicializar
    moveToSlide(0);

    // Redimensionar o slider quando a janela for redimensionada
    window.addEventListener('resize', () => {
      const newSlideWidth = slider.clientWidth;
      track.style.transform = `translateX(-${currentSlide * newSlideWidth}px)`;
    });
  }

  // Máscara para campo de telefone (implementação simples)
  const telefoneInput = document.getElementById('telefone');
  if (telefoneInput) {
    telefoneInput.addEventListener('input', function () {
      let value = this.value.replace(/\D/g, '');

      if (value.length > 0) {
        // Formatar como (XX) XXXXX-XXXX
        if (value.length <= 2) {
          value = `(${value}`;
        } else if (value.length <= 7) {
          value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
        } else if (value.length <= 11) {
          value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
        } else {
          value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
        }
      }

      this.value = value;
    });
  }

  // Prepara o formulário para WhatsApp
  const whatsappForm = document.getElementById('whatsapp-form');
  if (whatsappForm) {
    whatsappForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const telefone = document.getElementById('telefone').value;
      const servico = document.getElementById('servico').value;
      const mensagem = document.getElementById('mensagem').value;

      // Número do WhatsApp (substitua pelo número correto)
      const whatsappNumber = "5511987654321";

      // Criar mensagem formatada
      let whatsappMessage = `Olá! Meu nome é ${nome}. `;
      whatsappMessage += `Estou interessado(a) em ${servico}. `;
      whatsappMessage += `\nE-mail: ${email} `;
      whatsappMessage += `\nTelefone: ${telefone} `;
      whatsappMessage += `\nMensagem: ${mensagem}`;

      // Codificar a mensagem para URL
      const encodedMessage = encodeURIComponent(whatsappMessage);

      // Criar link do WhatsApp
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Abrir WhatsApp em nova janela
      window.open(whatsappUrl, '_blank');
    });
  }

  // Configuração do botão de email
  const emailBtn = document.getElementById('email-btn');
  if (emailBtn) {
    emailBtn.addEventListener('click', function (e) {
      e.preventDefault();

      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const telefone = document.getElementById('telefone').value;
      const servico = document.getElementById('servico').value;
      const mensagem = document.getElementById('mensagem').value;

      // Verificar se os campos obrigatórios estão preenchidos
      if (!nome || !email || !servico || !mensagem) {
        alert('Por favor, preencha todos os campos obrigatórios antes de enviar o email.');
        return;
      }

      // Criar o assunto do email
      const assunto = `Contato site - ${servico} - ${nome}`;

      // Criar o corpo do email
      let corpoEmail = `Olá, meu nome é ${nome}.\n\n`;
      corpoEmail += `Estou interessado(a) no serviço de ${servico}.\n\n`;
      corpoEmail += `Meus dados de contato:\n`;
      corpoEmail += `Email: ${email}\n`;
      corpoEmail += `Telefone: ${telefone}\n\n`;
      corpoEmail += `Mensagem: ${mensagem}\n\n`;
      corpoEmail += `Aguardo contato. Obrigado(a)!`;

      // Codificar o assunto e corpo para URL
      const mailtoLink = `mailto:contato@lucasmendonca.com.br?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpoEmail)}`;

      // Abrir o cliente de email
      window.location.href = mailtoLink;
    });
  }

  // Scroll suave para links âncora
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Botão Voltar ao Topo
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
  }
});