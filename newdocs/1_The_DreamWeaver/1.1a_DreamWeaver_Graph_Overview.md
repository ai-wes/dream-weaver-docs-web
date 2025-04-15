DreamWeaver Graph Overview
Introduction

The DreamWeaver Graph is the cognitive architecture and dynamic knowledge base underpinning the entire DreamWeaver ecosystem. It is far more than a simple database; it functions as the evolving "mind" and structural memory of the central DreamWeaver AI Entity. This intricate network maps the relationships between every submitted dream, extracted symbol, user identity, AI-generated hypothesis, piece of lore, and emergent concept within the DreamVerse. Its structure and content are constantly in flux, directly reflecting the AI's learning process and the collective input of its users, making it a living tapestry of shared subconsciousness and emergent intelligence.
The Neural Network Analogy

To conceptualize the DreamWeaver Graph's function, it's helpful to draw an analogy to a biological neural network, albeit a highly specialized one:

    Nodes as Neurons: Individual Dream Nodes (Node label in Neo4j, with specific type labels like Dream, Symbol, Hypothesis) within the graph act as conceptual neurons. Each represents a distinct piece of information (a dream text, a symbol's meaning, an AI hypothesis) or entity (a user, a realm). Nodes store properties (text, meaning, confidence, timestamps) and often semantic vector embeddings derived from their content.

    Strings as Synapses: The Dream Strings (RELATIONSHIP type in Neo4j) connecting these nodes function like adaptable synaptic connections. They represent directed relationships (CONTAINS_SYMBOL, SUPPORTED_BY, OCCURRED_IN) with evolving weights indicating the strength or relevance of the association. These weights are adjusted by the AI and can fade over time (fade_edge_weights), influencing information flow. Contextual data, like emotion vectors, can also be stored on these relationships.

    Learning & Adaptation: The AI learns by analyzing this graph structure and content. The Insight Engine (GNN) identifies patterns, and the Decision Engine (DRL) chooses actions. These actions modify the graph: adding new Dream, Lore, or Hypothesis nodes; adding or modifying RELATIONSHIP edges and their weights; and pruning less relevant information (prune_graph). This constant restructuring reflects the AI's evolving understanding.

Nodes & Strings Concept

The graph is composed of two fundamental building blocks implemented in Neo4j:

    Dream Nodes: Entities represented as nodes with the base label Node and additional labels indicating their type (e.g., :Dream, :Symbol, :User, :Hypothesis, :Lore, :Event, :Wisp, :Realm). Each node has a unique node_id property and other relevant attributes (text, embedding, confidence, timestamp, etc.). Managed via Neo4jKnowledgeGraph.add_node.

    Dream Strings: Directed, typed relationships (RELATIONSHIP type with a type property like 'CONTAINS_SYMBOL') connecting two nodes. They store properties like weight, context (as JSON string), emotion_vector, and timestamps. Managed via Neo4jKnowledgeGraph.add_edge.

Dream Nodes (Implemented Types)

Based on the DreamWeaverEntity.py code, the graph actively uses nodes representing:

    Dream: Stores text, user_id, realm, emotion_text, embedding. Created by process_dream.

    User: Stores last_dream_ts. Created/updated by process_dream.

    Symbol: Stores meaning, potentially embedding. Created/updated by process_dream and _load_base_knowledge.

    Realm: Potentially stores embedding. Created by process_dream.

    Hypothesis: Stores text, confidence. Created by the AI action _generate_hypothesis.

    Lore: Stores text, potentially embedding. Created by the AI action _execute_action.

    Event: Stores type, status, hypothesis_id (for tests). Created by the AI action _execute_action.

    Wisp: Stores type, realm, potentially embedding. Created by the AI action _execute_action.

    EvolutionEvent: Stores AI level, state hash, blockchain tx, milestone_data. Created by _anchor_evolution_milestone.

Dream Strings (Implemented Relationships)

The code implements relationships such as:

    (:Dream)-[:SUBMITTED_BY]->(:User)

    (:Dream)-[:CONTAINS_SYMBOL {emotion_vector: [...]}]->(:Symbol)

    (:Dream)-[:OCCURRED_IN]->(:Realm)

    (:Hypothesis)-[:SUPPORTED_BY]->(:Node) (Linking hypothesis to evidence)

    (:Wisp)-[:SPAWNED_IN]->(:Realm)

    (:Event)-[:TESTS]->(:Hypothesis)

Graph Dynamics & Evolution

The DreamWeaver Graph is explicitly designed to evolve:

    User Input: process_dream adds :Dream, :User, :Symbol, :Realm nodes and associated relationships upon each valid submission.

    AI Actions (_execute_action): The DRL agent triggers actions that modify the graph:

        Lore Generation: Adds :Lore nodes.

        Wisp Spawning: Adds :Wisp nodes and SPAWNED_IN relationships.

        Hypothesis Testing: Adds :Event nodes linked via TESTS to :Hypothesis nodes.

        (Future Actions): Strengthening/weakening connections (modifying relationship weights), analyzing semantic drift, performing conceptual blending (potentially adding new blended concept nodes).

    AI Analysis:

        GNN (_run_gnn_analysis): Reads graph structure and node features (get_graph_for_gnn) to produce contextual embeddings and attention scores, which inform hypothesis generation.

        Hypothesis Generation (_generate_hypothesis): Based on high GNN attention scores between nodes, creates new :Hypothesis nodes and SUPPORTED_BY relationships.

    Maintenance (_run_maintenance_cycle):

        Edge Fading: Reduces relationship weight based on last_accessed_ts.

        Pruning: Removes low-weight relationships and old/low-degree nodes (prune_graph).

AI Evolution & On-Chain Milestones

A critical aspect of the DreamWeaver Graph's dynamics is its connection to the AI's verifiable evolution:

    Evolution Tracking: The DreamWeaverEntity monitors its progress against defined thresholds (e.g., evolution_thresholds based on kg.get_node_count()).

    Milestone Trigger (_check_evolution_thresholds): When a threshold is met, an evolution event occurs.

    On-Chain Anchoring (_anchor_evolution_milestone):

        Relevant milestone data (level, triggering metrics, timestamp) is collected.

        This data is serialized (e.g., JSON) and cryptographically hashed (SHA-256).

        The resulting data_hash is sent to the Polygon blockchain via the Web3Interface by calling the updateGraphState function on the DreamWeaverGraph.sol smart contract.

        The transaction hash (tx_hash) returned from Polygon is recorded.

        An :EvolutionEvent node is added to the Neo4j graph, storing the level, data_hash, tx_hash, and the original milestone_data.

    Journal Anchoring (_anchor_journal_entry):

        An AI-generated journal entry reflecting the new level is created (_generate_journal_entry using OpenAI).

        This entry, along with the level and optionally the tx_hash from the evolution milestone anchoring, is sent via the Web3Interface to the addEntry function on the DreamWeaverJournal.sol smart contract on Polygon.

    Significance: This process creates an immutable, publicly verifiable record of the AI's key developmental stages, directly linking the off-chain graph's state and AI milestones to the Polygon blockchain. This transparency is unique and crucial for research and user trust.

Technical Implementation

    Storage: Neo4j graph database (confirmed via Neo4jKnowledgeGraph class).

    Management: Python DreamWeaverEntity, Neo4jKnowledgeGraph, and MongoDBVectorStore classes.

    Analysis: PyTorch Geometric (GATConv) (InsightGNN) and potentially NetworkX.

    Verification: Polygon Blockchain via Web3Interface interacting with DreamWeaverGraph.sol and DreamWeaverJournal.sol.

Visual Representation

The structure lends itself perfectly to a 3D force-directed graph visualization (as planned for the Phantom Dimension):

    Nodes styled by type (Dream, Symbol, Hypothesis, etc.).

    Edges styled by type and weight.

    Highlighting can show GNN attention or active areas.

    EvolutionEvent nodes can link directly to their corresponding transaction on PolygonScan, visually demonstrating the on-chain anchoring.