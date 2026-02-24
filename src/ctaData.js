/**
 * CTA template data organized by psychology principle.
 * Each template uses {product}, {benefit}, {outcome}, {audience}, {X} as interpolation tokens.
 * Fallbacks are provided when the user doesn't supply a product name.
 */

export const PLACEMENTS = [
  { value: 'button', label: 'Button', charLimit: 25 },
  { value: 'banner', label: 'Banner / Hero', charLimit: 50 },
  { value: 'email', label: 'Email CTA', charLimit: 40 },
  { value: 'popup', label: 'Popup / Modal', charLimit: 35 },
  { value: 'form', label: 'Form Submit', charLimit: 25 },
  { value: 'nav', label: 'Navigation Link', charLimit: 25 },
]

export const GOALS = [
  { value: 'purchase', label: 'Purchase / Buy' },
  { value: 'signup', label: 'Sign Up / Register' },
  { value: 'download', label: 'Download' },
  { value: 'contact', label: 'Contact / Inquiry' },
  { value: 'learn', label: 'Learn More' },
  { value: 'trial', label: 'Free Trial' },
  { value: 'subscribe', label: 'Subscribe' },
]

export const TONES = [
  { value: 'urgent', label: 'Urgent' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'professional', label: 'Professional' },
  { value: 'playful', label: 'Playful' },
  { value: 'bold', label: 'Bold' },
]

// Goal -> principle priority ordering (first = most relevant)
export const GOAL_PRIORITY = {
  purchase: ['action', 'urgency', 'benefit', 'social', 'curiosity', 'lowcommit'],
  signup: ['lowcommit', 'social', 'curiosity', 'action', 'benefit', 'urgency'],
  download: ['action', 'benefit', 'curiosity', 'lowcommit', 'social', 'urgency'],
  contact: ['lowcommit', 'curiosity', 'action', 'benefit', 'social', 'urgency'],
  learn: ['curiosity', 'lowcommit', 'benefit', 'action', 'social', 'urgency'],
  trial: ['lowcommit', 'curiosity', 'action', 'benefit', 'social', 'urgency'],
  subscribe: ['benefit', 'lowcommit', 'social', 'action', 'curiosity', 'urgency'],
}

/**
 * Tone variations for certain templates.
 * Keys are base CTA text patterns; values are tone -> replacement mappings.
 */
const TONE_VARIANTS = {
  playful: {
    'Claim Your Spot': 'Snag Your Spot',
    'Get Started Today': 'Let\'s Do This',
    'Start Your Free Trial': 'Take It for a Spin',
    'Order Now': 'Treat Yourself',
    'Act Now': 'Jump On This',
    'Don\'t Miss Out': 'Don\'t Sleep on This',
    'Last Chance to Save': 'Last Call',
    'Join the Community': 'Come Hang With Us',
    'See How It Works': 'Peek Under the Hood',
    'Learn the Secret': 'Get the Inside Scoop',
    'Try It Risk-Free': 'No Strings Attached',
    'Learn More': 'Tell Me More',
    'See a Demo': 'Show Me the Magic',
    'Grow Your Business Today': 'Watch Your Biz Take Off',
    'Boost Your Results': 'Supercharge Your Results',
    'Level Up Your Results': 'Level Up Like a Pro',
  },
  urgent: {
    'Get Started Today': 'Get Started Right Now',
    'Start Your Free Trial': 'Start Your Free Trial Now',
    'Learn More': 'Learn More Before It\'s Gone',
    'See Plans & Pricing': 'See Plans Before Prices Rise',
    'Browse Plans': 'Lock In Your Plan Now',
  },
  bold: {
    'Get Started Today': 'Start Dominating Today',
    'Grow Your Business Today': 'Grow Your Business Now',
    'Boost Your Results': 'Crush Your Goals',
    'Level Up Your Results': 'Dominate Your Results',
    'See How It Works': 'See the Power',
    'Learn More': 'See What You\'re Missing',
    'Join the Community': 'Join the Movement',
  },
  professional: {
    'Snag Your Spot': 'Reserve Your Place',
    'Claim Your Spot': 'Reserve Your Place',
    'Grab It Before It\'s Gone': 'Secure Your Access Today',
    'Don\'t Miss Out': 'Secure Your Opportunity',
    'Act Now': 'Take Action Today',
  },
  friendly: {
    'Act Now': 'Give It a Try',
    'Order Now': 'Start Your Order',
    'Claim Your Spot': 'Save Your Spot',
    'Don\'t Miss Out': 'You Won\'t Want to Miss This',
    'Grab It Before It\'s Gone': 'Get Yours While You Can',
    'Learn More': 'Find Out More',
    'See How It Works': 'See How It All Works',
  },
}

