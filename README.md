# Distributed Payment Ledger Simulator

A real-time error processing system built with Next.js that provides workflow validation, event streaming, and memory management capabilities. The application features a modern UI with live updates and comprehensive error analysis.

## 🚀 Features

- **Real-time Event Streaming**: Server-Sent Events (SSE) for live updates
- **Error Processing Workflow**: Automated error validation and classification
- **Memory Management**: In-memory state tracking with statistics
- **Worker Status Monitoring**: Live connection status indicators
- **Error Type Detection**: Automatic categorization of error types (Syntax, Type, Reference, Network, Timeout, etc.)
- **Severity Assessment**: Four-level severity classification (low, medium, high, critical)
- **Smart Suggestions**: Context-aware recommendations for error resolution
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - Component library built on Radix UI
- **Lucide React** - Icon library
- **Recharts** - Data visualization
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Server-Sent Events (SSE)** - Real-time communication
- **In-memory storage** - Temporary state management

### Development
- **pnpm** - Package manager
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 📁 Project Structure

```
.
├── app/
│   ├── api/
│   │   ├── events/          # SSE endpoint for real-time updates
│   │   ├── memory/          # Memory store CRUD operations
│   │   └── worker/          # Main error processing endpoint
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Homepage with main UI
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── error-input-form.tsx # Error submission form
│   ├── event-stream.tsx     # Real-time event display
│   ├── memory-display.tsx   # Memory statistics view
│   └── worker-status.tsx    # Connection status indicator
├── hooks/
│   ├── use-realtime.ts      # SSE connection hook
│   ├── use-toast.ts         # Toast notification hook
│   └── use-mobile.ts        # Mobile detection hook
├── lib/
│   ├── realtime.ts          # Event emitter for SSE
│   ├── memory-store.ts      # Memory management utilities
│   └── utils.ts             # Utility functions
├── public/                  # Static assets
├── styles/                  # Additional stylesheets
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── next.config.mjs          # Next.js configuration
└── components.json          # shadcn/ui configuration
```

## 🔧 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/johaankjis/Distributed-Payment-Ledger-Simulator.git
   cd Distributed-Payment-Ledger-Simulator
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🎯 Usage

### Processing Errors

1. **Submit an error**: Enter an error message in the input form
2. **Real-time validation**: Watch as the system validates your input
3. **Workflow execution**: The error is processed through the workflow
4. **View results**: See error type, severity, and suggestions
5. **Monitor statistics**: Track error patterns in the memory display

### API Endpoints

#### `POST /api/worker`
Process an error through the validation and workflow system.

**Request Body:**
```json
{
  "error": "TypeError: Cannot read property 'name' of undefined",
  "eventId": "evt_1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "workflow": {
    "errorType": "Type Error",
    "severity": "high",
    "suggestions": [
      "Review error logs for additional context",
      "Check recent code changes",
      "Validate code syntax"
    ],
    "processedAt": "2025-12-12T03:00:00.000Z"
  },
  "memory": {
    "totalErrors": 5,
    "lastProcessed": "TypeError: Cannot read property 'name' of undefined",
    "workflows": [...],
    "statistics": {...}
  }
}
```

#### `GET /api/events`
Server-Sent Events endpoint for real-time updates.

**Event Types:**
- `connected` - Initial connection established
- `validation` - Error validation in progress
- `workflow` - Workflow processing
- `memory_update` - Memory state updated
- `completed` - Processing completed

#### `GET /api/memory`
Retrieve current memory state.

#### `POST /api/memory`
Update memory state.

#### `DELETE /api/memory`
Reset memory state to initial values.

## 🏗️ Architecture

### Event Flow

```
User Input → Error Input Form
     ↓
POST /api/worker
     ↓
Validation Event (SSE)
     ↓
Workflow Event (SSE)
     ↓
Error Processing
     ├── Error Type Detection
     ├── Severity Assessment
     └── Suggestion Generation
     ↓
Memory Update Event (SSE)
     ↓
Completion Event (SSE)
     ↓
UI Updates (Real-time)
```

### Real-time Communication

The application uses Server-Sent Events (SSE) for unidirectional real-time communication from server to client:

1. Client establishes connection to `/api/events`
2. Server pushes events as they occur
3. Client updates UI in real-time
4. Connection maintained with keepalive messages

### Memory Management

The system maintains an in-memory store with:
- **Total Errors**: Count of processed errors
- **Last Processed**: Most recent error message
- **Workflows**: Last 10 workflow results
- **Statistics**: Error type and severity distributions

## 🎨 Components

### Core Components

- **ErrorInputForm**: Form for submitting error messages
- **EventStream**: Real-time event log display
- **MemoryDisplay**: Statistics and memory state visualization
- **WorkerStatus**: Connection status indicator

### UI Components (shadcn/ui)

Includes a comprehensive set of accessible, customizable components:
- Button, Card, Input, Textarea
- Dialog, AlertDialog, Accordion
- Tabs, Select, Dropdown
- Toast notifications
- Progress indicators
- And many more...

## 🧪 Development

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

### Adding New Components

```bash
# Add shadcn/ui components
npx shadcn-ui@latest add [component-name]
```

## 🔒 Error Detection Logic

### Error Type Detection
- **Syntax Error**: Keywords like "syntax"
- **Type Error**: Keywords like "type"
- **Reference Error**: Keywords like "reference"
- **Network Error**: Keywords like "network"
- **Timeout Error**: Keywords like "timeout"
- **General Error**: Default category

### Severity Assessment
- **Critical**: "critical", "fatal"
- **High**: "error", "exception"
- **Medium**: "warning"
- **Low**: Default level

## 📊 Future Enhancements

- [ ] Persistent database storage (replace in-memory store)
- [ ] User authentication and authorization
- [ ] Advanced analytics and reporting
- [ ] Export functionality for error logs
- [ ] Integration with external monitoring services
- [ ] Machine learning for improved error classification
- [ ] Multi-user support with role-based access

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**johaankjis**
- GitHub: [@johaankjis](https://github.com/johaankjis)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Deployed on [Vercel](https://vercel.com/)

---

Made with ❤️ using Next.js and TypeScript
