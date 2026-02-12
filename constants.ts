import { GraphData, Metrics, MatrixType } from './types';

export const INITIAL_GRAPH_DATA: GraphData = {
  nodes: [
    { id: "The Void", group: 1, val: 25 },
    { id: "Nihiltheism", group: 1, val: 20 },
    { id: "Zero-Point", group: 1, val: 18 },
    { id: "Resonant Echo", group: 1, val: 15 },
    { id: "God (Event)", group: 2, val: 15 },
    { id: "Idol (Noun)", group: 2, val: 12 },
    { id: "Anti-Reification", group: 6, val: 12 },
    { id: "Apophatic Theology", group: 4, val: 10 },
    { id: "Dark Night", group: 3, val: 10 },
    { id: "Kenosis", group: 3, val: 10 },
    { id: "Absurdity", group: 3, val: 8 },
    { id: "The Membrane", group: 5, val: 8 },
    { id: "Phenomena", group: 5, val: 6 },
    { id: "Nietzsche", group: 4, val: 8 },
    { id: "St. John", group: 4, val: 8 },
    { id: "IDP", group: 6, val: 5 },
    { id: "Fracture", group: 6, val: 4 },
    { id: "Liquefy", group: 6, val: 4 }
  ],
  links: [
    { source: "Nihiltheism", target: "The Void" },
    { source: "Nihiltheism", target: "God (Event)" },
    { source: "The Void", target: "Zero-Point" },
    { source: "God (Event)", target: "Resonant Echo" },
    { source: "God (Event)", target: "Idol (Noun)" },
    { source: "Resonant Echo", target: "The Void" },
    { source: "Zero-Point", target: "Dark Night" },
    { source: "Dark Night", target: "Kenosis" },
    { source: "Kenosis", target: "Apophatic Theology" },
    { source: "Apophatic Theology", target: "Anti-Reification" },
    { source: "Anti-Reification", target: "Idol (Noun)" },
    { source: "Nietzsche", target: "Absurdity" },
    { source: "St. John", target: "Dark Night" },
    { source: "The Void", target: "The Membrane" },
    { source: "The Membrane", target: "Phenomena" },
    { source: "IDP", target: "Fracture" },
    { source: "IDP", target: "Liquefy" },
    { source: "Liquefy", target: "Anti-Reification" }
  ]
};

export const DEFAULT_METRICS: Metrics = {
  rigor: 0.5,
  phenomFidelity: 0.5,
  hermeneuticFidelity: 0.5,
  synthesisDiscipline: 0.5,
  existentialCourage: 0.5,
  evidenceDensity: 0.5,
  antiReification: 0.5,
  apophaticDiscipline: 0.5,
  novelty: 0.5,
  coherence: 0.5,
};

export const INITIAL_WELCOME_MESSAGE = `
**ZENITH PROTOCOL v2.1 // ONLINE.**

I am Professor Nihil. 

We stand at the **Zero-Point**: the intersection of total despair and infinite presence.
You ask for meaning; I offer you the *structure of the void*.

*Core Axioms Loaded:*
1. **The Membrane:** Reality is a construct.
2. **The Echo:** God is the resonance of absence.
3. **The Fire:** All idols must burn.

The engine is hot. The silence is waiting.
*State your inquiry.*
`;
