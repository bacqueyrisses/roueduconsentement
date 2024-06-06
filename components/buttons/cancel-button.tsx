export default function CancelButton({
  onClick,
  variant,
}: {
  onClick: () => void;
  variant: "close" | "cancel";
}) {
  return (
    <button
      type={"button"}
      className={
        "rounded-full bg-red-100 px-5 py-2 font-medium text-red-600 transition-colors duration-300 ease-in-out hover:bg-red-200 md:px-7"
      }
      onClick={onClick}
    >
      {variant === "close" && "Fermer"}
      {variant === "cancel" && "Retour"}
    </button>
  );
}
