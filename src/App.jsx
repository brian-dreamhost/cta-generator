import { useState, useCallback } from 'react'
import {
  PLACEMENTS,
  GOALS,
  TONES,
  PRINCIPLES,
  GOAL_PRIORITY,
  resolveCta,
  relevanceScore,
  fitsPlacement,
  getCharLimit,
} from './ctaData.js'

/* ──────────────── Icon Components ──────────────── */

function BoltIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
    </svg>
  )
}

function GiftIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
  )
}

function ClockIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}

function UsersIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  )
}

function EyeIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  )
}

function ShieldIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  )
}

function WarningIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>
  )
}

function ClipboardIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
    </svg>
  )
}

function CheckIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  )
}

function SparklesIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  )
}

function BeakerIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  )
}

const ICON_MAP = {
  bolt: BoltIcon,
  gift: GiftIcon,
  clock: ClockIcon,
  users: UsersIcon,
  eye: EyeIcon,
  shield: ShieldIcon,
}

/* ──────────────── Select Component ──────────────── */

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-cloudy mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-midnight border border-metal/30 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss transition-colors appearance-none cursor-pointer"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23677983' stroke-width='1.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.75rem center',
          backgroundSize: '1.25rem',
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

/* ──────────────── CTA Pill Component ──────────────── */

function CtaPill({ text, charLimit, onCopy, copiedId, id }) {
  const len = text.length
  const overLimit = len > charLimit
  const isCopied = copiedId === id

  return (
    <div className="group flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors">
      <button
        onClick={() => onCopy(id, text)}
        className="flex-1 flex items-center gap-3 text-left min-w-0 cursor-pointer"
        title={`Click to copy: ${text}`}
      >
        <span className="text-white font-medium text-sm sm:text-base truncate flex-1">{text}</span>
        <span className={`text-xs font-mono shrink-0 ${overLimit ? 'text-tangerine' : 'text-galactic'}`}>
          {len} chars
        </span>
        {overLimit && (
          <span className="shrink-0" title={`Exceeds recommended ${charLimit} chars for this placement`}>
            <WarningIcon className="w-4 h-4 text-tangerine" />
          </span>
        )}
      </button>
      <button
        onClick={() => onCopy(id, text)}
        className="shrink-0 p-1.5 rounded-md hover:bg-azure/20 transition-colors cursor-pointer"
        title="Copy to clipboard"
      >
        {isCopied ? (
          <CheckIcon className="w-4 h-4 text-turtle" />
        ) : (
          <ClipboardIcon className="w-4 h-4 text-galactic group-hover:text-azure transition-colors" />
        )}
      </button>
    </div>
  )
}

/* ──────────────── Principle Card Component ──────────────── */

function PrincipleCard({ principle, ctas, charLimit, onCopy, copiedId, rank }) {
  const IconComponent = ICON_MAP[principle.icon]

  // Color accents per principle
  const accentColors = {
    action: 'text-azure',
    benefit: 'text-turtle',
    urgency: 'text-coral',
    social: 'text-prince',
    curiosity: 'text-sunflower',
    lowcommit: 'text-tangerine',
  }

  const borderColors = {
    action: 'border-azure/30',
    benefit: 'border-turtle/30',
    urgency: 'border-coral/30',
    social: 'border-prince/30',
    curiosity: 'border-sunflower/30',
    lowcommit: 'border-tangerine/30',
  }

  const accent = accentColors[principle.id] || 'text-azure'
  const borderAccent = borderColors[principle.id] || 'border-azure/30'

  return (
    <div className={`card-gradient border ${borderAccent} rounded-2xl p-5 sm:p-6 animate-fadeIn`} style={{ animationDelay: `${rank * 50}ms`, animationFillMode: 'both' }}>
      <div className="flex items-start gap-3 mb-3">
        <div className={`shrink-0 mt-0.5 ${accent}`}>
          {IconComponent && <IconComponent className="w-6 h-6" />}
        </div>
        <div className="min-w-0">
          <h3 className="text-white font-bold text-base sm:text-lg">{principle.name}</h3>
          <p className="text-galactic text-xs sm:text-sm mt-1 leading-relaxed">{principle.description}</p>
        </div>
      </div>

      <div className="mt-4 space-y-0.5">
        {ctas.map((cta) => (
          <CtaPill
            key={cta.id}
            id={cta.id}
            text={cta.text}
            charLimit={charLimit}
            onCopy={onCopy}
            copiedId={copiedId}
          />
        ))}
        {ctas.length === 0 && (
          <p className="text-galactic text-sm italic py-2 px-3">No CTAs match this goal and placement combination.</p>
        )}
      </div>
    </div>
  )
}

