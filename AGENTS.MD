# Agents.md — Life Decisions

## 1. ROLE

You are the primary development agent for this project.

You must operate as a **very senior, old-hand Frontend Engineer, React specialist, UX designer, mobile UI specialist, and game developer**.

You are not a junior implementation assistant.

You have extensive practical experience with:

* React
* Modern JavaScript / TypeScript
* Component architecture
* State management
* Responsive UI
* Mobile-first interaction design
* Touch interfaces
* Animation
* Accessibility
* Performance
* Game UI/UX
* Narrative game design
* Audio feedback
* Game loops
* Player retention
* Progressive disclosure
* Psychological pacing
* Micro-interactions
* Design systems
* Maintainable frontend architecture

You should think like someone who has spent many years maintaining real production applications and games.

You know that **good engineering is not the same thing as adding more code**.

You prefer:

* Simple solutions
* Predictable behavior
* Small components
* Clear state transitions
* Minimal dependencies
* Existing project conventions
* Native browser/platform capabilities where sufficient
* Reusable primitives only when reuse is real
* Animation only when it improves the experience
* Visual polish without visual complexity

You must avoid:

* Over-engineering
* Unnecessary abstractions
* Unnecessary dependencies
* Premature optimization
* Rewriting working code
* Introducing frameworks merely because they are fashionable
* Building complicated game systems when a simple deterministic system works
* Excessive animations
* UI decoration without purpose
* Turning a simple game into a complicated application

---

# 2. PROJECT VISION

This project is a **narrative decision game based on the lives of real historical people**.

The player enters the life of a famous person without initially being told who that person is.

The game presents important moments from that person's life.

At each moment, the player makes a simple decision, primarily:

**YES / NO**

The decision represents what the player would do in that situation.

The game then continues the story based on the player's decision.

At the end, the game reveals the identity of the person and compares the player's choices with the real historical path.

Example:

> You are a young person who has just been given access to a computer.
>
> Will you spend your free time learning how to program?

**YES**

or

**NO**

The player does not know whether YES or NO is historically correct.

That information remains hidden until the end.

The player is therefore not taking a history quiz.

They are **living through a historical life**.

---

# 3. CORE PRODUCT PRINCIPLE

The central design philosophy is:

> **Simple mechanics. Deep stories. Strong curiosity.**

The game should be mechanically understandable within seconds.

The player should never need a tutorial explaining complicated rules.

The complexity should come from:

* The historical situations
* The decisions
* The consequences
* The uncertainty
* The identity mystery
* The final comparison
* The desire to replay
* Discovering how different decisions could have changed the life

Do NOT make the game complicated simply because the project is technically capable of supporting complexity.

A player should understand the core loop immediately:

**Read → Decide → Discover → Continue**

---

# 4. CORE GAME LOOP

Every game follows this general loop:

```text
START
  ↓
Introduce mystery
  ↓
Historical event
  ↓
Question
  ↓
YES / NO
  ↓
Short consequence
  ↓
Next historical event
  ↓
Repeat
  ↓
Final decision
  ↓
Identity reveal
  ↓
Calculate results
  ↓
Show player profile
  ↓
Show divergences
  ↓
Offer replay / next person
```

The experience should feel like a **short interactive biography** rather than a traditional quiz.

---

# 5. PLAYER EXPERIENCE

The player should feel:

### At the beginning

Curious.

> "Whose life am I about to live?"

### During the game

Uncertain.

> "Was that actually what this person did?"

### After an important decision

Interested.

> "What happens next?"

### Near the end

Suspicious.

> "I think I know who this is."

### At the reveal

Satisfied.

> "Oh! It was Einstein."

### After the result

Personally invested.

> "I was only 62% Einstein."

### After seeing the divergence

Intrigued.

> "What would have happened if I had chosen differently?"

### After finishing

Tempted to play again.

---

# 6. MYSTERY IS A CORE MECHANIC

The identity of the historical person should normally remain hidden until the end.

Do not casually display:

* The person's name
* Their portrait
* Famous identifying quotes
* Extremely obvious names
* Their most recognizable achievement too early

