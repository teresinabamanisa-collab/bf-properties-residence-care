import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  ArrowUpRight,
  Bell,
  Building2,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  FileText,
  Home,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
  Settings,
  Sparkles,
  Star,
  User,
  Waves,
  Wrench,
} from 'lucide-react'

const initialTickets = [
  {
    id: 'BF-1042',
    title: 'Climatisation du salon en panne',
    apartment: 'LUTIA 02',
    resident: 'Famille K.',
    category: 'Climatisation',
    priority: 'Urgent',
    status: 'En cours',
    assignedTo: 'Équipe technique A',
    createdAt: "Aujourd'hui · 08:20",
    description: "La clim souffle mais ne refroidit plus. Le bruit est plus fort que d'habitude.",
  },
  {
    id: 'BF-1041',
    title: 'Fuite légère sous évier cuisine',
    apartment: 'SAWA 05',
    resident: 'Mme B.',
    category: 'Plomberie',
    priority: 'Normale',
    status: 'En attente',
    assignedTo: 'Non assigné',
    createdAt: 'Hier · 17:40',
    description: 'Petite fuite constatée après utilisation du lave-vaisselle.',
  },
  {
    id: 'BF-1038',
    title: 'Télécommande portail non reconnue',
    apartment: 'LUTIA 06',
    resident: 'M. T.',
    category: 'Accès',
    priority: 'Haute',
    status: 'En cours',
    assignedTo: 'Sécurité / maintenance',
    createdAt: 'Lun. · 14:05',
    description: "La télécommande du parking souterrain n'ouvre plus le portail principal.",
  },
]

const announcements = [
  {
    title: 'Maintenance préventive des climatiseurs',
    date: '03 avril 2026',
    text: 'Intervention planifiée de 10h00 à 13h00 dans les parties concernées. Les résidents seront notifiés automatiquement.',
    tag: 'Maintenance',
  },
  {
    title: 'Nettoyage de la piscine & pool house',
    date: '05 avril 2026',
    text: "Un léger bruit technique est à prévoir en matinée. L'espace sera de nouveau accessible à partir de 14h00.",
    tag: 'Confort',
  },
  {
    title: 'Newsletter BF Properties',
    date: 'Mensuel',
    text: "Actualités de la résidence, rappels utiles, interventions majeures et nouveautés du complexe Walina's View.",
    tag: 'Newsletter',
  },
]

const residents = [
  { apartment: 'LUTIA 02', resident: 'Famille K.', balance: 'À jour', lease: 'Actif', issues: 2, phone: '+243 000 000 000' },
  { apartment: 'LUTIA 06', resident: 'M. T.', balance: 'À jour', lease: 'Actif', issues: 1, phone: '+243 000 000 000' },
]

const quickActions = [
  { id: 'new', label: 'Nouveau ticket', icon: Plus },
  { id: 'tickets', label: 'Suivi incidents', icon: Wrench },
  { id: 'profile', label: 'Mon appartement', icon: Building2 },
  { id: 'home', label: 'Annonces', icon: Bell },
]

const premiumServices = [
  { title: 'Paiement du loyer', subtitle: 'Suivi clair et reçu instantané', icon: CreditCard },
  { title: 'Maintenance planifiée', subtitle: 'Interventions à venir', icon: CalendarClock },
  { title: 'Services résidence', subtitle: 'Piscine, sécurité, housekeeping', icon: Waves },
]

function Badge({ children, variant = 'default' }) {
  return <span className={`badge ${variant}`}>{children}</span>
}

function Card({ children, className = '' }) {
  return <div className={`card ${className}`}>{children}</div>
}

function GlassCard({ children, className = '' }) {
  return <div className={`glass-card ${className}`}>{children}</div>
}

function StatusBadge({ status }) {
  const map = {
    'En attente': 'warning',
    'En cours': 'info',
    'Terminé': 'success',
  }
  return <Badge variant={map[status] || 'default'}>{status}</Badge>
}

function PriorityBadge({ priority }) {
  const map = {
    Urgent: 'danger',
    Haute: 'warning',
    Normale: 'muted',
  }
  return <Badge variant={map[priority] || 'default'}>{priority}</Badge>
}