/* ──────────────── Toast Component ──────────────── */

function CopiedToast({ visible }) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-turtle/90 text-abyss px-4 py-2.5 rounded-lg shadow-lg text-sm font-semibold transition-all duration-200 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      <CheckIcon className="w-4 h-4" />
      Copied to clipboard
    </div>
  )
}

/* ──────────────── Main App ──────────────── */

export default function App() {
  const [placement, setPlacement] = useState('button')
  const [goal, setGoal] = useState('purchase')
  const [tone, setTone] = useState('professional')
  const [product, setProduct] = useState('')
  const [audience, setAudience] = useState('')
  const [results, setResults] = useState(null)
  const [copiedId, setCopiedId] = useState(null)
  const [showToast, setShowToast] = useState(false)

  const fillTestData = () => {
    setPlacement('button')
    setGoal('purchase')
    setTone('friendly')
    setProduct('TaskFlow Pro')
    setAudience('small business owners')
  }

  const handleGenerate = useCallback(() => {
    const order = GOAL_PRIORITY[goal] || GOAL_PRIORITY.purchase
    const charLimit = getCharLimit(placement)

    const generated = order.map((principleId) => {
      const principle = PRINCIPLES.find((p) => p.id === principleId)
      if (!principle) return null

      // Filter and score templates
      const ctas = principle.templates
        .map((t) => {
          const score = relevanceScore(t.goals, goal)
          const fits = fitsPlacement(t.placements, placement)
          const text = resolveCta(t.template, t.fallback, { product: product.trim(), audience: audience.trim(), tone })

          return {
            id: `${principle.id}-${text}`,
            text,
            score,
            fits,
          }
        })
        // Filter: must be relevant and fit placement
        .filter((c) => c.score >= 5 && c.fits)
        // Sort by relevance score descending
        .sort((a, b) => b.score - a.score)
        // Take top 5
        .slice(0, 5)

      return { principle, ctas }
    }).filter(Boolean)

    setResults({ generated, charLimit })
  }, [placement, goal, tone, product, audience])

  const handleCopy = useCallback(async (id, text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setShowToast(true)
      setTimeout(() => {
        setCopiedId(null)
        setShowToast(false)
      }, 1500)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopiedId(id)
      setShowToast(true)
      setTimeout(() => {
        setCopiedId(null)
        setShowToast(false)
      }, 1500)
    }
  }, [])

  const charLimit = getCharLimit(placement)
  const placementLabel = PLACEMENTS.find((p) => p.value === placement)?.label || placement

  return (
    <div className="min-h-screen bg-abyss bg-glow bg-grid">
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-galactic">
          <a href="https://seo-tools-tau.vercel.app/" className="text-azure hover:text-white transition-colors">Free Tools</a>
          <span className="mx-2 text-metal">/</span>
          <a href="https://seo-tools-tau.vercel.app/copywriting/" className="text-azure hover:text-white transition-colors">Copywriting Tools</a>
          <span className="mx-2 text-metal">/</span>
          <span className="text-cloudy">Call-to-Action Generator</span>
        </nav>

        {/* Header */}
        <header className="mb-8 sm:mb-10">
          <div className="inline-flex items-center border border-turtle text-turtle rounded-full px-4 py-2 text-sm font-medium mb-4">
            <SparklesIcon className="w-4 h-4 mr-2" />
            Free Tool
          </div>
          <h1 className="text-4xl sm:text-[2.7rem] lg:text-[3.6rem] font-bold text-white mb-3 leading-tight">
            Call-to-Action Generator
          </h1>
          <p className="text-cloudy text-base sm:text-lg max-w-2xl leading-relaxed">
            Generate high-converting CTAs using proven psychology frameworks — no AI, just science.
          </p>
        </header>

        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={fillTestData}
            className="px-3 py-1.5 text-xs font-mono bg-prince/20 text-prince border border-prince/30 rounded hover:bg-prince/30 transition-colors focus:outline-none focus:ring-2 focus:ring-prince focus:ring-offset-2 focus:ring-offset-abyss"
          >
            Fill Test Data
          </button>
        </div>

        {/* Input Panel */}
        <div className="card-gradient border border-metal/20 rounded-2xl p-5 sm:p-8 mb-8 sm:mb-10">
          <h2 className="text-white font-bold text-lg mb-5">Configure Your CTAs</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-5">
            <SelectField
              label="Placement"
              value={placement}
              onChange={setPlacement}
              options={PLACEMENTS}
            />
            <SelectField
              label="Goal"
              value={goal}
              onChange={setGoal}
              options={GOALS}
            />
            <SelectField
              label="Tone"
              value={tone}
              onChange={setTone}
              options={TONES}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
            <div>
              <label className="block text-sm font-medium text-cloudy mb-2">
                Product / Service Name <span className="text-galactic font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="e.g., TaskFlow Pro"
                maxLength={50}
                className="w-full bg-midnight border border-metal/30 rounded-lg px-4 py-3 text-white text-sm placeholder:text-galactic/50 focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-cloudy mb-2">
                Target Audience <span className="text-galactic font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g., small business owners"
                maxLength={50}
                className="w-full bg-midnight border border-metal/30 rounded-lg px-4 py-3 text-white text-sm placeholder:text-galactic/50 focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              onClick={handleGenerate}
              className="bg-azure text-white font-semibold rounded-lg px-8 py-3 hover:bg-azure-hover focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss transition-colors cursor-pointer text-sm sm:text-base"
            >
              Generate CTAs
            </button>
            <p className="text-galactic text-xs sm:text-sm">
              Recommended max for <span className="text-cloudy font-medium">{placementLabel}</span>: <span className="text-cloudy font-medium">{charLimit} characters</span>
            </p>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="animate-fadeIn">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-white font-bold text-xl sm:text-2xl">Your CTAs</h2>
              <span className="text-galactic text-sm">Ordered by relevance to your goal</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mb-8 sm:mb-10">
              {results.generated.map((item, index) => (
                <PrincipleCard
                  key={item.principle.id}
                  principle={item.principle}
                  ctas={item.ctas}
                  charLimit={results.charLimit}
                  onCopy={handleCopy}
                  copiedId={copiedId}
                  rank={index}
                />
              ))}
            </div>

            {/* A/B Testing Tip */}
            <div className="card-gradient border border-prince/20 rounded-2xl p-5 sm:p-6 mb-8">
              <div className="flex items-start gap-3">
                <BeakerIcon className="w-6 h-6 text-prince shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-bold text-base mb-1.5">A/B Testing Tip</h3>
                  <p className="text-cloudy text-sm leading-relaxed">
                    Pick one CTA from <span className="text-turtle font-medium">Benefit-First</span> and one from <span className="text-coral font-medium">Urgency & Scarcity</span> to A/B test. Different psychological triggers work for different audiences — test to find what resonates with yours.
                  </p>
                </div>
              </div>
            </div>

            {/* How to Use Section */}
            <div className="card-gradient border border-metal/20 rounded-2xl p-5 sm:p-6">
              <h3 className="text-white font-bold text-base mb-4">How to Choose the Right CTA</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-azure/20 text-azure text-xs font-bold flex items-center justify-center">1</span>
                  <p className="text-cloudy text-sm leading-relaxed"><span className="text-white font-medium">Match the psychology to your audience.</span> First-time visitors respond better to Low Commitment. Returning visitors respond to Urgency.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-azure/20 text-azure text-xs font-bold flex items-center justify-center">2</span>
                  <p className="text-cloudy text-sm leading-relaxed"><span className="text-white font-medium">Watch the character count.</span> Button CTAs should be short and punchy. Banner CTAs have room for benefit statements.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-azure/20 text-azure text-xs font-bold flex items-center justify-center">3</span>
                  <p className="text-cloudy text-sm leading-relaxed"><span className="text-white font-medium">Use one principle per page section.</span> Mixing urgency with low commitment on the same section sends mixed signals.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-azure/20 text-azure text-xs font-bold flex items-center justify-center">4</span>
                  <p className="text-cloudy text-sm leading-relaxed"><span className="text-white font-medium">Test, don't guess.</span> Run each CTA for at least 1,000 impressions before picking a winner. Small sample sizes mislead.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!results && (
          <div className="text-center py-12 sm:py-16">
            <SparklesIcon className="w-12 h-12 text-galactic/30 mx-auto mb-4" />
            <p className="text-galactic text-base">
              Configure your options above and click <span className="text-cloudy font-medium">Generate CTAs</span> to see results.
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="border-t border-metal/30 mt-12 sm:mt-16 py-8 text-center text-sm text-galactic">
          Free marketing tools by{' '}
          <a
            href="https://www.dreamhost.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-azure hover:text-white transition-colors"
          >
            DreamHost
          </a>
        </footer>
      </div>

      <CopiedToast visible={showToast} />
    </div>
  )
}