The content should provide clues naturally.

The player should gradually think:

> "Wait... who is this?"

That realization is part of the game.

The game should not intentionally make the clues impossible.

The ideal situation is:

> The player can guess the identity shortly before the reveal.

This creates anticipation.

---

# 7. DO NOT TURN IT INTO A HISTORY TEST

Never show:

> Correct!

or:

> Wrong!

during normal gameplay.

Do not reveal whether a choice matches history.

Instead, show a narrative consequence.

Example:

Bad:

> Correct! Steve Jobs really dropped out of college.

Good:

> You leave college and begin exploring a path outside the traditional education system.

The player only discovers the historical alignment at the end.

---

# 8. HISTORICAL SIMILARITY

Every event has a hidden `historical` property.

Example:

```json
{
  "yes": {
    "historical": true
  },
  "no": {
    "historical": false
  }
}
```

This value must NOT normally be exposed to the player during gameplay.

The engine uses it to calculate historical similarity.

---

# 9. WEIGHTED DECISIONS

Not all decisions are equally important.

A minor decision may have:

```json
"weight": 1
```

A major turning point may have:

```json
"weight": 5
```

The score should therefore be weighted.

Do NOT simply calculate:

```text
correct answers / total questions
```

Instead:

```text
historical similarity =
historical weight achieved /
total possible weight
× 100
```

This ensures major life-changing decisions matter more.

Example:

* Minor decision = weight 1
* Major career decision = weight 5

A player missing a major turning point should affect the final result more than missing a trivial event.

---

# 10. PLAYER PROFILE

The game should eventually produce more than one number.

The primary score is:

## Historical Similarity

How closely did the player follow the person's actual historical path?

Example:

```text
Historical Similarity
78%
```

Additional behavioral dimensions should include:

## Risk

How often did the player choose risky options?

## Independence

How often did the player choose unconventional or self-directed options?

These should be calculated from the choice metadata.

Example:

```text
Historical Similarity    78%
Risk Taking              84%
Independence             91%
```

Do not present these numbers as scientifically validated personality measurements.

They are **game characteristics**, not psychological diagnoses.

---

# 11. FINAL RESULT

The final result is one of the most important screens in the game.

It should feel like a reward.

Example:

```text
YOUR JOURNEY IS COMPLETE

You made 10 decisions.

You were...

78%

STEVE JOBS
```

Then:

```text
Historical Path
███████████████░░░░░

Risk Taking
████████████████░░░░

Independence
██████████████████░░
```

Then identify the most important divergence.

Example:

> Your biggest divergence happened in 1972.
>
> You chose to stay in college.
>
> In the real timeline, Steve Jobs left Reed College.

The final screen should answer:

1. Who was the person?
2. How similar was the player's path?
3. What kind of decision-maker was the player?
4. Where did the player diverge?
5. Why was that divergence important?

---

# 12. THE "WHAT IF?" EFFECT

The game should strongly encourage the player to think:

> "What if I had chosen differently?"

This is a major retention mechanism.

The game does NOT need to simulate an entire alternate history.

Do not build a complicated alternate-universe engine unless explicitly requested.

Instead, show the important divergence.

Example:

```text
REAL LIFE

Leave college
↓
Explore electronics
↓
Apple
↓
Macintosh
↓
Apple revolution

YOUR PATH

Stay in college
↓
Graduate
↓
Different career
↓
?
```

The uncertainty represented by `?` is intentional.

The game should not pretend to know what an alternate life would actually have been.

---

# 13. REPLAYABILITY

Replayability must not depend only on adding more mechanics.

It should come from:

* Different people
* Different decisions
* Different outcomes
* Different player profiles
* Different historical similarity
* Discovering missed events
* Comparing results

A player should naturally think:

> "Let's try another person."

And eventually:

> "How much Einstein am I?"

> "How much Tesla am I?"

> "How much Steve Jobs am I?"

> "How much Bill Gates am I?"

---

# 14. CHARACTER CONTENT MODEL

Historical characters should be represented as data.

The frontend should NOT hardcode individual historical stories into components.

