"use server"

import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

import { SERVER_POST } from "@/services/SERVER_POST";
import { IS_PROD, A_WEEK } from "@/lib/constant";
import { deleteCookies } from '@/lib/hooks/useCookiesServer';

import { loginFormDataType, RegisterFormDataType, ProfileFormValues } from "@/types/registration";


const setCookieLogin = async (accessToken: string, user: any) => {
    const cookieStore = await cookies();

     cookieStore.set({
      name: 'accessToken',
      value: accessToken,
      path: '/',
      httpOnly: true,     
      secure: IS_PROD,
      sameSite: "strict", 
      maxAge: A_WEEK
    })

    cookieStore.set({
      name: 'user',
      value: JSON.stringify(user),
      path: '/',
      httpOnly: true,     
      secure: IS_PROD,
      sameSite: "strict", 
      maxAge: A_WEEK
    })
}


export const submitRegistration = async (payload: RegisterFormDataType) => {

  const { username, email, password, ...userInfoPayload } = payload;
  
  const registrationPayload = {
    username,
    email,
    password,
  }
    
  const result = await SERVER_POST({
    endPoint: "auth/local/register",
    payload: registrationPayload
  });

  if (result?.data?.jwt) {
    const resUserUpdate = await SERVER_POST({
      method: "PUT",
      endPoint: `users/${result.data.user.id}`,
      payload: userInfoPayload,
      Authorization: result?.data?.jwt || "",
    });

    if(resUserUpdate?.data) {
      await setCookieLogin(result?.data?.jwt, resUserUpdate?.data);
      redirect("/profil");
    }
  }

  return result;
};

export const upDateProfile = async (userId:string, payload: ProfileFormValues) => {
  const cookieStore = await cookies();

  const result = await SERVER_POST({
    method: "PUT",
    endPoint: `users/${userId}`,
    payload: payload,
  });

  cookieStore.set({
    name: 'user',
    value: JSON.stringify(result?.data?.user),
    path: '/',
    httpOnly: true,     
    secure: IS_PROD,
    sameSite: "strict", 
    maxAge: A_WEEK
  })

  return result;
};



export const handleLogin = async (payload: loginFormDataType) => {
      
  const result = await SERVER_POST({
    endPoint: "auth/local",
    payload
  });

  if (result?.data) {
    await setCookieLogin(result?.data?.jwt, result?.data?.user);
  } 

  return result
}

export const handleLogout = async () => {
  await deleteCookies("accessToken");
  await deleteCookies("user");  
  redirect("/")
}