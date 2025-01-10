import toast from "react-hot-toast";

export function toastMessage(
  title: string,
  type: "success" | "warn" = "success",
): void {
  switch (type) {
    case "success":
      toast.success(title, {
        icon: "✅",
      });
      break;
    case "warn":
      toast.error(title, {
        icon: "⛔️",
      });
      break;
    default:
      toast.success("Bang!", {
        icon: "✅",
      });
      break;
  }
}

// toastMessage("", "warn");