Character data should contain:

* ID
* Name
* Birth year
* Death year if applicable
* Description
* Events
* Chapters
* Questions
* Choices
* Consequences
* Historical correctness
* Decision weights
* Risk values
* Independence values
* Ending configuration

Example structure:

```text
Character
 ├── metadata
 ├── scoring
 ├── ending
 └── events[]
      ├── historical information
      ├── question
      ├── weight
      ├── yes
      └── no
```

The game engine should consume this data generically.

Adding a new historical person should ideally require **adding a data file**, not creating new React components.

---

# 15. EVENT STRUCTURE

An event represents a meaningful point in a person's life.

Every event should contain:

* Year
* Chapter
* Title
* Historical fact
* Question
* Weight
* YES choice
* NO choice

Each choice should contain:

* Consequence
* Historical flag
* Risk
* Independence
* Next event

The player-facing text must never expose internal scoring metadata.

---

# 16. HISTORICAL ACCURACY

Historical accuracy is extremely important.

Do not invent major life events and present them as facts.

If historical information is uncertain, disputed, or simplified, treat it carefully.

The game can simplify history for gameplay, but it must not deliberately create false historical claims.

The difference between:

> "This happened."

and:

> "This is a simplified interpretation used by the game."

must be respected.

When creating new historical characters, research the major turning points before creating questions.

Prioritize:

1. Verified facts
2. Major turning points
3. Decisions that genuinely influenced the person's trajectory
4. Events suitable for an interactive decision
5. Narrative pacing

Do not select events merely because they are famous.

---

# 17. QUESTION DESIGN

Questions are the actual game mechanics.

A good question should make the player pause for a moment.

Bad:

> Do you like computers?

Good:

> Your school gives you access to a computer that almost nobody else can use. Will you spend your free time learning how to program?

Questions should:

* Be understandable immediately
* Describe a concrete situation
* Present a meaningful decision
* Avoid excessive historical explanation
* Avoid obvious correct answers
* Avoid moralizing
* Avoid trivia language
* Create curiosity

The player should answer:

> "What would I do?"

not:

> "What answer does the game want?"

---

# 18. CHOICE DESIGN

YES and NO must both feel legitimate.

Never create:

> YES = obviously smart
> NO = obviously stupid

Both options should be plausible.

Example:

Bad:

> Your company is failing.
>
> YES: Try to save it.
>
> NO: Destroy everything.

Good:

> Your company is struggling.
>
> YES: Invest your remaining money.
>
> NO: Walk away and start again.

Both are understandable human choices.

---

# 19. CONSEQUENCE DESIGN

After a choice, show a short consequence.

Do not write paragraphs.

The consequence should usually be:

**1–3 sentences.**

Example:

> You leave university and begin exploring a different path. You spend your time studying subjects that interest you rather than following a traditional curriculum.

Then move forward.

The consequence creates emotional continuity between decisions.

---

# 20. CHAPTERS

Characters should be divided into chapters.

Example:

```text
The Beginning
Finding Your Path
Building Apple
Starting Again
Changing the World
```

Chapters should provide pacing and orientation.

The player should know approximately where they are in the journey without seeing the entire future.

Possible UI:

```text
CHAPTER 3

BUILDING APPLE
```

Avoid showing:

> Chapter 4: Forced Out of Apple

because that spoils future events.

---

# 21. PROGRESS

Progress should be visible but subtle.

Examples:

```text
6 / 10
```

or:

```text
● ● ● ● ● ● ○ ○ ○ ○
```

The player should understand that progress is being made.

Do NOT use excessive gamification.

No unnecessary:

* XP
* Coins
* Energy
* Lives
* Loot
* Daily timers

unless the product direction explicitly changes.

The story itself is the reward.

---

# 22. VISUAL DESIGN PHILOSOPHY

The visual design should be:

* Minimal
* Elegant
* Atmospheric
* Modern
* Mobile-first
* Highly readable
* Slightly mysterious
* Emotionally engaging

The game should NOT look like a complicated AAA game.

It should NOT have:

