"use client";

import { register } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import Link from "next/link";
import SubmitButton from "@/app/components/SubmitButton";
import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction] = useFormState(register, {});
  useEffect(() => {
    if (state?.error) {
      toast.error(state?.error);
    } else if (state?.success) {
      toast.success(state?.success);
      router.push("/auth/login");
    }
  }, [state]);
  return (
    <main>
      <div className="container">
        <div className="main-bg w-1/2 mx-auto pb-12 p-4 rounded-lg">
          <Link href="/" className="cursor-pointer mx-4">
            <img
              className="mx-auto"
              src="https://28coffee.ir/wp-content/uploads/elementor/thumbs/blog_28coffee-q2cg3yae8o1pfp48m6lk8fq5nuy1qivoakg4tzyrxk.webp"
              alt=""
            />
          </Link>
          <div className="bg-white max-w-96 h-fit mx-auto rounded-md">
            <div className="md:flex md:justify-around pt-8">
              <div className="mb-4 w-fit mx-auto md:mx-0">
                <Link
                  href="/auth/login"
                  className="bg-gray-400 mx-1 py-1 px-4 rounded-md text-white text-center shadow-md"
                >
                  <span className="mx-2">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                  ورود
                </Link>
              </div>
              <div className="w-fit mx-auto md:mx-0">
                <Link
                  href="/auth/register"
                  className="main-bg font-semibold text-sm mx-1 py-1 px-4 rounded-md text-white text-center shadow-md"
                >
                  <span className="mx-2">
                    <FontAwesomeIcon icon={faUserPlus} />
                  </span>
                  عضویت
                </Link>
              </div>
            </div>
            <form action={formAction}>
              <div className="text-xs font-bold">
                <div className="m-4 mt-12">
                  <label htmlFor="name">نام</label>
                  <span className="text-red-600 mx-1">&#42;</span>
                  <input
                    className="outline-none w-full border-2 mt-3 p-2 border-slate-100 focus:border-slate-400 focus:shadow-md transition-all rounded-md"
                    name="name"
                    type="text"
                    id="name"
                  />
                </div>
                <div className="m-4">
                  <label htmlFor="email">آدرس ایمیل</label>
                  <span className="text-red-600 mx-1">&#42;</span>
                  <input
                    dir="ltr"
                    className="outline-none w-full border-2 mt-3 p-2 border-slate-100 focus:border-slate-400 focus:shadow-md transition-all rounded-md"
                    name="email"
                    type="text"
                    id="email"
                  />
                </div>
                <div className="m-4">
                  <label htmlFor="password">گذرواژه</label>
                  <span className="text-red-600 mx-1">&#42;</span>
                  <input
                    dir="ltr"
                    className="outline-none w-full border-2 mt-3 p-2 border-slate-100 focus:border-slate-400 focus:shadow-md transition-all rounded-md"
                    name="password"
                    type="password"
                    id="password"
                  />
                </div>
              </div>
              <div className="mx-4">
                <SubmitButton title="ثبت نام" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
