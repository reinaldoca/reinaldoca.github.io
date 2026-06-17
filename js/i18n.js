/* =============================================
   REINALDO CANCINO ALLEN — i18n Translations
   Supports: es (Spanish) | en (English)
   ============================================= */

'use strict';

const translations = {

  /* ==================== ESPAÑOL ==================== */
  es: {
    /* Meta */
    'meta.title':      'Reinaldo Cancino Allen — DevOps & Cloud Engineer AWS',
    'meta.desc':       'Reinaldo Cancino Allen — DevOps & Cloud Engineer AWS. Infraestructura cloud, automatización, Docker, Kubernetes y CI/CD para equipos que escalan.',
    'meta.og.title':   'Reinaldo Cancino Allen — DevOps & Cloud Engineer AWS',
    'meta.og.desc':    'Diseño y opero infraestructura cloud en AWS con foco en automatización, Docker, Kubernetes, CI/CD y confiabilidad.',

    /* Navbar */
    'nav.services':   'Servicios',
    'nav.stack':      'Stack',
    'nav.containers': 'Containers',
    'nav.about':      'Sobre mí',
    'nav.contact':    'Contacto',

    /* Hero */
    'hero.desc':       'Diseño, automatizo y opero infraestructura cloud en AWS.<br>Docker, Kubernetes, IaC, CI/CD y observabilidad — de principio a fin.',
    'hero.btn.primary':'Ver servicios',
    'hero.btn.ghost':  'Trabajemos juntos',

    /* Stats */
    'stat.uptime': 'Uptime en producción',
    'stat.exp':    'Años de experiencia',
    'stat.aws':    'Servicios AWS dominados',
    'stat.iac':    'Infraestructura como código',

    /* Services section */
    'svc.tag':      '$ ls ./servicios',
    'svc.title':    'Qué puedo hacer por vos',
    'svc.subtitle': 'Acompaño a equipos en todo el ciclo DevOps: desde containerizar aplicaciones con Docker hasta orquestarlas en Kubernetes sobre AWS, con pipelines automatizados y observabilidad completa.',

    'svc1.title': 'Cloud Engineering AWS',
    'svc1.desc':  'Diseño arquitecturas cloud nativas en AWS Well-Architected: multi-AZ, auto-scaling, least-privilege IAM y costos bajo control. EKS, ECS, Lambda, RDS, S3 y más — configurados correctamente desde el primer commit, no desde la consola.',

    'svc2.title': 'Infraestructura como Código',
    'svc2.desc':  'Cada recurso AWS declarado en código, versionado en Git y aplicado en pipeline. Uso Terraform con módulos reutilizables y state remoto en S3+DynamoDB, Terragrunt para multi-entorno y Ansible para configuración de servidores. Cero clics manuales en consola.',

    'svc3.title': 'Observabilidad & SRE',
    'svc3.desc':  'Implemento los tres pilares: métricas con Prometheus + CloudWatch, logs centralizados con Loki o CloudWatch Logs, y trazas distribuidas con OpenTelemetry. Dashboards en Grafana, alertas inteligentes y SLOs definidos — para que sepas el estado real de tu sistema antes que tus usuarios.',

    'svc4.title': 'CI/CD & GitOps',
    'svc4.desc':  'Diseño pipelines completos: build de imagen Docker → push a ECR → deploy en EKS/ECS con zero-downtime. Implemento GitOps con Argo CD para que el estado del cluster siempre refleje el repositorio. Cada PR que mergea desencadena un deploy confiable, trazable y reversible.',

    'svc5.title': 'Migración & Optimización Cloud',
    'svc5.desc':  'Migro aplicaciones monolíticas a contenedores Docker y las llevo a Kubernetes en AWS. También audito cuentas AWS existentes aplicando el framework Well-Architected: identifico recursos ociosos, right-sizing de instancias y estrategias de Spot/Savings Plans para reducir hasta un 40% en costos.',

    'svc6.title': 'Seguridad & Networking AWS',
    'svc6.desc':  'Diseño VPCs con subnets públicas/privadas, NAT Gateway, Transit Gateway y VPN. Aplico principio de mínimo privilegio en IAM con roles, policies y SCPs. Gestiono secretos con AWS Secrets Manager y Parameter Store. Protejo workloads con WAF, Security Groups y Network ACLs.',

    /* Stack */
    'stack.title':     'Stack Técnico',
    'stack.iac':       'IaC & Automatización',
    'stack.obs':       'Observabilidad',
    'stack.db':        'Bases de Datos',
    'stack.net':       'Redes & Seguridad',
    'stack.scripting': 'Scripting & Lenguajes',
    'stack.docker.img':'Optimización de imágenes',
    'stack.aws.badge': 'Principal',

    /* Containers section */
    'cont.subtitle': 'Dos tecnologías centrales en cualquier stack DevOps moderno. Las uso juntas para empaquetar, distribuir y orquestar aplicaciones de forma confiable en producción sobre AWS.',

    'docker.tag':      'Containerización',
    'docker.desc':     'Docker es la base de cualquier estrategia de containerización moderna. Permite empaquetar una aplicación con todas sus dependencias en una imagen portable, reproducible y aislada que corre igual en cualquier entorno — desde el laptop del dev hasta producción en AWS.',
    'docker.f1.title': 'Imágenes optimizadas',
    'docker.f1.desc':  'Multi-stage builds para separar etapas de compilación y runtime. Uso de imágenes base Distroless o Alpine para reducir superficie de ataque y tamaño final.',
    'docker.f2.title': 'Docker Compose para desarrollo',
    'docker.f2.desc':  'Defino entornos de desarrollo reproducibles con docker-compose: base de datos, cache, servicios y redes en un solo archivo. Lo que corre localmente, corre en CI.',
    'docker.f3.title': 'Registros privados en AWS',
    'docker.f3.desc':  'Gestión de imágenes en Amazon ECR con lifecycle policies, escaneo de vulnerabilidades automático y acceso vía IAM roles sin credenciales hardcodeadas.',
    'docker.f4.title': 'Seguridad en containers',
    'docker.f4.desc':  'Contenedores non-root, read-only filesystem, límites de recursos (CPU/mem), escaneo con Trivy y policies de imagen en pipelines CI/CD.',

    'k8s.tag':      'Orquestación',
    'k8s.desc':     'Kubernetes es el estándar de orquestación de contenedores en producción. Gestiona el ciclo de vida de los pods, el escalado automático, el service discovery y los deploys sin downtime. En AWS lo uso principalmente a través de EKS (Elastic Kubernetes Service).',
    'k8s.f1.title': 'EKS en AWS',
    'k8s.f1.desc':  'Provisiono y opero clusters EKS con Terraform. Configuro node groups con Karpenter para autoscaling eficiente, integración con ALB Ingress Controller y gestión de add-ons nativos (CoreDNS, kube-proxy, VPC CNI).',
    'k8s.f2.title': 'GitOps con Argo CD',
    'k8s.f2.desc':  'El cluster siempre refleja el estado declarado en Git. Argo CD detecta cualquier divergencia y reconcilia automáticamente. Deploys auditables, reversibles y sin acceso kubectl manual en producción.',
    'k8s.f3.title': 'Zero-downtime deployments',
    'k8s.f3.desc':  'Estrategias de despliegue con Argo Rollouts: Canary releases y Blue/Green deployments con análisis automático de métricas. Si algo falla, el rollback es inmediato y automático.',
    'k8s.f4.title': 'Escalado & eficiencia',
    'k8s.f4.desc':  'HPA para escalar pods por CPU/memoria o métricas custom, VPA para right-sizing automático y Karpenter para aprovisionar nodos bajo demanda — incluyendo instancias Spot para reducir costos.',

    /* About */
    'about.title': 'Sobre mí',
    'about.p1':    'Soy <strong>DevOps & Cloud Engineer</strong> especializado en AWS, con experiencia diseñando, automatizando y operando infraestructura cloud para equipos de alto crecimiento. Trabajo sobre todo el ciclo: desde containerizar una aplicación con Docker hasta orquestarla en Kubernetes, pasando por el pipeline de CI/CD y la observabilidad en producción.',
    'about.p2':    'Mi enfoque es <strong>infraestructura como código desde el día uno</strong>: cada recurso AWS declarado en Terraform, cada deploy trazable en Git, cada métrica visible en Grafana. Creo que un buen sistema DevOps es el que libera tiempo al equipo de desarrollo para enfocarse en producto — no en apagar incendios.',
    'about.p3':    'Trabajo de forma independiente con startups que necesitan base sólida en cloud, equipos que migran workloads legacy a contenedores, o empresas que quieren escalar su plataforma sin que los costos ni los incidentes escalen al mismo ritmo.',

    /* JSON availability */
    'json.disponibilidad': '"a conversar"',
    'json.modalidad':      '"remota"',
    'json.enfoque':        '"IaC, GitOps, automatización end-to-end"',

    /* Contact */
    'contact.title':    'Trabajemos juntos',
    'contact.subtitle': 'Escribime si necesitás diseñar tu infraestructura en AWS, automatizar deploys, migrar a la nube o simplemente querés dejar de apagar incendios y empezar a escalar con confianza.',
    'contact.status':   'Disponible para nuevos proyectos',

    /* Footer */
    'footer.made': 'Hecho con',
    'footer.cmd':  'aws cli',
  },

  /* ==================== ENGLISH ==================== */
  en: {
    /* Meta */
    'meta.title':      'Reinaldo Cancino Allen — DevOps & Cloud Engineer AWS',
    'meta.desc':       'Reinaldo Cancino Allen — DevOps & Cloud Engineer AWS. Cloud infrastructure, automation, Docker, Kubernetes and CI/CD for scaling teams.',
    'meta.og.title':   'Reinaldo Cancino Allen — DevOps & Cloud Engineer AWS',
    'meta.og.desc':    'I design and operate cloud infrastructure on AWS focused on automation, Docker, Kubernetes, CI/CD and reliability.',

    /* Navbar */
    'nav.services':   'Services',
    'nav.stack':      'Stack',
    'nav.containers': 'Containers',
    'nav.about':      'About',
    'nav.contact':    'Contact',

    /* Hero */
    'hero.desc':       'I design, automate and operate cloud infrastructure on AWS.<br>Docker, Kubernetes, IaC, CI/CD and observability — end to end.',
    'hero.btn.primary':'View services',
    'hero.btn.ghost':  "Let's work together",

    /* Stats */
    'stat.uptime': 'Uptime in production',
    'stat.exp':    'Years of experience',
    'stat.aws':    'AWS Services mastered',
    'stat.iac':    'Infrastructure as code',

    /* Services section */
    'svc.tag':      '$ ls ./services',
    'svc.title':    'What I can do for you',
    'svc.subtitle': 'I support teams throughout the entire DevOps cycle: from containerizing applications with Docker to orchestrating them on Kubernetes over AWS, with automated pipelines and full observability.',

    'svc1.title': 'Cloud Engineering AWS',
    'svc1.desc':  'I design cloud-native architectures on AWS Well-Architected: multi-AZ, auto-scaling, least-privilege IAM and cost control. EKS, ECS, Lambda, RDS, S3 and more — configured correctly from the first commit, not from the console.',

    'svc2.title': 'Infrastructure as Code',
    'svc2.desc':  'Every AWS resource declared in code, versioned in Git and applied through a pipeline. I use Terraform with reusable modules and remote state on S3+DynamoDB, Terragrunt for multi-environment and Ansible for server configuration. Zero manual console clicks.',

    'svc3.title': 'Observability & SRE',
    'svc3.desc':  'I implement the three pillars: metrics with Prometheus + CloudWatch, centralized logs with Loki or CloudWatch Logs, and distributed traces with OpenTelemetry. Grafana dashboards, smart alerts and defined SLOs — so you know the real state of your system before your users do.',

    'svc4.title': 'CI/CD & GitOps',
    'svc4.desc':  'I design complete pipelines: Docker image build → push to ECR → deploy on EKS/ECS with zero-downtime. I implement GitOps with Argo CD so the cluster state always mirrors the repository. Every merged PR triggers a reliable, traceable and reversible deploy.',

    'svc5.title': 'Cloud Migration & Optimization',
    'svc5.desc':  'I migrate monolithic applications to Docker containers and bring them to Kubernetes on AWS. I also audit existing AWS accounts applying the Well-Architected framework: identifying idle resources, instance right-sizing and Spot/Savings Plans strategies to cut costs by up to 40%.',

    'svc6.title': 'Security & Networking AWS',
    'svc6.desc':  'I design VPCs with public/private subnets, NAT Gateway, Transit Gateway and VPN. I apply least-privilege principles in IAM with roles, policies and SCPs. I manage secrets with AWS Secrets Manager and Parameter Store. I protect workloads with WAF, Security Groups and Network ACLs.',

    /* Stack */
    'stack.title':     'Tech Stack',
    'stack.iac':       'IaC & Automation',
    'stack.obs':       'Observability',
    'stack.db':        'Databases',
    'stack.net':       'Networks & Security',
    'stack.scripting': 'Scripting & Languages',
    'stack.docker.img':'Image optimization',
    'stack.aws.badge': 'Primary',

    /* Containers section */
    'cont.subtitle': 'Two core technologies in any modern DevOps stack. I use them together to package, distribute and orchestrate applications reliably in production on AWS.',

    'docker.tag':      'Containerization',
    'docker.desc':     'Docker is the foundation of any modern containerization strategy. It allows packaging an application with all its dependencies into a portable, reproducible and isolated image that runs the same in any environment — from a dev laptop to production on AWS.',
    'docker.f1.title': 'Optimized images',
    'docker.f1.desc':  'Multi-stage builds to separate compilation and runtime stages. Using Distroless or Alpine base images to reduce attack surface and final image size.',
    'docker.f2.title': 'Docker Compose for development',
    'docker.f2.desc':  'Reproducible development environments with docker-compose: database, cache, services and networks in a single file. What runs locally, runs in CI.',
    'docker.f3.title': 'Private registries on AWS',
    'docker.f3.desc':  'Image management in Amazon ECR with lifecycle policies, automatic vulnerability scanning and IAM role-based access without hardcoded credentials.',
    'docker.f4.title': 'Container security',
    'docker.f4.desc':  'Non-root containers, read-only filesystem, resource limits (CPU/mem), scanning with Trivy and image policies in CI/CD pipelines.',

    'k8s.tag':      'Orchestration',
    'k8s.desc':     'Kubernetes is the standard for container orchestration in production. It manages the pod lifecycle, automatic scaling, service discovery and zero-downtime deployments. On AWS I primarily use it through EKS (Elastic Kubernetes Service).',
    'k8s.f1.title': 'EKS on AWS',
    'k8s.f1.desc':  'I provision and operate EKS clusters with Terraform. I configure node groups with Karpenter for efficient autoscaling, ALB Ingress Controller integration and native add-on management (CoreDNS, kube-proxy, VPC CNI).',
    'k8s.f2.title': 'GitOps with Argo CD',
    'k8s.f2.desc':  'The cluster always reflects the state declared in Git. Argo CD detects any divergence and reconciles automatically. Auditable, reversible deploys without manual kubectl access in production.',
    'k8s.f3.title': 'Zero-downtime deployments',
    'k8s.f3.desc':  'Deployment strategies with Argo Rollouts: Canary releases and Blue/Green deployments with automatic metric analysis. If something fails, rollback is immediate and automatic.',
    'k8s.f4.title': 'Scaling & efficiency',
    'k8s.f4.desc':  'HPA to scale pods by CPU/memory or custom metrics, VPA for automatic right-sizing and Karpenter to provision nodes on demand — including Spot instances to reduce costs.',

    /* About */
    'about.title': 'About me',
    'about.p1':    'I am a <strong>DevOps & Cloud Engineer</strong> specialized in AWS, with experience designing, automating and operating cloud infrastructure for high-growth teams. I work across the full cycle: from containerizing an application with Docker to orchestrating it on Kubernetes, through the CI/CD pipeline and observability in production.',
    'about.p2':    'My approach is <strong>infrastructure as code from day one</strong>: every AWS resource declared in Terraform, every deploy traceable in Git, every metric visible in Grafana. I believe a good DevOps system is one that frees the development team to focus on the product — not on firefighting.',
    'about.p3':    'I work independently with startups that need a solid cloud foundation, teams migrating legacy workloads to containers, or companies that want to scale their platform without costs or incidents scaling at the same rate.',

    /* JSON availability */
    'json.disponibilidad': '"open to discuss"',
    'json.modalidad':      '"remote"',
    'json.enfoque':        '"IaC, GitOps, end-to-end automation"',

    /* Contact */
    'contact.title':    "Let's work together",
    'contact.subtitle': "Reach out if you need to design your AWS infrastructure, automate deployments, migrate to the cloud or simply want to stop firefighting and start scaling with confidence.",
    'contact.status':   'Available for new projects',

    /* Footer */
    'footer.made': 'Made with',
    'footer.cmd':  'aws cli',
  }
};

