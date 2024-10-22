"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ title }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="main-bg text-white w-full my-8 py-2 rounded-md shadow-md"
    >
      {title}
      {pending && <span className="mx-2">...</span>}
    </button>
  );
}
