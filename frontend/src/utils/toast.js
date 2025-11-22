import toast, { Toaster } from "react-hot-toast";

// Custom toast styles
const toastStyles = {
  base: {
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "500",
    padding: "16px 20px",
    maxWidth: "400px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
  },
  success: {
    background: "#10B981",
    color: "#FFFFFF",
  },
  error: {
    background: "#EF4444",
    color: "#FFFFFF",
  },
  warning: {
    background: "#F59E0B",
    color: "#FFFFFF",
  },
  info: {
    background: "#3B82F6",
    color: "#FFFFFF",
  },
  loading: {
    background: "#6B7280",
    color: "#FFFFFF",
  },
};

// Main toast utility class
class ToastService {
  /**
   * Success toast
   * @param {string} message
   */
  success(message) {
    return toast.success(message, {
      style: {
        ...toastStyles.base,
        ...toastStyles.success,
      },
      duration: 4000,
    });
  }

  /**
   * Error toast
   * @param {string} message
   */
  error(message) {
    return toast.error(message, {
      style: {
        ...toastStyles.base,
        ...toastStyles.error,
      },
      duration: 5000,
    });
  }

  /**
   * Warning toast (using custom as there's no built-in warning)
   * @param {string} message
   */
  warning(message) {
    return toast(message, {
      icon: "⚠️",
      style: {
        ...toastStyles.base,
        ...toastStyles.warning,
      },
      duration: 4500,
    });
  }

  /**
   * Info toast
   * @param {string} message
   */
  info(message) {
    return toast(message, {
      icon: "ℹ️",
      style: {
        ...toastStyles.base,
        ...toastStyles.info,
      },
      duration: 4000,
    });
  }

  /**
   * Loading toast
   * @param {string} message
   */
  loading(message) {
    return toast.loading(message, {
      style: {
        ...toastStyles.base,
        ...toastStyles.loading,
      },
    });
  }

  /**
   * Promise toast - handles loading, success, and error states
   * @template T
   * @param {Promise<T>} promise
   * @param {{loading: string, success: string | ((data: T) => string), error: string | ((error: Error) => string)}} messages
   */
  promise(promise, { loading, success, error }) {
    return toast.promise(
      promise,
      {
        loading,
        success,
        error,
      },
      {
        style: toastStyles.base,
        success: {
          style: {
            ...toastStyles.base,
            ...toastStyles.success,
          },
        },
        error: {
          style: {
            ...toastStyles.base,
            ...toastStyles.error,
          },
        },
        loading: {
          style: {
            ...toastStyles.base,
            ...toastStyles.loading,
          },
        },
      }
    );
  }

  /**
   * Custom toast for specific use cases
   * @param {string} message
   * @param {{type?: "success" | "error" | "warning" | "info"}} [options]
   */
  custom(message, options) {
    const { type = "info" } = options || {};

    switch (type) {
      case "success":
        return this.success(message);
      case "error":
        return this.error(message);
      case "warning":
        return this.warning(message);
      case "info":
        return this.info(message);
      default:
        return this.info(message);
    }
  }

  /**
   * Dismiss specific toast
   * @param {string} [toastId]
   */
  dismiss(toastId) {
    return toast.dismiss(toastId);
  }

  /**
   * Dismiss all toasts
   */
  dismissAll() {
    return toast.dismiss();
  }

  /**
   * Remove specific toast
   * @param {string} toastId
   */
  remove(toastId) {
    return toast.remove(toastId);
  }
}

// Create singleton instance
export const toastService = new ToastService();

// Default export for convenience
export default toastService;

// Export Toaster component for React app setup
export { Toaster };