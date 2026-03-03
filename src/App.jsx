import { useState, useCallback } from 'react'
import { PLACEMENTS, GOALS, TONES, getCharLimit } from './ctaData.js'
import { generateCTAs } from './ctaEngine.js'
import { SparklesIcon } from './components/Icons'
import SelectField from './components/SelectField'
import ResultsPanel from './components/ResultsPanel'
import CopiedToast from './components/Toast'

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
    setResults(generateCTAs({ placement, goal, tone, product, audience }))
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
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 py-8 sm:py-12">
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
        <ResultsPanel results={results} copiedId={copiedId} onCopy={handleCopy} />

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
