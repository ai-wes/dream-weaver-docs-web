<img src="/images/blockchain_contracts_charts.png" alt="Blockchain Contracts Architecture" style="display:block;margin:0 auto 2rem auto;max-width:700px;border-radius:16px;box-shadow:0 4px 32px #0008;">

%% Diagram for Blockchain Implementation

```mermaid
graph TD
    subgraph User Interaction
        U[User] --> FE[Frontend UI]
    end

    subgraph Backend Systems
        FE --> API[Backend API]
        API --> ORC[AI Oracle Service]
        API --> KG_DB["Dreamweaver Graph DB"]
        API --> VEC_DB["Vector Store"]
    end

    subgraph Polygon Blockchain
        API -- Transaction --> POLY["Polygon PoS Network"]
        POLY --> DS_NFT["DreamSoul Contract (ERC721)"]
        POLY --> FF_CON["Fragment Fusion Contract"]
        POLY --> UA_CON["Upgrade Ascension Contract"]
        POLY --> DC_CON["Dream Coin Contract (ERC20)"]
        POLY --> TT_CON["Time Token Contract (ERC20)"]
        POLY --> DWG_CON["DreamWeaverGraph Contract"]
        POLY --> DGOV_CON["DreamGovernance Contract"]

        ORC -- Oracle Update --> DWG_CON
        ORC -- Metadata Update --> DS_NFT

        FF_CON -- Updates --> DS_NFT
        UA_CON -- Reads/Updates --> DS_NFT
        UA_CON -- Uses --> TT_CON
        DGOV_CON -- Reads --> DS_NFT

        DS_NFT -- Stores Metadata Ref --> IPFS["IPFS for Dream Essence"]
    end

    %% Interactions
    FE -- Mint DreamSoul --> API
    FE -- Submit Dream --> API
    FE -- Upgrade DreamSoul --> API
    API -- Trigger Mint --> DS_NFT
    API -- Send Dream to Oracle --> ORC
    API -- Trigger Upgrade --> UA_CON
    API -- Use Fragments --> FF_CON
    API -- Use Time Tokens --> TT_CON
    API -- Anchor AI State --> DWG_CON
    FE -- Vote --> API
    API -- Relay Vote --> DGOV_CON

    style POLY fill:#8a2be2,stroke:#333,stroke-width:2px,color:#fff
    style DS_NFT fill:#dda0dd,stroke:#333,stroke-width:1px
    style FF_CON fill:#dda0dd,stroke:#333,stroke-width:1px
    style UA_CON fill:#dda0dd,stroke:#333,stroke-width:1px
    style DC_CON fill:#dda0dd,stroke:#333,stroke-width:1px
    style TT_CON fill:#dda0dd,stroke:#333,stroke-width:1px
    style DWG_CON fill:#dda0dd,stroke:#333,stroke-width:1px
    style DGOV_CON fill:#dda0dd,stroke:#333,stroke-width:1px
```