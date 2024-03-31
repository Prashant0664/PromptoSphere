"use client";

import React from 'react'
import { SessionProvider } from 'next-auth/react';

const Provider = ({children,session}) => {
    //console.log(session,"session printed in provider folder in components")
  return (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
  )
}

export default Provider