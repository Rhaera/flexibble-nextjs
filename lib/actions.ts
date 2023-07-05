import { ProjectForm } from "@/common.types"
import { createProjectMutation, createUserMutation, getUserQuery } from "@/graphql"
import { GraphQLClient } from "graphql-request"

const isProduction = process.env.NODE_ENV === 'production'
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : "http://127.0.0.1:4000/graphql"
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : '12345'
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : "http://localhost:3000"
const client = new GraphQLClient(apiUrl)
const makeGraphRequest = async (query: string, variables = {}) => {
    try {
        return await client.request(query, variables)
    } catch (err: any) {
        throw err
    }
}

export const getUser = (email: string) => {
    client.setHeader("x-api-key", apiKey)
    return makeGraphRequest(getUserQuery, { email })
}

export const postUser = (name: string, email: string, avatarUrl: string) => {
    client.setHeader("x-api-key", apiKey)
    const variables = {
        input: {
            name,
            email,
            avatarUrl
        }
    }
    return makeGraphRequest(createUserMutation, variables)
}

export const fetchToken = async () => {
    try {
        const response = await fetch(`${serverUrl}/api/auth/token`)
        return response.json()
    } catch (err: any) {
        throw err
    }
}

export const uploadImage = async (imagePath: string) => {
    try {
        const response = await fetch(`${serverUrl}/api/upload`, {
            method: "POST",
            body: JSON.stringify({ path: imagePath })
        })
        return response.json()
    } catch (err: any) {
        throw err
    }
}

export const createNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
    const imageUrl = await uploadImage(form.image)
    if (imageUrl.url) {
        client.setHeader("Authorization", `Bearer ${token}`)
        return makeGraphRequest(createProjectMutation, {
            input: {
                ...form,
                image: imageUrl.url,
                createdBy: {
                    link: creatorId
                }
            }
        })
    }
}
