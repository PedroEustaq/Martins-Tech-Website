document.addEventListener('DOMContentLoaded', () => {
  // Animação de entrada da hero
  anime.timeline({ easing: 'easeOutQuad' })
    .add({
      targets: '.logo-area img',
      opacity: [0, 1],
      translateY: [-20, 0],
      delay: anime.stagger(80),
      duration: 700,
    })
    .add({
      targets: '.hero-title',
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 700,
      offset: '-=200',
    })
    .add({
      targets: '.hero-subtitle',
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 700,
      offset: '-=400',
    });

  // Função helper para animações ao rolar
  const animateOnScroll = (selector, options) => {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              ...options,
              begin: () => {
                entry.target.classList.add('animated');
              },
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    elements.forEach(el => {
      observer.observe(el);
    });
  };

  // Animação da seção "Quem são vocês?"
  animateOnScroll('.sobre-image', {
    opacity: [0, 1],
    translateX: [-40, 0],
    duration: 800,
    easing: 'easeOutCubic',
  });

  animateOnScroll('.sobre-texto p', {
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 800,
    delay: 150,
    easing: 'easeOutCubic',
  });

  // Animação da seção "Bora ser DIGITAL!"
  animateOnScroll('.servicos-left', {
    opacity: [0, 1],
    translateX: [-40, 0],
    duration: 800,
    easing: 'easeOutCubic',
  });

  animateOnScroll('.servicos-right', {
    opacity: [0, 1],
    translateX: [40, 0],
    duration: 800,
    easing: 'easeOutCubic',
  });

  // Animação seções Preços e Contato
  animateOnScroll('.precos-titulo', {
    opacity: [0, 1],
    translateY: [24, 0],
    duration: 700,
    easing: 'easeOutCubic',
  });

  animateOnScroll('.preco-grid', {
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 800,
    delay: 150,
    easing: 'easeOutCubic',
  });

  animateOnScroll('.contato-inner', {
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 800,
    easing: 'easeOutCubic',
  });

  // Formulário de contato — abre cliente de e-mail com dados preenchidos (até integrar backend)
  const formContato = document.getElementById('form-contato');
  const linkEmailContato = document.getElementById('link-email-contato');
  if (formContato) {
    formContato.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = formContato.querySelector('[name="nome"]').value.trim();
      const email = formContato.querySelector('[name="email"]').value.trim();
      const telefone = formContato.querySelector('[name="telefone"]').value.trim();
      const projeto = formContato.querySelector('[name="projeto"]').value;
      const mensagem = formContato.querySelector('[name="mensagem"]').value.trim();
      const projetoLabel = formContato.querySelector('[name="projeto"]').selectedOptions[0]?.text || projeto;
      // Pega o e-mail de destino do link da página (um único lugar para alterar)
      const emailDestino = linkEmailContato ? linkEmailContato.getAttribute('href').replace('mailto:', '').trim() : 'pedroeustaquioassad@gmail.com';
      const subject = encodeURIComponent(`Orçamento Martins Tech — ${nome}`);
      const bodyTexto = `Nome: ${nome}\nE-mail: ${email}\nTelefone/WhatsApp: ${telefone || '—'}\nTipo de projeto: ${projetoLabel || '—'}\n\nMensagem:\n${mensagem || '—'}`;
      // Limita tamanho do body para não estourar URL (muitos clientes truncam ~2000 chars)
      const body = encodeURIComponent(bodyTexto.length > 1500 ? bodyTexto.slice(0, 1500) + '…' : bodyTexto);
      const mailtoUrl = `mailto:${emailDestino}?subject=${subject}&body=${body}`;
      // Usar link clicável é mais confiável que window.location em vários navegadores
      const a = document.createElement('a');
      a.href = mailtoUrl;
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  // Interações da seção de serviços
  const servicoCards = document.querySelectorAll('.servico-card:not(.vazio)');
  const infoTitle = document.querySelector('.servicos-info-title');
  const infoText = document.querySelector('.servicos-info-text');
  const servicosSection = document.querySelector('.servicos');

  const defaultTitle = 'Passe o mouse em um serviço';
  const defaultText =
    'Ao passar o mouse sobre cada quadradinho, você verá aqui uma descrição resumida do que fazemos em cada tipo de solução.';

  const servicosCopy = {
    websites: {
      titulo: 'Websites',
      texto: 'Criamos sites modernos, rápidos e responsivos para apresentar sua marca, produtos e serviços com profissionalismo.',
    },
    sistemas: {
      titulo: 'Desenvolvimento de Sistemas',
      texto: 'Desenvolvemos sistemas sob medida para automatizar processos e trazer mais controle para o seu negócio.',
    },
    automacoes: {
      titulo: 'Automações',
      texto: 'Integramos ferramentas e criamos fluxos automáticos para reduzir tarefas repetitivas e ganhar produtividade.',
    },
    solucoes: {
      titulo: 'Soluções em Demanda',
      texto: 'Projetos pontuais ou sob demanda para resolver desafios específicos de tecnologia da sua empresa.',
    },
    suporte: {
      titulo: 'Suporte e Evolução Digital',
      texto: 'Acompanhamos o dia a dia da sua operação, fazendo melhorias contínuas e garantindo que tudo funcione bem.',
    },
  };

  servicoCards.forEach(card => {
    const key = card.dataset.servico;
    const tituloEl = card.querySelector('.servico-titulo');

    card.addEventListener('mouseenter', () => {
      const data = servicosCopy[key];
      const titulo = data ? data.titulo : (tituloEl ? tituloEl.textContent.trim().replace(/\s+/g, ' ') : 'Serviço');
      const texto = data ? data.texto : 'Em breve mais informações sobre este serviço.';

      servicoCards.forEach(c => c.classList.remove('ativo'));
      card.classList.add('ativo');

      if (servicosSection && key) {
        servicosSection.classList.remove(
          'tema-websites',
          'tema-sistemas',
          'tema-automacoes',
          'tema-solucoes',
          'tema-suporte'
        );
        servicosSection.classList.add(`tema-${key}`);
      }

      if (infoTitle && infoText) {
        infoTitle.textContent = titulo;
        infoText.textContent = texto;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('ativo');
      if (servicosSection) {
        servicosSection.classList.remove(
          'tema-websites',
          'tema-sistemas',
          'tema-automacoes',
          'tema-solucoes',
          'tema-suporte'
        );
      }
      if (infoTitle && infoText) {
        infoTitle.textContent = defaultTitle;
        infoText.textContent = defaultText;
      }
    });
  });

  // Animação da seção "Bora ser DIGITAL!"
  animateOnScroll('.digital-left', {
    opacity: [0, 1],
    translateX: [-40, 0],
    duration: 800,
    easing: 'easeOutCubic',
  });

  animateOnScroll('.digital-right', {
    opacity: [0, 1],
    translateX: [40, 0],
    duration: 800,
    easing: 'easeOutCubic',
  });

  // Pequena animação contínua no ícone de alerta
  if (document.querySelector('.alert-digital')) {
    anime({
      targets: '.alert-digital',
      translateY: [-4, 4],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      duration: 900,
    });
  }
});

