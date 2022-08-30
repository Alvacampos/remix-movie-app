type ButtonProps = {
  msg?: string;
};

export default function Button({ msg }: ButtonProps) {
  return (
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blur-700 text-white font-bold py-2 px-4 rounded my-2"
    >
      {msg}
    </button>
  );
}
