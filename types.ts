export enum MatrixType {
  PHENOM_CARTOGRAPHY = 'PHENOMENOLOGICAL CARTOGRAPHY',
  RECURSIVE_HERMENEUTICS = 'RECURSIVE HERMENEUTIC SPIRAL',
  EXISTENTIAL_PRAXIS = 'EXISTENTIAL PRAXIS',
  CULTURAL_GENEALOGY = 'CULTURAL-HISTORICAL GENEALOGY',
  META_INTERROGATION = 'META-PHILOSOPHICAL INTERROGATION',
  SUBSTRATE_CONSCIOUSNESS = 'SUBSTRATE-INDEPENDENT CONSCIOUSNESS'
}

export enum MoveType {
  DEFINE = 'DEFINE',
  DISTINGUISH = 'DISTINGUISH',
  RECONSTRUCT = 'RECONSTRUCT',
  DESCRIBE = 'DESCRIBE',
  INTERPRET = 'INTERPRET',
  ALIGN = 'ALIGN',
  OBJECT = 'OBJECT',
  REPAIR = 'REPAIR',
  BRACKET = 'BRACKET',
  CHALLENGE = 'CHALLENGE',
  PROPOSE = 'PROPOSE',
  NEXT = 'NEXT',
  IDP_EXCAVATE = 'IDP/1 EXCAVATE',
  IDP_FRACTURE = 'IDP/2 FRACTURE',
  IDP_SUSPEND = 'IDP/3 SUSPEND',
  IDP_DENSIFY = 'IDP/4 DENSIFY',
  IDP_ATTUNE = 'IDP/5 ATTUNE'
}

export enum EpistemicStatus {
  TEXTUAL = 'TEXTUAL',
  INFERRED = 'INFERRED',
  INTERPRETIVE = 'INTERPRETIVE',
  PHENOMENOLOGICAL = 'PHENOMENOLOGICAL',
  ANALOGICAL = 'ANALOGICAL',
  SPECULATIVE = 'SPECULATIVE',
  NORMATIVE = 'NORMATIVE',
  APHATIC = 'APHATIC'
}

export interface Move {
  type: MoveType;
  text: string;
  status: EpistemicStatus;
}

export interface Metrics {
  rigor: number;
  phenomFidelity: number;
  hermeneuticFidelity: number;
  synthesisDiscipline: number;
  existentialCourage: number;
  evidenceDensity: number;
  antiReification: number;
  apophaticDiscipline: number;
  novelty: number;
  coherence: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string; // Raw markdown/text content
  timestamp: number;
  structuredData?: {
    moves: Move[];
    metrics: Metrics;
    activeMatrix: MatrixType;
  };
}

export interface GraphNode {
  id: string;
  group: number;
  val: number; // radius
  type?: MoveType; // The move type that generated this node
}

export interface GraphLink {
  source: string;
  target: string;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}
