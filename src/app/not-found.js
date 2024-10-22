import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="text-center mx-auto my-20">
      <h2>جای اشتباهی آمده ای🤓</h2>
      <div className="mx-auto border-2 border-slate-200 shadow-md rounded-xl w-fit p-2 mt-8 text-xs">
        <Link href="/pages/products">بازگشت به فروشگاه</Link>
      </div>
    </div>
  );
}
