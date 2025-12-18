import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
	CircularProgress,
  Divider,
	Alert,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
	LinearProgress,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
  Snackbar,
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import Seo from '../components/Seo'

type Mode = 'simple' | 'advanced'

const CUSTOM_VALUE = '__custom__'

const GENRES = [
  'Fantasy',
  'Sci-Fi',
  'Epic Fantasy',
  'Grimdark',
  'Romance',
  'Thriller',
  'YA',
  'Literary',
  'Mystery',
]

const TONES = [
  'Hopeful',
  'Dark',
  'Whimsical',
  'Tragic',
  'Mysterious',
  'Adventurous',
  'Humorous',
]

const THEMES = [
  'Power',
  'Sacrifice',
  'Identity',
  'Freedom',
  'Love',
  'Corruption',
  'Destiny vs Choice',
  'Survival',
  'Legacy',
]

const WORLDS = [
  'Grounded realism',
  'High fantasy',
  'Near-future',
  'Post-apocalyptic',
  'Mythic',
]

const UNIQUE_SIMPLE = [
  'Magic system',
  'Technology',
  'Social rules',
  'Geography',
  'Cultures',
  'Creatures',
]

const UNIQUE_ADVANCED = [
  ...UNIQUE_SIMPLE,
  'War',
  'Decay',
  'Imbalance',
  'Corruption',
  'Mystery',
  'Oppression',
  'Fading magic',
]

const OPPOSITION = [
  'Antagonist',
  'System',
  'Force of nature',
  'Inner struggle',
  'Time',
  'Fate',
]

const ENDINGS = ['Hopeful', 'Bittersweet', 'Tragic', 'Ambiguous', 'Triumphant']

type MultiSelectState = {
  useCustom: boolean
  selected: string[]
  customText: string
}

type SimpleState = {
  genre: MultiSelectState
  tone: MultiSelectState
  theme: MultiSelectState
  world: MultiSelectState
  unique: MultiSelectState
  additionalDetails: string
}

type AdvancedState = {
  genre: MultiSelectState
  tone: MultiSelectState
  theme: MultiSelectState
  world: MultiSelectState
  unique: MultiSelectState
  opposition: MultiSelectState
  mainCharacter: string
  characterWants: string
  internalConflict: string
  failureConsequence: string
  rivalDescription: string
  companionsDescription: string
  protagonistChange: string
  endingPreference: MultiSelectState
  specificScene: string
  excludeThings: string
}

const emptyMulti = (): MultiSelectState => ({ useCustom: false, selected: [], customText: '' })

const defaultSimple = (): SimpleState => ({
  genre: emptyMulti(),
  tone: emptyMulti(),
  theme: emptyMulti(),
  world: emptyMulti(),
  unique: emptyMulti(),
  additionalDetails: '',
})

const defaultAdvanced = (): AdvancedState => ({
  genre: emptyMulti(),
  tone: emptyMulti(),
  theme: emptyMulti(),
  world: emptyMulti(),
  unique: emptyMulti(),
  opposition: emptyMulti(),
  mainCharacter: '',
  characterWants: '',
  internalConflict: '',
  failureConsequence: '',
  rivalDescription: '',
  companionsDescription: '',
  protagonistChange: '',
  endingPreference: emptyMulti(),
  specificScene: '',
  excludeThings: '',
})

