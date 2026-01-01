"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { RxCaretRight } from "react-icons/rx";

import { RiBarcodeFill, RiHandCoinLine } from "react-icons/ri";
import { FaRegGrinStars, FaSkull } from "react-icons/fa";
import { HiOutlineBolt } from "react-icons/hi2";
import { LuDices } from "react-icons/lu";
import { GiBurningSkull } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  // Valores iniciais
  const initialValues = {
    debit: 1500,
    credit: 1000,
    creditLimit: 1000,
    playerName: "Jogador", // Nome inicial
    avatar: 0, // Avatar inicial
  };

  const [hideValues, setHideValues] = useState(false);
  const [debitValue, setDebitValue] = useState(initialValues.debit);
  const [creditValue, setCreditValue] = useState(initialValues.credit);
  const [creditLimit, setCreditLimit] = useState(initialValues.creditLimit);
  const [playerName, setPlayerName] = useState(initialValues.playerName); // Estado para nome do jogador
  const [currentAvatar, setCurrentAvatar] = useState(initialValues.avatar); // Estado para avatar
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "pay" ou "receive"
  const [modalValue, setModalValue] = useState("");
  const [isCreditLimitModalOpen, setIsCreditLimitModalOpen] = useState(false);
  const [newCreditLimit, setNewCreditLimit] = useState("");
  const [isInitialized, setIsInitialized] = useState(false); // Flag para controlar quando salvar
  const [isLoading, setIsLoading] = useState(true); // Estado de loading
  const [isEditingName, setIsEditingName] = useState(false); // Estado para edição do nome
  const [tempPlayerName, setTempPlayerName] = useState(""); // Nome temporário durante edição

  // Carregar valores do localStorage ao inicializar
  useEffect(() => {
    const savedDebit = localStorage.getItem("monopoly_debit");
    const savedCredit = localStorage.getItem("monopoly_credit");
    const savedCreditLimit = localStorage.getItem("monopoly_credit_limit");
    const savedPlayerName = localStorage.getItem("monopoly_player_name");
    const savedAvatar = localStorage.getItem("monopoly_avatar");

    // Se existem valores salvos, usa eles. Se não, usa os valores iniciais
    if (savedDebit) {
      console.log("Debito salvo");
      setDebitValue(parseFloat(savedDebit));
    } else {
      setDebitValue(initialValues.debit);
    }

    if (savedCredit) {
      setCreditValue(parseFloat(savedCredit));
    } else {
      setCreditValue(initialValues.credit);
    }

    if (savedCreditLimit) {
      setCreditLimit(parseFloat(savedCreditLimit));
    } else {
      setCreditLimit(initialValues.creditLimit);
    }

    if (savedPlayerName) {
      setPlayerName(savedPlayerName);
    } else {
      setPlayerName(initialValues.playerName);
    }

    if (savedAvatar) {
      setCurrentAvatar(parseInt(savedAvatar, 10));
    } else {
      setCurrentAvatar(initialValues.avatar);
    }

    // Marca como inicializado após carregar os valores
    setIsInitialized(true);

    // Simula um pequeno delay para o loading ficar visível
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []); // Executa apenas uma vez ao montar o componente

  // Salvar valores no localStorage sempre que qualquer valor mudar (após inicialização)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("monopoly_debit", debitValue.toString());
      localStorage.setItem("monopoly_credit", creditValue.toString());
      localStorage.setItem("monopoly_credit_limit", creditLimit.toString());
      localStorage.setItem("monopoly_player_name", playerName);
      localStorage.setItem("monopoly_avatar", currentAvatar.toString());
    }
  }, [
    debitValue,
    creditValue,
    creditLimit,
    playerName,
    currentAvatar,
    isInitialized,
  ]); // Executa quando qualquer um dos valores mudar

  const handleReload = () => {
    const confirm = window.confirm("Deseja reiniciar o jogo?");
    if (confirm) {
      setDebitValue(initialValues.debit);
      setCreditValue(initialValues.credit);
      setCreditLimit(initialValues.creditLimit);
      setPlayerName(initialValues.playerName);
      setCurrentAvatar(initialValues.avatar);

      // Limpar localStorage
      localStorage.removeItem("monopoly_debit");
      localStorage.removeItem("monopoly_credit");
      localStorage.removeItem("monopoly_credit_limit");
      localStorage.removeItem("monopoly_player_name");
      localStorage.removeItem("monopoly_avatar");

      toast.success("Jogo reiniciado com sucesso!");
    }
  };

  const startEditingName = () => {
    setTempPlayerName(playerName);
    setIsEditingName(true);
  };

  const savePlayerName = () => {
    if (tempPlayerName.trim()) {
      setPlayerName(tempPlayerName.trim());
      setIsEditingName(false);
      toast.success("Nome atualizado com sucesso!");
    } else {
      toast.error("O nome não pode estar vazio!");
    }
  };

  const cancelEditingName = () => {
    setTempPlayerName("");
    setIsEditingName(false);
  };

  const openModal = (type) => {
    setModalType(type);
    setModalValue("");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalType("");
    setModalValue("");
  };

  const handleModalSubmit = () => {
    const value = parseFloat(modalValue);

    if (isNaN(value) || value <= 0) {
      toast.error("Por favor, insira um valor válido!");
      return;
    }

    if (modalType === "pay") {
      handlePayment(value);
    } else if (modalType === "receive") {
      handleReceive(value);
    }

    closeModal();
  };

  const handlePayment = (value) => {
    if (debitValue >= value) {
      setDebitValue((prev) => prev - value);
      toast.success(
        `Pagamento de R$ ${value.toFixed(2)} realizado com sucesso!`
      );
    } else {
      const remainingValue = value - debitValue;
      if (creditValue >= remainingValue) {
        setDebitValue(0);
        setCreditValue((prev) => prev - remainingValue);
        toast.success(
          `Pagamento de R$ ${value.toFixed(
            2
          )} realizado! R$ ${debitValue.toFixed(
            2
          )} da conta e R$ ${remainingValue.toFixed(2)} do cartão.`
        );
      } else {
        toast.error("Saldo insuficiente na conta e no cartão de crédito!");
      }
    }
  };

  const handleReceive = (value) => {
    setDebitValue((prev) => prev + value);
    toast.success(`Recebimento de R$ ${value.toFixed(2)} adicionado ao saldo!`);
  };

  const handleAdd200 = () => {
    setDebitValue((prev) => prev + 200);
    toast.success("R$ 200,00 adicionados ao saldo!");
  };

  const openCreditLimitModal = () => {
    setNewCreditLimit(creditLimit.toString());
    setIsCreditLimitModalOpen(true);
  };

  const closeCreditLimitModal = () => {
    setIsCreditLimitModalOpen(false);
    setNewCreditLimit("");
  };

  const handleCreditLimitSubmit = () => {
    const value = parseFloat(newCreditLimit);

    if (isNaN(value) || value < 0) {
      toast.error("Por favor, insira um valor válido!");
      return;
    }

    setCreditLimit(value);
    closeCreditLimitModal();
    toast.success(`Limite do cartão atualizado para R$ ${value.toFixed(2)}!`);
  };

  const handleRollDice = () => {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const total = dice1 + dice2;

    toast.success(` Você rolou ${dice1} e ${dice2}! Total: ${total}`, {
      duration: 4000,
      icon: "🎲",
    });
  };

  return (
    <main className="flex h-[90dvh] flex-col relative font-outfit text-black">
      <Toaster position="top-center" />
      <section className="flex justify-center items-center gap-4 fixed bottom-12 left-0 right-0 px-6 py-4">
        <button
          onClick={handleRollDice}
          className="flex gap-2 bg-red-500 w-full h-14 rounded-xl text-white items-center justify-center"
        >
          <LuDices size={24} />
          <h1 className="text-xl font-semibold">Rode Dados</h1>
        </button>
      </section>

      {/* Loading Screen */}
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Header
            playerName={playerName}
            hideValues={hideValues}
            setHideValues={setHideValues}
            onReload={handleReload}
            onStartEditingName={startEditingName}
            isEditingName={isEditingName}
            tempPlayerName={tempPlayerName}
            setTempPlayerName={setTempPlayerName}
            onSavePlayerName={savePlayerName}
            onCancelEditingName={cancelEditingName}
            currentAvatar={currentAvatar}
            onAvatarChange={setCurrentAvatar}
          />
          <section className="flex flex-col gap-6 w-full h-fit p-6">
            <ResumeAccount
              title="Saldo em conta"
              value={debitValue}
              hideValue={hideValues}
            />
            <ActionButtons
              onPay={() => openModal("pay")}
              onReceive={() => openModal("receive")}
              onAdd200={handleAdd200}
              onRollDice={handleRollDice}
            />
            <ResumeAccount
              title="Cheque especial"
              value={creditLimit - creditValue}
              isCredit
              hideValue={hideValues}
              creditLimit={creditValue}
              onCreditLimitClick={openCreditLimitModal}
              initialCreditLimit={initialValues.creditLimit}
            />
          </section>
        </>
      )}

      {/* Modal para Pagar/Receber */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                {modalType === "pay" ? "Pagar" : "Receber"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <IoClose size={24} />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor (R$)
              </label>
              <input
                type="number"
                inputMode="numeric" // ou "numeric"
                pattern="[0-9]*"
                value={modalValue}
                onChange={(e) => setModalValue(e.target.value)}
                placeholder="0,00"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                step="0.01"
                min="0"
              />
            </div>

            <button
              onClick={handleModalSubmit}
              className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-red-700 transition-colors"
            >
              {modalType === "pay" ? "Pagar" : "Receber"}
            </button>
          </div>
        </div>
      )}

      {/* Modal para Limite do Cartão */}
      {isCreditLimitModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Definir Limite</h2>
              <button
                onClick={closeCreditLimitModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <IoClose size={24} />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Limite do Cartão (R$)
              </label>
              <input
                type="number"
                value={newCreditLimit}
                onChange={(e) => setNewCreditLimit(e.target.value)}
                placeholder="0,00"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                step="0.01"
                min="0"
              />
            </div>

            <button
              onClick={handleCreditLimitSubmit}
              className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-red-700 transition-colors"
            >
              Atualizar Limite
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-red-600 flex items-center justify-center z-50">
      <div className="text-center text-white">
        <div className="mb-6">
          <div className="w-24 h-24 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Segura ai meu amigo</h1>
        <p className="text-xl opacity-90">Carregando...</p>
      </div>
    </div>
  );
};

