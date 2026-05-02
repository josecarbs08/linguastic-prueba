/**
 * LINGÜASTIC - Sistema de Noticias / Novedades
 * 
 * Para agregar una nueva noticia:
 * 1. Copia un bloque de objeto {} de la lista de abajo.
 * 2. Cámbiale el 'id' por uno único (ej: "mi-nueva-noticia-2026").
 * 3. Actualiza el título, fecha, descripción y contenido (soporta HTML).
 * 4. La noticia aparecerá automáticamente en novedades.html y tendrás su página en noticia.html?id=ID_UNICO
 */

const noticiasData = [
    {
        id: "nuevo-grupo-ingles-abril-2026",
        tag: "Nuevo grupo",
        tagType: "nuevo", // nuevo | evento | aviso | promo
        fecha: "25 Abril, 2026",
        titulo: "Inglés Principiante — Sábados",
        descripcion: "¡Abrimos un nuevo grupo de inglés desde cero! Sábados intensivos de 09:00 a 13:00 hrs. Cupo limitado para garantizar atención personalizada.",
        imagen: "assets/noticia-nuevo-grupo.png",
        icon: "group_add",
        contenido: `
            <p>¡Estamos emocionados de anunciar la apertura de un nuevo grupo de <strong>Inglés Principiante</strong>!</p>
            <h3>Detalles del curso</h3>
            <ul>
                <li><strong>Inicio:</strong> 25 de Abril, 2026</li>
                <li><strong>Horario:</strong> Sábados de 09:00 AM a 01:00 PM</li>
                <li><strong>Nivel:</strong> A1 (desde cero absoluto)</li>
                <li><strong>Modalidad:</strong> Presencial en nuestra sede de Tehuacán</li>
            </ul>
            <p>Este curso intensivo sabatino está diseñado para quienes buscan avanzar rápidamente sin comprometer su semana laboral. Con nuestro método inmersivo, empezarás a comunicarte en inglés desde la primera clase.</p>
            <h3>¿Qué incluye?</h3>
            <ul>
                <li>Material de inmersión digital completo</li>
                <li>Acceso al Club de Conversación con embajadores internacionales</li>
                <li>Seguimiento personalizado de tu progreso</li>
                <li>Certificado de nivel al completar el módulo</li>
            </ul>
            <p>Los lugares son limitados para garantizar una experiencia de calidad. ¡No te quedes fuera!</p>
        `
    },
    {
        id: "club-conversacion-internacional",
        tag: "Evento",
        tagType: "evento",
        fecha: "Mayo 2026",
        titulo: "Club de Conversación Especial",
        descripcion: "Invitados internacionales de Alemania y Francia se unen al club. ¡Practica con hablantes nativos en un ambiente relajado!",
        imagen: "assets/noticia-club-conversacion.png",
        icon: "diversity_3",
        contenido: `
            <p>Nuestro <strong>Club de Conversación</strong> se prepara para una edición especial con invitados de talla internacional.</p>
            <h3>¿Qué es el Club de Conversación?</h3>
            <p>Es un espacio semanal donde nuestros alumnos practican el idioma en conversaciones reales con hablantes nativos. No hay libros, no hay exámenes — solo comunicación auténtica.</p>
            <h3>Edición Especial — Mayo 2026</h3>
            <p>Para esta edición contaremos con embajadores culturales de:</p>
            <ul>
                <li>🇩🇪 <strong>Alemania</strong> — Estudiantes de intercambio de la Universidad de Heidelberg</li>
                <li>🇫🇷 <strong>Francia</strong> — Voluntarios del programa Alliance Française</li>
                <li>🇺🇸 <strong>Estados Unidos</strong> — Profesionales en programa cultural</li>
            </ul>
            <p>El evento está abierto para todos los alumnos inscritos, sin costo adicional. Es tu oportunidad de practicar con nativos reales y conocer diferentes culturas.</p>
        `
    },
    {
        id: "inscripciones-abiertas-2026",
        tag: "Aviso",
        tagType: "aviso",
        fecha: "Abril 2026",
        titulo: "Inscripciones Abiertas",
        descripcion: "Aprovecha la tarifa preferencial de apertura para inglés, francés y alemán. Todos los niveles disponibles.",
        imagen: "assets/noticia-inscripciones.png",
        icon: "campaign",
        contenido: `
            <p>Las <strong>inscripciones para el nuevo ciclo 2026</strong> ya están disponibles en todos nuestros idiomas.</p>
            <h3>Idiomas disponibles</h3>
            <ul>
                <li>🇬🇧 <strong>Inglés</strong> — Niveles A1 a C1</li>
                <li>🇫🇷 <strong>Francés</strong> — Niveles A1 a B2</li>
                <li>🇩🇪 <strong>Alemán</strong> — Niveles A1 a C1</li>
            </ul>
            <h3>Tarifa preferencial</h3>
            <p>Inscríbete durante el periodo de apertura y accede a un precio especial en tu primer módulo. Esta promoción está disponible por tiempo limitado.</p>
            <h3>Modalidades</h3>
            <ul>
                <li><strong>Grupos regulares:</strong> Lunes a Viernes, horarios flexibles</li>
                <li><strong>Intensivos sabatinos:</strong> Sábados de 09:00 a 13:00</li>
                <li><strong>Programa Ejecutivo:</strong> Horarios personalizados</li>
            </ul>
            <p>¿Listo para dar el primer paso? Contáctanos por WhatsApp o regístrate directamente en nuestra página.</p>
        `
    },
    {
        id: "taller-pronunciacion-junio-2026",
        tag: "Evento",
        tagType: "evento",
        fecha: "Junio 2026",
        titulo: "Taller de Pronunciación Intensiva",
        descripcion: "Tres sesiones prácticas para perfeccionar tu acento en inglés, francés y alemán. Técnicas avanzadas de fonética aplicada.",
        imagen: "assets/noticia-club-conversacion.png",
        icon: "record_voice_over",
        contenido: `
            <p>¿Sientes que tu pronunciación te frena al hablar? Este <strong>Taller de Pronunciación Intensiva</strong> está diseñado para romper esas barreras.</p>
            <h3>¿Qué aprenderás?</h3>
            <ul>
                <li>Técnicas de <strong>fonética aplicada</strong> para cada idioma</li>
                <li>Ejercicios de <strong>ritmo y entonación</strong> natural</li>
                <li>Corrección de los <strong>errores más comunes</strong> en hispanohablantes</li>
                <li>Práctica con <strong>grabación y retroalimentación</strong> personalizada</li>
            </ul>
            <h3>Formato</h3>
            <p>3 sesiones de 2 horas cada una, en grupos reducidos de máximo 8 personas. Incluye material de audio para práctica en casa.</p>
            <p>Abierto para alumnos actuales y nuevos interesados. ¡Perfecciona tu acento con nosotros!</p>
        `
    },
    {
        id: "becas-aleman-verano-2026",
        tag: "Promo",
        tagType: "promo",
        fecha: "Julio 2026",
        titulo: "Becas Parciales — Alemán Verano",
        descripcion: "Aplicamos 5 becas parciales para el curso intensivo de alemán de verano. Dirigido a jóvenes de 16 a 25 años con interés en estudiar en Europa.",
        imagen: "assets/noticia-nuevo-grupo.png",
        icon: "school",
        contenido: `
            <p>Lingüastic lanza su primer programa de <strong>Becas Parciales de Alemán</strong> para el verano 2026.</p>
            <h3>Requisitos</h3>
            <ul>
                <li>Tener entre <strong>16 y 25 años</strong></li>
                <li>Demostrar <strong>interés genuino</strong> en estudiar o trabajar en Alemania</li>
                <li>Completar una <strong>evaluación de motivación</strong> escrita</li>
                <li>Compromiso de <strong>asistencia al 90%</strong> del curso</li>
            </ul>
            <h3>¿Qué cubre la beca?</h3>
            <p>La beca cubre el <strong>50% de la colegiatura</strong> del curso intensivo de verano (Julio-Agosto). Incluye acceso completo al material digital y al Club de Conversación con nativos alemanes.</p>
            <h3>¿Cómo aplicar?</h3>
            <p>Envía tu solicitud por WhatsApp antes del 15 de junio. Solo 5 lugares disponibles.</p>
        `
    },
    {
        id: "plataforma-digital-2026",
        tag: "Nuevo",
        tagType: "nuevo",
        fecha: "Mayo 2026",
        titulo: "Lanzamos Plataforma Digital",
        descripcion: "Accede a tu material, tareas y progreso desde cualquier dispositivo. La nueva plataforma digital de Lingüastic ya está disponible.",
        imagen: "assets/noticia-inscripciones.png",
        icon: "devices",
        contenido: `
            <p>Nos complace anunciar el lanzamiento oficial de la <strong>Plataforma Digital de Lingüastic</strong>.</p>
            <h3>¿Qué puedes hacer?</h3>
            <ul>
                <li>📱 Acceder a tu <strong>material de clase</strong> desde el celular, tablet o computadora</li>
                <li>📊 Ver tu <strong>progreso y estadísticas</strong> de aprendizaje en tiempo real</li>
                <li>📝 Entregar <strong>tareas y actividades</strong> directamente desde la plataforma</li>
                <li>💬 Comunicarte con tu <strong>profesor</strong> de forma directa</li>
            </ul>
            <h3>¿Cómo accedo?</h3>
            <p>Todos los alumnos inscritos recibirán sus credenciales de acceso durante la primera semana de mayo. Si ya eres alumno, revisa tu WhatsApp para las instrucciones de activación.</p>
            <p>La plataforma se integra con nuestro método inmersivo para que tu aprendizaje no se detenga fuera del aula.</p>
        `
    }
];

// Export to window so it's accessible globally
window.noticiasData = noticiasData;