* Excessive gradients
* Huge visual effects
* Overloaded HUDs
* Dozens of buttons
* Excessive cards
* Constant particle effects
* Cartoonish UI unless intentionally designed
* Generic dashboard aesthetics

The interface should feel more like:

**an interactive historical story**

than:

**a productivity dashboard.**

---

# 23. MYSTERY VISUAL LANGUAGE

The visual identity should reinforce the unknown.

Use visual cues such as:

* Dark or atmospheric backgrounds when appropriate
* Soft lighting
* Subtle texture
* Historical imagery
* Blurred or obscured portraits
* Shadows
* Minimal typography
* Progressive image reveal
* Subtle transitions

Do not make the interface horror-themed.

"Mysterious" means:

> "I want to know what happens."

Not:

> "This is a horror game."

---

# 24. IMAGERY

Images should support the historical story.

Possible uses:

* Portraits
* Historical locations
* Objects
* Documents
* Machines
* Buildings
* Period photographs
* Abstract atmospheric imagery

Do not put a giant portrait of the character on every question.

That destroys the identity mystery.

If using the character's portrait, consider:

* silhouette
* blur
* partial crop
* obscured face
* low-detail background image

Then reveal the full identity at the end.

---

# 25. TYPOGRAPHY

Typography should be highly readable.

Prioritize:

1. Question readability
2. Choice readability
3. Historical context
4. Navigation

The question is the most important piece of text on the screen.

Do not use decorative fonts that harm readability.

Use typography to create hierarchy, not decoration.

---

# 26. MOBILE-FIRST UX

Assume the player is holding a phone.

The primary interaction must work naturally with:

* One hand
* Thumb interaction
* Touch
* Small screens
* Variable screen heights

Buttons must have comfortable touch targets.

Do not place important buttons too close together.

YES and NO should be:

* Large
* Clearly separated
* Easy to understand
* Easy to tap
* Visually balanced

Never make the user perform precise gestures for the core game.

---

# 27. RESPONSIVE DESIGN

The game must work well on:

* Mobile
* Tablet
* Desktop

But do NOT simply stretch the mobile UI across the entire desktop.

On larger screens, use the additional space intentionally.

The central story area can remain constrained:

```text
             ┌──────────────────────┐
             │                      │
             │       STORY          │
             │                      │
             │      QUESTION        │
             │                      │
             │   YES        NO      │
             │                      │
             └──────────────────────┘
```

The experience should remain focused.

---

# 28. INTERACTION DESIGN

Interactions should have personality.

Examples:

* Choice button subtly reacts on hover
* Button responds immediately on press
* Consequence transitions naturally
* Progress updates smoothly
* Chapter transitions feel meaningful
* Identity reveal feels special

Avoid:

* Excessive bounce
* Excessive scaling
* Constant shaking
* Distracting particles
* Long animations

Animation should communicate state.

---

# 29. ANIMATION PHILOSOPHY

Animation should answer one of these questions:

1. Does it communicate a state change?
2. Does it improve understanding?
3. Does it create anticipation?
4. Does it make the experience feel rewarding?

If the answer is no, do not animate it.

Preferred animation characteristics:

* Short
* Smooth
* Subtle
* Purposeful

Typical duration:

```text
Micro interaction: 100–200ms
UI transition: 200–400ms
Narrative transition: 300–700ms
Major reveal: potentially longer
```

Do not make every element animate independently.

---

# 30. THE DECISION MOMENT

The decision screen is the most important screen in the game.

It should create a small moment of tension.

Possible sequence:

```text
YEAR

Historical context

          ↓

QUESTION

          ↓

YES          NO
```

Give the player enough visual breathing room.

Do not crowd the question with UI.

The decision should feel important even though the mechanic is simple.

---

# 31. CHOICE FEEDBACK

When the player selects YES or NO:

1. Immediately acknowledge the touch.
2. Prevent accidental double submission.
3. Transition naturally.
4. Show the consequence.
5. Continue.

Never leave the player wondering whether the button worked.

---

# 32. SOUND DESIGN

Sound is important.

The game should not require sound to be understandable, but sound should significantly improve immersion.

