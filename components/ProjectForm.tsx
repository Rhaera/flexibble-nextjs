"use client"

import { SessionInterface } from "@/common.types"
import Image from "next/image"
import { ChangeEvent } from "react"
import FormField from "./FormField"

type FormProps = {
  type: string,
  session: SessionInterface
}

const ProjectForm = ({ type, session }: FormProps) => {
  const handleFormSubmit = (ev: React.FormEvent) => {}
  const handleImageChange = (ev: ChangeEvent<HTMLInputElement>) => {}
  const handleStateChange = (nameField: string, value: string) => {

  }
  const form = {
    image: '',
    title: ''
  }
  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose A Poster For Your Project"}
        </label>
        <input 
        id="image"
        type="file"
        accept="image/*"
        required={type === "create" ? true : false}
        className="form_image-input"
        onChange={handleImageChange}
        />
        {form.image && (
          <Image 
          src={form.image}
          className="sm:p-10 object-contain z-20"
          alt="Project Poster"
          fill
          />
        )}
      </div>
      <FormField 
      title="Title"
      state={form.title}
      placeholder="Flexibble"
      setState={(value) => handleStateChange("title", value)}
      />
    </form>
  )
}

export default ProjectForm
