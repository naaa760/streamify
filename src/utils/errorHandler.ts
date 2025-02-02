type ErrorSeverity = "low" | "medium" | "high" | "critical";

interface ErrorMetadata {
  severity: ErrorSeverity;
  context?: Record<string, any>;
  timestamp: number;
}

class ErrorHandler {
  private static instance: ErrorHandler;
  private errors: Map<string, ErrorMetadata> = new Map();

  private constructor() {
    window.addEventListener(
      "unhandledrejection",
      this.handleUnhandledRejection
    );
  }

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  handleError(
    error: Error,
    severity: ErrorSeverity = "medium",
    context?: Record<string, any>
  ) {
    const metadata: ErrorMetadata = {
      severity,
      context,
      timestamp: Date.now(),
    };

    this.errors.set(error.message, metadata);
    this.logError(error, metadata);
    this.notifyError(error, metadata);
  }

  private handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    this.handleError(event.reason, "high", { unhandled: true });
  };

  private logError(error: Error, metadata: ErrorMetadata) {
    console.error("[ErrorHandler]", {
      message: error.message,
      stack: error.stack,
      ...metadata,
    });
  }

  private notifyError(error: Error, metadata: ErrorMetadata) {
    if (metadata.severity === "critical") {
      // Send to error reporting service
    }
  }
}

export const errorHandler = ErrorHandler.getInstance();
