'use client'
import React, { useState } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// If you are using date-fns v3.x or v4.x, please import `AdapterDateFns`
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { vi } from "date-fns/locale";
// If you are using date-fns v2.x, please import the v2 adapter
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV2';
const PostPage = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  console.log(date);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
     <DatePicker  value={date} onChange={(newValue) => setDate(newValue)} />
    </LocalizationProvider>
  )
}

export default PostPage