export const ResumeAccount = ({
  title,
  value,
  isCredit,
  hideValue,
  creditLimit,
  onCreditLimitClick,
  initialCreditLimit,
}) => {
  const isUsingCredit = value !== 0 && isCredit;
  return (
    <section className={`${isCredit ? "pt-4 border-t border-gray-200" : ""}`}>
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className={`text-xl ${isUsingCredit ? "text-red-500" : ""}`}>
            {title}
          </h1>
          {!isCredit ? null : isUsingCredit ? (
            <GiBurningSkull size={24} className="text-red-500 animate-pulse" />
          ) : (
            <FaSkull size={16} className="text-black-500" />
          )}
        </div>
        <RxCaretRight size={24} />
      </div>
      <div>
        {isCredit ? (
          <h2 className="opacity-60 mt-2 font-light">Você deve</h2>
        ) : (
          ""
        )}
        <h2 className="whitespace-nowrap font-semibold text-2xl">
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
          className="opacity-60 mt-4 font-light hover:opacity-80 transition-opacity cursor-pointer"
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

export const ActionButtons = ({
  onPay,
  onReceive,
  onAdd200,
  onRollDice
}) => {
  const actions = [
    {
      title: "Pagar",
      icon: <RiBarcodeFill size={24} className="flex-shrink-0 text-red-700" />,
      onClick: onPay,
    },
    {
      title: "Receber",
      icon: <RiHandCoinLine size={24} className="flex-shrink-0 text-green-700" />,
      onClick: onReceive,
    },
    {
      title: "+200",
      icon: <FaRegGrinStars size={24} className="flex-shrink-0" />,
      onClick: onAdd200,
    },
    {
      title: "Rode Dados",
      icon: <LuDices size={24} className="flex-shrink-0" />,
      onClick: onRollDice,
    },
  ];

  return (
    <section className="flex gap-6">
      {actions.map((action) => (
        <div key={action.title} className="flex flex-col gap-2 items-center">
          <button
            onClick={action.onClick}
            className="w-[60px] h-[60px] flex justify-center items-center bg-gray-200 p-4 rounded-full hover:bg-gray-300 transition-colors"
          >
            {action.icon}
          </button>
          <h1 className="text-sm">{action.title}</h1>
        </div>
      ))}
    </section>
  );
};
