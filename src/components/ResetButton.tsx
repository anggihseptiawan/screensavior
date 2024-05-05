export const ResetButton = ({ onReset, isStorageNotEmpty }: { onReset: () => void; isStorageNotEmpty: boolean }) => {
  return (
    <>
      {isStorageNotEmpty && (
        <button
          className="fixed top-3 right-8 px-3 py-1 flex justify-center items-center border border-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-indigo-950 cursor-pointer"
          onClick={onReset}
        >
          <img src="/reset.svg" className="w-4 h-4 dark:invert mr-1" alt="reset-icon" />
          <span className="dark:text-white">Reset</span>
        </button>
      )}
    </>
  )
}
