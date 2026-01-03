export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-red-600 dark:bg-red-800 flex items-center justify-center z-50">
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