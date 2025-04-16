# Overall Architecture Diagrams

## Introduction
This document contains architectural diagrams for the DreamWeaver ecosystem, illustrating the relationships between AI components, blockchain infrastructure, AR integration, and Knowledge Graph structures.

## System Overview

```mermaid
graph TD
    User[User] --> Frontend[Frontend Applications]
    Frontend --> API[API Gateway]
    API --> AI[AI Engine]
    API --> Blockchain[Blockchain Layer]
    API --> AR[AR Service]
    API --> KG[Knowledge Graph]
    AI <--> KG
    AI <--> Blockchain
    AR <--> AI
```

## AI Architecture

```mermaid
graph TD
    Input[User Input] --> NLP[NLP Processing]
    NLP --> Oracle[Dream Oracle]
    Oracle --> KG[Knowledge Graph Integration]
    Oracle --> Vector[Vector Processing]
    Oracle --> GNN[Graph Neural Networks]
    Oracle --> DRL[Deep Reinforcement Learning]
    Vector --> ResponseGen[Response Generation]
    GNN --> ResponseGen
    DRL --> ResponseGen
    KG --> ResponseGen
    ResponseGen --> Output[Output to User]
```

## Blockchain Architecture

```mermaid
graph TD
    User[User Wallet] --> Contracts[Smart Contracts]
    Contracts --> Assets[NFT Assets]
    Contracts --> Identity[Identity System]
    Contracts --> Economics[Economic System]
    Assets --> Nodes[Dream Nodes]
    Assets --> Wisps[Dream Wisps]
    Assets --> Runes[Dream Runes]
    Identity --> Soul[DreamSoul]
    Economics --> Token[Utility Token]
    Economics --> Marketplace[Marketplace]
```

## AR Integration

```mermaid
graph TD
    Mobile[Mobile Device] --> ARKit[AR Framework]
    ARKit --> Rendering[3D Rendering]
    ARKit --> Tracking[Spatial Tracking]
    ARKit --> Recognition[Image Recognition]
    Mobile --> Backend[Backend Services]
    Backend --> WispData[Wisp Data]
    Backend --> LocationData[Location Services]
    Backend --> UserData[User Data]
    WispData --> ARExperience[AR Experience]
    LocationData --> ARExperience
    Rendering --> ARExperience
```

## Knowledge Graph Structure

```mermaid
graph TD
    Central[Central Knowledge Graph] --> Personal[Personal KGs]
    Central --> Global[Global Knowledge]
    Personal --> UserData[User Data]
    Personal --> Preferences[User Preferences]
    Personal --> History[Interaction History]
    Global --> Dreams[Dream Patterns]
    Global --> Connections[Network Connections]
    Global --> Evolution[Evolutionary Patterns]
```

## Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant AI
    participant Blockchain
    participant KG

    User->>Frontend: Submit Dream
    Frontend->>API: Process Request
    API->>AI: Interpret Dream
    AI->>KG: Query/Update Knowledge
    AI->>API: Return Interpretation
    API->>Blockchain: Mint Assets
    Blockchain->>API: Confirm Transaction
    API->>Frontend: Return Results
    Frontend->>User: Display Experience
```

## Infrastructure Deployment

```mermaid
graph TD
    subgraph User Devices
        Mobile[Mobile Apps]
        Web[Web Interface]
    end

    subgraph Cloud Infrastructure
        API[API Gateway]
        subgraph Compute
            AI[AI Services]
            Backend[Backend Services]
        end
        subgraph Storage
            KG[Neo4j Knowledge Graph]
            Vector[Vector Database]
            Assets[Asset Storage]
        end
    end

    subgraph Blockchain
        Polygon[Polygon Network]
        IPFS[IPFS Storage]
    end

    Mobile --> API
    Web --> API
    API --> Compute
    Compute --> Storage
    Compute --> Blockchain