"use client"

import { SessionInterface } from "@/common.types"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import FormField from "./FormField"
import { categoryFilters } from "@/constants"
import CustomMenu from "./CustomMenu"
import Button from "./Button"
import { createNewProject, fetchToken } from "@/lib/actions"
import { useRouter } from "next/navigation"

type FormProps = {
  type: string,
  session: SessionInterface
}

const ProjectForm = ({ type, session }: FormProps) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
      image: '',
      title: '',
      description: '',
      liveSiteUrl: '',
      githubUrl: '',
      category: ''
  })
  const handleFormSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    setIsSubmitting(true)
    const { token } = await fetchToken()
    try {
      if (type === "create") {
        await createNewProject(form, session?.user?.id, token)
        router.push("/")
      }
    } catch (err: any) {
      console.log(err)
    } finally {
      setIsSubmitting(false)
    }
  }
  const handleImageChange = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault()
    const file = ev.target.files?.[0]
    if (!file) return
    if (!file.type.includes("image")) return alert("Please upload an image file.")
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => handleStateChange("image", reader.result as string)
  }
  const handleStateChange = (nameField: string, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [nameField]: value
    }))
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
      placeholder="New Project Name"
      setState={(value) => handleStateChange("title", value)}
      />
      <FormField 
      title="Description"
      state={form.description}
      placeholder="Showcase and discover remarkable developer projects."
      setState={(value) => handleStateChange("description", value)}
      />
      <FormField 
      type="url"
      title="Website URL"
      state={form.liveSiteUrl}
      placeholder="https://your-site.com"
      setState={(value) => handleStateChange("liveSiteUrl", value)}
      />
      <FormField 
      type="url"
      title="Github URL"
      state={form.githubUrl}
      placeholder="https://github.com/your-account"
      setState={(value) => handleStateChange("githubUrl", value)}
      />
      {/* CustomInput Category... */}
      <CustomMenu
      title="Category"
      state={form.category}
      filters={categoryFilters}
      setState={(value) => handleStateChange("category", value)}
      />
      <div className="flexStart w-full">
        <Button
        title={isSubmitting ? 
          `${type === "create" ? "Creating" : "Editing"}` : 
          `${type === "create" ? "Create" : "Edit"}`}
        type="submit"
        leftIcon={isSubmitting ? "" : "/plus.svg"}
        isSubmitting={isSubmitting}
        />
      </div>
    </form>
  )
}

export default ProjectForm
