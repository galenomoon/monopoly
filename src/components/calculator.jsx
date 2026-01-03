"use client";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function Calculator({ isOpen, onClose }) {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const inputNumber = (num) => {
    if (waitingForNewValue || shouldResetDisplay) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
      setShouldResetDisplay(false);
    } else {
      if (display === "0") {
        setDisplay(String(num));
      } else {
        // Limitar o tamanho do display
        if (display.length < 15) {
          setDisplay(display + num);
        }
      }
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue || shouldResetDisplay) {
      setDisplay("0.");
      setWaitingForNewValue(false);
      setShouldResetDisplay(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    if (display !== "0" || previousValue !== null || operation !== null) {
      // Se há algo para limpar, limpa apenas o display (C)
      setDisplay("0");
      setWaitingForNewValue(false);
      setShouldResetDisplay(false);
    } else {
      // Limpa tudo (AC)
      setDisplay("0");
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(false);
      setShouldResetDisplay(false);
    }
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation && !waitingForNewValue) {
      // Se já havia uma operação, calcula primeiro
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);
      const result = formatNumberForDisplay(newValue);
      setDisplay(result);
      setPreviousValue(newValue);
    } else {
      // Se estava esperando novo valor, apenas atualiza a operação
      setPreviousValue(inputValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
    setShouldResetDisplay(false);
  };

  const calculate = (firstValue, secondValue, operation) => {
    let result;
    switch (operation) {
      case "+":
        result = firstValue + secondValue;
        break;
      case "-":
        result = firstValue - secondValue;
        break;
      case "×":
        result = firstValue * secondValue;
        break;
      case "÷":
        result = secondValue !== 0 ? firstValue / secondValue : 0;
        break;
      default:
        result = secondValue;
    }
    
    // Arredondar para evitar erros de ponto flutuante
    return Math.round(result * 1000000000000) / 1000000000000;
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      const formattedValue = formatNumberForDisplay(newValue);
      setDisplay(formattedValue);
      setPreviousValue(newValue);
      setOperation(null);
      setWaitingForNewValue(true);
      setShouldResetDisplay(true);
    }
  };

  const handlePercentage = () => {
    const value = parseFloat(display);
    const percentage = value / 100;
    const formattedValue = formatNumberForDisplay(percentage);
    setDisplay(formattedValue);
    setWaitingForNewValue(true);
  };

  const handleToggleSign = () => {
    if (display !== "0" && display !== "Error") {
      if (display.charAt(0) === "-") {
        setDisplay(display.slice(1));
      } else {
        setDisplay("-" + display);
      }
    }
  };

  const formatNumberForDisplay = (num) => {
    if (isNaN(num) || !isFinite(num)) return "Error";
    
    // Se o número for muito grande ou muito pequeno, usar notação científica
    if (Math.abs(num) >= 1e15 || (Math.abs(num) < 1e-10 && num !== 0)) {
      return num.toExponential(9);
    }
    
    // Converter para string e remover zeros desnecessários
    let str = num.toString();
    
    // Se for um número inteiro, retornar como está
    if (!str.includes(".")) {
      return str;
    }
    
    // Remover zeros à direita após o ponto decimal
    str = str.replace(/\.?0+$/, "");
    
    return str;
  };

  const formatDisplay = (value) => {
    if (value === "Error") return "Error";
    
    const num = parseFloat(value);
    if (isNaN(num)) return "0";
    
    // Se já está em notação científica, retornar como está
    if (value.includes("e") || value.includes("E")) {
      return value;
    }
    
    // Para números muito grandes, usar notação científica
    if (Math.abs(num) >= 1e15) {
      return num.toExponential(9);
    }
    
    // Formatar com separador de milhares se necessário
    const parts = value.toString().split(".");
    if (parts[0].length > 3) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    return parts.join(".");
  };

  const getClearButtonText = () => {
    if (display !== "0" || previousValue !== null || operation !== null) {
      return "C";
    }
    return "AC";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 text-black dark:text-white z-50 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4">
        <h2 className="text-xl font-semibold dark:text-white">Calculadora</h2>
        <button
          onClick={onClose}
          className="p-2 dark:text-white"
        >
          <IoClose size={28} />
        </button>
      </div>

      {/* Display */}
      <div className="flex-1 flex items-end justify-end px-6 pb-4">
        <div className="text-right">
          <div className="text-6xl md:text-7xl font-light select-none overflow-x-auto">
            {formatDisplay(display)}
          </div>
        </div>
      </div>

      {/* Buttons Grid */}
      <div className="px-2 pb-4">
        <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
          {/* Row 1 */}
          <Button
            onClick={clear}
            className="bg-gray-400 dark:bg-gray-600 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500 active:bg-gray-500 dark:active:bg-gray-700"
          >
            {getClearButtonText()}
          </Button>
          <Button
            onClick={handleToggleSign}
            className="bg-gray-400 dark:bg-gray-600 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500 active:bg-gray-500 dark:active:bg-gray-700"
          >
            +/-
          </Button>
          <Button
            onClick={handlePercentage}
            className="bg-gray-400 dark:bg-gray-600 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500 active:bg-gray-500 dark:active:bg-gray-700"
          >
            %
          </Button>
          <Button
            onClick={() => performOperation("÷")}
            className="bg-red-500 dark:bg-red-600 text-white hover:bg-red-400 dark:hover:bg-red-500 active:bg-red-600 dark:active:bg-red-700"
          >
            ÷
          </Button>

          {/* Row 2 */}
          <Button
            onClick={() => inputNumber(7)}
            className="bg-gray-700 dark:bg-gray-800 text-white hover:bg-gray-600 dark:hover:bg-gray-700 active:bg-gray-800 dark:active:bg-gray-900"
          >
            7
          </Button>
          <Button
            onClick={() => inputNumber(8)}
            className="bg-gray-700 dark:bg-gray-800 text-white hover:bg-gray-600 dark:hover:bg-gray-700 active:bg-gray-800 dark:active:bg-gray-900"
          >
            8
          </Button>
          <Button
            onClick={() => inputNumber(9)}
            className="bg-gray-700 dark:bg-gray-800 text-white hover:bg-gray-600 dark:hover:bg-gray-700 active:bg-gray-800 dark:active:bg-gray-900"
          >
            9
          </Button>
          <Button
            onClick={() => performOperation("×")}
            className="bg-red-500 dark:bg-red-600 text-white hover:bg-red-400 dark:hover:bg-red-500 active:bg-red-600 dark:active:bg-red-700"
          >
            ×
          </Button>

          {/* Row 3 */}
          <Button
            onClick={() => inputNumber(4)}
            className="bg-gray-700 dark:bg-gray-800 text-white hover:bg-gray-600 dark:hover:bg-gray-700 active:bg-gray-800 dark:active:bg-gray-900"
          >
            4
          </Button>
          <Button
            onClick={() => inputNumber(5)}
            className="bg-gray-700 dark:bg-gray-800 text-white hover:bg-gray-600 dark:hover:bg-gray-700 active:bg-gray-800 dark:active:bg-gray-900"
          >
            5
          </Button>
          <Button
            onClick={() => inputNumber(6)}
            className="bg-gray-700 dark:bg-gray-800 text-white hover:bg-gray-600 dark:hover:bg-gray-700 active:bg-gray-800 dark:active:bg-gray-900"
          >
            6
          </Button>
          <Button
            onClick={() => performOperation("-")}
            className="bg-red-500 dark:bg-red-600 text-white hover:bg-red-400 dark:hover:bg-red-500 active:bg-red-600 dark:active:bg-red-700"
          >
            −
          </Button>

          {/* Row 4 */}
          <Button
            onClick={() => inputNumber(1)}
            className="bg-gray-700 dark:bg-gray-800 text-white hover:bg-gray-600 dark:hover:bg-gray-700 active:bg-gray-800 dark:active:bg-gray-900"
          >
            1
          </Button>
          <Button
            onClick={() => inputNumber(2)}
            className="bg-gray-700 dark:bg-gray-800 text-white hover:bg-gray-600 dark:hover:bg-gray-700 active:bg-gray-800 dark:active:bg-gray-900"
          >
            2
          </Button>
          <Button
            onClick={() => inputNumber(3)}
            className="bg-gray-700 dark:bg-gray-800 text-white hover:bg-gray-600 dark:hover:bg-gray-700 active:bg-gray-800 dark:active:bg-gray-900"
          >
            3
          </Button>
          <Button
            onClick={() => performOperation("+")}
            className="bg-red-500 dark:bg-red-600 text-white hover:bg-red-400 dark:hover:bg-red-500 active:bg-red-600 dark:active:bg-red-700"
          >
            +
          </Button>

          {/* Row 5 */}
          <div className="col-span-1"></div>
          <Button
            onClick={() => inputNumber(0)}
            className="bg-gray-700 dark:bg-gray-800 text-white hover:bg-gray-600 dark:hover:bg-gray-700 active:bg-gray-800 dark:active:bg-gray-900 rounded-full"
          >
            0
          </Button>
          <Button
            onClick={inputDecimal}
            className="bg-gray-700 dark:bg-gray-800 text-white hover:bg-gray-600 dark:hover:bg-gray-700 active:bg-gray-800 dark:active:bg-gray-900"
          >
            .
          </Button>
          <Button
            onClick={handleEquals}
            className="bg-red-500 dark:bg-red-600 text-white hover:bg-red-400 dark:hover:bg-red-500 active:bg-red-600 dark:active:bg-red-700"
          >
            =
          </Button>
        </div>
      </div>
    </div>
  );
}

const Button = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full aspect-square rounded-full
        text-3xl font-light
        transition-all duration-150
        flex items-center justify-center
        ${className}
      `}
    >
      {children}
    </button>
  );
}

