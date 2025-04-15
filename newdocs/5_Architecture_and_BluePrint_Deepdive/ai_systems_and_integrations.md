


%% Diagram for AI Systems & Integration

```mermaid
graph TD
    subgraph Input
        DREAM_TXT["User Dream Text"]
        USER_CTX["User Context / History"]
    end

    subgraph AI Dream Oracle Core
        DREAM_TXT --> NLP["NLP Module (Symbol/Theme Extraction)"]
        NLP --> MEM["Context-Aware Memory System"]
        MEM --> |Omniscient| OMNI_MEM["Omniscient Memory"]
        MEM --> |Subjective| SUBJ_MEM["Subjective Memory"]
        MEM --> |Interactional| INT_MEM["Interactional Memory"]

        NLP --> VEC_STORE_QUERY["Query Vector Store"]
        VEC_STORE_QUERY --> VEC_DB["Vector Store"]
        VEC_DB --> NLP

        NLP --> KG_QUERY["Query Knowledge Graph"]
        KG_QUERY --> KG_DB["Dreamweaver Graph DB"]
        KG_DB --> NLP

        MEM --> INTERPRET["Interpretation Logic"]
        INTERPRET --> VIZ["Visualization Engine (Stable Diffusion)"]
        VIZ --> IMG_OUT["AI-Generated Image"]

        INTERPRET --> ESSENCE_GEN["Dream Essence Generation"]
        ESSENCE_GEN --> D_ESSENCE{"Dream Essence (Symbols, Narrative, Realm)"}

        %% GNN/DRL Interaction with KG
        KG_DB --> GNN_ANALYSIS["GNN Analysis (Insight Engine)"]
        GNN_ANALYSIS --> DRL_AGENT["DRL Agent (Emergent Decision)"]
        DRL_AGENT --> ACTION_SEL{"Selected AI Action"}
        ACTION_SEL -- Update Graph --> KG_DB
        ACTION_SEL --> EVENT_SYS["Trigger Game Event/Lore"]
    end

    subgraph Output & Integration
        D_ESSENCE --> ORACLE_LAYER["Oracle Integration Layer (Threshold Sig)"]
        IMG_OUT --> IPFS_STORE["Store Image on IPFS"] 
            IPFS_STORE--> IMG_CID{"Image CID"}
            IMG_CID--> ORACLE_LAYER 
            ORACLE_LAYER-->POLY_UPDATE ["Update Polygon Metadata(Dream Soul)"]

```