/* =============================================
   I18N ENGINE
   ============================================= */
const i18n = {
  current: 'es',

  init() {
    /* Restore saved language or detect browser */
    const saved = localStorage.getItem('lang');
    const browser = (navigator.language || 'es').slice(0, 2);
    this.current = saved || (browser === 'en' ? 'en' : 'es');
    this.apply(this.current);
    this.renderButton();
  },

  apply(lang) {
    this.current = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;

    const t = translations[lang];
    if (!t) return;

    /* --- textContent nodes --- */
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key] !== undefined) el.textContent = t[key];
    });

    /* --- innerHTML nodes (may contain <strong>, <br>, etc.) --- */
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.dataset.i18nHtml;
      if (t[key] !== undefined) el.innerHTML = t[key];
    });

    /* --- Meta tags --- */
    document.title = t['meta.title'] || document.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && t['meta.desc']) metaDesc.setAttribute('content', t['meta.desc']);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && t['meta.og.title']) ogTitle.setAttribute('content', t['meta.og.title']);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && t['meta.og.desc']) ogDesc.setAttribute('content', t['meta.og.desc']);

    /* --- Update lang button state --- */
    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === lang);
    });

    /* --- Animate transition --- */
    document.body.style.transition = 'opacity 0.18s ease';
    document.body.style.opacity   = '0.85';
    setTimeout(() => { document.body.style.opacity = '1'; }, 180);
  },

  toggle() {
    this.apply(this.current === 'es' ? 'en' : 'es');
  },

  renderButton() {
    /* Already rendered on page load via HTML */
    const btn = document.getElementById('lang-btn');
    if (!btn) return;
    btn.addEventListener('click', () => this.toggle());
  }
};

/* Auto-init when DOM is ready */
document.addEventListener('DOMContentLoaded', () => i18n.init());