export default function App() {
  const [query, setQuery] = useState('')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [activeMobileTab, setActiveMobileTab] = useState('home')
  const [tickets, setTickets] = useState(initialTickets)
  const [form, setForm] = useState({
    apartment: '',
    category: '',
    title: '',
    priority: 'Normale',
    description: '',
  })

  const filteredTickets = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return tickets
    return tickets.filter((ticket) =>
      [ticket.id, ticket.title, ticket.apartment, ticket.category, ticket.resident, ticket.status]
        .join(' ')
        .toLowerCase()
        .includes(q),
    )
  }, [query, tickets])

  const openCount = tickets.filter((t) => t.status !== 'Terminé').length
  const urgentCount = tickets.filter((t) => t.priority === 'Urgent').length
  const doneCount = tickets.filter((t) => t.status === 'Terminé').length

  const submitIssue = () => {
    if (!form.apartment || !form.category || !form.title || !form.description) {
      window.alert('Remplis les champs principaux avant d’envoyer le ticket.')
      return
    }

    const newTicket = {
      id: `BF-${1043 + tickets.length}`,
      title: form.title,
      apartment: form.apartment,
      resident: 'Résident connecté',
      category: form.category,
      priority: form.priority,
      status: 'En attente',
      assignedTo: 'À assigner',
      createdAt: "À l'instant",
      description: form.description,
    }

    setTickets([newTicket, ...tickets])
    setForm({ apartment: '', category: '', title: '', priority: 'Normale', description: '' })
    setActiveMobileTab('tickets')
  }

  return (
    <div className="app-shell">
      <div className="mobile-only">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mobile-phone">
          <section className="mobile-hero">
            <div className="hero-blur one" />
            <div className="hero-blur two" />
            <div className="hero-top">
              <div className="brand-wrap">
                <div className="logo-box"><Building2 size={20} /></div>
                <div>
                  <div className="mini-label">BF Properties</div>
                  <div className="brand-title">Residence Care</div>
                </div>
              </div>
              <div className="hero-icons">
                <button className="icon-btn"><Search size={16} /></button>
                <button className="icon-btn"><Bell size={16} /></button>
              </div>
            </div>

            <div className="hero-card">
              <div className="hero-badges">
                <Badge>Premium residence app</Badge>
                <span className="lux-badge"><Star size={12} /> Luxe</span>
              </div>
              <h1>Gestion mobile pro, chic et sans chaos.</h1>
              <p>Signalements, annonces, newsletter, paiements et suivi technique dans une interface haut de gamme pensée pour une résidence premium.</p>
              <div className="stats-grid">
                <div className="stat-box"><span>Ouverts</span><strong>{openCount}</strong></div>
                <div className="stat-box"><span>Urgents</span><strong>{urgentCount}</strong></div>
                <div className="stat-box"><span>Résolus</span><strong>{doneCount}</strong></div>
              </div>
            </div>
          </section>

          <section className="mobile-content">
            <div className="search-bar">
              <Search size={16} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher ticket ou appartement" />
            </div>

            {activeMobileTab === 'home' && (
              <div className="stack">
                <GlassCard className="pad16">
                  <div className="section-head"><div><h3>Actions rapides</h3><p>Accès direct aux fonctions utiles</p></div></div>
                  <div className="quick-grid">
                    {quickActions.map((action) => {
                      const Icon = action.icon
                      return (
                        <button key={action.id} className="quick-card" onClick={() => setActiveMobileTab(action.id)}>
                          <div className="quick-icon"><Icon size={18} /></div>
                          <span>{action.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </GlassCard>

                <GlassCard className="pad16">
                  <div className="section-head">
                    <div><h3>News & résidence</h3><p>Un accueil propre, net et premium.</p></div>
                    <button className="small-round"><ChevronRight size={16} /></button>
                  </div>
                  <div className="stack small-gap">
                    {announcements.slice(0, 2).map((item) => (
                      <div key={item.title} className="mini-panel">
                        <div className="row-between"><Badge variant="muted">{item.tag}</Badge><span className="mini-date">{item.date}</span></div>
                        <h4>{item.title}</h4>
                        <p>{item.text}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="pad16">
                  <div className="newsletter-box">
                    <div className="row-between align-start">
                      <div>
                        <h3>Newsletter d'accueil</h3>
                        <p>Annonces, interventions prévues et infos utiles pour les résidents.</p>
                      </div>
                      <Sparkles size={18} />
                    </div>
                    <input value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} placeholder="Votre e-mail" className="field" />
                    <button className="primary-btn"><Mail size={16} /> S'abonner</button>
                  </div>
                </GlassCard>

                <GlassCard className="pad16">
                  <div className="section-head"><div><h3>Services premium</h3><p>Pensés pour une expérience haut standing</p></div></div>
                  <div className="stack small-gap">
                    {premiumServices.map((service) => {
                      const Icon = service.icon
                      return (
                        <div key={service.title} className="service-row">
                          <div className="service-left">
                            <div className="quick-icon"><Icon size={18} /></div>
                            <div><strong>{service.title}</strong><span>{service.subtitle}</span></div>
                          </div>
                          <ArrowUpRight size={16} className="icon-muted" />
                        </div>
                      )
                    })}
                  </div>
                </GlassCard>

                <GlassCard className="pad16">
                  <div className="section-head"><div><h3>Tickets récents</h3><p>Les demandes qui bougent maintenant.</p></div></div>
                  <div className="stack small-gap">
                    {filteredTickets.slice(0, 3).map((ticket) => (
                      <div key={ticket.id} className="ticket-card">
                        <div className="row-between align-start gap12">
                          <div>
                            <div className="ticket-id">{ticket.id}</div>
                            <h4>{ticket.title}</h4>
                          </div>
                          <StatusBadge status={ticket.status} />
                        </div>
                        <div className="row-wrap gap8 margin-y"><PriorityBadge priority={ticket.priority} /><Badge variant="muted">{ticket.apartment}</Badge></div>
                        <p>{ticket.description}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            )}

            {activeMobileTab === 'tickets' && (
              <div className="stack small-gap">
                {filteredTickets.map((ticket) => (
                  <GlassCard key={ticket.id} className="pad16">
                    <div className="row-between align-start gap12">
                      <div>
                        <div className="ticket-id">{ticket.id}</div>
                        <h4>{ticket.title}</h4>
                        <span className="muted-line">{ticket.apartment} · {ticket.category}</span>
                      </div>
                      <StatusBadge status={ticket.status} />
                    </div>
                    <div className="margin-y"><PriorityBadge priority={ticket.priority} /></div>
                    <p>{ticket.description}</p>
                    <div className="row-between foot-note"><span>{ticket.createdAt}</span><span>{ticket.assignedTo}</span></div>
                  </GlassCard>
                ))}
              </div>
            )}

            {activeMobileTab === 'new' && (
              <GlassCard className="pad16">
                <div className="section-head"><div><h3>Nouveau signalement</h3><p>Simple, chic, rapide.</p></div></div>
                <div className="form-stack">
                  <input className="field" placeholder="Appartement" value={form.apartment} onChange={(e) => setForm({ ...form, apartment: e.target.value })} />
                  <input className="field" placeholder="Catégorie" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                  <input className="field" placeholder="Titre du souci" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                  <select className="field" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                    <option>Normale</option>
                    <option>Haute</option>
                    <option>Urgent</option>
                  </select>
                  <textarea className="field area" placeholder="Décrivez clairement le problème..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                  <button className="secondary-btn"><FileText size={16} /> Ajouter une photo ou pièce jointe</button>
                  <button className="primary-btn" onClick={submitIssue}>Envoyer maintenant</button>
                </div>
              </GlassCard>
            )}

            {activeMobileTab === 'profile' && (
              <div className="stack small-gap">
                <GlassCard className="pad16">
                  <div className="profile-top">
                    <div className="avatar">BF</div>
                    <div>
                      <h3>Résident BF Properties</h3>
                      <p>Walina's View · Kinshasa</p>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="pad16">
                  <div className="section-head"><div><h3>Mon appartement</h3><p>Informations et accès rapide</p></div><Settings size={16} className="icon-muted" /></div>
                  {residents.slice(0, 1).map((item) => (
                    <div key={item.apartment} className="mini-panel white">
                      <div className="row-between"><div><strong>{item.apartment}</strong><p className="small-muted">{item.resident}</p></div><Badge variant="muted">{item.balance}</Badge></div>
                      <div className="profile-lines">
                        <div className="row-between"><span>Bail</span><strong>{item.lease}</strong></div>
                        <div className="row-between"><span>Incidents ouverts</span><strong>{item.issues}</strong></div>
                        <div className="row-between"><span>Contact</span><strong>{item.phone}</strong></div>
                      </div>
                    </div>
                  ))}
                </GlassCard>

                <GlassCard className="pad16">
                  <div className="stack small-gap">
                    <button className="action-row"><div className="service-left"><div className="quick-icon"><CreditCard size={18} /></div><div><strong>Paiements</strong><span>Historique et statut</span></div></div><ChevronRight size={16} className="icon-muted" /></button>
                    <button className="action-row"><div className="service-left"><div className="quick-icon"><Phone size={18} /></div><div><strong>Contacter la résidence</strong><span>Réception, sécurité, maintenance</span></div></div><ChevronRight size={16} className="icon-muted" /></button>
                  </div>
                </GlassCard>
              </div>
            )}
          </section>

          <nav className="bottom-nav">
            {[
              { id: 'home', label: 'Accueil', icon: Home },
              { id: 'tickets', label: 'Tickets', icon: Wrench },
              { id: 'new', label: 'Nouveau', icon: Bell },
              { id: 'profile', label: 'Compte', icon: User },
            ].map((tab) => {
              const Icon = tab.icon
              const active = activeMobileTab === tab.id
              return (
                <button key={tab.id} onClick={() => setActiveMobileTab(tab.id)} className={`nav-btn ${active ? 'active' : ''}`}>
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </motion.div>
      </div>

      <div className="desktop-only">
        <section className="desktop-hero">
          <div className="desktop-overlay" />
          <div className="desktop-topbar">
            <div className="brand-wrap">
              <div className="logo-box"><Building2 size={20} /></div>
              <div>
                <div className="mini-label">BF Properties</div>
                <div className="brand-title">Walina's View Residence Care</div>
              </div>
            </div>
            <div className="location-line"><MapPin size={16} /> Kinshasa · Utexafrica · Vue sur le Fleuve Congo</div>
          </div>

          <div className="desktop-grid">
            <div>
              <Badge>Gestion premium de résidence</Badge>
              <h2>Une app propre, premium et ultra claire pour suivre chaque souci dans les appartements.</h2>
              <p className="desktop-desc">Pensée pour BF Properties : signalement des incidents, suivi technique, annonces de résidence, newsletter d'accueil et tableau de bord centralisé.</p>
              <div className="desktop-stats">
                <Card className="pad20 stat-desktop"><div className="quick-icon"><Building2 size={18} /></div><div><strong>2</strong><span>Bâtiments</span></div></Card>
                <Card className="pad20 stat-desktop"><div className="quick-icon"><Home size={18} /></div><div><strong>12</strong><span>Appartements</span></div></Card>
                <Card className="pad20 stat-desktop"><div className="quick-icon"><Wrench size={18} /></div><div><strong>{openCount}</strong><span>Tickets ouverts</span></div></Card>
                <Card className="pad20 stat-desktop"><div className="quick-icon"><Clock3 size={18} /></div><div><strong>18h</strong><span>Temps moyen</span></div></Card>
              </div>
            </div>

            <Card className="pad20 newsletter-panel">
              <div className="row icon-row"><Sparkles size={16} /> Newsletter d'accueil</div>
              <h3>Rester informé, sans fouillis</h3>
              <p>Un module d'accueil élégant pour les annonces de la résidence, rappels utiles et nouveautés BF Properties.</p>
              <div className="stack small-gap">
                {announcements.map((item) => (
                  <div key={item.title} className="mini-panel white">
                    <div className="row-between"><strong>{item.title}</strong><Badge variant="muted">{item.date}</Badge></div>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="row gap8">
                <input className="field" placeholder="Entrer un e-mail pour la newsletter" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} />
                <button className="primary-btn compact"><Mail size={16} /> S'abonner</button>
              </div>
            </Card>
          </div>
        </section>

        <main className="desktop-main">
          <div className="desktop-toolbar">
            <div className="desktop-tabs">
              <button className="tab active">Dashboard</button>
              <button className="tab">Incidents</button>
              <button className="tab">Nouveau signalement</button>
              <button className="tab">Résidents</button>
            </div>
            <div className="search-bar desktop-search"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher un ticket, un appartement, un statut..." /></div>
          </div>

          <div className="desktop-kpis">
            <Card className="pad20"><div className="row gap12"><div className="quick-icon"><AlertTriangle size={18} /></div><div><span>Tickets ouverts</span><strong>{openCount}</strong></div></div></Card>
            <Card className="pad20"><div className="row gap12"><div className="quick-icon"><Bell size={18} /></div><div><span>Urgences</span><strong>{urgentCount}</strong></div></div></Card>
            <Card className="pad20"><div className="row gap12"><div className="quick-icon"><CheckCircle2 size={18} /></div><div><span>Résolus</span><strong>{doneCount}</strong></div></div></Card>
          </div>

          <div className="desktop-panels">
            <Card className="pad20">
              <div className="section-head"><div><h3>Incidents récents</h3><p>Les derniers signalements et leur niveau de traitement.</p></div></div>
              <div className="stack small-gap">
                {filteredTickets.map((ticket) => (
                  <div key={ticket.id} className="mini-panel white">
                    <div className="row-between align-start gap12">
                      <div>
                        <div className="row gap8"><span className="ticket-id">{ticket.id}</span><PriorityBadge priority={ticket.priority} /></div>
                        <h4>{ticket.title}</h4>
                        <p className="small-muted">{ticket.apartment} · {ticket.category} · {ticket.createdAt}</p>
                      </div>
                      <StatusBadge status={ticket.status} />
                    </div>
                    <p>{ticket.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="pad20">
              <div className="section-head"><div><h3>Centre d'annonces</h3><p>Le coin propre et lisible pour informer les résidents.</p></div></div>
              <div className="stack small-gap">
                {announcements.map((item) => (
                  <div key={item.title} className="mini-panel">
                    <div className="row-between"><strong>{item.title}</strong><Badge variant="muted">{item.date}</Badge></div>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
