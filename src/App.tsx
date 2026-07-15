import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Compass,
  Dog,
  Camera,
  Mail,
  MapPin,
  Menu,
  Minus,
  ParkingCircle,
  Phone,
  Plus,
  Quote,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  Utensils,
  Waves,
  Wifi,
  X,
} from 'lucide-react'

type Room = {
  name: string
  label: string
  price: number
  size: string
  guests: string
  image: string
  description: string
  features: string[]
}

type GalleryItem = {
  src: string
  alt: string
  size: 'wide' | 'tall' | 'normal'
}

const rooms: Room[] = [
  {
    name: 'Suite Sal',
    label: 'La más luminosa',
    price: 185,
    size: '32 m²',
    guests: '2 huéspedes',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=88',
    description: 'Texturas naturales, balcón francés y luz de levante desde primera hora.',
    features: ['Cama king', 'Balcón', 'Ducha efecto lluvia'],
  },
  {
    name: 'Suite Arena',
    label: 'Favorita para parejas',
    price: 215,
    size: '38 m²',
    guests: '2 huéspedes',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=88',
    description: 'Una suite serena con bañera exenta y rincón de lectura frente al patio.',
    features: ['Bañera', 'Patio privado', 'Honesty bar'],
  },
  {
    name: 'Suite Brisa',
    label: 'Pet friendly',
    price: 245,
    size: '44 m²',
    guests: '2 + mascota',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1400&q=88',
    description: 'Más espacio, terraza íntima y un kit de bienvenida para tu compañero de viaje.',
    features: ['Terraza', 'Pet kit', 'Zona lounge'],
  },
]

