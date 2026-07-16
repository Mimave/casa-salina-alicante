import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import {
  ArrowRight,
  Accessibility,
  Car,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Compass,
  Dog,
  Languages,
  Camera,
  Mail,
  MapPin,
  MessageCircle,
  Menu,
  Minus,
  ParkingCircle,
  Phone,
  Plus,
  Quote,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Sun,
  Utensils,
  Waves,
  WashingMachine,
  Wifi,
  X,
} from 'lucide-react'

type Room = {
  name: string
  label: string
  labelEn: string
  price: number
  size: string
  guests: string
  guestsEn: string
  image: string
  description: string
  descriptionEn: string
  features: string[]
  featuresEn: string[]
  maxGuests: number
  petFriendly?: boolean
  accessible?: boolean
}

type GalleryItem = {
  src: string
  alt: string
  altEn: string
  size: 'wide' | 'tall' | 'normal'
}

const rooms: Room[] = [
  {
    name: 'Suite Sal',
    label: 'La más luminosa',
    labelEn: 'The brightest',
    price: 185,
    size: '32 m²',
    guests: '2 huéspedes',
    guestsEn: '2 guests',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=88',
    description: 'Texturas naturales, balcón francés y luz de levante desde primera hora.',
    descriptionEn: 'Natural textures, a French balcony and Levante light from the very first hour.',
    features: ['Cama king', 'Balcón', 'Ducha efecto lluvia'],
    featuresEn: ['King bed', 'Balcony', 'Rainfall shower'],
    maxGuests: 2,
  },
  {
    name: 'Suite Arena',
    label: 'Favorita para parejas',
    labelEn: 'Made for two',
    price: 215,
    size: '38 m²',
    guests: '2 huéspedes',
    guestsEn: '2 guests',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=88',
    description: 'Una suite serena con bañera exenta y rincón de lectura frente al patio.',
    descriptionEn: 'A serene suite with a freestanding bath and a reading corner facing the courtyard.',
    features: ['Bañera', 'Patio privado', 'Honesty bar'],
    featuresEn: ['Freestanding bath', 'Private courtyard', 'Honesty bar'],
    maxGuests: 2,
  },
  {
    name: 'Suite Brisa',
    label: 'Pet friendly',
    labelEn: 'Pet friendly',
    price: 245,
    size: '44 m²',
    guests: '2 + mascota',
    guestsEn: '2 + pet',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1400&q=88',
    description: 'Más espacio, terraza íntima y un kit de bienvenida para tu compañero de viaje.',
    descriptionEn: 'More room, an intimate terrace and a welcome kit for your travel companion.',
    features: ['Terraza', 'Pet kit', 'Zona lounge'],
    featuresEn: ['Terrace', 'Pet kit', 'Lounge area'],
    maxGuests: 2,
    petFriendly: true,
  },
  {
    name: 'Suite Luz',
    label: 'Accesibilidad serena',
    labelEn: 'Thoughtful accessibility',
    price: 225,
    size: '40 m²',
    guests: '2 huéspedes',
    guestsEn: '2 guests',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1400&q=88',
    description: 'Acceso sin escalones, circulación amplia y ducha a ras de suelo con la misma calidez de la casa.',
    descriptionEn: 'Step-free access, generous circulation and a walk-in shower with Casa Salina warmth.',
    features: ['Acceso sin escalones', 'Ducha adaptada', 'Zona de descanso'],
    featuresEn: ['Step-free access', 'Adapted shower', 'Resting area'],
    maxGuests: 2,
    accessible: true,
  },
  {
    name: 'Suite Duna',
    label: 'Para viajar en familia',
    labelEn: 'For a small family',
    price: 265,
    size: '48 m²',
    guests: 'Hasta 3 huéspedes',
    guestsEn: 'Up to 3 guests',
    image: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&w=1400&q=88',
    description: 'Dormitorio amplio y cama auxiliar preparada bajo petición para una estancia familiar tranquila.',
    descriptionEn: 'A generous bedroom and an extra bed prepared on request for a calm family stay.',
    features: ['Cama king', 'Cama auxiliar', 'Rincón de desayuno'],
    featuresEn: ['King bed', 'Extra bed', 'Breakfast corner'],
    maxGuests: 3,
  },
  {
    name: 'Suite Faro',
    label: 'La más espaciosa',
    labelEn: 'The most spacious',
    price: 295,
    size: '56 m²',
    guests: 'Hasta 4 huéspedes',
    guestsEn: 'Up to 4 guests',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1400&q=88',
    description: 'Dos ambientes conectados para compartir Alicante sin renunciar al espacio ni a la calma.',
    descriptionEn: 'Two connected living spaces to share Alicante without giving up calm or room to breathe.',
    features: ['Dos ambientes', 'Sofá cama', 'Mesa para cuatro'],
    featuresEn: ['Two living spaces', 'Sofa bed', 'Table for four'],
    maxGuests: 4,
  },
]

