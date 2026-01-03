import { FaRegGrinStars } from "react-icons/fa";
import { IoCalculatorOutline } from "react-icons/io5";
import { RiHandCoinLine } from "react-icons/ri";
import { RiBarcodeFill } from "react-icons/ri";

export const ActionButtons = ({
  onPay,
  onReceive,
  onAdd200,
  onRollDice,
  onOpenCalculator,
}) => {
  const actions = [
    {
      title: "Pagar",
      icon: <RiBarcodeFill size={24} className="flex-shrink-0 text-red-700" />,
      onClick: onPay,
    },
    {
      title: "Receber",
      icon: (
        <RiHandCoinLine size={24} className="flex-shrink-0 text-green-700" />
      ),
      onClick: onReceive,
    },
    {
      title: "+200",
      icon: <FaRegGrinStars size={24} className="flex-shrink-0" />,
      onClick: onAdd200,
    },
    {
      title: "Calculadora",
      icon: <IoCalculatorOutline size={24} className="flex-shrink-0" />,
      onClick: onOpenCalculator,
    },
    // {
    //   title: "Rode Dados",
    //   icon: <LuDices size={24} className="flex-shrink-0" />,
    //   onClick: onRollDice,
    // },
  ];

  return (
    <section className="flex gap-6">
      {actions.map((action) => (
        <div key={action.title} className="flex flex-col gap-2 items-center">
          <button
            onClick={action.onClick}
            className="w-[60px] h-[60px] flex justify-center items-center bg-gray-200 dark:bg-gray-700 p-4 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {action.icon}
          </button>
          <h1 className="text-sm dark:text-white">{action.title}</h1>
        </div>
      ))}
    </section>
  );
};