/**
 * Psychology principle definitions with their CTA templates.
 * Each template has:
 *  - template: the CTA string with {product}, {audience}, etc.
 *  - fallback: version used when no product name is provided
 *  - goals: which goals this CTA is relevant for (empty = all)
 *  - placements: which placements it works well for (empty = all)
 */
export const PRINCIPLES = [
  {
    id: 'action',
    name: 'Action-Oriented',
    description: 'Direct, verb-first CTAs that tell users exactly what to do. These reduce decision fatigue by being clear and immediate.',
    icon: 'bolt',
    templates: [
      { template: 'Get {product} Now', fallback: 'Get It Now', goals: ['purchase', 'download'], placements: [] },
      { template: 'Start Your Free Trial', fallback: 'Start Your Free Trial', goals: ['trial', 'signup'], placements: [] },
      { template: 'Claim Your Spot', fallback: 'Claim Your Spot', goals: ['signup', 'subscribe'], placements: [] },
      { template: 'Get Started Today', fallback: 'Get Started Today', goals: ['signup', 'trial', 'learn'], placements: [] },
      { template: 'Try {product} Free', fallback: 'Try It Free', goals: ['trial', 'download'], placements: [] },
      { template: 'Download Now', fallback: 'Download Now', goals: ['download'], placements: [] },
      { template: 'Shop {product}', fallback: 'Shop Now', goals: ['purchase'], placements: [] },
      { template: 'Book Your {product}', fallback: 'Book Now', goals: ['contact', 'purchase'], placements: [] },
      { template: 'Order Now', fallback: 'Order Now', goals: ['purchase'], placements: [] },
      { template: 'Activate Your Account', fallback: 'Activate Your Account', goals: ['signup'], placements: [] },
    ],
  },
  {
    id: 'benefit',
    name: 'Benefit-First',
    description: 'Lead with what the user gets, not what they have to do. People act when they see clear value for themselves.',
    icon: 'gift',
    templates: [
      { template: 'Save Time with {product}', fallback: 'Save Time Today', goals: ['purchase', 'trial', 'signup'], placements: [] },
      { template: 'Grow Your Business Today', fallback: 'Grow Your Business Today', goals: ['purchase', 'signup', 'subscribe'], placements: [] },
      { template: 'Boost Your Results', fallback: 'Boost Your Results', goals: ['purchase', 'signup', 'trial'], placements: [] },
      { template: 'Unlock Premium Features', fallback: 'Unlock Premium Features', goals: ['purchase', 'signup', 'trial'], placements: [] },
      { template: 'Transform Your Workflow', fallback: 'Transform Your Workflow', goals: ['purchase', 'signup', 'trial'], placements: [] },
      { template: 'Get Results in Minutes', fallback: 'Get Results in Minutes', goals: ['trial', 'signup', 'download'], placements: [] },
      { template: 'Start Saving Today', fallback: 'Start Saving Today', goals: ['purchase', 'subscribe'], placements: [] },
      { template: 'Level Up Your Results', fallback: 'Level Up Your Results', goals: ['purchase', 'signup', 'trial'], placements: [] },
      { template: 'Simplify Your Workflow', fallback: 'Simplify Your Workflow', goals: ['purchase', 'signup', 'trial', 'download'], placements: [] },
    ],
  },
  {
    id: 'urgency',
    name: 'Urgency & Scarcity',
    description: 'Create time pressure or limited availability. Loss aversion makes people act faster when they fear missing out.',
    icon: 'clock',
    templates: [
      { template: 'Limited Time Offer', fallback: 'Limited Time Offer', goals: ['purchase'], placements: ['banner', 'popup', 'email'] },
      { template: 'Don\'t Miss Out', fallback: 'Don\'t Miss Out', goals: ['purchase', 'signup', 'subscribe'], placements: [] },
      { template: 'Only a Few Left', fallback: 'Only a Few Left', goals: ['purchase'], placements: ['banner', 'popup'] },
      { template: 'Offer Ends Soon', fallback: 'Offer Ends Soon', goals: ['purchase', 'subscribe'], placements: ['banner', 'popup', 'email'] },
      { template: 'Last Chance to Save', fallback: 'Last Chance to Save', goals: ['purchase', 'subscribe'], placements: [] },
      { template: 'Act Now \u2014 50% Off', fallback: 'Act Now \u2014 50% Off', goals: ['purchase'], placements: ['banner', 'popup', 'email'] },
      { template: 'Today Only', fallback: 'Today Only', goals: ['purchase'], placements: ['banner', 'popup'] },
      { template: 'While Supplies Last', fallback: 'While Supplies Last', goals: ['purchase'], placements: ['banner', 'popup'] },
      { template: 'Grab It Before It\'s Gone', fallback: 'Grab It Before It\'s Gone', goals: ['purchase'], placements: ['popup', 'email', 'banner'] },
    ],
  },
  {
    id: 'social',
    name: 'Social Proof',
    description: 'Leverage the crowd to build trust. People follow the actions of others, especially when uncertain about a decision.',
    icon: 'users',
    templates: [
      { template: 'Join 10,000+ Happy Customers', fallback: 'Join 10,000+ Happy Customers', goals: ['signup', 'purchase', 'subscribe'], placements: [] },
      { template: 'See Why Teams Love {product}', fallback: 'See Why Teams Love It', goals: ['trial', 'signup', 'learn'], placements: [] },
      { template: 'Rated #1 by Users', fallback: 'Rated #1 by Users', goals: ['purchase', 'trial', 'signup'], placements: [] },
      { template: 'Trusted by Industry Leaders', fallback: 'Trusted by Industry Leaders', goals: ['purchase', 'signup', 'contact'], placements: [] },
      { template: 'See What Others Are Saying', fallback: 'See What Others Are Saying', goals: ['learn', 'purchase', 'trial'], placements: [] },
      { template: 'Join the Community', fallback: 'Join the Community', goals: ['signup', 'subscribe'], placements: [] },
      { template: 'Loved by {audience}', fallback: 'Loved by Thousands', goals: ['purchase', 'signup', 'trial'], placements: [] },
    ],
  },
  {
    id: 'curiosity',
    name: 'Curiosity Gap',
    description: 'Create an information gap that compels clicks. When people feel they are missing out on knowledge, they take action to close the gap.',
    icon: 'eye',
    templates: [
      { template: 'See How It Works', fallback: 'See How It Works', goals: ['learn', 'trial', 'signup'], placements: [] },
      { template: 'Discover the Difference', fallback: 'Discover the Difference', goals: ['learn', 'purchase', 'trial'], placements: [] },
      { template: 'Find Out Why', fallback: 'Find Out Why', goals: ['learn', 'trial'], placements: [] },
      { template: 'See What\'s Inside', fallback: 'See What\'s Inside', goals: ['learn', 'download', 'trial'], placements: [] },
      { template: 'Learn the Secret', fallback: 'Learn the Secret', goals: ['learn', 'subscribe'], placements: [] },
      { template: 'See Your Results', fallback: 'See Your Results', goals: ['trial', 'signup'], placements: [] },
      { template: 'Explore {product}', fallback: 'Explore Now', goals: ['learn', 'trial'], placements: [] },
      { template: 'See Plans & Pricing', fallback: 'See Plans & Pricing', goals: ['purchase', 'subscribe', 'trial'], placements: [] },
      { template: 'Watch the Demo', fallback: 'Watch the Demo', goals: ['learn', 'trial', 'contact'], placements: [] },
    ],
  },
  {
    id: 'lowcommit',
    name: 'Low Commitment',
    description: 'Reduce perceived risk and friction. When the ask feels small and reversible, more people say yes.',
    icon: 'shield',
    templates: [
      { template: 'Start Free \u2014 No Credit Card', fallback: 'Start Free \u2014 No Credit Card', goals: ['trial', 'signup'], placements: [] },
      { template: 'Try It Risk-Free', fallback: 'Try It Risk-Free', goals: ['trial', 'signup', 'purchase'], placements: [] },
      { template: 'See a Demo', fallback: 'See a Demo', goals: ['learn', 'contact', 'trial'], placements: [] },
      { template: 'Browse Plans', fallback: 'Browse Plans', goals: ['learn', 'purchase', 'subscribe'], placements: [] },
      { template: 'Learn More', fallback: 'Learn More', goals: ['learn', 'contact'], placements: [] },
      { template: 'Take a Quick Tour', fallback: 'Take a Quick Tour', goals: ['learn', 'trial', 'signup'], placements: [] },
      { template: 'No Commitment Required', fallback: 'No Commitment Required', goals: ['trial', 'signup'], placements: ['banner', 'popup', 'email'] },
      { template: 'Cancel Anytime', fallback: 'Cancel Anytime', goals: ['trial', 'subscribe', 'signup'], placements: ['banner', 'popup', 'email'] },
      { template: 'Free for 14 Days', fallback: 'Free for 14 Days', goals: ['trial', 'signup'], placements: [] },
    ],
  },
]

