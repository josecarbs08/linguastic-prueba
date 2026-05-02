/**
 * Lingüastic - Cursos Data
 * Professional content based on CEFR standards (MCER)
 */

window.cursosData = [
    {
        id: "ingles-basico",
        formId: "basico",
        titulo: "Inglés Básico",
        nivel: "A1 - A2",
        etiqueta: "Fundamentos",
        imagen: "assets/curso-basico.png", // Sugerencia: Imagen de personas interactuando de forma inicial
        descripcion: "Construye una base sólida desde cero. Aprende a comunicarte en situaciones cotidianas, presentarte y entender estructuras esenciales.",
        objetivo: "Lograr que el estudiante pueda comprender y utilizar expresiones cotidianas de uso muy frecuente y frases sencillas destinadas a satisfacer necesidades de tipo inmediato.",
        modulos: [
            { t: "Módulo 1: Presentación y Saludos", d: "Alfabeto, números, saludos formales e informales y presentaciones personales." },
            { t: "Módulo 2: Vida Cotidiana", d: "Rutinas diarias, verbos de acción, la hora y descripción de lugares." },
            { t: "Módulo 3: Interacción Social", d: "Pedir comida en restaurantes, compras básicas y direcciones." },
            { t: "Módulo 4: Mi Entorno", d: "Descripción de la familia, amigos, hobbys y gustos personales." }
        ],
        beneficios: [
            "Profesores certificados con enfoque humano",
            "Grupos reducidos para mayor participación",
            "Material didáctico digital incluido",
            "Acceso a plataforma de práctica 24/7"
        ],
        duración: "4 meses por nivel",
        modalidad: "Presencial / Online"
    },
    {
        id: "ingles-intermedio",
        formId: "intermedio",
        titulo: "Inglés Intermedio",
        nivel: "B1 - B2",
        etiqueta: "Fluidez",
        imagen: "assets/curso-intermedio.png",
        descripcion: "Lleva tu comunicación al siguiente nivel. Desarrolla la fluidez necesaria para trabajar, viajar y debatir temas complejos con confianza.",
        objetivo: "Capacidad de entender las ideas principales de textos complejos, manejar interacciones fluidas con nativos y producir textos claros sobre diversos temas.",
        modulos: [
            { t: "Módulo 1: Comunicación Efectiva", d: "Tiempos verbales compuestos, conectores lógicos y debate de ideas." },
            { t: "Módulo 2: Inglés para el Trabajo", d: "Vocabulario profesional, correos electrónicos y presentaciones breves." },
            { t: "Módulo 3: Cultura y Sociedad", d: "Modismos, expresiones idiomáticas y comprensión de medios de comunicación." },
            { t: "Módulo 4: Resolución de Problemas", d: "Quejas, sugerencias y negociación en situaciones diversas." }
        ],
        beneficios: [
            "Simulación de situaciones reales",
            "Enfoque en reducción de acento",
            "Preparación para certificaciones iniciales",
            "Club de conversación gratuito"
        ],
        duración: "6 meses por nivel",
        modalidad: "Híbrido / Online"
    },
    {
        id: "ingles-avanzado",
        formId: "avanzado",
        titulo: "Inglés Avanzado",
        nivel: "C1 - C2",
        etiqueta: "Maestría",
        imagen: "assets/curso-avanzado.png",
        descripcion: "Domina el idioma como un experto. Perfecciona tu gramática, amplía tu vocabulario técnico y logra una comunicación sofisticada en cualquier entorno.",
        objetivo: "Expresarse de forma espontánea y fluida sin esfuerzo aparente. Hacer un uso flexible y efectivo del idioma para fines sociales, académicos y profesionales.",
        modulos: [
            { t: "Módulo 1: Pensamiento Crítico", d: "Análisis literario, escritura académica y retórica avanzada." },
            { t: "Módulo 2: Entornos Globales", d: "Matices culturales, negociación internacional y liderazgo." },
            { t: "Módulo 3: Perfeccionamiento Lingüístico", d: "Estructuras gramaticales complejas y vocabulario de nicho." },
            { t: "Módulo 4: Proyecto Final", d: "Presentación de tesis o proyecto profesional totalmente en inglés." }
        ],
        beneficios: [
            "Mentores nativos o bilingües de alto nivel",
            "Enfoque académico y profesional",
            "Red de contactos internacional",
            "Certificación de nivel experto"
        ],
        duración: "8 meses",
        modalidad: "Online Masterclass"
    },
    {
        id: "business-english",
        formId: "business",
        titulo: "Business English",
        nivel: "B1 - C1",
        etiqueta: "Corporativo",
        imagen: "assets/experienciasglobales.png",
        descripcion: "Domina el idioma de los negocios a nivel global. Diseñado para profesionales y corporativos que buscan comunicarse con impacto en reuniones, negociaciones y presentaciones.",
        objetivo: "Desarrollar habilidades comunicativas ejecutivas y vocabulario especializado para interactuar de forma segura y persuasiva en entornos empresariales internacionales.",
        modulos: [
            { t: "Nivel Ejecutivo", d: "Vocabulario corporativo esencial, correos formales y etiqueta en videollamadas." },
            { t: "Negociaciones y Acuerdos", d: "Estrategias de persuasión, resolución de conflictos y cierres de contratos en inglés." },
            { t: "Liderazgo Global", d: "Presentaciones de alto impacto, networking intercultural y manejo de equipos bilingües." }
        ],
        beneficios: [
            "Casos de estudio de negocios reales",
            "Simulación de juntas corporativas",
            "Inglés técnico por industria (Finanzas, IT, etc.)",
            "Networking con otros profesionales"
        ],
        duración: "6 meses por nivel",
        modalidad: "Online / In-Company"
    },
    {
        id: "certificaciones",
        formId: "certificaciones",
        titulo: "Certificaciones",
        nivel: "Preparación",
        etiqueta: "Éxito Profesional",
        imagen: "assets/negotiation-hero.png",
        descripcion: "Alcanza tus metas internacionales con nuestra preparación de alto rendimiento. Estrategias avanzadas para dominar los exámenes más reconocidos globalmente.",
        objetivo: "Garantizar que el estudiante domine las competencias lingüísticas y las estrategias de examen necesarias para obtener la certificación deseada con el puntaje más alto posible.",
        modulos: [
            { t: "Diagnóstico y Estrategia", d: "Evaluación inicial de nivel y diseño de un plan de entrenamiento personalizado basado en tus fortalezas y áreas de oportunidad." },
            { t: "Simulacros de Alto Impacto", d: "Exámenes de práctica en tiempo real con las mismas condiciones de la prueba oficial para reducir la ansiedad y mejorar el tiempo." },
            { t: "Técnicas de Listening y Speaking", d: "Entrenamiento auditivo crítico y desarrollo de fluidez estratégica para responder con precisión bajo presión cronometrada." },
            { t: "Reading y Writing Académico", d: "Dominio de estructuras complejas, vocabulario técnico y técnicas de lectura rápida para secciones de alta exigencia." }
        ],
        beneficios: [
            "Simuladores oficiales actualizados",
            "Feedback detallado por sección",
            "Garantía de puntaje certificado",
            "Asesoría en trámites de registro",
            "Material de estudio premium incluido"
        ],
        duración: "12 semanas (Intensivo)",
        modalidad: "Online / Presencial"
    }
];
