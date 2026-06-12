import React, { createContext, useState } from 'react'

export const UploadContext = createContext()

export const UploadProvider = ({ children }) => {
  const [uploads, setUploads] = useState([])
  const [currentUpload, setCurrentUpload] = useState(null)

  const addUpload = (upload) => {
    setUploads([...uploads, upload])
    setCurrentUpload(upload)
  }

  const removeUpload = (uploadId) => {
    setUploads(uploads.filter(u => u.id !== uploadId))
  }

  const value = {
    uploads,
    currentUpload,
    addUpload,
    removeUpload,
    setCurrentUpload,
  }

  return (
    <UploadContext.Provider value={value}>
      {children}
    </UploadContext.Provider>
  )
}
