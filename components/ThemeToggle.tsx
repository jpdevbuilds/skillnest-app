type ThemeToggleProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ThemeToggle({
  darkMode,
  setDarkMode,
}: ThemeToggleProps) {
  return (
    <div className="flex justify-end mb-6">

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="border px-4 py-2 rounded-xl"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

    </div>
  );
}