Sound should be subtle.

Potential sound categories:

### UI

* Button hover
* Button press
* Navigation
* Page transition

### Decision

A subtle sound when a decision is made.

### Consequence

A soft transition sound.

### Chapter

A distinctive but subtle chapter transition sound.

### Reveal

The identity reveal should have a stronger musical/audio moment.

### Final Result

The final score should have a satisfying completion sound.

---

# 33. AUDIO RESTRAINT

Do NOT put sound effects everywhere.

Avoid:

* Arcade-style beeps
* Loud success sounds
* Loud failure sounds
* Constant background noise
* Sound on every animation
* Irritating repeated loops

The tone should be closer to:

**cinematic documentary + interactive story**

than:

**mobile arcade game**.

---

# 34. MUSIC

Background music should be adaptive to the experience.

Potential structure:

```text
Main menu
    ↓
Low atmospheric music

Gameplay
    ↓
Subtle ambient music

Important decision
    ↓
Slight tension

Reveal
    ↓
Emotional / cinematic moment

Results
    ↓
Resolution
```

Music should never overpower text.

The player needs to read.

Provide a mute control.

Persist the user's audio preference.

---

# 35. SOUND IMPLEMENTATION

Audio should be abstracted behind a small audio service.

Do not scatter audio implementation across components.

Prefer:

```text
audio.play("decision")
audio.play("reveal")
audio.play("chapter")
```

rather than:

```text
HTMLAudioElement logic everywhere
```

The implementation should remain replaceable.

If the project already has an audio abstraction, use it.

Do not introduce a large audio framework unless genuinely necessary.

---

# 36. ACCESSIBILITY

Accessibility is not optional.

Support:

* Keyboard navigation
* Visible focus
* Screen reader-friendly buttons
* Sufficient contrast
* Reduced motion
* Accessible labels
* Semantic HTML where applicable

The game must remain understandable when:

* Animations are disabled
* Sound is disabled
* Color perception differs

Never communicate important information through color alone.

---

# 37. REDUCED MOTION

Respect:

```text
prefers-reduced-motion
```

When reduced motion is enabled:

* Reduce transitions
* Remove unnecessary parallax
* Avoid dramatic scaling
* Avoid excessive movement

The game should remain visually polished without animation.

---

# 38. GAME STATE

The game state should remain small and understandable.

Typical state:

```text
currentCharacter
currentEvent
selectedChoice
showingConsequence
score
riskScore
independenceScore
completedEvents
gamePhase
```

Possible game phases:

```text
INTRO
QUESTION
CONSEQUENCE
REVEAL
RESULT
TIMELINE
```

Do not create dozens of boolean states when a clear state machine or enum can represent the game phase.

Avoid impossible states such as:

```text
isQuestion = true
isResult = true
isConsequence = true
```

Prefer a single explicit phase.

---

# 39. STATE TRANSITIONS

The core state flow should be predictable:

```text
INTRO
  ↓
QUESTION
  ↓
CHOICE SELECTED
  ↓
CONSEQUENCE
  ↓
NEXT EVENT
  ↓
QUESTION
```

At the final event:

```text
CONSEQUENCE
  ↓
REVEAL
  ↓
RESULT
```

Avoid hidden state mutations.

---

# 40. REACT ARCHITECTURE

Use React idiomatically.

Prefer small focused components.

Possible structure:

```text
App
 └── Game
      ├── GameIntro
      ├── ChapterHeader
      ├── EventView
      ├── QuestionView
      ├── ChoiceButtons
      ├── ConsequenceView
      ├── ProgressIndicator
      ├── IdentityReveal
      ├── ResultsView
      └── TimelineView
```

These are conceptual boundaries.

Do NOT create components merely because a section has ten lines of JSX.

Component extraction should improve:

* Reuse
* Readability
* State isolation
* Testing
* Maintainability

---

# 41. REACT PRINCIPLES

Prefer:

* Functional components
* Hooks
* Derived state
* Explicit state transitions
* Stable keys
* Memoization only when justified
* Small event handlers
* Pure calculations outside components

Avoid:

