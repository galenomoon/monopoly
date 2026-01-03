import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { IoMoon, IoMoonOutline, IoReload } from "react-icons/io5";
import { IoClose, IoCheckmark } from "react-icons/io5";
import avatars from "@/utils/characters";
import Image from "next/image";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa6";
import { GiMoon, GiSun } from "react-icons/gi";
import { LuSun } from "react-icons/lu";

export default function Header({
  playerName,
  hideValues,
  setHideValues,
  onReload,
  onStartEditingName,
  isEditingName,
  tempPlayerName,
  setTempPlayerName,
  onSavePlayerName,
  onCancelEditingName,
  currentAvatar,
  isDark,
  setIsDark,
  onAvatarChange,
}) {
  const handleChangeAvatar = () => {
    const newAvatar = (currentAvatar + 1) % avatars.length;
    onAvatarChange(newAvatar);
  };

  return (
    <header className="flex flex-col justify-between px-6 py-4 h-[160px] bg-red-600 dark:bg-red-800">
      <section className="flex justify-between items-center">
        <button
          onClick={handleChangeAvatar}
          className="w-[64px] h-[64px] bg-white dark:bg-gray-200 rounded-full overflow-hidden"
        >
          <Image
            src={avatars[currentAvatar]}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </button>
        <div className="flex gap-8 items-center">
          <button
            onClick={() => setIsDark(!isDark)}
            className="text-white"
          >
            {!isDark ? <IoMoonOutline size={28} /> : <LuSun size={28} />}
          </button>
          <button
            onClick={() => setHideValues(!hideValues)}
            className="text-white"
          >
            {!hideValues ? <VscEye size={28} /> : <VscEyeClosed size={28} />}
          </button>
          <button onClick={onReload} className="text-white">
            <IoReload size={28} />
          </button>
        </div>
      </section>
      <article className="text-white font-semibold text-2xl">
        {isEditingName ? (
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={tempPlayerName}
              onChange={(e) => setTempPlayerName(e.target.value)}
              className="bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 px-3 py-1 rounded-lg text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-gray-600"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") onSavePlayerName();
                if (e.key === "Escape") onCancelEditingName();
              }}
            />
            <button
              onClick={onSavePlayerName}
              className="text-white hover:text-green-300 transition-colors"
            >
              <IoCheckmark size={24} />
            </button>
            <button
              onClick={onCancelEditingName}
              className="text-white hover:text-red-300 transition-colors"
            >
              <IoClose size={24} />
            </button>
          </div>
        ) : (
          <h1
            onClick={onStartEditingName}
            className="cursor-pointer transition-opacity select-none"
          >
            Olá, {playerName}
          </h1>
        )}
      </article>
    </header>
  );
}
