import toast from "react-hot-toast";
import { CustomToast } from "@/components/CustomToast";

/**
 * Exibe um toast customizado com estilo consistente
 * @param {string} message - Mensagem principal do toast
 * @param {Object} options - Opções adicionais
 * @param {string} options.title - Título do toast (opcional)
 * @param {string} options.avatar - URL da imagem do avatar (opcional)
 * @param {number} options.duration - Duração em milissegundos (opcional, padrão: 4000)
 * @param {string} options.type - Tipo do toast: 'gain', 'loss', 'error', 'default' (opcional)
 */
export const showToast = (message, options = {}) => {
  const { title, avatar, duration = 3000, type = "default" } = options;

  return toast.custom(
    (t) => (
      <CustomToast
        t={t}
        title={title}
        message={message}
        avatar={avatar}
        type={type}
      />
    ),
    {
      duration,
    }
  );
};

/**
 * Helper para toast de ganho (verde com emoji 💰)
 */
export const showGainToast = (message, options = {}) => {
  return showToast(message, {
    ...options,
    title: options.title || "Ganho",
    type: "gain",
  });
};

/**
 * Helper para toast de perda (vermelho com emoji 💸)
 */
export const showLossToast = (message, options = {}) => {
  return showToast(message, {
    ...options,
    title: options.title || "Perda",
    type: "loss",
  });
};

/**
 * Helper para toast de sucesso
 */
export const showSuccessToast = (message, options = {}) => {
  return showToast(message, {
    ...options,
    title: options.title || "Sucesso",
  });
};

/**
 * Helper para toast de erro (vermelho com emoji ❌)
 */
export const showErrorToast = (message, options = {}) => {
  return showToast(message, {
    ...options,
    title: options.title || "Erro",
    type: "error",
  });
};

