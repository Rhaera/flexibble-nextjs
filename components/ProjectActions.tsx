"use client"

import { deleteProject, fetchToken } from "@/lib/actions"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

type ProjectId = {
    projectId: string
}

const ProjectActions = ({ projectId }: ProjectId) => {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const handleDeleteProject = async () => {
        const hasConfirmed = confirm("Are you sure about deleting this project?")
        if (!hasConfirmed) return
        setIsDeleting(true)
        const { token } = await fetchToken()
        try {
            await deleteProject(projectId, token)
            router.push("/")
            router.refresh()
        } catch (err: any) {
            console.log(err)
        } finally {
            setIsDeleting(false)
        }
    }
    return (
    <>
        <Link href={`/edit-project/${projectId}`} className="flexCenter edit-action_btn">
            <Image src="/pencile.svg" width={15} height={15} alt="Edit" />
        </Link>
        <button 
        type="button" 
        disabled={isDeleting} 
        onClick={handleDeleteProject}
        className={`flexCenter delete-action_btn ${isDeleting ? "bg-gray" : "bg-primary-purple"}`}
        >
            <Image src="/trash.svg" width={15} height={15} alt="Delete" />
        </button>
    </>
    )
}

export default ProjectActions