export default function IdeaGenerator() {
  const [mode, setMode] = useState<Mode>('simple')
  const [simple, setSimple] = useState<SimpleState>(() => {
    const raw = localStorage.getItem('ideaGen.simple')
    return raw ? (JSON.parse(raw) as SimpleState) : defaultSimple()
  })
  const [advanced, setAdvanced] = useState<AdvancedState>(() => {
    const raw = localStorage.getItem('ideaGen.advanced')
    return raw ? (JSON.parse(raw) as AdvancedState) : defaultAdvanced()
  })
	const [output, setOutput] = useState(() => localStorage.getItem('ideaGen.story') ?? '')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    localStorage.setItem('ideaGen.simple', JSON.stringify(simple))
  }, [simple])
  useEffect(() => {
    localStorage.setItem('ideaGen.advanced', JSON.stringify(advanced))
  }, [advanced])

  const handleClear = () => {
    const isSimple = mode === 'simple'
    if (isSimple) {
      setSimple(defaultSimple())
      localStorage.removeItem('ideaGen.simple')
    } else {
      setAdvanced(defaultAdvanced())
      localStorage.removeItem('ideaGen.advanced')
    }
		setOutput('')
		setError(null)
  }

  const handleSurpriseMe = () => {
    // Only for simple mode
    const pickSome = (arr: string[], max: number) => {
      const shuffled = [...arr].sort(() => Math.random() - 0.5)
      const count = Math.max(1, Math.ceil(Math.random() * Math.min(max, 3)))
      return Array.from(new Set(shuffled.slice(0, count)))
    }
    setSimple((prev) => ({
      ...prev,
      genre: { useCustom: false, selected: pickSome(GENRES, 3), customText: '' },
      tone: { useCustom: false, selected: pickSome(TONES, 3), customText: '' },
      theme: { useCustom: false, selected: pickSome(THEMES, 3), customText: '' },
      world: { useCustom: false, selected: pickSome(WORLDS, 2), customText: '' },
      unique: { useCustom: false, selected: pickSome(UNIQUE_SIMPLE, 3), customText: '' },
      additionalDetails:
        'A wandering mapmaker discovers living constellations guiding lost travelers.',
    }))
  }

	const buildPrompt = () => {
    const paras: string[] = []

    // Intro
    paras.push(
      'I am planning to write a story but need some ideas. Based on the following inputs, can you generate a story idea for me as a 300–500 word short story?'
    )

    if (mode === 'simple') {
      const s = simple
      const genre = getMultiText(s.genre)
      const tone = getMultiText(s.tone)
      const theme = getMultiText(s.theme)
      const world = getMultiText(s.world)
      const unique = getMultiText(s.unique)

      const lines: string[] = []
      if (genre) lines.push(`I would like the genre to encompass: ${genre}.`)
      if (tone) lines.push(`I would like the mood for the story to be: ${tone}.`)
      if (theme) lines.push(`I am interested in the following overall themes: ${theme}.`)
      if (world) lines.push(`I imagine the world as: ${world}.`)
      if (unique) lines.push(`I would love to emphasize these unique factors: ${unique}.`)

      if (lines.length) paras.push(lines.join(' '))

      if (s.additionalDetails.trim()) {
        paras.push('Here are some additional details about the story:')
        paras.push(s.additionalDetails.trim())
      }
    } else {
      const a = advanced
      const genre = getMultiText(a.genre)
      const tone = getMultiText(a.tone)
      const theme = getMultiText(a.theme)
      const world = getMultiText(a.world)
      const unique = getMultiText(a.unique)
      const opposition = getMultiText(a.opposition)
      const ending = getMultiText(a.endingPreference)

      const lines: string[] = []
      if (genre) lines.push(`I would like the genre to encompass: ${genre}.`)
      if (tone) lines.push(`I would like the mood for the story to be: ${tone}.`)
      if (theme) lines.push(`I am interested in these overall themes: ${theme}.`)
      if (a.mainCharacter.trim()) lines.push(`My main character is: ${a.mainCharacter.trim()}.`)
      if (a.characterWants.trim()) lines.push(`They want: ${a.characterWants.trim()}.`)
      if (a.internalConflict.trim())
        lines.push(`Their biggest fear/flaw/internal conflict is: ${a.internalConflict.trim()}.`)
      if (world) lines.push(`The world should feel like: ${world}.`)
      if (unique) lines.push(`Unique factors to incorporate: ${unique}.`)
      if (opposition) lines.push(`Standing in their way: ${opposition}.`)
      if (a.failureConsequence.trim())
        lines.push(`If the protagonist fails: ${a.failureConsequence.trim()}.`)
      if (a.rivalDescription.trim()) lines.push(`Key rival: ${a.rivalDescription.trim()}.`)
      if (a.companionsDescription.trim())
        lines.push(`Companions: ${a.companionsDescription.trim()}.`)
      if (a.protagonistChange.trim())
        lines.push(`I would like the protagonist to change by the end: ${a.protagonistChange.trim()}.`)
      if (ending) lines.push(`I am drawn to an ending that is: ${ending}.`)
      if (a.specificScene.trim())
        lines.push(`Please include this specific scene: ${a.specificScene.trim()}.`)
      if (a.excludeThings.trim()) lines.push(`Please exclude: ${a.excludeThings.trim()}.`)

      if (lines.length) paras.push(lines.join(' '))
    }

    // Closing guidance
    paras.push(
      'The output should include these sections: Short description (100 words), key points, key characters, antagonist, overall plot, and goal.'
    )
    paras.push(
			'Feel free to invent names, places, and details that fit these inputs, but avoid adding excluded elements.'
		)

		return paras.join('\n\n')
  }

	const handleGenerate = async () => {
		setIsLoading(true)
		setError(null)
		setOutput('')
		try {
			const p = buildPrompt()
			const res = await fetch('https://96uuzqddlb.execute-api.us-west-2.amazonaws.com/Prod/generate-text', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ prompt: p }),
			})
			const data = (await res.json()) as { ok: boolean; output?: string; message?: string }
			if (!data.ok) {
				setError(data.message || 'The request failed. Please try again.')
			} else {
				setOutput(data.output ?? '')
				localStorage.setItem('ideaGen.story', data.output ?? '')
			}
		} catch {
			setError('Network error. Please check your connection and try again.')
		} finally {
			setIsLoading(false)
		}
	}

  const currentCardTitle = useMemo(
    () => (mode === 'simple' ? 'Simple Mode' : 'Advanced Mode'),
    [mode]
  )

  return (
    <Box>
      <Seo
        title="AI Story Idea Generator | LeeMajor Publishing"
        description="Generate unique book and short story ideas with AI. Simple or advanced controls for genre, tone, themes, worldbuilding, and more."
        canonical="https://leemajorpublishing.com/idea-generator"
        openGraph={{
          title: 'AI Story Idea Generator | LeeMajor Publishing',
          description:
            'Generate unique book and short story ideas with AI. Simple or advanced controls for genre, tone, themes, worldbuilding, and more.',
          url: 'https://leemajorpublishing.com/idea-generator',
          siteName: 'LeeMajor Publishing',
          type: 'website',
          image: '/favicon.png',
        }}
        twitter={{
          card: 'summary_large_image',
          title: 'AI Story Idea Generator | LeeMajor Publishing',
          description:
            'Generate unique book and short story ideas with AI. Simple or advanced controls for genre, tone, themes, worldbuilding, and more.',
          image: '/favicon.png',
        }}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'AI Story Idea Generator',
            url: 'https://leemajorpublishing.com/idea-generator',
            applicationCategory: 'Writing',
            operatingSystem: 'Web',
            description:
              'Generate unique book and short story ideas with AI. Simple or advanced controls for genre, tone, themes, worldbuilding, and more.',
            publisher: {
              '@type': 'Organization',
              name: 'LeeMajor Publishing',
              url: 'https://leemajorpublishing.com',
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Is the AI story idea generator free to use?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    'Yes, you can generate ideas freely. Use Simple for quick prompts or Advanced to add detailed preferences.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I generate a short story, not just an idea?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    'Yes. The generator produces a structured prompt that requests a 300–500 word short story output.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I customize genre, tone, and worldbuilding?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    'Absolutely. Choose from multi-select options or use the Custom input to describe your own.',
                },
              },
              {
                '@type': 'Question',
                name: 'Will my inputs be saved?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    'Your inputs are saved locally in your browser until you clear them. Nothing is publicly stored.',
                },
              },
            ],
          },
        ]}
      />
      <Stack spacing={3}>
        <Box
          sx={{
            p: 3,
            borderRadius: 4,
            background:
              'linear-gradient(135deg, rgba(99,102,241,0.14), rgba(236,72,153,0.14))',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h3" fontWeight={800} gutterBottom>
            Story Idea Generator
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Pick your ingredients or go custom. Everything saves locally until you generate a
            prompt or clear it. All multi-selects are “select all that apply”.
          </Typography>
        </Box>

        <Card variant="outlined" sx={{ borderRadius: 4 }}>
          <Tabs
            value={mode}
            onChange={(_, v) => setMode(v)}
            aria-label="mode tabs"
            sx={{ px: 2, pt: 1 }}
          >
            <Tab value="simple" label="Simple" />
            <Tab value="advanced" label="Advanced" />
          </Tabs>
          <Divider />
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" gutterBottom>
              {currentCardTitle}
            </Typography>
            {currentCardTitle === 'Simple Mode' && <Tooltip title="Randomize Simple inputs">
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<AutorenewIcon />}
                      onClick={handleSurpriseMe}
                    >
                      Surprise me
                    </Button>
              </Tooltip>}
              </Box>
            {mode === 'simple' ? (
              <Stack spacing={2.5}>
                <MultiSelectWithCustom
                  label="Genre"
                  placeholder="e.g., Fantasy, Mystery"
                  options={GENRES}
                  state={simple.genre}
                  onChange={(st) => setSimple((s) => ({ ...s, genre: st }))}
                />
                <MultiSelectWithCustom
                  label="Tone / Mood"
                  placeholder="e.g., Hopeful, Mysterious"
                  options={TONES}
                  state={simple.tone}
                  onChange={(st) => setSimple((s) => ({ ...s, tone: st }))}
                />
                <MultiSelectWithCustom
                  label="Overall Theme"
                  placeholder="e.g., Identity, Sacrifice"
                  options={THEMES}
                  state={simple.theme}
                  onChange={(st) => setSimple((s) => ({ ...s, theme: st }))}
                />
                <MultiSelectWithCustom
                  label="World"
                  placeholder="e.g., High fantasy, Near-future"
                  options={WORLDS}
                  state={simple.world}
                  onChange={(st) => setSimple((s) => ({ ...s, world: st }))}
                />
                <MultiSelectWithCustom
                  label="Unique Factor"
                  placeholder="e.g., Rigid magic with a steep cost"
                  options={UNIQUE_SIMPLE}
                  state={simple.unique}
                  onChange={(st) => setSimple((s) => ({ ...s, unique: st }))}
                />
                <TextField
                  label="Additional Details"
                  placeholder="e.g., A lost city resurfaces once every century."
                  value={simple.additionalDetails}
                  onChange={(e) =>
                    setSimple((s) => ({ ...s, additionalDetails: e.target.value }))
                  }
                  fullWidth
                  multiline
                  minRows={2}
                />

                <Stack direction="row" spacing={1.5} justifyContent="flex-end">
                  <Tooltip title="Clear current mode inputs">
                    <Button
                      variant="text"
                      color="inherit"
                      startIcon={<RestartAltIcon />}
                      onClick={handleClear}
                    >
                      Clear
                    </Button>
                  </Tooltip>
								<Button
									variant="contained"
									onClick={handleGenerate}
									disabled={isLoading}
									startIcon={isLoading ? <CircularProgress size={18} /> : undefined}
								>
									{isLoading ? 'Generating…' : 'Generate'}
                  </Button>
                </Stack>
              </Stack>
            ) : (
              <Stack spacing={2.5}>
                <MultiSelectWithCustom
                  label="Genre"
                  placeholder="e.g., Epic Fantasy, Thriller"
                  options={GENRES}
                  state={advanced.genre}
                  onChange={(st) => setAdvanced((a) => ({ ...a, genre: st }))}
                />
                <MultiSelectWithCustom
                  label="Tone / Mood"
                  placeholder="e.g., Dark, Whimsical"
                  options={TONES}
                  state={advanced.tone}
                  onChange={(st) => setAdvanced((a) => ({ ...a, tone: st }))}
                />
                <MultiSelectWithCustom
                  label="Overall Theme"
                  placeholder="e.g., Power, Destiny vs Choice"
                  options={THEMES}
                  state={advanced.theme}
                  onChange={(st) => setAdvanced((a) => ({ ...a, theme: st }))}
                />

                <TextField
                  label="Main Character"
                  placeholder="e.g., 17-year-old courier, lower-class, stubborn but kind"
                  value={advanced.mainCharacter}
                  onChange={(e) =>
                    setAdvanced((a) => ({ ...a, mainCharacter: e.target.value }))
                  }
                  fullWidth
                />
                <TextField
                  label="What does the character want?"
                  placeholder="e.g., To find a missing sibling and clear their family name"
                  value={advanced.characterWants}
                  onChange={(e) =>
                    setAdvanced((a) => ({ ...a, characterWants: e.target.value }))
                  }
                  fullWidth
                />
                <TextField
                  label="Biggest fear, flaw, or internal conflict"
                  placeholder="e.g., Terrified of abandonment; avoids deep bonds"
                  value={advanced.internalConflict}
                  onChange={(e) =>
                    setAdvanced((a) => ({ ...a, internalConflict: e.target.value }))
                  }
                  fullWidth
                />

                <MultiSelectWithCustom
                  label="World"
                  placeholder="e.g., Post-apocalyptic archipelago"
                  options={WORLDS}
                  state={advanced.world}
                  onChange={(st) => setAdvanced((a) => ({ ...a, world: st }))}
                />
                <MultiSelectWithCustom
                  label="Unique Factor"
                  placeholder="e.g., Technology powered by harvested memories"
                  options={UNIQUE_ADVANCED}
                  state={advanced.unique}
                  onChange={(st) => setAdvanced((a) => ({ ...a, unique: st }))}
                />
                <MultiSelectWithCustom
                  label="Who or what stands in the way?"
                  placeholder="e.g., Oppressive theocracy; an immortal archivist"
                  options={OPPOSITION}
                  state={advanced.opposition}
                  onChange={(st) => setAdvanced((a) => ({ ...a, opposition: st }))}
                />

                <TextField
                  label="What will happen if the protagonist fails?"
                  placeholder="e.g., The city’s protective wards collapse and unleash the sea"
                  value={advanced.failureConsequence}
                  onChange={(e) =>
                    setAdvanced((a) => ({ ...a, failureConsequence: e.target.value }))
                  }
                  fullWidth
                />
                <TextField
                  label="Who is the key rival? Describe them"
                  placeholder="e.g., Charismatic warlord with a code, haunted by duty"
                  value={advanced.rivalDescription}
                  onChange={(e) =>
                    setAdvanced((a) => ({ ...a, rivalDescription: e.target.value }))
                  }
                  fullWidth
                />
                <TextField
                  label="Does the main character have companions? Describe them"
                  placeholder="e.g., A jaded scholar and a gentle giant with secret pasts"
                  value={advanced.companionsDescription}
                  onChange={(e) =>
                    setAdvanced((a) => ({ ...a, companionsDescription: e.target.value }))
                  }
                  fullWidth
                />
                <TextField
                  label="How should the protagonist change by the end?"
                  placeholder="e.g., Learns to trust and choose connection over control"
                  value={advanced.protagonistChange}
                  onChange={(e) =>
                    setAdvanced((a) => ({ ...a, protagonistChange: e.target.value }))
                  }
                  fullWidth
                />

                <MultiSelectWithCustom
                  label="Ending preference"
                  placeholder="e.g., Bittersweet triumph"
                  options={ENDINGS}
                  state={advanced.endingPreference}
                  onChange={(st) => setAdvanced((a) => ({ ...a, endingPreference: st }))}
                />
                <TextField
                  label="Specific scene to add"
                  placeholder="e.g., Chase across rooftops under a blood-red eclipse"
                  value={advanced.specificScene}
                  onChange={(e) =>
                    setAdvanced((a) => ({ ...a, specificScene: e.target.value }))
                  }
                  fullWidth
                />
                <TextField
                  label="Things to exclude"
                  placeholder="e.g., Zombies, time travel, love triangles"
                  value={advanced.excludeThings}
                  onChange={(e) =>
                    setAdvanced((a) => ({ ...a, excludeThings: e.target.value }))
                  }
                  fullWidth
                />

                <Stack direction="row" spacing={1.5} justifyContent="flex-end">
                  <Tooltip title="Clear current mode inputs">
                    <Button
                      variant="text"
                      color="inherit"
                      startIcon={<RestartAltIcon />}
                      onClick={handleClear}
                    >
                      Clear
                    </Button>
                  </Tooltip>
								<Button
									variant="contained"
									onClick={handleGenerate}
									disabled={isLoading}
									startIcon={isLoading ? <CircularProgress size={18} /> : undefined}
								>
									{isLoading ? 'Generating…' : 'Generate'}
                  </Button>
                </Stack>
              </Stack>
            )}
          </CardContent>
        </Card>

			<Card variant="outlined" sx={{ borderRadius: 4 }}>
				{isLoading && <LinearProgress />}
          <CardContent>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
						<Typography variant="h6">Generated Output</Typography>
              <Tooltip title="Copy to clipboard">
                <IconButton
								aria-label="copy output"
                  onClick={async () => {
									await navigator.clipboard.writeText(output)
                    setCopied(true)
                  }}
								disabled={!output || isLoading}
                >
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            </Stack>
					{error && (
						<Box mb={2}>
							<Alert severity="error">{error}</Alert>
						</Box>
					)}
            <TextField
						value={output}
						onChange={(e) => setOutput(e.target.value)}
						placeholder="Your generated story text will appear here."
              fullWidth
              multiline
              minRows={6}
						InputProps={{ readOnly: true }}
            />
					{output && (
              <Box mt={1} display="flex" gap={1} justifyContent="flex-end">
							<Chip label={`${output.length} chars`} size="small" />
              </Box>
            )}
          </CardContent>
        </Card>
      </Stack>

      <Snackbar
        open={copied}
        autoHideDuration={1600}
        onClose={() => setCopied(false)}
			message="Output copied"
      />
    </Box>
  )
}