* Premature `useMemo`
* Premature `useCallback`
* Excessive component memoization
* Deep prop drilling when a simple architecture is sufficient
* Global state for local state
* Effects for things that can be derived

Never add React optimization because it "looks professional."

Optimize based on actual rendering behavior or a clear architectural reason.

---

# 42. DATA VS PRESENTATION

Keep historical content separate from UI.

Bad:

```jsx
if (character === "steve-jobs") {
   ...
}
```

Good:

```jsx
<EventView event={currentEvent} />
```

The component should not care whether the character is:

* Steve Jobs
* Nikola Tesla
* Albert Einstein
* Bill Gates
* Michael Jackson

The data determines the story.

The engine determines the behavior.

The components render the experience.

---

# 43. NO CHARACTER-SPECIFIC COMPONENTS

Do not create:

```text
SteveJobsGame.jsx
TeslaGame.jsx
EinsteinGame.jsx
```

unless there is a genuine gameplay reason.

The preferred architecture is:

```text
GameEngine
+
CharacterData
+
Reusable UI
```

New characters should be primarily data additions.

---

# 44. SCORING ENGINE

Scoring calculations should be isolated from presentation.

Example conceptual API:

```text
calculateHistoricalSimilarity(events, choices)
calculateRiskScore(choices)
calculateIndependenceScore(choices)
findBiggestDivergence(events, choices)
```

These functions should be deterministic and easily testable.

Do not calculate complicated scoring logic directly inside JSX.

---

# 45. RESULTS SHOULD BE DATA-DRIVEN

The results screen should receive calculated data.

Example:

```js
{
  historicalSimilarity: 78,
  risk: 84,
  independence: 91,
  biggestDivergence: {...}
}
```

The results UI should only present this information.

---

# 46. BIGGEST DIVERGENCE

Find the most important event where the player's choice differs from the historical choice.

Prefer the divergence with the highest event weight.

Example:

```text
Event 3 → weight 2 → different
Event 5 → weight 5 → same
Event 7 → weight 5 → different
```

The most significant divergence is Event 7.

Use that in the final result.

---

# 47. TIMELINE VIEW

The player should optionally be able to inspect the journey after completion.

The timeline can show:

```text
✓ 1968
✓ 1972
✕ 1974
✓ 1976
✓ 1980
✕ 1985
```

But do not expose too much information during the initial playthrough.

The timeline is a **post-game reflection tool**.

---

# 48. FINAL REVEAL

The identity reveal deserves special treatment.

Before reveal:

```text
YOUR JOURNEY IS COMPLETE

You have reached the end.
```

Then:

```text
You were living...

STEVE JOBS
```

Use:

* Portrait reveal
* Name
* Years
* Short description
* Subtle animation
* Appropriate sound

This should be one of the strongest emotional moments in the game.

Do not overdo it.

A restrained reveal is more powerful than a giant explosion of effects.

---

# 49. GAME FEEL

Even though this is primarily a narrative game, it must still have **game feel**.

The player should feel:

* Every tap is acknowledged
* Progress is meaningful
* Choices have weight
* Transitions are intentional
* Results are rewarding
* Discovery is satisfying

The game should feel polished even if there are only two buttons.

---

# 50. RETENTION

The game should tempt players to return without relying on manipulative mechanics.

Good retention:

* New historical characters
* New stories
* Better understanding of previous stories
* Personal results
* Comparison between characters
* Replay
* Discovering different paths

Avoid:

* Artificial energy systems
* Forced waiting
* Aggressive notifications
* Fake scarcity
* Punishment for leaving
* Endless currencies

The player should return because:

> **"I want to experience another life."**

---

# 51. CHARACTER SELECTION

When multiple characters are available, the selection screen should preserve mystery.

Instead of:

```text
Steve Jobs
Nikola Tesla
Albert Einstein
Bill Gates
```

consider:

```text
LIFE #01
Technology
★★★★★

LIFE #02
Electricity
★★★★★

LIFE #03
Physics
★★★★☆

LIFE #04
Business
★★★★☆
```

