const rateLimit = new Map()

export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin',
    'https://konstantino-ambrossenkov.vercel.app')
  res.setHeader('Access-Control-Allow-Methods', 'POST')

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  // Rate limiting por IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0]
    ?? req.socket?.remoteAddress
    ?? 'unknown'
  const now = Date.now()
  const windowMs = 10 * 60 * 1000 // 10 minutos
  const maxRequests = 5

  const record = rateLimit.get(ip)
  if (record && now < record.resetTime) {
    if (record.count >= maxRequests) {
      return res.status(429).json({
        error: 'Demasiados intentos. Esperá 10 minutos.'
      })
    }
    record.count++
  } else {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs })
  }

  // Validaciones
  const { email, nombre } = req.body ?? {}

  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email inválido' })
  }

  if (email.length > 254 || (nombre && nombre.length > 500)) {
    return res.status(400).json({ error: 'Datos fuera de rango' })
  }

  // Si todo está bien
  return res.status(200).json({ ok: true })
}
