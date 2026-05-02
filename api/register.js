// api/register.js
// Vercel Serverless Function (Robust Edition)

const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, x-custom-header, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    // --- Dynamic Initialization (Ensures Env Vars are fresh and clean) ---
    const supabaseUrl = process.env.SUPABASE_URL?.trim();
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY?.trim();

    if (!supabaseUrl || !supabaseKey) {
        return res.status(500).json({ 
            success: false, 
            error: 'Servidor mal configurado: Faltan llaves de Supabase',
            debug: { url: !!supabaseUrl, key: !!supabaseKey }
        });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    try {
        const { nombre, idioma, nivel, dia, hora, telefono } = req.body;

        if (!nombre || !idioma) {
            return res.status(400).json({ success: false, error: 'Nombre e idioma son obligatorios' });
        }

        // 1. Guardar en Supabase
        const { error: dbError } = await supabase
            .from('registros')
            .insert([{
                nombre,
                idioma,
                nivel: nivel || 'No especificado',
                dia: dia || 'No especificado',
                hora: hora || 'No especificado',
                telefono: telefono || 'No proporcionado',
                fecha_registro: new Date().toISOString(),
                estado: 'pendiente'
            }]);

        if (dbError) {
            console.error('Supabase Error:', dbError.message);
            return res.status(500).json({ 
                success: false, 
                error: `Error de Supabase: ${dbError.message}`,
                details: dbError.details
            });
        }

        // 2. Notificación por Email
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: process.env.ADMIN_EMAIL,
                subject: `🔔 Registro: ${nombre} - ${idioma}`,
                html: `<p>Nuevo registro de <b>${nombre}</b> para <b>${idioma}</b>.</p>
                       <p>Horario: ${dia} ${hora}</p>
                       <p>Tel: ${telefono}</p>`
            });
        } catch (e) {
            console.warn('Mail send failed', e.message);
        }

        return res.status(200).json({ success: true, message: 'Registro guardado' });

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
};
