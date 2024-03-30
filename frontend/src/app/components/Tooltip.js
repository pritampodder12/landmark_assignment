export default function Tooltip({ content }) {
  return (
    <div
      className={`absolute invisible peer-hover:visible -top-16 -left-6 px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-1 dark:bg-gray-700`}
    >
      {content}
    </div>
  );
}