/**
 * Generate a resolved CTA text from a template.
 * Interpolates {product}, {audience}, etc., and applies tone variants.
 */
export function resolveCta(template, fallback, { product, audience, tone }) {
  let text = product ? template : fallback

  // Interpolate tokens
  if (product) {
    text = text.replace(/\{product\}/g, product)
  }
  if (audience) {
    text = text.replace(/\{audience\}/g, audience)
  }
  // Clean up any remaining tokens
  text = text.replace(/\{[^}]+\}/g, '').replace(/\s{2,}/g, ' ').trim()

  // Apply tone variant if one exists
  const toneMap = TONE_VARIANTS[tone]
  if (toneMap) {
    // Check both the resolved text and the fallback for tone overrides
    if (toneMap[text]) {
      text = toneMap[text]
    }
    // Also check the base fallback text for a match
    if (toneMap[fallback] && text === fallback) {
      text = toneMap[fallback]
    }
  }

  return text
}

/**
 * Score how relevant a template is for the given goal.
 * Returns a number: higher = more relevant.
 */
export function relevanceScore(templateGoals, selectedGoal) {
  if (templateGoals.length === 0) return 5 // universal template
  if (templateGoals.includes(selectedGoal)) return 10
  return 1
}

/**
 * Check if a template fits the selected placement.
 */
export function fitsPlacement(templatePlacements, selectedPlacement) {
  if (templatePlacements.length === 0) return true
  return templatePlacements.includes(selectedPlacement)
}

/**
 * Get the character limit for a placement.
 */
export function getCharLimit(placementValue) {
  const found = PLACEMENTS.find(item => item.value === placementValue)
  return found ? found.charLimit : 50
}