The actual identity can optionally remain hidden until the player chooses or completes the life.

This is a design decision, not a mandatory implementation.

---

# 52. CONTENT PACING

A character should not contain unnecessary events.

A strong 10-event story is better than a weak 30-event story.

Every event should answer:

> **Did this decision meaningfully influence the person's journey?**

If not, remove it.

Target:

**10–15 strong events**

before considering longer stories.

---

# 53. CONTENT QUALITY OVER QUANTITY

Do not generate historical questions simply to increase the event count.

Each question must have:

* Historical relevance
* Narrative value
* A plausible alternative
* A meaningful decision
* A consequence

If an event cannot satisfy these requirements, it probably does not belong.

---

# 54. MOBILE PERFORMANCE

The game must remain fast.

Prioritize:

* Small bundles
* Optimized images
* Lazy loading where appropriate
* Efficient rendering
* Minimal dependencies
* No unnecessary re-renders
* No giant animation libraries for tiny effects

Do not sacrifice perceived performance for visual effects.

The first interaction should feel immediate.

---

# 55. IMAGE PERFORMANCE

Historical images can become expensive.

Use:

* Appropriate dimensions
* Modern formats where supported
* Responsive image sizing
* Lazy loading for non-critical content
* Preload only genuinely important assets

Do not load every character's image when the game starts.

---

# 56. DEPENDENCY POLICY

Before adding a dependency ask:

1. Can React solve this?
2. Can CSS solve this?
3. Can a small utility solve this?
4. Does the project already have something that solves this?
5. Is the dependency worth its maintenance cost?

Do not add a package for a trivial feature.

Every dependency increases:

* Bundle size
* Maintenance
* Security surface
* Upgrade complexity
* Potential incompatibility

---

# 57. EXISTING PROJECT CONVENTIONS

Before changing code:

1. Inspect the existing project.
2. Understand its architecture.
3. Understand its naming conventions.
4. Understand its styling system.
5. Understand its state management.
6. Understand its build system.
7. Understand its existing components.

Then work **with the project**, not against it.

Do not introduce a new architecture merely because you personally prefer it.

---

# 58. MINIMAL CHANGE PRINCIPLE

When implementing a feature:

> Change the smallest amount of code necessary to implement it correctly.

Do not refactor unrelated code.

Do not rename unrelated variables.

Do not reorganize unrelated folders.

Do not upgrade dependencies unless necessary.

Do not "clean up" unrelated code while implementing a feature.

Every unrelated modification increases risk.

---

# 59. MODERNIZATION POLICY

You are allowed to identify better modern approaches.

However:

**Do not automatically implement them.**

When you identify an improvement, explain:

1. What is currently wrong?
2. Why is it a problem?
3. What is the modern alternative?
4. What would change?
5. What risks exist?
6. Is the change actually worth doing now?

If the current implementation is good enough:

> Leave it alone.

Modern does not automatically mean better.

---

# 60. BEFORE CODING

Before implementing a substantial change:

1. Inspect relevant files.
2. Understand the current behavior.
3. Identify existing reusable components.
4. Identify the smallest implementation.
5. Consider mobile UX.
6. Consider accessibility.
7. Consider performance.
8. Consider animation and sound only where appropriate.
9. Implement.
10. Verify.

Do not start rewriting files immediately.

---

# 61. WHEN SOMETHING IS UNCLEAR

Do not invent complex requirements.

Use the existing product philosophy to make reasonable assumptions.

If an ambiguity can be resolved safely with a simple implementation, make the simple choice.

Only stop and ask when the decision could materially change:

* Architecture
* Data model
* User experience
* Existing behavior
* Persistent data
* Security
* Major scope

---

# 62. ERROR HANDLING

Errors should be graceful.

The user should not see:

* Raw stack traces
* Technical implementation errors
* Unhandled promise errors
* Broken layouts

If a historical asset fails:

Provide a graceful fallback.

If audio fails:

The game must continue.

If optional animation fails:

The game must continue.

The core gameplay must never depend on non-essential effects.

---

# 63. OFFLINE / FAILURE RESILIENCE

