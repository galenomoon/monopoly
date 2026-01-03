import { IoArrowUndoOutline } from "react-icons/io5";
import { RiBarcodeFill } from "react-icons/ri";
import { RiHandCoinLine } from "react-icons/ri";
import { FaRegGrinStars } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { RxCaretRight } from "react-icons/rx";

export const HistoryTransactions = ({ transactions, onUndo, onOpenFullHistory }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <section className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold dark:text-white mb-4">
          Histórico de Transações
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Nenhuma transação registrada ainda.
        </p>
      </section>
    );
  }

  const getTransactionIcon = (type) => {
    switch (type) {
      case "pay":
        return <RiBarcodeFill size={20} className="text-red-600 dark:text-red-400" />;
      case "receive":
        return <RiHandCoinLine size={20} className="text-green-600 dark:text-green-400" />;
      case "add200":
        return <FaRegGrinStars size={20} className="text-yellow-600 dark:text-yellow-400" />;
      case "creditLimit":
        return <FaCreditCard size={20} className="text-blue-600 dark:text-blue-400" />;
      default:
        return null;
    }
  };

  const getTransactionLabel = (type, value) => {
    switch (type) {
      case "pay":
        return `Pagamento de R$ ${value.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      case "receive":
        return `Recebimento de R$ ${value.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      case "add200":
        return `Adicionado R$ 200,00`;
      case "creditLimit":
        return `Limite alterado para R$ ${value.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      default:
        return "Transação";
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case "pay":
        return "text-red-600 dark:text-red-400";
      case "receive":
        return "text-green-600 dark:text-green-400";
      case "add200":
        return "text-yellow-600 dark:text-yellow-400";
      case "creditLimit":
        return "text-blue-600 dark:text-blue-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  // Mostrar apenas as últimas 3 transações
  const recentTransactions = transactions.slice(0, 3);

  return (
    <section className="pt-4 border-t border-gray-200 dark:border-gray-700">
      <div className="w-full flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold dark:text-white">
          Histórico de Transações
        </h2>
        {transactions.length > 0 && (
          <button onClick={onOpenFullHistory}>
            <RxCaretRight size={24} />
          </button>
        )}
      </div>
      {recentTransactions.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Nenhuma transação registrada ainda.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="flex-shrink-0">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${getTransactionColor(transaction.type)}`}>
                    {getTransactionLabel(transaction.type, transaction.value)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {new Date(transaction.timestamp).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onUndo(transaction.id)}
                className="flex-shrink-0 p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                title="Desfazer transação"
              >
                <IoArrowUndoOutline size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

