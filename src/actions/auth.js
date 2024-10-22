"use server";
import { cookies } from "next/headers";

function handleError(message) {
  const errors = [];
  console.log(message);
  Object.keys(message).map((key) => {
    console.log(message[key]);
    errors.push(message[key]);
  });

  return errors.join();
}

async function register(state, formData) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("ok");
    }, 1000);
  });

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch("http://localhost:3004/api/users/register", {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  });

  const data = await res.json();

  if (res.ok) {
    return {
      success: "ثبت نام شما با موفقیت انجام شد",
    };
  } else {
    return {
      error: handleError(data),
    };
  }
}

async function login(state, formData) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("ok");
    }, 1000);
  });

  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch("http://localhost:3004/api/users/login", {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (res.ok) {
    cookies().set({
      name: "token",
      value: data.token,
      httpOnly: true,
    });
    return {
      success: "شما با موفقیت وارد شدید",
      user: data.user,
    };
  } else {
    return {
      error: handleError(data),
    };
  }
}

async function me() {
  const token = cookies().get("token");

  if (!token) {
    return {
      error: "کاربر ثبت نام نشده است!",
    };
  }

  const res = await fetch("http://localhost:3004/api/users/userInfo", {
    cache: "no-store",
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  const data = await res.json();
  if (res.ok) {
    return {
      user: data.user,
    };
  } else {
    return {
      error: "کاربر مورد نظر پیدا نشد!",
    };
  }
}

async function logout() {
  const token = cookies().get("token");

  const res = await fetch("http://localhost:3004/api/users/logout", {
    cache: "no-store",
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.value}`,
      Accept: "application/json",
    },
  });

  const data = await res.json();

  if (res.ok) {
    cookies().delete("token");
    return {
      success: "شما با موفقیت خارج شدید",
    };
  } else {
    return {
      error: handleError(data),
    };
  }
}

export { register, login, me, logout };