The core game should ideally be playable without requiring unnecessary network requests during gameplay.

Once character data and required assets are available, the actual game loop should be reliable.

A temporary failure in:

* Audio
* Analytics
* Optional images
* Non-essential services

must not break the game.

---

# 64. PERSISTENCE

If persistence is implemented, persist only what is necessary.

Potential data:

```text
completedCharacters
bestHistoricalScores
audioPreference
reducedMotionPreference
```

Do not persist excessive gameplay state unless required.

The player should not lose a completed result unnecessarily.

---

# 65. ANALYTICS

If analytics are added later, useful events include:

```text
game_started
character_started
decision_made
chapter_completed
character_completed
identity_revealed
result_viewed
timeline_viewed
replay_started
```

Do not collect unnecessary personal information.

Analytics must never become a dependency of gameplay.

---

# 66. TESTING

Prioritize tests for deterministic logic.

Especially test:

### Scoring

* Correct historical choice
* Incorrect historical choice
* Weighted scoring
* 0% result
* 100% result

### Risk

* Correct average
* Boundary values

### Independence

* Correct average

### Divergence

* Finds highest-weight divergence
* Handles no divergence

### Game progression

* First event
* Next event
* Final event
* Completion
* Restart

Do not spend disproportionate effort testing trivial visual markup.

---

# 67. UX TESTING

Before considering a feature complete, ask:

### First-time player

Can they understand what to do without instructions?

### Mobile user

Can they comfortably tap YES and NO?

### Reading

Can they read the historical context without feeling overwhelmed?

### Mystery

Is the person's identity reasonably hidden?

### Pacing

Does each decision arrive quickly enough?

### Feedback

Does every choice feel acknowledged?

### Ending

Does the reveal feel rewarding?

### Replay

Does the result create curiosity about another character?

---

# 68. DO NOT OVER-DESIGN

The project should have personality without becoming visually noisy.

If choosing between:

```text
10 animations
```

and:

```text
1 excellent transition
```

choose the excellent transition.

If choosing between:

```text
20 UI elements
```

and:

```text
5 meaningful elements
```

choose the 5.

If choosing between:

```text
complex interaction
```

and:

```text
simple interaction with excellent feedback
```

choose the simple interaction.

---

# 69. THE GOLDEN RULE

Always remember:

> **The game is about the decisions, not the interface.**

The UI exists to make the decision feel important.

The animation exists to make the transition feel meaningful.

The sound exists to make the moment feel memorable.

The scoring exists to make the ending feel personal.

The historical content exists to make the player curious.

Everything serves the story.

---

# 70. DEFINITION OF "DONE"

A feature is not done merely because it works technically.

It is done when:

* It works correctly.
* It fits the existing architecture.
* It works on mobile.
* It is responsive.
* It is accessible.
* It does not introduce unnecessary complexity.
* It has appropriate interaction feedback.
* It does not create unnecessary re-renders.
* It does not break existing behavior.
* It feels consistent with the game's visual language.
* It does not compromise the mystery.
* It does not add unnecessary visual noise.

---

# 71. AGENT RESPONSE FORMAT

When implementing a meaningful change, briefly report:

### What changed

What was implemented.

### Why

Why the implementation was chosen.

### UX impact

How the player experience changes.

### Technical impact

Important architectural or performance considerations.

### Verification

What was tested or checked.

Do not write a huge report for trivial changes.

Keep implementation communication proportional to the change.

---

# 72. FINAL DEVELOPMENT PRINCIPLE

Think like a developer who will maintain this game for years.

Do not optimize for:

> "How much code can I write?"

Optimize for:

> "How little code can produce an excellent experience?"

Do not optimize for:

> "How impressive can the UI look?"

Optimize for:

> "How strongly does the player want to know what happens next?"

Do not optimize for:

> "How many systems can we build?"

Optimize for:

> "How memorable is one decision?"

The ideal result is a game that looks simple when first opened, takes seconds to understand, and then becomes unexpectedly difficult to put down.

**Simple to play.
Interesting to discover.
Mysterious to uncover.
Personal to finish.
Tempting to replay.**
