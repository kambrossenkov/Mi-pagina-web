const rateLimit = new Map()

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin',
    'https://konstantino-ambrossenkov.vercel.app')
  res.setHeader('Access-Control-Allow-Methods', 'POST')

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  // Rate limiting: máx 3 envíos por IP cada 15 minutos
  const ip = req.headers['x-forwarded-for']?.split(',')[0]
    ?? req.socket?.remoteAddress
    ?? 'unknown'
  const now = Date.now()
  const windowMs = 15 * 60 * 1000
  const maxRequests = 3

  const record = rateLimit.get(ip)
  if (record && now < record.resetTime) {
    if (record.count >= maxRequests) {
      return res.status(429).json({
        error: 'Demasiados intentos. Esperá 15 minutos antes de volver a enviar.'
      })
    }
    record.count++
  } else {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs })
  }

  const {
    nombre, apellido, email, telefono,
    empresa, cargo, tipoContacto, motivoContacto,
    asunto, mensaje, linkedin, comoLlego,
    disponibilidad, acepta, honeypot
  } = req.body ?? {}

  // Bloquear si honeypot fue llenado (es un bot)
  if (honeypot && honeypot.trim() !== '') {
    return res.status(200).json({ ok: true }) // falso positivo
  }

  // Validar campos obligatorios
  if (!nombre || !apellido || !email || !asunto || !mensaje || !acepta) {
    return res.status(400).json({ error: 'Faltan campos obligatorios.' })
  }

  // Validar email
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email inválido.' })
  }

  // Protección Email Header Injection
  const headerInjectionPattern = /(%0a|%0d|\n|\r|Cc:|Bcc:|To:|Content-Type:)/i
  if (headerInjectionPattern.test(email)) {
    return res.status(400).json({ error: 'Email inválido.' })
  }

  // Validar longitudes máximas
  const limites = {
    nombre: 100, apellido: 100, email: 254,
    telefono: 30, empresa: 200, cargo: 100,
    asunto: 200, mensaje: 2000, linkedin: 300,
    comoLlego: 200
  }
  for (const [campo, max] of Object.entries(limites)) {
    const valor = req.body[campo]
    if (valor && valor.length > max) {
      return res.status(400).json({
        error: `El campo ${campo} supera el máximo permitido.`
      })
    }
  }

  // Sanitizar todos los campos de texto contra XSS
  function sanitize(str) {
    if (!str) return ''
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
  }

  const datosLimpios = {
    nombre: sanitize(nombre),
    apellido: sanitize(apellido),
    email: sanitize(email),
    telefono: sanitize(telefono),
    empresa: sanitize(empresa),
    cargo: sanitize(cargo),
    tipoContacto: sanitize(tipoContacto),
    motivoContacto: sanitize(motivoContacto),
    asunto: sanitize(asunto),
    mensaje: sanitize(mensaje),
    linkedin: sanitize(linkedin),
    comoLlego: sanitize(comoLlego),
    disponibilidad: sanitize(disponibilidad)
  }

  // Acá irían los datos limpios al servicio de email (Formspree, EmailJS, etc.)
  // Por ahora se confirma recepción exitosa
  return res.status(200).json({ ok: true, datos: datosLimpios })
}