function formatListEnglish(values: string[]) {
  if (values.length === 0) return ''
  if (values.length === 1) return values[0]
  if (values.length === 2) return `${values[0]} and ${values[1]}`
  return `${values.slice(0, -1).join(', ')}, and ${values[values.length - 1]}`
}

function getMultiText(st: MultiSelectState) {
  if (st.useCustom && st.customText.trim()) return st.customText.trim()
  if (st.selected.length > 0) return formatListEnglish(st.selected)
  return ''
}

type MultiProps = {
  label: string
  options: string[]
  placeholder?: string
  state: MultiSelectState
  onChange: (next: MultiSelectState) => void
}

function MultiSelectWithCustom({ label, options, placeholder, state, onChange }: MultiProps) {
  const { useCustom, selected, customText } = state
  const helper = 'Select all that apply. Choose “Custom” to enter your own.'

  return (
    <Stack spacing={1}>
      {!useCustom ? (
        <FormControl fullWidth>
          <InputLabel id={`${label}-label`}>{label}</InputLabel>
          <Select
            multiple
            labelId={`${label}-label`}
            input={<OutlinedInput label={label} />}
            value={selected}
            onChange={(e) => {
              const value = e.target.value as string[]
              if (value.includes(CUSTOM_VALUE)) {
                onChange({ useCustom: true, customText: '', selected: [] })
              } else {
                onChange({ useCustom: false, customText: '', selected: value })
              }
            }}
            renderValue={(sel) => (
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {(sel as string[]).map((s) => (
                  <Chip key={s} label={s} size="small" />
                ))}
              </Box>
            )}
          >
            {options.map((opt) => (
              <MenuItem key={opt} value={opt}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Chip size="small" label={opt} />
                  <Typography variant="body2">{opt}</Typography>
                </Box>
              </MenuItem>
            ))}
            <Divider />
            <MenuItem value={CUSTOM_VALUE}>
              <Typography color="primary">Custom…</Typography>
            </MenuItem>
          </Select>
          <FormHelperText>{helper}</FormHelperText>
        </FormControl>
      ) : (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
          <TextField
            fullWidth
            label={`${label} (custom)`}
            placeholder={placeholder}
            value={customText}
            onChange={(e) =>
              onChange({ useCustom: true, selected: [], customText: e.target.value })
            }
          />
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => onChange({ useCustom: false, selected: [], customText: '' })}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Use options
          </Button>
        </Stack>
      )}
    </Stack>
  )
}


