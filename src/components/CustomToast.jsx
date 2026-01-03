import toast from "react-hot-toast";

export const CustomToast = ({ t, title, message, avatar, type = "default" }) => {
  // Define cores e emojis baseados no tipo
  const getTypeStyles = () => {
    switch (type) {
      case "gain":
        return {
          borderColor: "border-green-500",
          emoji: "💰",
          buttonColor: "text-green-600 hover:text-green-500 focus:ring-green-500",
        };
      case "loss":
        return {
          borderColor: "border-red-500",
          emoji: "💸",
          buttonColor: "text-red-600 hover:text-red-500 focus:ring-red-500",
        };
      case "error":
        return {
          borderColor: "border-red-500",
          emoji: "❌",
          buttonColor: "text-red-600 hover:text-red-500 focus:ring-red-500",
        };
      default:
        return {
          borderColor: "border-gray-200",
          emoji: null,
          buttonColor: "text-indigo-600 hover:text-indigo-500 focus:ring-indigo-500",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className={`${
        t.visible ? "animate-custom-enter" : "animate-custom-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          {avatar && (
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-10 w-10 rounded-full"
                src={avatar}
                alt={title || "Avatar"}
              />
            </div>
          )}
          <div className={`${avatar ? "ml-3" : ""} flex-1`}>
            {title && (
              <p className="text-sm font-medium text-gray-900">
                {styles.emoji && <span className="mr-2">{styles.emoji}</span>}
                {title}
              </p>
            )}
            {message && (
              <p className={`text-sm ${title ? "mt-1" : ""} text-gray-500`}>
                {!title && styles.emoji && <span className="mr-2">{styles.emoji}</span>}
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className={`flex border-l ${styles.borderColor}`}>
        <button
          onClick={() => toast.dismiss(t.id)}
          className={`w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium ${styles.buttonColor} focus:outline-none focus:ring-2`}
        >
          Close
        </button>
      </div>
    </div>
  );
};