const gallery: GalleryItem[] = [
  { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=88', alt: 'Fachada mediterránea de Casa Salina', size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=88', alt: 'Suite en tonos arena', size: 'tall' },
  { src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=88', alt: 'Salón de diseño mediterráneo', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=88', alt: 'Desayuno servido en la terraza', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=88', alt: 'Patio con piscina y vegetación', size: 'tall' },
  { src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=88', alt: 'Zona de bienestar y descanso', size: 'wide' },
]

const faqs = [
  ['¿La reserva directa tiene ventajas?', 'Sí. Incluye mejor tarifa disponible, detalle de bienvenida y salida tardía sujeta a disponibilidad.'],
  ['¿Aceptáis mascotas?', 'Sí, aceptamos perros pequeños y medianos en Suite Brisa. Preparamos cama, cuenco y una guía de paseos.'],
  ['¿Hay opciones sin gluten?', 'Nuestro desayuno puede ser completamente sin gluten con aviso previo. También adaptamos opciones vegetarianas.'],
  ['¿A qué distancia está la playa?', 'La Explanada está a 7 minutos a pie y la playa del Postiguet a unos 12 minutos caminando.'],
]

const experiences = [
  {
    icon: Sun,
    eyebrow: 'Mañana lenta',
    title: 'Desayuno de mercado',
    text: 'Producto local, café de especialidad y opciones sin gluten servidas sin prisa.',
  },
  {
    icon: Compass,
    eyebrow: 'Alicante secreto',
    title: 'Ruta con anfitrión',
    text: 'Una guía curada de patios, talleres, calas y mesas que no aparecen en las listas obvias.',
  },
  {
    icon: Waves,
    eyebrow: 'Mar al atardecer',
    title: 'Navegación privada',
    text: 'Dos horas de costa, baño y aperitivo mediterráneo para cerrar el día sobre el agua.',
  },
]

const amenityItems = [
  [Wifi, 'Wi‑Fi de alta velocidad'],
  [Coffee, 'Café de especialidad'],
  [Utensils, 'Desayuno adaptable'],
  [Dog, 'Pet friendly'],
  [ParkingCircle, 'Parking concertado'],
  [ShieldCheck, 'Reserva segura'],
] as const

const travelIntents = [
  ['pareja', 'Una escapada en pareja'],
  ['descanso', 'Necesito descansar'],
  ['alicante', 'Quiero descubrir Alicante'],
  ['trabajo', 'Viajo por trabajo'],
] as const

type TravelIntent = typeof travelIntents[number][0]

function SalinaMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M12.5 38V22.5C12.5 14.9 17.6 9 24 9s11.5 5.9 11.5 13.5V38" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="24" cy="21" r="3.6" fill="currentColor" />
      <path d="M17 29c3.2-2.1 6.5-2.1 9.7 0 2.1 1.4 4.3 1.5 6.3.6M17 34c3.2-2.1 6.5-2.1 9.7 0 2.1 1.4 4.3 1.5 6.3.6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

function Logo() {
  return (
    <a className="logo" href="#inicio" aria-label="Casa Salina, ir al inicio">
      <span className="logo-mark"><SalinaMark /></span>
      <span><strong>Casa Salina</strong><small>Alicante · Boutique Stay</small></span>
    </a>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null)
  const [faqOpen, setFaqOpen] = useState(0)
  const [guests, setGuests] = useState(2)
  const [room, setRoom] = useState(rooms[0].name)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [toast, setToast] = useState(false)
  const [conciergeOpen, setConciergeOpen] = useState(false)
  const [conciergeStep, setConciergeStep] = useState(0)
  const [travelIntent, setTravelIntent] = useState<TravelIntent | null>(null)
  const [travelsWithPet, setTravelsWithPet] = useState<boolean | null>(null)
  const [conciergeGuests, setConciergeGuests] = useState<number | null>(null)
  const today = new Date().toISOString().split('T')[0]

  const selectedRoom = rooms.find((item) => item.name === room) ?? rooms[0]

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0
    const start = new Date(`${checkIn}T12:00:00`)
    const end = new Date(`${checkOut}T12:00:00`)
    return Math.max(0, Math.round((end.getTime() - start.getTime()) / 86_400_000))
  }, [checkIn, checkOut])

  const total = nights * selectedRoom.price

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) setMenuOpen(false)
      if (event.key === 'Escape' && conciergeOpen) setConciergeOpen(false)
      if (galleryIndex === null) return
      if (event.key === 'Escape') setGalleryIndex(null)
      if (event.key === 'ArrowRight') setGalleryIndex((galleryIndex + 1) % gallery.length)
      if (event.key === 'ArrowLeft') setGalleryIndex((galleryIndex - 1 + gallery.length) % gallery.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [conciergeOpen, galleryIndex, menuOpen])

  useEffect(() => {
    document.body.style.overflow = galleryIndex === null ? '' : 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [galleryIndex])

  const submitBooking = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setToast(true)
    window.setTimeout(() => setToast(false), 4200)
  }

  const scrollToBooking = () => {
    document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })
  }

  const conciergeRoom = travelsWithPet
    ? rooms[2]
    : travelIntent === 'pareja'
      ? rooms[1]
      : rooms[0]
  const conciergeTotal = nights * conciergeRoom.price

  const formatStayDate = (value: string) => new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T12:00:00Z`))

  const resetConcierge = () => {
    setConciergeStep(0)
    setTravelIntent(null)
    setTravelsWithPet(null)
    setConciergeGuests(null)
  }

  const prepareConciergeBooking = () => {
    setRoom(conciergeRoom.name)
    setGuests(conciergeGuests ?? 2)
    setConciergeOpen(false)
    scrollToBooking()
  }

  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <nav className="nav container" aria-label="Navegación principal">
          <Logo />
          <div className="nav-links">
            <a href="#habitaciones">Suites</a>
            <a href="#experiencias">Experiencias</a>
            <a href="#galeria">Galería</a>
            <a href="#contacto">Contacto</a>
          </div>
          <button className="button button-small" onClick={scrollToBooking}>Reservar</button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="menu-movil">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>
        <AnimatePresence>
          {menuOpen && (
            <motion.div className="mobile-menu" id="menu-movil" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {['habitaciones', 'experiencias', 'galeria', 'contacto'].map((item) => (
                <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>{item}</a>
              ))}
              <button className="button" onClick={() => { setMenuOpen(false); scrollToBooking() }}>Reservar ahora</button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-media" aria-hidden="true" />
          <div className="hero-overlay" />
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />
          <div className="container hero-content">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
              <span className="eyebrow light"><Sparkles size={15} /> Seis suites · Alicante centro</span>
              <h1>La calma del Mediterráneo, <em>puertas adentro.</em></h1>
              <p>Una casa boutique para dormir bien, descubrir despacio y sentir Alicante como si siempre hubiera sido tuya.</p>
              <div className="hero-actions">
                <button className="button button-light" onClick={scrollToBooking}>Consultar disponibilidad <ArrowRight size={17} /></button>
                <a className="text-link light-link" href="#habitaciones">Descubrir las suites <ArrowRight size={16} /></a>
              </div>
            </motion.div>
            <motion.div className="hero-proof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5, duration: .8 }}>
              <div className="rating"><span>9,6</span><div><strong>Excepcional</strong><small>128 huéspedes verificados</small></div></div>
              <div className="mini-stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
            </motion.div>
          </div>
          <a className="scroll-cue" href="#intro"><span>Descubrir</span><i /></a>
        </section>

        <section className="intro section" id="intro">
          <div className="container intro-grid">
            <div>
              <span className="eyebrow">Una casa con ritmo propio</span>
              <h2>Menos hotel.<br />Más refugio.</h2>
            </div>
            <div className="intro-copy">
              <p className="lead">Casa Salina nace en una antigua vivienda alicantina restaurada con materiales honestos, luz natural y una obsesión sencilla: que descanses de verdad.</p>
              <p>Aquí no hay recepción impersonal ni horarios imposibles. Hay recomendaciones hechas a mano, desayuno local, rincones silenciosos y un equipo que recuerda cómo te gusta el café.</p>
              <div className="signature">Hecho para quedarse en la memoria.</div>
            </div>
          </div>
          <div className="container amenities">
            {amenityItems.map(([Icon, label]) => (
              <div className="amenity" key={label}><Icon size={21} strokeWidth={1.6} /><span>{label}</span></div>
            ))}
          </div>
        </section>

        <section className="section rooms-section" id="habitaciones">
          <div className="container">
            <div className="section-heading split-heading">
              <div><span className="eyebrow">Dormir junto al mar</span><h2>Elige tu forma de parar.</h2></div>
              <p>Solo seis suites, todas diferentes, conectadas por una misma paleta de cal, arena y verde salvia.</p>
            </div>
            <div className="room-grid">
              {rooms.map((item, index) => (
                <motion.article className="room-card" key={item.name} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ delay: index * .12 }}>
                  <div className="room-image-wrap">
                    <img src={item.image} alt={item.name} loading="lazy" />
                    <span className="room-label">{item.label}</span>
                    <button className="round-button" onClick={() => { setRoom(item.name); scrollToBooking() }} aria-label={`Reservar ${item.name}`}><ArrowRight /></button>
                  </div>
                  <div className="room-body">
                    <div className="room-title-row"><div><h3>{item.name}</h3><span>{item.size} · {item.guests}</span></div><div className="price"><small>desde</small><strong>{item.price}€</strong><small>/ noche</small></div></div>
                    <p>{item.description}</p>
                    <ul>{item.features.map((feature) => <li key={feature}><Check size={14} />{feature}</li>)}</ul>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="quote-section section">
          <div className="container quote-card">
            <Quote size={38} strokeWidth={1.3} />
            <blockquote>“No queríamos un hotel perfecto. Queríamos un lugar que se sintiera auténtico, amable y difícil de olvidar.”</blockquote>
            <div className="quote-author"><span>MI</span><div><strong>Marina Iborra</strong><small>Anfitriona de Casa Salina</small></div></div>
          </div>
        </section>

        <section className="section experiences-section" id="experiencias">
          <div className="container">
            <div className="section-heading centered"><span className="eyebrow">Más allá de la habitación</span><h2>Alicante, bien contada.</h2><p>Experiencias de escala humana para entrar en el ritmo de la ciudad, no simplemente pasar por ella.</p></div>
            <div className="experience-grid">
              {experiences.map(({ icon: Icon, eyebrow, title, text }, index) => (
                <motion.article className="experience-card" key={title} initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <div className="experience-number">0{index + 1}</div>
                  <div className="experience-icon"><Icon size={25} strokeWidth={1.5} /></div>
                  <span>{eyebrow}</span><h3>{title}</h3><p>{text}</p><a href="#contacto">Quiero saber más <ArrowRight size={15} /></a>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section gallery-section" id="galeria">
          <div className="container">
            <div className="section-heading split-heading"><div><span className="eyebrow">Una mirada dentro</span><h2>La casa, sin filtros.</h2></div><p>Cada imagen cuenta una parte: la luz de la mañana, la piedra fresca y los pequeños gestos que hacen hogar.</p></div>
            <div className="gallery-grid">
              {gallery.map((item, index) => (
                <button className={`gallery-item ${item.size}`} key={item.src} onClick={() => setGalleryIndex(index)} aria-label={`Ampliar imagen: ${item.alt}`}>
                  <img src={item.src} alt={item.alt} loading="lazy" />
                  <span><Plus size={22} /></span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section booking-section" id="reservar">
          <div className="container booking-grid">
            <div className="booking-copy">
              <span className="eyebrow light">Reserva directa</span>
              <h2>Tu próxima pausa empieza aquí.</h2>
              <p>Consulta una estancia en menos de un minuto. Sin comisiones, con atención humana y ventajas exclusivas.</p>
              <ul><li><Check /> Mejor tarifa disponible</li><li><Check /> Detalle de bienvenida</li><li><Check /> Cambios flexibles hasta 7 días antes</li></ul>
              <div className="booking-contact"><Phone size={18} /><div><small>¿Prefieres hablar?</small><strong>+34 965 000 842</strong></div></div>
            </div>
            <form className="booking-form" onSubmit={submitBooking}>
              <div className="form-kicker"><CalendarDays /> Consulta de disponibilidad</div>
              <label>Suite<select value={room} onChange={(e) => setRoom(e.target.value)}>{rooms.map((item) => <option key={item.name}>{item.name}</option>)}</select></label>
              <div className="form-row">
                <label>Entrada<input type="date" min={today} value={checkIn} onChange={(e) => { setCheckIn(e.target.value); if (checkOut && checkOut <= e.target.value) setCheckOut('') }} required /></label>
                <label>Salida<input type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required /></label>
              </div>
              <label>Huéspedes<div className="guest-counter"><button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} aria-label="Reducir huéspedes" disabled={guests === 1}><Minus /></button><strong aria-live="polite">{guests}</strong><button type="button" onClick={() => setGuests(Math.min(4, guests + 1))} aria-label="Añadir huésped" disabled={guests === 4}><Plus /></button></div></label>
              <div className="estimate">
                <div><small>{nights > 0 ? `${selectedRoom.price}€ × ${nights} noche${nights > 1 ? 's' : ''}` : 'Selecciona tus fechas'}</small><strong>{nights > 0 ? `${total}€` : '—'}</strong></div>
                <span>{nights > 0 ? 'Total estimado' : 'Precio desde'}</span>
              </div>
              <button className="button button-full" type="submit" disabled={nights < 1}>Solicitar estancia <ArrowRight /></button>
              <small className="privacy"><ShieldCheck /> No se realizará ningún cobro en esta demo.</small>
            </form>
          </div>
        </section>

        <section className="section faq-section">
          <div className="container faq-grid">
            <div><span className="eyebrow">Antes de venir</span><h2>Preguntas frecuentes.</h2><p>Lo esencial para que llegues con todo claro y ninguna prisa.</p></div>
            <div className="faq-list">
              {faqs.map(([question, answer], index) => (
                <button className={`faq-item ${faqOpen === index ? 'open' : ''}`} key={question} onClick={() => setFaqOpen(faqOpen === index ? -1 : index)} aria-expanded={faqOpen === index} aria-controls={`faq-answer-${index}`}>
                  <span>{question}</span><ChevronDown />
                  <AnimatePresence initial={false}>{faqOpen === index && <motion.p id={`faq-answer-${index}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{answer}</motion.p>}</AnimatePresence>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contacto">
          <div className="contact-image" />
          <div className="container contact-content">
            <div><span className="eyebrow light">Estamos cerca</span><h2>Ven por la luz.<br />Quédate por cómo te hace sentir.</h2></div>
            <div className="contact-details">
              <a href="https://maps.google.com" target="_blank" rel="noreferrer"><MapPin /><span><small>Encuéntranos</small><strong>Calle del Mar, 18 · Alicante</strong></span></a>
              <a href="mailto:hola@casasalina.es"><Mail /><span><small>Escríbenos</small><strong>hola@casasalina.es</strong></span></a>
              <a href="tel:+34965000842"><Phone /><span><small>Llámanos</small><strong>+34 965 000 842</strong></span></a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-top">
          <Logo />
          <p>Un refugio mediterráneo de seis suites en el corazón de Alicante.</p>
          <div className="socials"><a href="#instagram" aria-label="Instagram"><Camera /></a><a href="mailto:hola@casasalina.es" aria-label="Correo"><Mail /></a></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 Casa Salina Alicante</span><div><a href="#legal">Aviso legal</a><a href="#privacidad">Privacidad</a><a href="#cookies">Cookies</a></div><span>Diseñado con intención.</span></div>
      </footer>

      <button
        className={`concierge-launcher ${conciergeOpen ? 'active' : ''}`}
        onClick={() => setConciergeOpen(!conciergeOpen)}
        aria-label={conciergeOpen ? 'Cerrar anfitrión digital' : 'Hablar con el anfitrión digital'}
        aria-expanded={conciergeOpen}
        aria-controls="concierge-panel"
      >
        {conciergeOpen ? (
          <X />
        ) : (
          <>
            <span className="launcher-avatar" aria-hidden="true">
              <img src="/salina-host.jpg" alt="" />
              <span className="launcher-status" />
            </span>
            <span className="launcher-copy">
              <strong>Habla con Salina</strong>
              <small>Anfitriona digital · En línea</small>
            </span>
          </>
        )}
      </button>

      <AnimatePresence>
        {conciergeOpen && (
          <motion.aside
            className="concierge-panel"
            id="concierge-panel"
            role="dialog"
            aria-modal="false"
            aria-label="Anfitrión digital de Casa Salina"
            initial={{ opacity: 0, y: 24, scale: .96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: .97 }}
          >
            <div className="concierge-header">
              <div className="concierge-avatar"><img src="/salina-host.jpg" alt="Retrato de Salina, anfitriona digital" /></div>
              <div><strong>Salina</strong><small>Anfitriona digital · En línea</small></div>
              {conciergeStep > 0 && (
                <button onClick={resetConcierge} aria-label="Volver al inicio de la conversación" title="Volver al inicio">
                  <RotateCcw />
                </button>
              )}
            </div>
            <div className="concierge-body" aria-live="polite">
              <div className="agent-message">
                <span>Salina</span>
                <p>Hola. Estoy aquí para ayudarte a encontrar tu forma de parar, sin comisiones y sin prisas.</p>
              </div>

              {travelIntent && <div className="guest-message"><p>{travelIntents.find(([value]) => value === travelIntent)?.[1]}</p></div>}
              {travelsWithPet !== null && <div className="guest-message"><p>{travelsWithPet ? 'Viajo con mi perro' : 'Esta vez, sin mascota'}</p></div>}
              {conciergeGuests !== null && <div className="guest-message"><p>{conciergeGuests} huésped{conciergeGuests > 1 ? 'es' : ''}</p></div>}
              {conciergeStep >= 5 && <div className="guest-message"><p>{formatStayDate(checkIn)} — {formatStayDate(checkOut)}</p></div>}

              {conciergeStep === 0 && (
                <div className="agent-message">
                  <span>Salina</span><p>¿Qué clase de viaje tienes en mente?</p>
                  <div className="concierge-options">
                    {travelIntents.map(([value, label]) => <button key={value} onClick={() => { setTravelIntent(value); setConciergeStep(1) }}>{label}</button>)}
                  </div>
                </div>
              )}

              {conciergeStep === 1 && (
                <div className="agent-message">
                  <span>Salina</span><p>¿Te acompaña un perro pequeño o mediano?</p>
                  <div className="concierge-options two"><button onClick={() => { setTravelsWithPet(true); setConciergeStep(2) }}><Dog /> Sí, viene conmigo</button><button onClick={() => { setTravelsWithPet(false); setConciergeStep(2) }}>Esta vez, no</button></div>
                </div>
              )}

              {conciergeStep === 2 && (
                <div className="agent-message">
                  <span>Salina</span><p>¿Cuántas personas vais a alojaros?</p>
                  <div className="concierge-options guest-pills">{[1, 2].map((value) => <button key={value} onClick={() => { setConciergeGuests(value); setConciergeStep(3) }}>{value}</button>)}</div>
                </div>
              )}

              {conciergeStep === 3 && (
                <div className="agent-message recommendation">
                  <span>Mi recomendación</span>
                  <h3>{conciergeRoom.name}</h3>
                  <p>{conciergeRoom.description}</p>
                  <div className="concierge-price"><strong>Desde {conciergeRoom.price}€</strong><small>por noche · total estimado al elegir fechas</small></div>
                  <button className="button button-full" onClick={() => setConciergeStep(4)}>Elegir mis fechas <CalendarDays /></button>
                  <small className="concierge-honesty"><ShieldCheck /> No consulto disponibilidad real ni realizo cobros.</small>
                </div>
              )}

              {conciergeStep === 4 && (
                <div className="agent-message concierge-dates">
                  <span>Salina</span>
                  <p>¿Cuándo te gustaría venir? Calcularé una estimación para {conciergeRoom.name}.</p>
                  <div className="concierge-date-grid">
                    <label>Entrada<input type="date" min={today} value={checkIn} onChange={(event) => { setCheckIn(event.target.value); if (checkOut && checkOut <= event.target.value) setCheckOut('') }} /></label>
                    <label>Salida<input type="date" min={checkIn || today} value={checkOut} onChange={(event) => setCheckOut(event.target.value)} /></label>
                  </div>
                  {checkIn && checkOut && nights < 1 && <small className="concierge-error">La salida debe ser posterior a la entrada.</small>}
                  <button className="button button-full" disabled={nights < 1} onClick={() => setConciergeStep(5)}>Ver resumen <ArrowRight /></button>
                </div>
              )}

              {conciergeStep === 5 && (
                <div className="agent-message recommendation concierge-summary">
                  <span>Tu estancia, de un vistazo</span>
                  <h3>{conciergeRoom.name}</h3>
                  <dl>
                    <div><dt>Fechas</dt><dd>{formatStayDate(checkIn)} — {formatStayDate(checkOut)}</dd></div>
                    <div><dt>Estancia</dt><dd>{nights} noche{nights > 1 ? 's' : ''}</dd></div>
                    <div><dt>Huéspedes</dt><dd>{conciergeGuests ?? 2}{travelsWithPet ? ' + perro' : ''}</dd></div>
                    <div className="summary-total"><dt>Total estimado</dt><dd>{conciergeTotal}€</dd></div>
                  </dl>
                  <button className="button button-full" onClick={prepareConciergeBooking}>Preparar solicitud <ArrowRight /></button>
                  <button className="concierge-back" onClick={() => setConciergeStep(4)}>Cambiar fechas</button>
                  <small className="concierge-honesty"><ShieldCheck /> Importe orientativo. Confirmaremos disponibilidad antes de cualquier pago.</small>
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {galleryIndex !== null && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Galería de Casa Salina" onClick={(event) => { if (event.target === event.currentTarget) setGalleryIndex(null) }}>
            <button className="lightbox-close" onClick={() => setGalleryIndex(null)} aria-label="Cerrar galería" autoFocus><X /></button>
            <button className="lightbox-nav prev" onClick={() => setGalleryIndex((galleryIndex - 1 + gallery.length) % gallery.length)} aria-label="Imagen anterior"><ChevronLeft /></button>
            <motion.img key={gallery[galleryIndex].src} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} src={gallery[galleryIndex].src} alt={gallery[galleryIndex].alt} />
            <button className="lightbox-nav next" onClick={() => setGalleryIndex((galleryIndex + 1) % gallery.length)} aria-label="Imagen siguiente"><ChevronRight /></button>
            <div className="lightbox-caption">{gallery[galleryIndex].alt} · {galleryIndex + 1}/{gallery.length}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div className="toast" initial={{ opacity: 0, y: 40, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }} role="status" aria-live="polite">
            <span><Check /></span><div><strong>Solicitud preparada</strong><p>En una web real, esto conectaría con el motor de reservas o el correo del alojamiento.</p></div><button onClick={() => setToast(false)} aria-label="Cerrar confirmación"><X /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
