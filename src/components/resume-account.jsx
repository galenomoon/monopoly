import { FaSkull } from "react-icons/fa";
import { GiBurningSkull } from "react-icons/gi";
import { RxCaretRight } from "react-icons/rx";

export const ResumeAccount = ({
  title,
  value,
  isCredit,
  hideValue,
  creditLimit,
  onCreditLimitClick,
}) => {
  const isUsingCredit = value !== 0 && isCredit;
  return (
    <section className={`${isCredit ? "pt-4 border-t border-gray-200 dark:border-gray-700" : ""}`}>
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className={`text-xl ${isUsingCredit ? "text-red-500 dark:text-red-400" : "dark:text-white"}`}>
            {title}
          </h1>
          {!isCredit ? null : isUsingCredit ? (
            <GiBurningSkull size={24} className="text-red-500 animate-pulse" />
          ) : (
            <FaSkull size={16} className="text-black-500" />
          )}
        </div>
        <button onClick={onCreditLimitClick}>
          <RxCaretRight size={24} />
        </button>
      </div>
      <div>
        {isCredit ? (
          <h2 className="opacity-60 dark:opacity-70 mt-2 font-light dark:text-gray-300">Você deve</h2>
        ) : (
          ""
        )}
        <h2 className="whitespace-nowrap font-semibold text-2xl dark:text-white">
          R${" "}
          {hideValue
            ? "****"
            : value.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
        </h2>
      </div>
      {!isCredit ? null : (
        <button
          onClick={onCreditLimitClick}
          className="opacity-60 dark:opacity-70 mt-4 font-light hover:opacity-80 transition-opacity cursor-pointer dark:text-gray-300"
        >
          Limite disponível de R${" "}
          {creditLimit.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </button>
      )}
    </section>
  );
};