const gallery: GalleryItem[] = [
  { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=88', alt: 'Fachada mediterránea de Casa Salina', altEn: 'Mediterranean facade of Casa Salina', size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=88', alt: 'Suite en tonos arena', altEn: 'Suite in sand tones', size: 'tall' },
  { src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=88', alt: 'Salón de diseño mediterráneo', altEn: 'Mediterranean design lounge', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=88', alt: 'Desayuno servido en la terraza', altEn: 'Breakfast served on the terrace', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=88', alt: 'Patio con piscina y vegetación', altEn: 'Courtyard with pool and greenery', size: 'tall' },
  { src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=88', alt: 'Zona de bienestar y descanso', altEn: 'Wellbeing and rest area', size: 'wide' },
]

const faqs = [
  ['¿La reserva directa tiene ventajas?', 'Sí. Incluye mejor tarifa disponible, detalle de bienvenida y salida tardía sujeta a disponibilidad.'],
  ['¿Aceptáis mascotas?', 'Sí, aceptamos perros pequeños y medianos en Suite Brisa. Preparamos cama, cuenco y una guía de paseos.'],
  ['¿Hay opciones sin gluten?', 'Nuestro desayuno puede ser completamente sin gluten con aviso previo. También adaptamos opciones vegetarianas.'],
  ['¿A qué distancia está la playa?', 'La Explanada está a 7 minutos a pie y la playa del Postiguet a unos 12 minutos caminando.'],
]

const faqsEn = [
  ['Does booking direct have advantages?', 'Yes. It includes the best available rate, a welcome detail and late check-out subject to availability.'],
  ['Do you welcome pets?', 'Yes, we welcome small and medium dogs in Suite Brisa. We prepare a bed, bowl and walking guide.'],
  ['Are gluten-free options available?', 'Our breakfast can be completely gluten-free with advance notice. Vegetarian options are available too.'],
  ['How far is the beach?', 'The Explanada is a 7-minute walk and Postiguet beach is around 12 minutes on foot.'],
]

const experiences = [
  {
    icon: Sun,
    eyebrow: 'Mañana lenta',
    eyebrowEn: 'A slow morning',
    title: 'Desayuno de mercado',
    titleEn: 'Market breakfast',
    text: 'Producto local, café de especialidad y opciones sin gluten servidas sin prisa.',
    textEn: 'Local produce, speciality coffee and gluten-free options served without hurry.',
  },
  {
    icon: Compass,
    eyebrow: 'Alicante secreto',
    eyebrowEn: 'Hidden Alicante',
    title: 'Ruta con anfitrión',
    titleEn: 'A local route',
    text: 'Una guía curada de patios, talleres, calas y mesas que no aparecen en las listas obvias.',
    textEn: 'A curated guide to courtyards, workshops, coves and tables beyond the obvious lists.',
  },
  {
    icon: Waves,
    eyebrow: 'Mar al atardecer',
    eyebrowEn: 'Sea at sunset',
    title: 'Navegación privada',
    titleEn: 'Private sailing',
    text: 'Dos horas de costa, baño y aperitivo mediterráneo para cerrar el día sobre el agua.',
    textEn: 'Two hours of coastline, a swim and a Mediterranean aperitif to close the day on the water.',
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

const amenityLabelsEn = ['High-speed Wi-Fi', 'Speciality coffee', 'Adaptable breakfast', 'Pet friendly', 'Partner parking', 'Secure booking']

const localServices = [
  { icon: WashingMachine, title: 'Lavandería local', titleEn: 'Local laundry', text: 'Recogida y entrega coordinadas con un comercio de proximidad.', textEn: 'Collection and delivery coordinated with a local business.' },
  { icon: Car, title: 'Movilidad', titleEn: 'Getting around', text: 'Traslados y alquiler de vehículo gestionados directamente con el proveedor.', textEn: 'Transfers and car hire arranged directly with the provider.' },
  { icon: ShoppingBag, title: 'Comercios cercanos', titleEn: 'Nearby essentials', text: 'Mercados, farmacia y compras útiles seleccionadas para evitar desplazamientos.', textEn: 'Markets, pharmacy and useful shops selected to keep things easy.' },
  { icon: Compass, title: 'Experiencias locales', titleEn: 'Local experiences', text: 'Rutas, talleres y propuestas culturales vinculadas con la comunidad.', textEn: 'Routes, workshops and cultural ideas rooted in the community.' },
  { icon: Accessibility, title: 'Estancia accesible', titleEn: 'Accessible stay', text: 'Orientación previa sobre accesos, movilidad y necesidades concretas de la estancia.', textEn: 'Guidance on access, mobility and the practical needs of each stay.' },
  { icon: MessageCircle, title: 'Continuidad por WhatsApp', titleEn: 'WhatsApp continuity', text: 'Salina prepara el contexto y permite solicitar el traspaso explícito a una persona.', textEn: 'Salina prepares the context and offers an explicit handover to a person.' },
] as const

const travelIntents = [
  ['pareja', 'Una escapada en pareja', 'A getaway for two'],
  ['descanso', 'Necesito descansar', 'I need to rest'],
  ['alicante', 'Quiero descubrir Alicante', 'I want to discover Alicante'],
  ['trabajo', 'Viajo por trabajo', 'I am travelling for work'],
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
  const [language, setLanguage] = useState<'es' | 'en'>('es')
  const [menuOpen, setMenuOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null)
  const [faqOpen, setFaqOpen] = useState(0)
  const [guests, setGuests] = useState(2)
  const [room, setRoom] = useState(rooms[0].name)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [draftReady, setDraftReady] = useState(false)
  const [draftSaved, setDraftSaved] = useState(false)
  const [toast, setToast] = useState(false)
  const [conciergeOpen, setConciergeOpen] = useState(false)
  const [conciergeStep, setConciergeStep] = useState(0)
  const [travelIntent, setTravelIntent] = useState<TravelIntent | null>(null)
  const [travelsWithPet, setTravelsWithPet] = useState<boolean | null>(null)
  const [conciergeGuests, setConciergeGuests] = useState<number | null>(null)
  const today = new Date().toISOString().split('T')[0]
  const isEnglish = language === 'en'
  const activeFaqs = isEnglish ? faqsEn : faqs

  const selectedRoom = rooms.find((item) => item.name === room) ?? rooms[0]

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0
    const start = new Date(`${checkIn}T12:00:00`)
    const end = new Date(`${checkOut}T12:00:00`)
    return Math.max(0, Math.round((end.getTime() - start.getTime()) / 86_400_000))
  }, [checkIn, checkOut])

  const total = nights * selectedRoom.price

  useEffect(() => {
    if (guests > selectedRoom.maxGuests) setGuests(selectedRoom.maxGuests)
  }, [guests, selectedRoom.maxGuests])

  useEffect(() => {
    document.documentElement.lang = language
    window.localStorage.setItem('casa-salina-language', language)
  }, [language])

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem('casa-salina-language')
    if (savedLanguage === 'en' || savedLanguage === 'es') setLanguage(savedLanguage)
  }, [])

  useEffect(() => {
    try {
      const savedDraft = window.localStorage.getItem('casa-salina-booking-draft-v1')
      if (savedDraft) {
        const draft = JSON.parse(savedDraft) as Partial<{ room: string; guests: number; checkIn: string; checkOut: string; guestName: string; guestEmail: string; guestPhone: string; privacyAccepted: boolean }>
        if (typeof draft.room === 'string' && rooms.some((item) => item.name === draft.room)) setRoom(draft.room)
        if (typeof draft.guests === 'number' && draft.guests >= 1 && draft.guests <= 4) setGuests(draft.guests)
        if (typeof draft.checkIn === 'string') setCheckIn(draft.checkIn)
        if (typeof draft.checkOut === 'string') setCheckOut(draft.checkOut)
        if (typeof draft.guestName === 'string') setGuestName(draft.guestName)
        if (typeof draft.guestEmail === 'string') setGuestEmail(draft.guestEmail)
        if (typeof draft.guestPhone === 'string') setGuestPhone(draft.guestPhone)
        if (typeof draft.privacyAccepted === 'boolean') setPrivacyAccepted(draft.privacyAccepted)
      }
    } catch {
      // The page remains usable if a browser blocks or clears local storage.
    } finally {
      setDraftReady(true)
    }
  }, [])

  useEffect(() => {
    if (!draftReady) return
    try {
      window.localStorage.setItem('casa-salina-booking-draft-v1', JSON.stringify({ room, guests, checkIn, checkOut, guestName, guestEmail, guestPhone, privacyAccepted, savedAt: new Date().toISOString() }))
      setDraftSaved(true)
    } catch {
      setDraftSaved(false)
    }
  }, [room, guests, checkIn, checkOut, guestName, guestEmail, guestPhone, privacyAccepted, draftReady])

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

  const conciergeRoom = travelsWithPet && (conciergeGuests ?? 2) <= rooms[2].maxGuests
    ? rooms[2]
    : (conciergeGuests ?? 2) >= 4
      ? rooms[5]
      : (conciergeGuests ?? 2) === 3
        ? rooms[4]
        : travelIntent === 'pareja'
          ? rooms[1]
          : rooms[0]
  const conciergeTotal = nights * conciergeRoom.price

  const formatStayDate = (value: string) => new Intl.DateTimeFormat(isEnglish ? 'en-GB' : 'es-ES', {
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
        <nav className="nav container" aria-label={isEnglish ? 'Primary navigation' : 'Navegación principal'}>
          <Logo />
          <div className="nav-links">
            <a href="#habitaciones">Suites</a>
            <a href="#experiencias">{isEnglish ? 'Experiences' : 'Experiencias'}</a>
            <a href="#galeria">{isEnglish ? 'Gallery' : 'Galería'}</a>
            <a href="#contacto">{isEnglish ? 'Contact' : 'Contacto'}</a>
          </div>
          <button className="language-switch" onClick={() => setLanguage(isEnglish ? 'es' : 'en')} aria-label={isEnglish ? 'Cambiar a español' : 'Switch to English'}><Languages size={16} /><span>{isEnglish ? 'ES' : 'EN'}</span></button>
          <button className="button button-small" onClick={scrollToBooking}>{isEnglish ? 'Book now' : 'Reservar'}</button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? (isEnglish ? 'Close menu' : 'Cerrar menú') : (isEnglish ? 'Open menu' : 'Abrir menú')} aria-expanded={menuOpen} aria-controls="menu-movil">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>
        <AnimatePresence>
          {menuOpen && (
            <motion.div className="mobile-menu" id="menu-movil" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {([
                ['habitaciones', 'Suites'],
                ['experiencias', isEnglish ? 'Experiences' : 'Experiencias'],
                ['galeria', isEnglish ? 'Gallery' : 'Galería'],
                ['contacto', isEnglish ? 'Contact' : 'Contacto'],
              ] as const).map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
              <button className="button" onClick={() => { setMenuOpen(false); scrollToBooking() }}>{isEnglish ? 'Book now' : 'Reservar ahora'}</button>
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
              <span className="eyebrow light"><Sparkles size={15} /> {isEnglish ? 'Six suites · Central Alicante' : 'Seis suites · Alicante centro'}</span>
              <h1>{isEnglish ? <>Mediterranean calm, <em>inside your own door.</em></> : <>La calma del Mediterráneo, <em>puertas adentro.</em></>}</h1>
              <p>{isEnglish ? 'A boutique stay for sleeping well, discovering slowly and feeling Alicante as if it had always been yours.' : 'Una casa boutique para dormir bien, descubrir despacio y sentir Alicante como si siempre hubiera sido tuya.'}</p>
              <div className="hero-actions">
                <button className="button button-light" onClick={scrollToBooking}>{isEnglish ? 'Check availability' : 'Consultar disponibilidad'} <ArrowRight size={17} /></button>
                <a className="text-link light-link" href="#habitaciones">{isEnglish ? 'Discover the suites' : 'Descubrir las suites'} <ArrowRight size={16} /></a>
              </div>
            </motion.div>
            <motion.div className="hero-proof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5, duration: .8 }}>
              <div className="rating"><span>9,6</span><div><strong>{isEnglish ? 'Exceptional' : 'Excepcional'}</strong><small>{isEnglish ? '128 verified guests' : '128 huéspedes verificados'}</small></div></div>
              <div className="mini-stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
            </motion.div>
          </div>
          <a className="scroll-cue" href="#intro"><span>{isEnglish ? 'Discover' : 'Descubrir'}</span><i /></a>
        </section>

        <section className="intro section" id="intro">
          <div className="container intro-grid">
            <div>
              <span className="eyebrow">{isEnglish ? 'A home with its own rhythm' : 'Una casa con ritmo propio'}</span>
              <h2>{isEnglish ? <>Less hotel.<br />More retreat.</> : <>Menos hotel.<br />Más refugio.</>}</h2>
            </div>
            <div className="intro-copy">
              <p className="lead">{isEnglish ? 'Casa Salina lives in a former Alicante home restored with honest materials, natural light and one simple obsession: that you truly rest.' : 'Casa Salina nace en una antigua vivienda alicantina restaurada con materiales honestos, luz natural y una obsesión sencilla: que descanses de verdad.'}</p>
              <p>{isEnglish ? 'There is no impersonal front desk or impossible schedule here. There are handmade recommendations, local breakfast, quiet corners and a team that remembers how you take your coffee.' : 'Aquí no hay recepción impersonal ni horarios imposibles. Hay recomendaciones hechas a mano, desayuno local, rincones silenciosos y un equipo que recuerda cómo te gusta el café.'}</p>
              <div className="signature">{isEnglish ? 'Made to stay in your memory.' : 'Hecho para quedarse en la memoria.'}</div>
            </div>
          </div>
          <div className="container amenities">
            {amenityItems.map(([Icon, label], index) => (
              <div className="amenity" key={label}><Icon size={21} strokeWidth={1.6} /><span>{isEnglish ? amenityLabelsEn[index] : label}</span></div>
            ))}
          </div>
        </section>

        <section className="section rooms-section" id="habitaciones">
          <div className="container">
            <div className="section-heading split-heading">
              <div><span className="eyebrow">{isEnglish ? 'Sleep close to the sea' : 'Dormir junto al mar'}</span><h2>{isEnglish ? 'Choose your way to pause.' : 'Elige tu forma de parar.'}</h2></div>
              <p>{isEnglish ? 'Six suites only, each different and connected by a single palette of lime, sand and sage green.' : 'Solo seis suites, todas diferentes, conectadas por una misma paleta de cal, arena y verde salvia.'}</p>
            </div>
            <div className="room-grid">
              {rooms.map((item, index) => (
                <motion.article className="room-card" key={item.name} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ delay: index * .12 }}>
                  <div className="room-image-wrap">
                    <img src={item.image} alt={item.name} loading="lazy" />
                    <span className="room-label">{isEnglish ? item.labelEn : item.label}</span>
                    <button className="round-button" onClick={() => { setRoom(item.name); scrollToBooking() }} aria-label={`${isEnglish ? 'Book' : 'Reservar'} ${item.name}`}><ArrowRight /></button>
                  </div>
                  <div className="room-body">
                    <div className="room-title-row"><div><h3>{item.name}</h3><span>{item.size} · {isEnglish ? item.guestsEn : item.guests}</span></div><div className="price"><small>{isEnglish ? 'from' : 'desde'}</small><strong>{item.price}€</strong><small>{isEnglish ? '/ night' : '/ noche'}</small></div></div>
                    <p>{isEnglish ? item.descriptionEn : item.description}</p>
                    <ul>{(isEnglish ? item.featuresEn : item.features).map((feature) => <li key={feature}><Check size={14} />{feature}</li>)}</ul>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="quote-section section">
          <div className="container quote-card">
            <Quote size={38} strokeWidth={1.3} />
            <blockquote>{isEnglish ? '“We did not want a perfect hotel. We wanted a place that felt authentic, kind and difficult to forget.”' : '“No queríamos un hotel perfecto. Queríamos un lugar que se sintiera auténtico, amable y difícil de olvidar.”'}</blockquote>
            <div className="quote-author"><span>MI</span><div><strong>Marina Iborra</strong><small>{isEnglish ? 'Host of Casa Salina' : 'Anfitriona de Casa Salina'}</small></div></div>
          </div>
        </section>

        <section className="section experiences-section" id="experiencias">
          <div className="container">
            <div className="section-heading centered"><span className="eyebrow">{isEnglish ? 'Beyond the room' : 'Más allá de la habitación'}</span><h2>{isEnglish ? 'Alicante, beautifully told.' : 'Alicante, bien contada.'}</h2><p>{isEnglish ? 'Human-scale experiences to enter the rhythm of the city, rather than simply pass through it.' : 'Experiencias de escala humana para entrar en el ritmo de la ciudad, no simplemente pasar por ella.'}</p></div>
            <div className="experience-grid">
              {experiences.map(({ icon: Icon, eyebrow, eyebrowEn, title, titleEn, text, textEn }, index) => (
                <motion.article className="experience-card" key={title} initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <div className="experience-number">0{index + 1}</div>
                  <div className="experience-icon"><Icon size={25} strokeWidth={1.5} /></div>
                  <span>{isEnglish ? eyebrowEn : eyebrow}</span><h3>{isEnglish ? titleEn : title}</h3><p>{isEnglish ? textEn : text}</p><a href="#contacto">{isEnglish ? 'Find out more' : 'Quiero saber más'} <ArrowRight size={15} /></a>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section gallery-section" id="galeria">
          <div className="container">
            <div className="section-heading split-heading"><div><span className="eyebrow">{isEnglish ? 'A look inside' : 'Una mirada dentro'}</span><h2>{isEnglish ? 'The house, unfiltered.' : 'La casa, sin filtros.'}</h2></div><p>{isEnglish ? 'Every image tells a part of the story: morning light, cool stone and the small gestures that make a home.' : 'Cada imagen cuenta una parte: la luz de la mañana, la piedra fresca y los pequeños gestos que hacen hogar.'}</p></div>
            <div className="gallery-grid">
              {gallery.map((item, index) => (
                <button className={`gallery-item ${item.size}`} key={item.src} onClick={() => setGalleryIndex(index)} aria-label={`${isEnglish ? 'Enlarge image' : 'Ampliar imagen'}: ${isEnglish ? item.altEn : item.alt}`}>
                  <img src={item.src} alt={isEnglish ? item.altEn : item.alt} loading="lazy" />
                  <span><Plus size={22} /></span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section booking-section" id="reservar">
          <div className="container booking-grid">
            <div className="booking-copy">
              <span className="eyebrow light">{isEnglish ? 'Book direct' : 'Reserva directa'}</span>
              <h2>{isEnglish ? 'Your next pause starts here.' : 'Tu próxima pausa empieza aquí.'}</h2>
              <p>{isEnglish ? 'Check your stay in under a minute. No commissions, human support and exclusive benefits.' : 'Consulta una estancia en menos de un minuto. Sin comisiones, con atención humana y ventajas exclusivas.'}</p>
              <ul><li><Check /> {isEnglish ? 'Best available rate' : 'Mejor tarifa disponible'}</li><li><Check /> {isEnglish ? 'A welcome detail' : 'Detalle de bienvenida'}</li><li><Check /> {isEnglish ? 'Flexible changes up to 7 days before' : 'Cambios flexibles hasta 7 días antes'}</li></ul>
              <div className="booking-contact"><Phone size={18} /><div><small>{isEnglish ? 'Prefer to talk?' : '¿Prefieres hablar?'}</small><strong>+34 965 000 842</strong></div></div>
            </div>
            <form className="booking-form" onSubmit={submitBooking}>
              <div className="form-kicker"><CalendarDays /> {isEnglish ? 'Availability request' : 'Consulta de disponibilidad'}</div>
              <label>Suite<select value={room} onChange={(e) => setRoom(e.target.value)}>{rooms.map((item) => <option key={item.name} value={item.name}>{item.name} · {isEnglish ? 'max.' : 'máx.'} {item.maxGuests}</option>)}</select></label>
              <div className="form-row">
                <label>{isEnglish ? 'Check-in' : 'Entrada'}<input type="date" min={today} value={checkIn} onChange={(e) => { setCheckIn(e.target.value); if (checkOut && checkOut <= e.target.value) setCheckOut('') }} required /></label>
                <label>{isEnglish ? 'Check-out' : 'Salida'}<input type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required /></label>
              </div>
              <label>{isEnglish ? 'Guests' : 'Huéspedes'}<div className="guest-counter"><button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} aria-label={isEnglish ? 'Reduce guests' : 'Reducir huéspedes'} disabled={guests === 1}><Minus /></button><strong aria-live="polite">{guests}</strong><button type="button" onClick={() => setGuests(Math.min(selectedRoom.maxGuests, guests + 1))} aria-label={isEnglish ? 'Add guest' : 'Añadir huésped'} disabled={guests === selectedRoom.maxGuests}><Plus /></button></div><small className="capacity-note">{isEnglish ? `Maximum capacity for ${selectedRoom.name}: ${selectedRoom.maxGuests} guest${selectedRoom.maxGuests > 1 ? 's' : ''}.` : `Capacidad máxima de ${selectedRoom.name}: ${selectedRoom.maxGuests} huésped${selectedRoom.maxGuests > 1 ? 'es' : ''}.`}</small></label>
              <div className="estimate">
                <div><small>{nights > 0 ? `${selectedRoom.price}€ × ${nights} ${isEnglish ? `night${nights > 1 ? 's' : ''}` : `noche${nights > 1 ? 's' : ''}`}` : (isEnglish ? 'Choose your dates' : 'Selecciona tus fechas')}</small><strong>{nights > 0 ? `${total}€` : '—'}</strong></div>
                <span>{nights > 0 ? (isEnglish ? 'Estimated total' : 'Total estimado') : (isEnglish ? 'Price from' : 'Precio desde')}</span>
              </div>
              <div className="request-details">
                <span className="request-details-title">{isEnglish ? 'Your details to prepare the request' : 'Tus datos para preparar la solicitud'}</span>
                <div className="form-row">
                  <label>{isEnglish ? 'Name' : 'Nombre'}<input type="text" autoComplete="name" value={guestName} onChange={(event) => setGuestName(event.target.value)} required /></label>
                  <label>{isEnglish ? 'Email' : 'Correo'}<input type="email" autoComplete="email" value={guestEmail} onChange={(event) => setGuestEmail(event.target.value)} required /></label>
                </div>
                <label>{isEnglish ? 'Phone or WhatsApp' : 'Teléfono o WhatsApp'}<input type="tel" autoComplete="tel" value={guestPhone} onChange={(event) => setGuestPhone(event.target.value)} required /></label>
                <label className="consent-check"><input type="checkbox" checked={privacyAccepted} onChange={(event) => setPrivacyAccepted(event.target.checked)} required /><span>{isEnglish ? 'I agree that these details are used only to manage this stay request.' : 'Acepto que estos datos se utilicen únicamente para gestionar esta solicitud de estancia.'}</span></label>
              </div>
              <button className="button button-full" type="submit" disabled={nights < 1 || !privacyAccepted}>{isEnglish ? 'Prepare request' : 'Preparar solicitud'} <ArrowRight /></button>
              <small className="privacy"><ShieldCheck /> {isEnglish ? 'Functional demo: availability is not checked and no charge is made.' : 'Demo funcional: no se comprueba disponibilidad ni se realiza ningún cobro.'}</small>
              <small className="draft-status"><ShieldCheck /> {draftSaved ? (isEnglish ? 'Your draft is saved on this device as you type. It contains no passwords.' : 'Tu borrador se guarda en este dispositivo mientras escribes. No contiene contraseñas.') : (isEnglish ? 'This browser cannot save a local draft.' : 'Este navegador no puede guardar el borrador local.')}</small>
            </form>
          </div>
        </section>

        <section className="section local-services-section" id="servicios-locales">
          <div className="container">
            <div className="section-heading split-heading">
              <div><span className="eyebrow">{isEnglish ? 'A local network' : 'Red de proximidad'}</span><h2>{isEnglish ? 'What you need, nearby.' : 'Lo que necesitas, cerca.'}</h2></div>
              <p>{isEnglish ? 'Salina can connect each stay with services from its community, while contracts and payments remain directly between guest and provider.' : 'Salina está preparada para conectar cada alojamiento con servicios de su comunidad, manteniendo la contratación y el pago directamente entre huésped y proveedor.'}</p>
            </div>
            <div className="local-services-grid">
              {localServices.map(({ icon: Icon, title, titleEn, text, textEn }) => <article className="local-service-card" key={title}><Icon /><h3>{isEnglish ? titleEn : title}</h3><p>{isEnglish ? textEn : text}</p><span>{isEnglish ? 'Demonstration capability' : 'Capacidad demostrativa'}</span></article>)}
            </div>
            <div className="prototype-disclosure"><ShieldCheck /><p><strong>{isEnglish ? 'Configurable prototype.' : 'Prototipo configurable.'}</strong> {isEnglish ? 'The services shown are examples. In a live implementation, only providers verified by the accommodation are activated; each provider confirms availability, contracts and charges the guest directly.' : 'Los servicios mostrados son ejemplos. En una implementación real se activan únicamente colaboradores verificados por el alojamiento; cada proveedor confirma disponibilidad, contrata y cobra directamente al huésped.'}</p></div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="container faq-grid">
            <div><span className="eyebrow">{isEnglish ? 'Before you arrive' : 'Antes de venir'}</span><h2>{isEnglish ? 'Frequently asked questions.' : 'Preguntas frecuentes.'}</h2><p>{isEnglish ? 'The essentials, so you arrive with everything clear and without hurry.' : 'Lo esencial para que llegues con todo claro y ninguna prisa.'}</p></div>
            <div className="faq-list">
              {activeFaqs.map(([question, answer], index) => (
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
            <div><span className="eyebrow light">{isEnglish ? 'We are nearby' : 'Estamos cerca'}</span><h2>{isEnglish ? <>Come for the light.<br />Stay for how it makes you feel.</> : <>Ven por la luz.<br />Quédate por cómo te hace sentir.</>}</h2></div>
            <div className="contact-details">
              <a href="https://maps.google.com" target="_blank" rel="noreferrer"><MapPin /><span><small>{isEnglish ? 'Find us' : 'Encuéntranos'}</small><strong>Calle del Mar, 18 · Alicante</strong></span></a>
              <a href="mailto:hola@casasalina.es"><Mail /><span><small>{isEnglish ? 'Write to us' : 'Escríbenos'}</small><strong>hola@casasalina.es</strong></span></a>
              <a href="tel:+34965000842"><Phone /><span><small>{isEnglish ? 'Call us' : 'Llámanos'}</small><strong>+34 965 000 842</strong></span></a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-top">
          <Logo />
          <p>{isEnglish ? 'A Mediterranean retreat of six suites in the heart of Alicante.' : 'Un refugio mediterráneo de seis suites en el corazón de Alicante.'}</p>
          <div className="socials"><a href="#instagram" aria-label="Instagram"><Camera /></a><a href="mailto:hola@casasalina.es" aria-label="Correo"><Mail /></a></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 Casa Salina Alicante</span><div><a href="#legal">{isEnglish ? 'Legal notice' : 'Aviso legal'}</a><a href="#privacidad">{isEnglish ? 'Privacy' : 'Privacidad'}</a><a href="#cookies">Cookies</a></div><span>{isEnglish ? 'Designed with intention.' : 'Diseñado con intención.'}</span></div>
      </footer>

      <button
        className={`concierge-launcher ${conciergeOpen ? 'active' : ''}`}
        onClick={() => setConciergeOpen(!conciergeOpen)}
        aria-label={conciergeOpen ? (isEnglish ? 'Close digital host' : 'Cerrar anfitrión digital') : (isEnglish ? 'Talk to the digital host' : 'Hablar con el anfitrión digital')}
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
              <strong>{isEnglish ? 'Talk to Salina' : 'Habla con Salina'}</strong>
              <small>{isEnglish ? 'Digital host · Online' : 'Anfitriona digital · En línea'}</small>
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
            aria-label={isEnglish ? 'Casa Salina digital host' : 'Anfitriona digital de Casa Salina'}
            initial={{ opacity: 0, y: 24, scale: .96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: .97 }}
          >
            <div className="concierge-header">
              <div className="concierge-avatar"><img src="/salina-host.jpg" alt={isEnglish ? 'Portrait of Salina, digital host' : 'Retrato de Salina, anfitriona digital'} /></div>
              <div><strong>Salina</strong><small>{isEnglish ? 'Digital host · Online' : 'Anfitriona digital · En línea'}</small></div>
              {conciergeStep > 0 && (
                <button onClick={resetConcierge} aria-label={isEnglish ? 'Restart this conversation' : 'Volver al inicio de la conversación'} title={isEnglish ? 'Start again' : 'Volver al inicio'}>
                  <RotateCcw />
                </button>
              )}
            </div>
            <div className="concierge-body" aria-live="polite">
              <div className="agent-message">
                <span>Salina</span>
                <p>{isEnglish ? 'Hello. I am here to help you find your own way to pause, without commission and without hurry.' : 'Hola. Estoy aquí para ayudarte a encontrar tu forma de parar, sin comisiones y sin prisas.'}</p>
                <small className="concierge-scope">{isEnglish ? 'I can help with Casa Salina, its stays and services. For anything else, I will connect you with the team.' : 'Puedo ayudarte con Casa Salina, sus estancias y servicios. Para cualquier otro asunto, te pondré en contacto con el equipo.'}</small>
              </div>

              {travelIntent && <div className="guest-message"><p>{travelIntents.find(([value]) => value === travelIntent)?.[isEnglish ? 2 : 1]}</p></div>}
              {travelsWithPet !== null && <div className="guest-message"><p>{travelsWithPet ? (isEnglish ? 'I am travelling with my dog' : 'Viajo con mi perro') : (isEnglish ? 'Not this time' : 'Esta vez, sin mascota')}</p></div>}
              {conciergeGuests !== null && <div className="guest-message"><p>{conciergeGuests} {isEnglish ? `guest${conciergeGuests > 1 ? 's' : ''}` : `huésped${conciergeGuests > 1 ? 'es' : ''}`}</p></div>}
              {conciergeStep >= 5 && <div className="guest-message"><p>{formatStayDate(checkIn)} — {formatStayDate(checkOut)}</p></div>}

              {conciergeStep === 0 && (
                <div className="agent-message">
                  <span>Salina</span><p>{isEnglish ? 'What kind of trip do you have in mind?' : '¿Qué clase de viaje tienes en mente?'}</p>
                  <div className="concierge-options">
                    {travelIntents.map(([value, label, labelEn]) => <button key={value} onClick={() => { setTravelIntent(value); setConciergeStep(1) }}>{isEnglish ? labelEn : label}</button>)}
                  </div>
                </div>
              )}

              {conciergeStep === 1 && (
                <div className="agent-message">
                  <span>Salina</span><p>{isEnglish ? 'Is a small or medium dog travelling with you?' : '¿Te acompaña un perro pequeño o mediano?'}</p>
                  <div className="concierge-options two"><button onClick={() => { setTravelsWithPet(true); setConciergeStep(2) }}><Dog /> {isEnglish ? 'Yes, my dog is coming' : 'Sí, viene conmigo'}</button><button onClick={() => { setTravelsWithPet(false); setConciergeStep(2) }}>{isEnglish ? 'Not this time' : 'Esta vez, no'}</button></div>
                </div>
              )}

              {conciergeStep === 2 && (
                <div className="agent-message">
                  <span>Salina</span><p>{isEnglish ? 'How many people will be staying?' : '¿Cuántas personas vais a alojaros?'}</p>
                  <div className="concierge-options guest-pills">{[1, 2, 3, 4].map((value) => <button key={value} onClick={() => { setConciergeGuests(value); setConciergeStep(3) }}>{value}</button>)}</div>
                </div>
              )}

              {conciergeStep === 3 && (
                <div className="agent-message recommendation">
                  <span>{isEnglish ? 'My recommendation' : 'Mi recomendación'}</span>
                  <h3>{conciergeRoom.name}</h3>
                  <p>{isEnglish ? conciergeRoom.descriptionEn : conciergeRoom.description}</p>
                  <div className="concierge-price"><strong>{isEnglish ? 'From' : 'Desde'} {conciergeRoom.price}€</strong><small>{isEnglish ? 'per night · estimated total after dates' : 'por noche · total estimado al elegir fechas'}</small></div>
                  <button className="button button-full" onClick={() => setConciergeStep(4)}>{isEnglish ? 'Choose my dates' : 'Elegir mis fechas'} <CalendarDays /></button>
                  <small className="concierge-honesty"><ShieldCheck /> {isEnglish ? 'I do not check live availability or take payments.' : 'No consulto disponibilidad real ni realizo cobros.'}</small>
                </div>
              )}

              {conciergeStep === 4 && (
                <div className="agent-message concierge-dates">
                  <span>Salina</span>
                  <p>{isEnglish ? `When would you like to visit? I will calculate an estimate for ${conciergeRoom.name}.` : `¿Cuándo te gustaría venir? Calcularé una estimación para ${conciergeRoom.name}.`}</p>
                  <div className="concierge-limit-notice" role="status">
                    <ShieldCheck />
                    <div>
                      <strong>{isEnglish ? 'Last step of this quick guide' : 'Último paso de esta orientación rápida'}</strong>
                      <p>{isEnglish ? 'After the summary, this guided conversation ends to keep it clear and focused. You can prepare your request or start again whenever you wish.' : 'Después del resumen, esta conversación guiada se cierra para mantenerla clara y concreta. Podrás preparar tu solicitud o empezar de nuevo cuando quieras.'}</p>
                    </div>
                  </div>
                  <div className="concierge-date-grid">
                    <label>{isEnglish ? 'Check-in' : 'Entrada'}<input type="date" min={today} value={checkIn} onChange={(event) => { setCheckIn(event.target.value); if (checkOut && checkOut <= event.target.value) setCheckOut('') }} /></label>
                    <label>{isEnglish ? 'Check-out' : 'Salida'}<input type="date" min={checkIn || today} value={checkOut} onChange={(event) => setCheckOut(event.target.value)} /></label>
                  </div>
                  {checkIn && checkOut && nights < 1 && <small className="concierge-error">{isEnglish ? 'Check-out must be after check-in.' : 'La salida debe ser posterior a la entrada.'}</small>}
                  <button className="button button-full" disabled={nights < 1} onClick={() => setConciergeStep(5)}>{isEnglish ? 'See summary' : 'Ver resumen'} <ArrowRight /></button>
                </div>
              )}

              {conciergeStep === 5 && (
                <div className="agent-message recommendation concierge-summary">
                  <span>{isEnglish ? 'Your stay, at a glance' : 'Tu estancia, de un vistazo'}</span>
                  <h3>{conciergeRoom.name}</h3>
                  <dl>
                    <div><dt>{isEnglish ? 'Dates' : 'Fechas'}</dt><dd>{formatStayDate(checkIn)} — {formatStayDate(checkOut)}</dd></div>
                    <div><dt>{isEnglish ? 'Stay' : 'Estancia'}</dt><dd>{nights} {isEnglish ? `night${nights > 1 ? 's' : ''}` : `noche${nights > 1 ? 's' : ''}`}</dd></div>
                    <div><dt>{isEnglish ? 'Guests' : 'Huéspedes'}</dt><dd>{conciergeGuests ?? 2}{travelsWithPet ? (isEnglish ? ' + dog' : ' + perro') : ''}</dd></div>
                    <div className="summary-total"><dt>{isEnglish ? 'Estimated total' : 'Total estimado'}</dt><dd>{conciergeTotal}€</dd></div>
                  </dl>
                  <button className="button button-full" onClick={prepareConciergeBooking}>{isEnglish ? 'Prepare request' : 'Preparar solicitud'} <ArrowRight /></button>
                  <button className="concierge-back" onClick={() => setConciergeStep(4)}>{isEnglish ? 'Change dates' : 'Cambiar fechas'}</button>
                  <small className="concierge-honesty"><ShieldCheck /> {isEnglish ? 'Indicative amount. We will confirm availability before any payment.' : 'Importe orientativo. Confirmaremos disponibilidad antes de cualquier pago.'}</small>
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {galleryIndex !== null && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label={isEnglish ? 'Casa Salina gallery' : 'Galería de Casa Salina'} onClick={(event) => { if (event.target === event.currentTarget) setGalleryIndex(null) }}>
            <button className="lightbox-close" onClick={() => setGalleryIndex(null)} aria-label={isEnglish ? 'Close gallery' : 'Cerrar galería'} autoFocus><X /></button>
            <button className="lightbox-nav prev" onClick={() => setGalleryIndex((galleryIndex - 1 + gallery.length) % gallery.length)} aria-label={isEnglish ? 'Previous image' : 'Imagen anterior'}><ChevronLeft /></button>
            <motion.img key={gallery[galleryIndex].src} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} src={gallery[galleryIndex].src} alt={isEnglish ? gallery[galleryIndex].altEn : gallery[galleryIndex].alt} />
            <button className="lightbox-nav next" onClick={() => setGalleryIndex((galleryIndex + 1) % gallery.length)} aria-label={isEnglish ? 'Next image' : 'Imagen siguiente'}><ChevronRight /></button>
            <div className="lightbox-caption">{isEnglish ? gallery[galleryIndex].altEn : gallery[galleryIndex].alt} · {galleryIndex + 1}/{gallery.length}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div className="toast" initial={{ opacity: 0, y: 40, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }} role="status" aria-live="polite">
            <span><Check /></span><div><strong>{isEnglish ? 'Request prepared' : 'Solicitud preparada'}</strong><p>{isEnglish ? 'On a live site, this would connect with the booking engine or the accommodation inbox.' : 'En una web real, esto conectaría con el motor de reservas o el correo del alojamiento.'}</p></div><button onClick={() => setToast(false)} aria-label={isEnglish ? 'Close confirmation' : 'Cerrar confirmación'}><X /></button>
          </motion.div>
        )}
      </AnimatePresence>
      <Analytics mode="production" />
    </div>
  )
}

export default App
