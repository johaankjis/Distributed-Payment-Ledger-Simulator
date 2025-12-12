import { realtimeEvents } from "@/lib/realtime"
import type { RealtimeEvent } from "@/lib/realtime"
import type { MemoryStore, WorkflowRecord } from "@/lib/memory-store"

const memory: MemoryStore = {
  totalErrors: 0,
  lastProcessed: null,
  workflows: [],
  statistics: {
    errorTypes: {},
    severityCount: {},
    averageProcessingTime: 0,
  },
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { error, eventId } = body

    // Emit validation event
    const validationEvent: RealtimeEvent = {
      id: `${eventId}_validation`,
      type: "validation",
      message: "Validating error input...",
      timestamp: new Date(),
      status: "processing",
    }
    realtimeEvents.emit(validationEvent)

    // Simulate validation delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Validate input
    if (!error || error.trim().length === 0) {
      const errorEvent: RealtimeEvent = {
        id: `${eventId}_error`,
        type: "validation",
        message: "Validation failed: Empty error message",
        timestamp: new Date(),
        status: "error",
      }
      realtimeEvents.emit(errorEvent)
      return Response.json({ success: false, error: "Invalid input" }, { status: 400 })
    }

    // Emit workflow event
    const workflowEvent: RealtimeEvent = {
      id: `${eventId}_workflow`,
      type: "workflow",
      message: "Calling error processing workflow...",
      timestamp: new Date(),
      status: "processing",
    }
    realtimeEvents.emit(workflowEvent)

    // Simulate workflow processing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Process the error (simulate workflow)
    const workflowResult = {
      errorType: detectErrorType(error),
      severity: assessSeverity(error),
      suggestions: generateSuggestions(error),
      processedAt: new Date().toISOString(),
    }

    memory.totalErrors += 1
    memory.lastProcessed = error.substring(0, 100)

    const workflowRecord: WorkflowRecord = {
      id: eventId,
      result: workflowResult,
      timestamp: new Date().toISOString(),
    }

    memory.workflows = [workflowRecord, ...memory.workflows].slice(0, 10)

    // Update statistics
    memory.statistics.errorTypes[workflowResult.errorType] =
      (memory.statistics.errorTypes[workflowResult.errorType] || 0) + 1

    memory.statistics.severityCount[workflowResult.severity] =
      (memory.statistics.severityCount[workflowResult.severity] || 0) + 1

    // Emit memory update event
    const memoryEvent: RealtimeEvent = {
      id: `${eventId}_memory`,
      type: "memory_update",
      message: "Memory store updated",
      timestamp: new Date(),
      status: "completed",
      data: { memory },
    }
    realtimeEvents.emit(memoryEvent)

    // Emit completion event
    const completedEvent: RealtimeEvent = {
      id: eventId,
      type: "completed",
      message: `Error processed successfully: ${workflowResult.errorType}`,
      timestamp: new Date(),
      status: "completed",
      data: workflowResult,
    }
    realtimeEvents.emit(completedEvent)

    return Response.json({
      success: true,
      workflow: workflowResult,
      memory,
    })
  } catch (error) {
    console.error("[v0] Worker error:", error)
    return Response.json({ success: false, error: "Processing failed" }, { status: 500 })
  }
}

// Helper functions for workflow simulation
function detectErrorType(error: string): string {
  const lowerError = error.toLowerCase()
  if (lowerError.includes("syntax")) return "Syntax Error"
  if (lowerError.includes("type")) return "Type Error"
  if (lowerError.includes("reference")) return "Reference Error"
  if (lowerError.includes("network")) return "Network Error"
  if (lowerError.includes("timeout")) return "Timeout Error"
  return "General Error"
}

function assessSeverity(error: string): "low" | "medium" | "high" | "critical" {
  const lowerError = error.toLowerCase()
  if (lowerError.includes("critical") || lowerError.includes("fatal")) return "critical"
  if (lowerError.includes("error") || lowerError.includes("exception")) return "high"
  if (lowerError.includes("warning")) return "medium"
  return "low"
}

function generateSuggestions(error: string): string[] {
  const suggestions = ["Review error logs for additional context", "Check recent code changes"]

  const lowerError = error.toLowerCase()
  if (lowerError.includes("syntax")) {
    suggestions.push("Validate code syntax", "Check for missing brackets or semicolons")
  }
  if (lowerError.includes("network")) {
    suggestions.push("Verify network connectivity", "Check API endpoints")
  }
  if (lowerError.includes("timeout")) {
    suggestions.push("Increase timeout duration", "Optimize query performance")
  }

  return suggestions
}
