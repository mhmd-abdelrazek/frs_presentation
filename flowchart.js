const graphs = {
  overview: `
flowchart LR
INIT[Initializing Block] --> READY[Ready Block]
READY --> USER[User Processing Block]
USER --> RECORD[Record Handling Block]
USER -.->|Failure| READY
RECORD --> READY
`,
  init: `
flowchart TD
A[Start] --> B[Red LED ON]
B --> C[Connect WiFi]
C --> D[Get last session]
D --> E{Success?}
E -->|No| F[Wait 5s]
F --> C
E -->|Yes| G[Red OFF Blue ON]
`,
  ready: `
flowchart TD
E[Red OFF Blue ON] --> H[Read fingerprint]
H --> I{Read success?}
I -->|No| J[Red LED ON]
J --> H
I -->|Yes| OUT((To USER Processing))
`,
  user: `
flowchart TD
IN((fingerprint_id)) --> K[Get user]
K --> L{Fetch success?}
L -->|No| M[Red LED ON]
M --> N[Wait 5s]
N --> G((To READY))
L -->|Yes| O{User found?}
O -->|Yes| OUT1((To RECORD))
O -->|No| OUT2((To RECORD))
`,
  record: `
flowchart TD
O1((From USER: Found)) --> P[Send record]
P --> Q[Green LED ON]
Q --> R[Wait 5s]
R --> S[Green OFF Blue ON]
S --> H((To READY))

O2((From USER: Not Found)) --> T[Send empty record]
T --> U[Green LED ON]
U --> V[Wait 5s]
V --> W[Green OFF Blue ON]
W --> H((To READY))
`
};

document.addEventListener('DOMContentLoaded', () => {
    Object.keys(graphs).forEach(id => {
        const container = document.getElementById('mermaid-' + id);
        if (container) {
            container.textContent = graphs[id];
        }
    });
    // Initialize all mermaid elements at once
    mermaid.init(undefined, document.querySelectorAll('.mermaid'));
});
